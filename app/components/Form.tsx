"use client";

import { FormEvent, useState } from "react";
import { InputText } from "./InputText";
import { InputNumber } from "./InputNumber";

export const Form = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState(0);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = { name: name, number: number };

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
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-500 rounded-md p-5 flex flex-col gap-5"
    >
      <InputText
        onChange={setName}
        value={name}
        placeholder="Name..."
        label="Name"
      />
      <InputNumber
        onChange={setNumber}
        value={number}
        placeholder="Number..."
        label="Number"
      />
      <button type="submit" className="p-1 rounded-md bg-white text-black">
        Submit
      </button>
    </form>
  );
};
