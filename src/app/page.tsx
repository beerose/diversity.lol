import { Hero } from "@/ui/HeroPlaceholder";

export default async function Home() {
	// const sort = sortValues.includes(searchParams.sort) ? searchParams.sort : undefined;
	// const location = [searchParams.location].flat().filter(Boolean);
	// const threshold = thresholdValues?.includes(searchParams.threshold) ? searchParams.threshold : undefined;
	// const searchTags = [searchParams.tags].flat().filter(Boolean);

	// const conferences = await getConferencesFor({ filters: { location, threshold, tags: searchTags }, sort });
	// const tags = await getAllTags();

	return (
		<>
			<Hero />
			{/* <ConfList tags={tags} conferences={conferences} /> */}
			{/* <Cta /> */}
			{/* <Footer /> */}
		</>
	);
}
