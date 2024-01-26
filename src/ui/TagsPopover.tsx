"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Popover } from "@/ui/Popover";

export const TagsPopover = ({ tags }: { tags: readonly string[] }) => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const searchTags = searchParams.getAll("tags")?.filter((tag) => tags.includes(tag)) ?? [];

	return (
		<Popover caption="Tags">
			{tags.map((tag) => {
				return (
					<div key={tag} className="mb-1 grid">
						<label className="inline-flex items-center gap-x-2">
							<input
								className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
								type="checkbox"
								value={tag}
								name="tags"
								defaultChecked={searchTags.includes(tag)}
								onChange={(e) => {
									const newChecked = e.currentTarget.checked;
									const newParams = new URLSearchParams(searchParams);
									const newTags = newChecked ? [...searchTags, tag] : searchTags.filter((t) => t !== tag);
									const uniqueNewTags = [...new Set(newTags)];
									newParams.delete("tags");
									if (uniqueNewTags.length > 0) {
										uniqueNewTags.forEach((tag) => {
											newParams.append("tags", tag);
										});
									}
									void router.push(`?${newParams.toString()}`);
								}}
							/>
							<span>{tag}</span>
						</label>
					</div>
				);
			})}
		</Popover>
	);
};
