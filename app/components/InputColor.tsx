export const InputColor = () => {
  const grids = () => {
    const grids: string[][] = [];
    for (let r = 0; r < 10; r++) {
      grids[r] = [];
      for (let c = 0; c < 10; c++) {
        grids[r][c] = "1";
      }
    }
    return (
      <div className="flex gap-1">
        {grids.map((grid, i) => (
          <div key={i} className="flex flex-col gap-1">
            {grid.map((item, k) => (
              <div key={k} className="w-5 h-5 bg-white text-center">
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return <div>{grids()}</div>;
};
