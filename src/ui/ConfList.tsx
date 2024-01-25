import { getConferencesFor } from "@/utils/data";
import { ConfListItem } from "@/ui/ConfListItem";
import { FiltersSection } from "@/ui/FiltersSection";
import { type Filters, type SortValue } from "@/utils/filters";

export const ConfList = async ({ filters, sort }: { filters?: Partial<Filters>; sort?: SortValue }) => {
	const conferences = await getConferencesFor({ filters, sort });

	return (
		<>
			<div className="space-y-4">
				<FiltersSection />

				<ul role="list" className="space-y-4 overflow-hidden bg-white">
					{conferences.map((conference) => {
						return <ConfListItem key={conference.url} conference={conference} />;
					})}
				</ul>
			</div>
		</>
	);
};
