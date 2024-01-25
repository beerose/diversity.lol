import { ConfList } from "@/ui/ConfList";
import { Cta } from "@/ui/Cta";
import { Footer } from "@/ui/Footer";
import { Hero } from "@/ui/Hero";
import { locationValues, sortValues, tagValues, thresholdValues } from "@/utils/filters";

export default function Home({ searchParams }: { searchParams: Record<string, string | undefined> }) {
	const sort = sortValues.includes(searchParams.sort) ? searchParams.sort : undefined;
	const tag = tagValues?.includes(searchParams.tag) ? searchParams.tag : undefined;
	const location = locationValues?.includes(searchParams.location) ? searchParams.location : undefined;
	const threshold = thresholdValues?.includes(searchParams.threshold) ? searchParams.threshold : undefined;

	return (
		<>
			<Hero />
			<ConfList
				sort={sort}
				filters={{
					tag,
					location,
					threshold,
				}}
			/>
			<Cta />
			<Footer />
		</>
	);
}
