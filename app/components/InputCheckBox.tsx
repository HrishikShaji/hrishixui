import { ChangeEvent, Dispatch, SetStateAction } from "react";

export type CheckBoxOption = {
  id: string;
  title: string;
};

interface InputCheckBoxProps {
  options: CheckBoxOption[];
  label: string;
  selectedItem: CheckBoxOption[];
  onChange: (value: CheckBoxOption[]) => void;
  multiple: boolean;
}

export const InputCheckBox: React.FC<InputCheckBoxProps> = (props) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    item: CheckBoxOption,
  ) => {
    if (e.target.checked) {
      if (props.multiple) {
        props.onChange([...props.selectedItem, item]);
      } else {
        props.onChange([item]);
      }
    } else {
      props.onChange(
        props.selectedItem.filter((option) => option.id !== item.id),
      );
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
              checked={props.selectedItem.some((item) => item.id === option.id)}
              value={option.title}
              onChange={(e) => handleChange(e, option)}
            />
            <h1>{option.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};
