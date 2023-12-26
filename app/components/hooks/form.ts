import { useMemo } from "react";
import { Color } from "../InputColor";

export const useGridsLogic = ({
  cols,
  saturation,
  light,
}: {
  cols: number;
  saturation: number;
  light: number;
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

  return grids;
};
