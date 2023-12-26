"use client";

import { useEffect, useMemo, useState } from "react";

export type Color = {
  hue: number;
  saturation: number;
  light: number;
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
          saturation: saturation + c * ((100 - saturation) / cols), // Dynamic saturation
          light: light + r * ((100 - light) / cols), // Dynamic light
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
                  backgroundColor: `hsl(${hue},${item.saturation}%,${item.light}%) `,
                }}
                key={k}
                className="w-5 h-5 cursor-pointer border-2"
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
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
      <div
        className="h-10 flex rounded-md"
        style={{
          backgroundColor: `hsl(${currentColor.hue},${currentColor.saturation}%,${currentColor.light}%) `,
        }}
      >
        {`${currentColor.hue}
          ${currentColor.light.toString()}
          ${currentColor.saturation.toString()}`}
      </div>
      <GenerateGrids
        currentColor={currentColor}
        cols={10}
        hue={hue}
        saturation={saturation}
        light={light}
        onClick={(color: Color) => setCurrentColor(color)}
      />
      <div className="">
        <div className="flex gap-2">
          <input
            className="w-full"
            type="range"
            min="0"
            max="360"
            onChange={(e) => setHue(parseInt(e.target.value))}
          />
          <input
            min="0"
            max="360"
            type="number"
            value={hue}
            onChange={(e) => setHue(parseInt(e.target.value))}
          />
        </div>
        <div className="flex gap-2">
          <input
            className="w-full mt-2"
            type="range"
            min="0"
            max="100"
            value={saturation}
            onChange={(e) => setSaturation(parseInt(e.target.value))}
          />
          <input
            min="0"
            max="100"
            type="number"
            value={saturation}
            onChange={(e) => setSaturation(parseInt(e.target.value))}
          />
        </div>
        <div className="flex gap-2">
          <input
            className="w-full mt-2"
            type="range"
            min="0"
            max="100"
            value={light}
            onChange={(e) => setLight(parseInt(e.target.value))}
          />
          <input
            min="0"
            max="100"
            type="number"
            value={light}
            onChange={(e) => setLight(parseInt(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};
