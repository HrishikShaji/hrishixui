"use client";

import { FormEvent, useState } from "react";
import { InputText } from "./InputText";

export const Form = () => {
  const [name, setName] = useState("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(name);
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
      <button type="submit" className="p-2 rounded-md bg-white text-black">
        Submit
      </button>
    </form>
  );
};
