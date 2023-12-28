"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useGridsLogic } from "./hooks/form";
import { Counter } from "./Counter";

export type Color = {
  hue: number;
  saturation: number;
  light: number;
};

const initialColor: Color = {
  hue: 180,
  saturation: 50,
  light: 50,
};

export const ColorPicker = () => {
  const [currentColor, setCurrentColor] = useState<Color>(initialColor);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <input type="color" />
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="h-10 flex rounded-md"
        style={{
          backgroundColor: `hsl(${currentColor.hue},${currentColor.saturation}%,${currentColor.light}%) `,
        }}
      >
        {currentColor.hue}
      </div>
      {isOpen ? (
        <div className="flex absolute mt-2 flex-col p-1 bg-white rounded-md">
          <GenerateGrids
            currentColor={currentColor}
            cols={15}
            hue={currentColor.hue}
            saturation={currentColor.saturation}
            light={currentColor.light}
            onClick={(color: Color) => setCurrentColor(color)}
          />
          <div className="">
            <SliderInput
              title="hue"
              name="hue"
              min="0"
              max="360"
              value={currentColor}
              setterFunction={setCurrentColor}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
const GenerateGrids = (props: {
  cols: number;
  hue: number;
  saturation: number;
  light: number;
  onClick: (color: Color) => void;
  currentColor: Color;
}) => {
  const grids = useGridsLogic({
    cols: props.cols,
    saturation: props.saturation,
    light: props.light,
  });

  return (
    <div className="flex ">
      {grids.map((grid, i) => (
        <div key={i} className="flex flex-col">
          {grid.map((item, k) => (
            <Grid
              saturation={props.saturation}
              light={props.light}
              hue={props.hue}
              key={k}
              currentColor={props.currentColor}
              item={item}
              onClick={props.onClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

interface SliderInputProps {
  title: string;
  setterFunction: Dispatch<SetStateAction<Color>>;
  min: string;
  max: string;
  value: Record<string, any>;
  name: string;
}

const SliderInput: React.FC<SliderInputProps> = (props) => {
  return (
    <div className="flex flex-col  ">
      <h1>{props.title}</h1>
      <div className="flex gap-2">
        <input
          className="w-full"
          type="range"
          min={props.min}
          max={props.max}
          onChange={(e) =>
            props.setterFunction((prev) => ({
              ...prev,
              [props.name]: parseInt(e.target.value),
            }))
          }
          value={props.value[props.name]}
        />
        <input
          min={props.min}
          max={props.max}
          type="number"
          value={props.value[props.name]}
          onChange={(e) =>
            props.setterFunction((prev) => ({
              ...prev,
              [props.name]: parseInt(e.target.value),
            }))
          }
          className="w-16 focus:outline-none bg-gray-500 p-1 rounded-md"
        />
        <Counter
          min={parseInt(props.min)}
          max={parseInt(props.max)}
          value={props.value[props.name]}
          onChange={(value) =>
            props.setterFunction((prev) => ({
              ...prev,
              [props.name]: value,
            }))
          }
        />
      </div>
    </div>
  );
};

interface GridProps {
  currentColor: Color;
  item: Color;
  onClick: (color: Color) => void;
  hue: number;
  saturation: number;
  light: number;
}

const Grid: React.FC<GridProps> = (props) => {
  const isCurrentColor =
    props.hue === props.currentColor.hue &&
    props.item.saturation === props.currentColor.saturation &&
    props.item.light === props.currentColor.light;
  return (
    <div
      onClick={() =>
        props.onClick({
          hue: props.hue,
          saturation: props.item.saturation,
          light: props.item.light,
        })
      }
      style={{
        borderColor: `${isCurrentColor ? "black" : ""}`,
        backgroundColor: `hsl(${props.hue},${props.item.saturation}%,${props.item.light}%) `,
      }}
      className="w-5 h-5 cursor-pointer border-2"
    />
  );
};
