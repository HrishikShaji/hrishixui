"use client";

import { useState } from "react";
import { ColorPicker } from "./ColorPicker";

export const InputColor = () => {
	const [selectedColor, setSelectedColor] = useState("hsl(0,0%,0%)");
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="relative">
			<div
				onClick={() => setIsOpen(!isOpen)}
				className="w-10 h-5"
				style={{ backgroundColor: selectedColor }}
			/>
			{isOpen ? (
				<ColorPicker
					selectedColor={selectedColor}
					setSelectedColor={setSelectedColor}
				/>
			) : null}
		</div>
	);
};
