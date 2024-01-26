import "server-only";

import * as Path from "node:path";
import fg from "fast-glob";
import { type Conference } from "@/data/types/v1";
import { type Filters, type SortValue } from "@/utils/filters";

const calculateDiversity = (conference: Conference) => {
	const diversity =
		((conference.speakers.womenAndNonBinaryMain ?? conference.speakers.womenAndNonBinary) /
			conference.speakers.total) *
		100;

	return diversity;
};

export const getAllConferences = async () => {
	const cwd = Path.join(process.cwd(), "src/data/conferences");
	const files = await fg(["*.json"], { cwd });

	const conferences = await Promise.all(
		files
			.filter((f) => !f.startsWith("_") && !f.startsWith("."))
			.map(async (filename) => {
				const conference = (await import(`@/data/conferences/${filename}`)) as Conference;
				return conference;
			}),
	);
	return conferences;
};

export const getAllTags = async () => {
	const conferences = await getAllConferences();

	const tags = conferences.flatMap((conference) => conference.tags);
	return [...new Set(tags)];
};

export const getConferencesFor = async ({
	filters = {},
	sort,
}: {
	filters?: Partial<Filters>;
	sort?: SortValue;
}) => {
	const data = await getAllConferences();

	return data
		.filter((conference) => {
			if (!filters.threshold) {
				return true;
			}
			const diversity = calculateDiversity(conference);
			return diversity >= Number(filters.threshold);
		})
		.filter((conference) => {
			if (!filters.tags?.length) {
				return true;
			}
			return conference.tags.some((tag) => filters.tags?.includes(tag));
		})
		.filter((conference) => {
			if (!filters.location) {
				return true;
			}
			return filters.location.includes(conference.location);
		})
		.sort((a, b) => {
			switch (sort) {
				case "newest":
					return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
				case "oldest":
					return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
				case "diverse":
					return calculateDiversity(b) - calculateDiversity(a);
				default:
					return 0;
			}
		});
};
