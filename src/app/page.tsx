import { ConfList } from "@/ui/ConfList";
import { Cta } from "@/ui/Cta";
import { Footer } from "@/ui/Footer";
import { Hero } from "@/ui/Hero";
import { getAllTags, getConferencesFor } from "@/utils/data";
import { sortValues, thresholdValues } from "@/utils/filters";

export default async function Home({
	searchParams,
}: {
	searchParams: Record<string, string | string[] | undefined>;
}) {
	const sort = sortValues.includes(searchParams.sort) ? searchParams.sort : undefined;
	const location = [searchParams.location].flat().filter(Boolean);
	const threshold = thresholdValues?.includes(searchParams.threshold) ? searchParams.threshold : undefined;
	const searchTags = [searchParams.tags].flat().filter(Boolean);

	const conferences = await getConferencesFor({ filters: { location, threshold, tags: searchTags }, sort });
	const tags = await getAllTags();

	return (
		<>
			<Hero />
			<ConfList tags={tags} conferences={conferences} />
			<Cta />
			<Footer />
		</>
	);
}
