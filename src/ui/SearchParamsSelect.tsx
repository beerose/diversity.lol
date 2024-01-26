"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select } from "@/ui/Select";

export const SearchParamsSelect = <TValue extends string>({
	name,
	options,
	caption,
	defaultValue,
}: {
	name: string;
	defaultValue?: NoInfer<TValue>;
	options: readonly { value: TValue; label: string }[];
	caption: string;
}) => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const searchParamValue = searchParams.get(name);
	const value = options.map((o) => o.value).includes(searchParamValue) ? searchParamValue : defaultValue;

	return (
		<Select
			name={name}
			aria-label={caption}
			onChange={(e) => {
				const newValue = e.currentTarget.value as TValue;
				const newParams = new URLSearchParams(searchParams);
				if (newValue) {
					newParams.set(name, newValue);
				} else {
					newParams.delete(name);
				}
				void router.push(`?${newParams.toString()}`);
			}}
			value={value ?? ""}
		>
			<option value="">{caption}</option>
			{options.map((option) => {
				return (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				);
			})}
		</Select>
	);
};
