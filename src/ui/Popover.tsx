"use client";

import { type ReactNode, useId, useRef, useEffect } from "react";

export const Popover = ({ caption, children }: { caption: string; children: ReactNode }) => {
	const id = "popover-" + useId();
	const popoverRef = useRef<HTMLDivElement | null>(null);
	const buttonRef = useRef<HTMLButtonElement | null>(null);

	useEffect(() => {
		const resize = () => {
			const popover = popoverRef.current;
			const button = buttonRef.current;
			if (!popover || !button) {
				return;
			}
			const rect = button.getBoundingClientRect();
			popover.style.setProperty("--popover-top", `${rect.top + rect.height + window.scrollY + 4}px`);
			popover.style.setProperty("--popover-left", `${rect.left + window.screenX}px`);
		};

		resize();
		window.addEventListener("resize", resize, { passive: true });
		return () => {
			window.removeEventListener("resize", resize);
		};
	}, []);

	return (
		<>
			<div
				popover="auto"
				ref={popoverRef}
				id={id}
				className="absolute bottom-auto left-[var(--popover-left)] right-auto top-[var(--popover-top)] rounded-md bg-white px-4 py-4 shadow-md"
			>
				{children}
			</div>
			<button
				popovertarget={id}
				ref={buttonRef}
				type="button"
				className="chevron appearance-none rounded-md border border-black bg-white px-3 py-1 text-xs font-semibold shadow-sm outline-none focus:border-black focus:ring-2 focus:ring-accentDark focus:ring-offset-2"
			>
				{caption}
			</button>
		</>
	);
};
