import { ConfListItem } from "@/ui/ConfListItem";
import { FiltersSection } from "@/ui/FiltersSection";
import { type Conference } from "@/data/types/v1";

export const ConfList = async ({
	conferences,
	tags,
}: {
	conferences: readonly Conference[];
	tags: readonly string[];
}) => {
	return (
		<div className="space-y-4">
			<FiltersSection tags={tags} />

			<ul role="list" className="space-y-4 overflow-hidden bg-white">
				{conferences.map((conference) => {
					return <ConfListItem key={conference.url} conference={conference} />;
				})}
			</ul>
		</div>
	);
};
