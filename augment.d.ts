// @todo remove these when they're added to React types
declare module "react" {
	interface ButtonHTMLAttributes<_T> {
		popovertarget?: string;
	}
	interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
		popover?: "auto";
	}
}

export {};
