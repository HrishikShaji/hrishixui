"use client";

import { useState } from "react";
import { ColorPicker } from "./ColorPicker";
import Input from "postcss/lib/input";

interface InputColorProps {
	value: string;
	onChange: (value: string) => void;
}

export const InputColor: React.FC<InputColorProps> = ({ value, onChange }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="relative">
			<div
				onClick={() => setIsOpen(!isOpen)}
				className="w-10 h-5"
				style={{ backgroundColor: value }}
			/>
			{isOpen ? (
				<div className="absolute mt-2">
					<ColorPicker
						selectedColor={value}
						setSelectedColor={(color) => onChange(color)}
					/>
				</div>
			) : null}
		</div>
	);
};
