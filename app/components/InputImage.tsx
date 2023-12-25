import Image from "next/image";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { MdImage } from "react-icons/md";
import { GoXCircleFill } from "react-icons/go";

interface InputImageProps {
  onChange: (values: File[]) => void;
  id: string;
  multiple: boolean;
  showImages: boolean;
  values: File[];
  reset: boolean;
}

export const InputImage: React.FC<InputImageProps> = (props) => {
  const [images, setImages] = useState<File[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const imageMenuRef = useRef<HTMLDivElement | null>(null);
  const imageButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (props.reset) {
      setImages([]);
    }
  }, [props.reset]);

  useEffect(() => {
    const handleClickOutside: EventListener = (e) => {
      if (
        imageMenuRef.current &&
        imageButtonRef.current &&
        !imageButtonRef.current.contains(e.target as Node) &&
        !imageMenuRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (images.length === 0 && isOpen) {
      setIsOpen(false);
    }
  }, [images, isOpen]);

  const removeImage = (file: File) => {
    const newImages = images.filter((image) => image !== file);
    setImages(newImages);
    props.onChange(newImages);
  };

  const previewImage = (image: File) => {
    return URL.createObjectURL(image);
  };

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const images = Array.from(e.target.files || []);
      setImages(images);
      props.onChange(images);
    }
  };

  return (
    <div className="flex gap-2 z-1 relative">
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
          className=" cursor-pointer p-1 rounded-md bg-gray-700"
        >
          <MdImage size={24} />
        </label>
      </div>
      {props.showImages ? (
        <>
          <button
            ref={imageButtonRef}
            type="button"
            className="p-1 rounded-md bg-blue-500 text-sm text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {images?.length ? `Images(${images.length})` : "No Images"}
          </button>
          {isOpen ? (
            <div
              ref={imageMenuRef}
              className=" p-2 bg-neutral-400 mt-10 z-[2] rounded-md absolute flex gap-2"
            >
              {images.map((image, i) => (
                <div key={i} className="h-20 w-20 relative">
                  <div
                    className="p-1 cursor-pointer rounded-full bg-white top-1 right-1 absolute"
                    onClick={() => removeImage(image)}
                  >
                    <GoXCircleFill />
                  </div>
                  <Image
                    key={i}
                    src={previewImage(image)}
                    height={1000}
                    width={1000}
                    alt="image"
                    className="object-cover h-full w-full rounded-md"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
};
