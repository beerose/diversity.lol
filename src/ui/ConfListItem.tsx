import Link from "next/link";
import { type Conference } from "@/data/types/v1";

export const ConfListItem = ({ conference }: { conference: Conference }) => {
	const isCFPOpen =
		new Date(conference.cfp?.open ?? "") < new Date() && new Date(conference.cfp?.close ?? "") > new Date();

	return (
		<li className="relative grid grid-cols-5 gap-x-6 rounded-md border border-slate-100">
			<div className="col-span-1 flex items-center justify-center bg-primary px-2 text-sm">
				<time dateTime={conference.startDate} className="px-4 text-center font-semibold text-slate-800">
					{new Date(conference.startDate).toLocaleDateString("en-US", {
						month: "short",
						day: "numeric",
						year: "numeric",
					})}
				</time>
			</div>
			<div className="col-span-4 grid w-full grid-cols-2 sm:grid-cols-3">
				<div className="col-span-1 flex-col space-y-1 py-4 sm:col-span-2">
					<ul className="flex flex-wrap gap-x-2">
						{conference.tags.map((tag) => {
							return (
								<li key={tag}>
									<span className="rounded-full text-xs text-slate-600">#{tag}</span>
								</li>
							);
						})}
					</ul>
					<div className="min-w-0 flex-auto space-y-1">
						<Link
							href={conference.url}
							target="_blank"
							className="cursor-pointer underline-offset-2 hover:text-gray-600 hover:underline"
						>
							<p className="flex flex-col gap-x-3 text-base font-semibold leading-6 text-gray-900 sm:flex-row sm:items-center">
								<span className="absolute inset-x-0 -top-px bottom-0" />
								{conference.name}
								{isCFPOpen && (
									<span className="my-2 -ml-1 inline max-w-max rounded bg-gray-100 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
										CFP open until{" "}
										{new Date(conference.cfp?.close ?? "").toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
											year: "numeric",
										})}
									</span>
								)}
							</p>
						</Link>
						<p className="text-xs text-gray-900">{conference.location}</p>
					</div>
				</div>
				<div className="col-span-1">
					<dl className="grid h-full grid-cols-1 space-y-4 divide-slate-100 overflow-hidden py-5 md:grid-cols-2 md:space-y-0 md:divide-x md:divide-y-0">
						<div className="px-4">
							<dt className="text-xs font-normal text-gray-900">Total Speakers</dt>
							<dd className="flex items-baseline justify-between sm:mt-2 md:block lg:flex">
								<div className="flex items-baseline text-2xl font-semibold text-accent">
									{conference.speakers.total}
								</div>
							</dd>
						</div>
						<div className="px-4">
							<dt className="text-xs font-normal text-gray-900">Women & Non-Binary</dt>
							<dd className="flex items-baseline justify-between sm:mt-2 md:block lg:flex">
								<div className="flex items-baseline text-2xl font-semibold text-accent">
									{Math.round((conference.speakers.womenAndNonBinary / conference.speakers.total) * 100)}%
								</div>
							</dd>
						</div>
					</dl>
				</div>
			</div>
		</li>
	);
};
