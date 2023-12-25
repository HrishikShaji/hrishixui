import { useEffect, useRef, useState } from "react";

export type MultipleRangeItem = {
  min: number;
  max: number;
};

interface InputMultipleRangeProps {
  values: MultipleRangeItem;
  range: MultipleRangeItem;
  onChange: (item: MultipleRangeItem) => void;
}

export const InputMultipleRange: React.FC<InputMultipleRangeProps> = ({
  onChange,
  range,
  values,
}) => {
  const [minValue, setMinValue] = useState(values.min);
  const [maxValue, setMaxValue] = useState(values.max);
  const [left, setLeft] = useState("0%");
  const [right, setRight] = useState("0%");
  const minInputRef = useRef<HTMLInputElement | null>(null);
  const maxInputRef = useRef<HTMLInputElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (values.min === range.min && values.max === range.max) {
      setMinValue(range.min);
      setMaxValue(range.max);
    }
    const left = minInputRef.current
      ? (values.min / parseInt(minInputRef.current.max)) * 100 + "%"
      : "0%";

    const right = maxInputRef.current
      ? 100 - (values.max / parseInt(maxInputRef.current.max)) * 100 + "%"
      : "0%";

    setLeft(left);
    setRight(right);
  }, [values.max, values.min]);

  useEffect(() => {
    onChange({ min: minValue, max: maxValue });
  }, [minValue, maxValue]);

  useEffect(() => {
    if (minInputRef.current && maxInputRef.current && progressRef.current) {
      const rangeInput = [minInputRef.current, maxInputRef.current];
      const progress = progressRef.current;
      let priceGap = 1000;
      rangeInput.forEach((input) => {
        input.addEventListener("input", (e) => {
          let minVal = parseInt(rangeInput[0].value);
          let maxVal = parseInt(rangeInput[1].value);
          if (maxVal - minVal < priceGap) {
            if (e.target instanceof HTMLInputElement) {
              if (e.target.className === "range-min") {
                rangeInput[0].value = String(maxVal - priceGap);
              } else {
                rangeInput[1].value = String(minVal + priceGap);
              }
            }
          } else {
            progress.style.left =
              (minVal / parseInt(rangeInput[0].max)) * 100 + "%";
            progress.style.right =
              100 - (maxVal / parseInt(rangeInput[1].max)) * 100 + "%";
          }
        });
      });
    }
  }, [maxValue, minValue, values.min, values.max]);
  return (
    <div>
      <div
        style={{
          height: "5px",
          borderRadius: "5px",
          background: "#ddd",
          position: "relative",
        }}
      >
        <div
          ref={progressRef}
          style={{
            height: "5px",
            left: left,
            right: right,
            position: "absolute",
            borderRadius: "5px",
            background: "#17A2BB",
          }}
        ></div>
      </div>
      <div style={{ position: "relative" }}>
        <input
          style={{
            position: "absolute",
            top: "-5px",
            height: "5px",
            width: "100%",
            background: "none",
            pointerEvents: "none",
            WebkitAppearance: "none",
          }}
          ref={minInputRef}
          type="range"
          className="range-min"
          min={range.min.toString()}
          max={range.max.toString()}
          value={minValue}
          onChange={(e) => setMinValue(Number(e.target.value))}
        />
        <input
          style={{
            position: "absolute",
            top: "-5px",
            height: "5px",
            width: "100%",
            background: "none",
            pointerEvents: "none",
            WebkitAppearance: "none",
          }}
          ref={maxInputRef}
          type="range"
          className="range-max"
          min={range.min.toString()}
          max={range.max.toString()}
          value={maxValue}
          onChange={(e) => setMaxValue(Number(e.target.value))}
        />
      </div>
    </div>
  );
};
