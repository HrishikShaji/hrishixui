"use client";

interface InputNumberProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
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
        onChange={(e) => props.onChange(parseInt(e.target.value))}
        placeholder={props.placeholder}
      />
    </div>
  );
};
