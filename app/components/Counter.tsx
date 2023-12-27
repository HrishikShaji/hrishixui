"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { IoIosArrowDropup, IoIosArrowDropdown } from "react-icons/io";

interface CounterProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
}

export const Counter: React.FC<CounterProps> = ({
  min,
  max,
  value,
  onChange,
}) => {
  return (
    <div className="relative  h-full">
      <input
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-10 rounded-md p-1"
      />
      <div className="absolute right-0 flex flex-col top-0 text-white bg-neutral-700 rounded-md">
        <button
          disabled={value === max}
          type="button"
          onClick={() => onChange(value + 1)}
        >
          <IoIosArrowDropup />
        </button>
        <button
          disabled={value === min}
          type="button"
          onClick={() => onChange(value - 1)}
        >
          <IoIosArrowDropdown />
        </button>
      </div>
    </div>
  );
};
