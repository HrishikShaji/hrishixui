"use client";

interface InputTextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const InputTextArea: React.FC<InputTextAreaProps> = (props) => {
  return (
    <div className="flex flex-col gap-1">
      <label>{props.label}</label>
      <textarea
        className="p-1 rounded-md text-black"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
      />
    </div>
  );
};
