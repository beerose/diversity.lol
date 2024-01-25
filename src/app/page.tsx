import { ConfList } from "@/ui/ConfList";
import { Cta } from "@/ui/Cta";
import { Footer } from "@/ui/Footer";
import { Hero } from "@/ui/Hero";

export default function Home() {
	return (
		<>
			<Hero />
			<ConfList />
			<Cta />
			<Footer />
		</>
	);
}
