"use client";
import { useState } from "react";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";

export interface Option {
  id: string;
  title: string;
}

interface InputSelectProps {
  item: Option;
  onChange: (option: Option) => void;
  options: Option[];
}

export const InputSelect: React.FC<InputSelectProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col w-full gap-2 relative">
      <div className="flex gap-2 justify-between bg-white z-0">
        <h1>{props.item.id === "" ? "Select" : props.item.title}</h1>
        <button
          className="p-1 bg-white"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <IoIosArrowDropupCircle /> : <IoIosArrowDropdownCircle />}
        </button>
      </div>
      {isOpen ? (
        <div className="flex flex-col absolute mt-10 w-full z-10">
          <button
            type="button"
            onClick={() => props.onChange({ title: "", id: "" })}
            className="bg-neutral-300"
          >
            None
          </button>
          {props.options.map((option) => (
            <button
              className="bg-neutral-300"
              type="button"
              onClick={() => {
                props.onChange({ id: option.id, title: option.title });
                setIsOpen(!isOpen);
              }}
              key={option.id}
            >
              {option.title}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};
