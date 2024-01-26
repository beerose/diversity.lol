export const Select = (props: JSX.IntrinsicElements["select"]) => {
	return (
		<select
			{...props}
			className="rounded-md bg-white text-sm font-semibold shadow-sm outline-none focus:border-black focus:ring-2 focus:ring-accentDark focus:ring-offset-2"
		/>
	);
};
