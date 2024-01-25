import Link from "next/link";

export const Cta = () => {
	return (
		<div className="mt-10 w-full bg-white">
			<div className="mx-auto max-w-7xl rounded-xl bg-primary px-6 py-8 sm:py-16 lg:flex lg:items-center lg:justify-between lg:px-8">
				<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Want to contribute?</h2>
				<div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
					<Link
						href="https://github.com/beerose/diversity.lol/new/main/data/conferences"
						target="_blank"
						className="rounded-md bg-accent px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accentDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentDark"
					>
						Add a conference
					</Link>
					<Link href="/about" className="text-sm font-semibold leading-6 text-gray-900">
						Learn more <span aria-hidden="true">→</span>
					</Link>
				</div>
			</div>
		</div>
	);
};
