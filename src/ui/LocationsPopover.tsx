"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Popover } from "@/ui/Popover";
import { locationOptions } from "@/utils/filters";

export const LocationsPopover = () => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const searchLocations = searchParams.getAll("location") ?? [];

	return (
		<Popover caption="Location" count={searchLocations.length}>
			{locationOptions.options.map((l) => {
				return (
					<div key={l.value} className="mb-1 grid">
						<label className="inline-flex items-center gap-x-2">
							<input
								className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
								type="checkbox"
								value={l.value}
								name="location"
								defaultChecked={searchLocations.includes(l.value)}
								onChange={(e) => {
									const newChecked = e.currentTarget.checked;
									const newParams = new URLSearchParams(searchParams);
									const newLocations = newChecked
										? [...searchLocations, l.value]
										: searchLocations.filter((sl) => sl !== l.value);
									const uniqueNewLocations = [...new Set(newLocations)];
									newParams.delete("location");
									if (uniqueNewLocations.length > 0) {
										uniqueNewLocations.forEach((ul) => {
											newParams.append("location", ul);
										});
									}
									void router.push(`?${newParams.toString()}`);
								}}
							/>
							<span>{l.label}</span>
						</label>
					</div>
				);
			})}
		</Popover>
	);
};
