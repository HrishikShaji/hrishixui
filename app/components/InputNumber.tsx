"use client";

import { Dispatch, SetStateAction } from "react";

interface InputNumberProps {
  label: string;
  value: number;
  onChange: Dispatch<SetStateAction<number>>;
  placeholder: string;
}

export const InputNumber: React.FC<InputNumberProps> = (props) => {
  return (
    <div className="flex flex-col gap-1">
      <label>{props.label}</label>
      <input
        type="number"
        className="p-1 rounded-md text-black"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
      />
    </div>
  );
};
