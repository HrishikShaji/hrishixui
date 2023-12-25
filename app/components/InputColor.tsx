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
  onClick,
}: {
  cols: number;
  hue: string;
  onClick: (color: Color) => void;
}) => {
  const grids: Color[][] = useMemo(() => {
    let newGrids: Color[][] = [];
    for (let r = 0; r < cols; r++) {
      newGrids[r] = [];
      for (let c = 0; c < cols; c++) {
        newGrids[r][c] = {
          hue: c * (360 / cols),
          saturation: c * (100 / cols),
          light: r * (100 / cols),
        };
      }
    }
    return newGrids;
  }, [cols]);
  return (
    <div className="flex ">
      {grids.map((grid, i) => (
        <div key={i} className="flex flex-col">
          {grid.map((item, k) => {
            console.log(item);
            return (
              <div
                onClick={() =>
                  onClick({
                    hue: parseInt(hue),
                    saturation: item.saturation,
                    light: item.light,
                  })
                }
                style={{
                  backgroundColor: `hsl(${parseInt(hue)},${item.saturation}%,${
                    item.light
                  }%) `,
                }}
                key={k}
                className="w-5 h-5 cursor-pointer"
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const initialColor: Color = {
  hue: 10,
  saturation: 70,
  light: 30,
};

export const InputColor = () => {
  const [hue, setHue] = useState("10");
  const [currentColor, setCurrentColor] = useState<Color>(initialColor);

  return (
    <div>
      <div
        className="h-10 w-10 rounded-md"
        style={{
          backgroundColor: `hsl(${currentColor.hue},${currentColor.saturation}%,${currentColor.light}%) `,
        }}
      ></div>
      <GenerateGrids
        cols={10}
        hue={hue}
        onClick={(color: Color) => setCurrentColor(color)}
      />
      <div className="">
        <input
          className="w-full"
          type="range"
          min="0"
          max="360"
          onChange={(e) => setHue(e.target.value)}
        />
      </div>
    </div>
  );
};
