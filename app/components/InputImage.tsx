import { ChangeEvent } from "react";
import { MdImage } from "react-icons/md";

interface InputImageProps {
  onChange: (values: FileList) => void;
  id: string;
  multiple: boolean;
}

export const InputImage: React.FC<InputImageProps> = (props) => {
  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      props.onChange(e.target.files);
    }
  };
  return (
    <div className="flex gap-2 items-end">
      <input
        multiple={props.multiple}
        onChange={(e) => handleSelect(e)}
        type="file"
        id={`custom-input-${props.id}`}
        hidden
      />
      <label
        htmlFor={`custom-input-${props.id}`}
        className=" cursor-pointer p-1 rounded-md bg-gray-500"
      >
        <MdImage size={24} />
      </label>
    </div>
  );
};
