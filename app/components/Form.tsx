"use client";

import { FormEvent, useState } from "react";
import { InputText } from "./InputText";
import { InputNumber } from "./InputNumber";
import { InputTextArea } from "./InputTextArea";
import { InputSelect, Option } from "./InputSelect";
import { CheckBoxOption, InputCheckBox } from "./InputCheckBox";

const checkBoxOptions: CheckBoxOption[] = [
  { title: "Single", id: "1", checked: false },
  { title: "Married", id: "2", checked: false },
  { title: "Not disclosing", id: "3", checked: false },
];
export const Form = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState(0);
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState<Option>({ id: "", title: "" });
  const [status, setStatus] = useState<CheckBoxOption[]>(checkBoxOptions);
  const [selectedItem, setSelectedItem] = useState<string[]>([]);
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
      setStatus(checkBoxOptions);
      setSelectedItem([]);
    }
  };
  console.log(selectedItem);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-500 rounded-md p-5 flex flex-col gap-5"
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
        options={status}
        onChange={(item) => setStatus(item)}
        label="Status"
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <button type="submit" className="p-1 rounded-md bg-white text-black">
        Submit
      </button>
    </form>
  );
};
