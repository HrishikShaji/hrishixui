"use client";

import { FormEvent, useState } from "react";
import { InputDate } from "./InputDate";
import { format } from "date-fns";

export const FormTwo = () => {
  const [dob, setDob] = useState<Date>(new Date());
  const [reset, setReset] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      dob: dob.toISOString(),
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
      setDob(new Date());
      setReset(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-500 rounded-md p-5 grid grid-cols-5  gap-5"
    >
      <InputDate
        reset={reset}
        onChange={(value: Date) => setDob(value)}
        date={dob}
      />
      <button type="submit" className="p-1 rounded-md bg-white text-black">
        Submit
      </button>
      {dob ? format(dob, "dd/MM/yyyy") : null}
    </form>
  );
};
