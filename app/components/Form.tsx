"use client";

import { FormEvent, useState } from "react";
import { InputText } from "./InputText";
import { InputNumber } from "./InputNumber";
import { InputTextArea } from "./InputTextArea";
import { InputSelect, Option } from "./InputSelect";
import { CheckBoxOption, InputCheckBox } from "./InputCheckBox";
import { InputMultipleRange, MultipleRangeItem } from "./InputMultipleRange";
import { InputImage } from "./InputImage";

const checkBoxOptions: CheckBoxOption[] = [
  { title: "Single", id: "1" },
  { title: "Married", id: "2" },
  { title: "Not disclosing", id: "3" },
];
export const Form = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState(0);
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState<Option>({ id: "", title: "" });
  const [status, setStatus] = useState<CheckBoxOption[]>([]);
  const [price, setPrice] = useState<MultipleRangeItem>({ min: 0, max: 10000 });
  const [images, setImages] = useState<File[]>([]);
  const [wimages, setWImages] = useState<File[]>([]);

  const options: Option[] = [
    { title: "Male", id: "1" },
    { title: "Female", id: "2" },
    { title: "Other", id: "3" },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      name: name,
      number: number,
      description: description,
      gender: gender,
      status: status,
      price: price,
      images: images,
      wimages: wimages,
    };

    try {
      await fetch("api/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Error", error);
    } finally {
      setName("");
      setNumber(0);
      setDescription("");
      setGender({ id: "", title: "" });
      setStatus([]);
      setPrice({ min: 0, max: 10000 });
      setImages([]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-500 rounded-md p-5 grid grid-cols-5 gap-5"
    >
      <InputText
        onChange={(value: string) => setName(value)}
        value={name}
        placeholder="Name..."
        label="Name"
      />
      <InputNumber
        onChange={(value: number) => setNumber(value)}
        value={number}
        placeholder="Number..."
        label="Number"
      />
      <InputTextArea
        onChange={(value: string) => setDescription(value)}
        value={description}
        placeholder="Description..."
        label="Description"
      />
      <InputSelect
        onChange={(item: Option) => setGender(item)}
        item={gender}
        options={options}
      />
      <InputCheckBox
        options={checkBoxOptions}
        label="Status"
        selectedItem={status}
        setSelectedItem={setStatus}
        multiple={true}
      />
      <InputMultipleRange
        minValues={price.min}
        maxValues={price.max}
        onChange={(value: MultipleRangeItem) => setPrice(value)}
      />
      <InputImage
        multiple={true}
        onChange={(images: File[]) => setImages(images)}
        id="1"
        showImages={true}
        values={images}
      />
      <InputImage
        multiple={true}
        onChange={(images: File[]) => setWImages(images)}
        id="2"
        showImages={false}
        values={wimages}
      />
      <button type="submit" className="p-1 rounded-md bg-white text-black">
        Submit
      </button>
    </form>
  );
};
