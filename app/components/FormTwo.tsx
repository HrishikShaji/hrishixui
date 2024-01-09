"use client";

import { FormEvent, useState } from "react";
import { format } from "date-fns";
import { InputColor } from "./InputColor";
import { InputPhone, PhoneItem } from "./InputPhone";
import { MetaScrapper } from "./MetaScrapper";

const initialItem: PhoneItem = {
  name: "India",
  phone: "+91",
  image:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IN.svg",
  phoneLength: 10,
};
export const FormTwo = () => {
  const initialColor = "hsl(0,0%,0%)";
  const [dob, setDob] = useState<Date>(new Date());
  const [reset, setReset] = useState(false);
  const [color, setColor] = useState(initialColor);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState<PhoneItem>(initialItem);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      color: color,
      number: phoneNumber,
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
      setColor(initialColor);
      setPhoneNumber("");
      setCountry(initialItem);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-500 rounded-md p-5 grid grid-cols-5  gap-5"
    >
      <MetaScrapper />
      <InputPhone
        phoneNumber={phoneNumber}
        setPhoneNumber={(value: string) => setPhoneNumber(value)}
        country={country}
        setCountry={(value: PhoneItem) => setCountry(value)}
      />

      <InputColor value={color} onChange={(color) => setColor(color)} />
      <button type="submit" className="p-1 rounded-md bg-white text-black">
        Submit
      </button>
      {dob ? format(dob, "dd/MM/yyyy") : null}
    </form>
  );
};
