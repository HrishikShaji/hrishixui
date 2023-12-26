"use client";

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

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
export const InputColor = () => {
  const [hue, setHue] = useState(10);
  const [saturation, setSaturation] = useState(70);
  const [light, setLight] = useState(30);
  const [currentColor, setCurrentColor] = useState<Color>(initialColor);

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
          hue={hue}
          saturation={saturation}
          light={light}
          onClick={(color: Color) => setCurrentColor(color)}
        />
        <div className="">
          <SliderInput
            value={hue}
            min="0"
            max="360"
            setterFunction={setHue}
            title="Hue"
          />
          <SliderInput
            value={saturation}
            min="0"
            max="100"
            setterFunction={setSaturation}
            title="Saturation"
          />
          <SliderInput
            value={light}
            min="0"
            max="100"
            setterFunction={setLight}
            title="Light"
          />
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
  setterFunction: Dispatch<SetStateAction<number>>;
  min: string;
  max: string;
  value: number;
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
          onChange={(e) => props.setterFunction(parseInt(e.target.value))}
        />
        <input
          min={props.min}
          max={props.max}
          type="number"
          value={props.value}
          onChange={(e) => props.setterFunction(parseInt(e.target.value))}
          className="w-16 focus:outline-none bg-gray-500 p-1 rounded-md"
        />
      </div>
    </div>
  );
};
