"use client";

import { useEffect, useState } from "react";

export type Color = {
  hue: number;
  saturation: number;
  light: number;
};

const getGrids = () => {
  const cols = 10;
  let grids: Color[][] = [];
  for (let r = 0; r < cols; r++) {
    grids[r] = [];
    for (let c = 0; c < cols; c++) {
      grids[r][c] = {
        hue: c * (100 / cols),
        saturation: c * (100 / cols),
        light: c * (100 / cols),
      };
    }
  }
  return grids;
};

export const InputColor = () => {
  const [grids, setGrids] = useState<Color[][]>([]);
  const [range, setRange] = useState("");
  useEffect(() => {
    setGrids(getGrids());
  }, [range]);
  return (
    <div>
      <div className="">
        <div className="flex ">
          {grids.map((grid, i) => (
            <div key={i} className="flex flex-col">
              {grid.map((item, k) => {
                console.log(item);
                return (
                  <div
                    style={{
                      backgroundColor: `hsl(${parseInt(range)},${
                        item.saturation
                      }%,${item.light}%) `,
                    }}
                    key={k}
                    className="w-10 h-10 bg-white text-center"
                  ></div>
                );
              })}
            </div>
          ))}
        </div>
        <input
          className="w-full"
          type="range"
          min="0"
          max="360"
          onChange={(e) => setRange(e.target.value)}
        />
      </div>
    </div>
  );
};
