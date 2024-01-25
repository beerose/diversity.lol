import { type Filters, type SortValue } from "@/utils/filters";

const data = [] as Conference[];

const calculateDiversity = (conference: Conference) => {
	const diversity =
		((conference.speakers.womenAndNonBinaryMain || conference.speakers.womenAndNonBinary) /
			conference.speakers.total) *
		100;

	return diversity;
};

export const getConferencesFor = async ({
	filters = {},
	sort,
}: {
	filters?: Partial<Filters>;
	sort?: SortValue;
}) => {
	return data
		.filter((conference) => {
			if (!filters.threshold) {
				return true;
			}
			const diversity = calculateDiversity(conference);
			return diversity >= Number(filters.threshold);
		})
		.filter((conference) => {
			if (!filters.tag) {
				return true;
			}
			return conference.tags.includes(filters.tag);
		})
		.filter((conference) => {
			if (!filters.locations) {
				return true;
			}
			return conference.location === filters.locations;
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

export interface Conference {
	name: string;
	description: string;
	startDate: string;
	cfp: {
		open: string;
		close: string;
		url: string;
	};
	status: "cfp open" | "cfp closed";
	tags: string[];
	location: string;
	url: string;
	social: {
		twitter: string;
	};
	organizer: {
		name: string;
		url: string;
		forProfit: boolean;
	};
	size: string;
	speakers: {
		total: number;
		womenAndNonBinary: number;
		womenAndNonBinaryMain: number;
	};
}
