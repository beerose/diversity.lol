export const sortOptions = [
	{ label: "Newest", value: "newest" },
	{ label: "Oldest", value: "oldest" },
	{ label: "Most Diverse", value: "diverse" },
] as const;
export const sortValues = sortOptions.map((o) => o.value);
export type SortValue = (typeof sortValues)[number];

export const locationOptions = {
	id: "location",
	caption: "Location",
	options: [
		{ value: "online", label: "Online" },
		{ value: "inperson", label: "In Person" },
		{ value: "hybrid", label: "Hybrid" },
	],
} as const;
export const locationValues = locationOptions.options.map((o) => o.value);
export const thresholdOptions = {
	id: "threshold",
	caption: "Threshold",
	options: [
		{ value: "10", label: "> 10%" },
		{ value: "20", label: "> 20%" },
		{ value: "30", label: "> 30%" },
		{ value: "40", label: "> 40%" },
		{ value: "50", label: "> 50%" },
		{ value: "60", label: "> 60%" },
		{ value: "70", label: "> 70%" },
		{ value: "80", label: "> 80%" },
		{ value: "90", label: "> 90%" },
	],
} as const;
export const thresholdValues = thresholdOptions.options.map((o) => o.value);

export const filterOptions = [locationOptions, thresholdOptions] as const;

export type FilterKey = (typeof filterOptions)[number]["id"];
export type Filters = {
	[K in FilterKey]: Extract<(typeof filterOptions)[number], { id: K }>["options"][number]["value"];
} & {
	tags?: readonly string[];
};
