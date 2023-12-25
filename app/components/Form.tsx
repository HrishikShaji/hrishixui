"use client";

import { FormEvent, useState } from "react";
import { InputText } from "./InputText";
import { InputNumber } from "./InputNumber";
import { InputTextArea } from "./InputTextArea";
import { InputSelect, Option } from "./InputSelect";
import { CheckBoxOption, InputCheckBox } from "./InputCheckBox";
import { InputMultipleRange, MultipleRangeItem } from "./InputMultipleRange";
import { InputImage } from "./InputImage";
import { InputDate } from "./InputDate";

const checkBoxOptions: CheckBoxOption[] = [
  { title: "Single", id: "1" },
  { title: "Married", id: "2" },
  { title: "Not disclosing", id: "3" },
];

const options: Option[] = [
  { title: "Male", id: "1" },
  { title: "Female", id: "2" },
  { title: "Other", id: "3" },
];

const initialValues = {
  name: "",
  number: 0,
  description: "",
  gender: { id: "", title: "" },
  status: [],
  price: { min: 0, max: 10000 },
  images: [],
  dob: new Date(),
};

export const Form = () => {
  const [values, setValues] = useState(initialValues);
  const [imageReset, setImageReset] = useState(false);
  const [dateReset, setDateReset] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      name: values.name,
      number: values.number,
      description: values.description,
      gender: values.gender,
      status: values.status,
      price: values.price,
      images: values.images,
      dob: values.dob,
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
      setValues(initialValues);
      setImageReset(true);
      setDateReset(true);
    }
  };

  const handleSetter = ({ id, value }: { id: string; value: any }) => {
    setValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-500 rounded-md p-5 grid grid-cols-5 gap-5"
    >
      <InputText
        onChange={(value: string) => handleSetter({ id: "name", value: value })}
        value={values.name}
        placeholder="Name..."
        label="Name"
      />
      <InputNumber
        onChange={(value: number) =>
          handleSetter({ id: "number", value: value })
        }
        value={values.number}
        placeholder="Number..."
        label="Number"
      />
      <InputTextArea
        onChange={(value: string) =>
          handleSetter({ id: "description", value: value })
        }
        value={values.description}
        placeholder="Description..."
        label="Description"
      />
      <InputSelect
        onChange={(item: Option) => handleSetter({ id: "gender", value: item })}
        item={values.gender}
        options={options}
      />
      <InputCheckBox
        options={checkBoxOptions}
        label="Status"
        selectedItem={values.status}
        onChange={(value: CheckBoxOption[]) =>
          handleSetter({ id: "status", value: value })
        }
        multiple={true}
      />
      <InputMultipleRange
        values={{ min: values.price.min, max: values.price.max }}
        onChange={(value: MultipleRangeItem) =>
          handleSetter({ id: "price", value: value })
        }
        range={{ min: 0, max: 10000 }}
      />
      <InputImage
        multiple={true}
        onChange={(images: File[]) =>
          handleSetter({ id: "images", value: images })
        }
        id="1"
        showImages={true}
        values={values.images}
        reset={imageReset}
      />
      <InputDate
        onChange={(value: Date) => handleSetter({ id: "dob", value: value })}
        date={values.dob}
        reset={dateReset}
      />
      <input type="color" />
      <button type="submit" className="p-1 rounded-md bg-white text-black">
        Submit
      </button>
    </form>
  );
};
