"use client";

import { Dispatch, SetStateAction, useState } from "react";

export type Color = {
  hue: number;
  sat: number;
  lum: number;
};

export const ColorPicker = () => {
  const [hue, setHue] = useState(0);
  const [sat, setSat] = useState(0);
  const [lum, setLum] = useState(0);
  const [selectedColor, setSelectedColor] = useState("hsl(0,0%,0%)");

  return (
    <div className="p-5 bg-neutral-700 flex flex-col gap-3 rounded-md">
      <div className="w-full h-5" style={{ backgroundColor: selectedColor }} />
      <GenerateGrids
        selectedColor={selectedColor}
        cols={15}
        setSelectedColor={setSelectedColor}
        hue={hue}
        sat={sat}
        lum={lum}
      />
      <Slider
        hue={hue}
        sat={sat}
        lum={lum}
        setHue={setHue}
        setLum={setLum}
        setSat={setSat}
      />
    </div>
  );
};

interface GenerateGridsProps {
  hue: number;
  sat: number;
  lum: number;
  setSelectedColor: Dispatch<SetStateAction<string>>;
  cols: number;
  selectedColor: string;
}

const GenerateGrids: React.FC<GenerateGridsProps> = ({
  hue,
  sat,
  lum,
  cols,
  selectedColor,
  setSelectedColor,
}) => {
  let grids: Color[][] = [];
  for (let i = 0; i < cols; i++) {
    grids[i] = [];
    for (let j = 0; j < cols; j++) {
      grids[i][j] = {
        hue: hue,
        sat: sat + j * ((100 - sat) / cols),
        lum: lum + i * ((100 - lum) / cols),
      };
    }
  }
  return (
    <div className="flex gap-1">
      {grids.map((grid, i) => (
        <div key={i} className="flex flex-col gap-1">
          {grid.map((item, j) => {
            const currentColor = `hsl(${item.hue},${item.sat}%,${item.lum}%)`;
            const isSelected = selectedColor === currentColor ? true : false;
            return (
              <div
                onClick={() => setSelectedColor(currentColor)}
                className="w-4 h-4 border-2"
                key={j}
                style={{
                  borderColor: isSelected ? "black" : currentColor,
                  backgroundColor: currentColor,
                }}
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

interface SliderProps {
  setHue: Dispatch<SetStateAction<number>>;
  setSat: Dispatch<SetStateAction<number>>;
  setLum: Dispatch<SetStateAction<number>>;
  hue: number;
  sat: number;
  lum: number;
}

const Slider: React.FC<SliderProps> = ({
  setHue,
  setSat,
  setLum,
  hue,
  sat,
  lum,
}) => {
  return (
    <div className="flex flex-col gap-2 text-black">
      <div className="flex flex-col gap-1">
        <h1>Hue</h1>
        <input
          value={hue}
          type="range"
          min="0"
          max="360"
          onChange={(e) => setHue(parseInt(e.target.value))}
        />
      </div>
      <div className="flex flex-col gap-1">
        <h1>Saturation</h1>
        <input
          value={sat}
          type="range"
          min="0"
          max="100"
          onChange={(e) => setSat(parseInt(e.target.value))}
        />
      </div>
      <div className="flex flex-col gap-1">
        <h1>Lumination</h1>
        <input
          value={lum}
          type="range"
          min="0"
          max="100"
          onChange={(e) => setLum(parseInt(e.target.value))}
        />
      </div>
    </div>
  );
};
