"use client";

import { useEffect, useState } from "react";

export type Color = {
  hue: number;
  saturation: number;
  light: number;
};

const GenerateGrids = ({ cols, hue }: { cols: number; hue: string }) => {
  let grids: Color[][] = [];
  for (let r = 0; r < cols; r++) {
    grids[r] = [];
    for (let c = 0; c < cols; c++) {
      grids[r][c] = {
        hue: c * (360 / cols),
        saturation: c * (100 / cols),
        light: r * (100 / cols),
      };
    }
  }
  return (
    <div className="flex ">
      {grids.map((grid, i) => (
        <div key={i} className="flex flex-col">
          {grid.map((item, k) => {
            console.log(item);
            return (
              <div
                style={{
                  backgroundColor: `hsl(${parseInt(hue)},${item.saturation}%,${
                    item.light
                  }%) `,
                }}
                key={k}
                className="w-5 h-5 bg-white text-center"
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export const InputColor = () => {
  const [hue, setHue] = useState("10");

  return (
    <div>
      <GenerateGrids cols={10} hue={hue} />
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
