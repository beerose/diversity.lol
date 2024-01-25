import { getConferencesFor } from "@/utils/data";
import { ConfListItem } from "@/ui/ConfListItem";
import { FiltersSection } from "@/ui/FiltersSection";

export const ConfList = async () => {
	const conferences = await getConferencesFor({});

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
