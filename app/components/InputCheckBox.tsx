import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export type CheckBoxOption = {
  id: string;
  title: string;
  checked: boolean;
};

interface InputCheckBoxProps {
  options: CheckBoxOption[];
  onChange: (value: (prev: CheckBoxOption[]) => CheckBoxOption[]) => void;
  label: string;
  selectedItem: string[];
  setSelectedItem: Dispatch<SetStateAction<string[]>>;
}

export const InputCheckBox: React.FC<InputCheckBoxProps> = (props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.checked) {
      props.setSelectedItem([...props.selectedItem, id]);
    } else {
      props.setSelectedItem((prev) => prev.filter((item) => item !== id));
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <h1>{props.label}</h1>
      <div className="flex flex-col gap-1">
        {props.options.map((option) => (
          <div key={option.id} className="flex gap-2">
            <input
              key={option.id}
              type="checkbox"
              checked={props.selectedItem.includes(option.id)}
              value={option.title}
              onChange={(e) => handleChange(e, option.id)}
            />
            <h1>{option.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};
