import Link from "next/link";

export const Hero = () => {
	return (
		<div>
			<header className="inset-x-0 top-0 z-50">
				<nav className="flex items-center justify-between py-6 text-xs text-gray-500" aria-label="Global">
					<Link href="/about" className="-m-1.5 p-1.5 underline-offset-1 hover:text-gray-600 hover:underline">
						About
					</Link>
					<Link
						href="https://github.com/beerose/diversity.lol"
						target="_blank"
						className="-m-1.5 p-1.5 hover:text-gray-600"
						aria-label="GitHub"
					>
						<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
							/>
						</svg>
					</Link>
				</nav>
			</header>

			<div className="relative isolate px-6 lg:px-8">
				<div className="mx-auto max-w-2xl py-4 sm:py-6 lg:py-8">
					<div className="flex flex-col items-center text-center">
						<Link href="/">
							<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
								🫠 diversity.lol 🫠
							</h1>
						</Link>
						<p className="mt-6 text-base leading-6 text-stone-600">
							A list of conferences and events with statistics on diversity and inclusion.
						</p>
						<p className="text-base leading-6 text-stone-600">
							This is a community project. Please, contribute!
						</p>
						<div className="flex items-center gap-x-6 pt-6 lg:mt-0 lg:flex-shrink-0">
							<Link
								href="https://github.com/beerose/diversity.lol/new/main/src/data/conferences"
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
			</div>
		</div>
	);
};
