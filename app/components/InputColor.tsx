"use client";

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

export type Color = {
  hue: number;
  saturation: number;
  light: number;
};

export type RgbColor = {
  r: number;
  g: number;
  b: number;
};
const initialColor: Color = {
  hue: 180,
  saturation: 50,
  light: 50,
};

const initialRgbColor: RgbColor = {
  r: 20,
  g: 40,
  b: 60,
};

const hslValues = [
  {
    min: "0",
    max: "360",
    title: "Hue",
    name: "hue",
  },
  {
    min: "0",
    max: "100",
    title: "Saturation",
    name: "saturation",
  },
  {
    min: "0",
    max: "100",
    title: "Lumination",
    name: "light",
  },
];
const rgbValues = [
  {
    min: "0",
    max: "255",
    title: "R",
    name: "r",
  },
  {
    min: "0",
    max: "255",
    title: "G",
    name: "g",
  },
  {
    min: "0",
    max: "255",
    title: "B",
    name: "b",
  },
];
const modes = ["HSL", "RGB", "HexCode"];

export const InputColor = () => {
  const [currentColor, setCurrentColor] = useState<Color>(initialColor);
  const [mode, setMode] = useState(0);
  const [hsl, setHsl] = useState<Color>(initialColor);
  const [rgb, setRgb] = useState<RgbColor>(initialRgbColor);
  const values = [
    { inputs: hslValues, value: hsl, setterFunction: setHsl },
    { inputs: rgbValues, value: rgb, setterFunction: setRgb },
  ];

  return (
    <div>
      <input type="color" />
      <div
        className="h-10 flex rounded-md"
        style={{
          backgroundColor: `hsl(${currentColor.hue},${currentColor.saturation}%,${currentColor.light}%) `,
        }}
      >
        {currentColor.hue}
      </div>
      <div className="flex flex-col p-1 bg-white rounded-md">
        <GenerateGrids
          currentColor={currentColor}
          cols={15}
          hue={hsl.hue}
          saturation={hsl.saturation}
          light={hsl.light}
          onClick={(color: Color) => setCurrentColor(color)}
        />
        <div className="w-full justify-between flex">
          <button
            onClick={() => setMode((prev) => (prev === 0 ? 2 : prev - 1))}
          >
            prev
          </button>
          <h1>{modes[mode]}</h1>
          <button
            onClick={() => setMode((prev) => (prev === 2 ? 0 : prev + 1))}
          >
            next
          </button>
        </div>
        <div className="">
          {values[mode].inputs.map((item) => (
            <SliderInput
              key={item.title}
              {...item}
              value={values[mode].value}
              setterFunction={values[mode].setterFunction as any}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
const GenerateGrids = ({
  cols,
  hue,
  saturation,
  light,
  onClick,
  currentColor,
}: {
  cols: number;
  hue: number;
  saturation: number;
  light: number;
  onClick: (color: Color) => void;
  currentColor: Color;
}) => {
  const grids: Color[][] = useMemo(() => {
    let newGrids: Color[][] = [];
    for (let r = 0; r < cols; r++) {
      newGrids[r] = [];
      for (let c = 0; c < cols; c++) {
        newGrids[r][c] = {
          hue: c * (360 / cols),
          saturation: saturation + c * ((100 - saturation) / cols),
          light: light + r * ((100 - light) / cols),
        };
      }
    }
    return newGrids;
  }, [cols, saturation, light]);

  return (
    <div className="flex ">
      {grids.map((grid, i) => (
        <div key={i} className="flex flex-col">
          {grid.map((item, k) => {
            return (
              <div
                onClick={() =>
                  onClick({
                    hue: hue,
                    saturation: item.saturation,
                    light: item.light,
                  })
                }
                style={{
                  borderColor: `${
                    hue === currentColor.hue &&
                    item.saturation === currentColor.saturation &&
                    item.light === currentColor.light
                      ? "black"
                      : ""
                  }`,
                  backgroundColor: `hsl(${hue},${item.saturation}%,${item.light}%) `,
                }}
                key={k}
                className="w-5 h-5 cursor-pointer border-2"
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

interface SliderInputProps {
  title: string;
  setterFunction: Dispatch<SetStateAction<Record<string, any>>>;
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
      </div>
    </div>
  );
};
