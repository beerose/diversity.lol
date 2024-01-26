import type { Config } from "tailwindcss";
import FormsPlugin from "@tailwindcss/forms";

const config: Config = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				primary: "#FDF4EC",
				accent: "#72429E",
				accentDark: "#482A65",
			},
		},
	},
	plugins: [FormsPlugin],
};
export default config;
