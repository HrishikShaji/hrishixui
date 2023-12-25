export type Color = {
  hue: number;
  saturation: number;
  light: number;
};

export const InputColor = () => {
  const grids = () => {
    const cols = 100;
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
    return (
      <div className="flex ">
        {grids.map((grid, i) => (
          <div key={i} className="flex flex-col">
            {grid.map((item, k) => {
              console.log(item);
              return (
                <div
                  style={{
                    backgroundColor: `hsl(${item.hue},${item.saturation}%,${item.light}%)`,
                  }}
                  key={k}
                  className="w-[1px] h-[1px] bg-white text-center"
                ></div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return <div>{grids()}</div>;
};
