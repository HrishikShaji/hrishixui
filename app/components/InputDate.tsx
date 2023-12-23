"use client";
import { useState } from "react";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
} from "date-fns";

export const InputDate = () => {
  const currentDate = new Date();
  console.log(currentDate);
  const [year, setYear] = useState(2020);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });
  const startingDayOfMonth = getDay(firstDayOfMonth);
  const totalDays = startingDayOfMonth + daysInMonth.length;
  const endingDayOfMonth = totalDays % 7 === 0 ? 0 : 7 - (totalDays % 7);
  console.log(endingDayOfMonth);

  return (
    <div>
      <input type="date" className="p-1 rounded-md text-black" />
      <div className="flex gap-2">
        <button onClick={() => setYear((prev) => prev - 1)}>prev</button>
        <h1>{year}</h1>
        <button onClick={() => setYear((prev) => prev + 1)}>next</button>
      </div>
      <div className="grid grid-cols-7 ">
        {weekDays.map((weekDay) => (
          <div
            key={weekDay}
            className="w-10 border-[1px] border-black text-center"
          >
            {weekDay}
          </div>
        ))}
        {Array.from({ length: startingDayOfMonth }).map((_, i) => (
          <div
            key={`fake-${i}`}
            className="w-10 border-[1px] border-black text-center"
          />
        ))}
        {daysInMonth.map((day, i) => (
          <div key={i} className="w-10 border-[1px] border-black text-center">
            {format(day, "d")}
          </div>
        ))}
        {Array.from({ length: endingDayOfMonth }).map((_, i) => (
          <div
            key={`fakee-${i}`}
            className="w-10 border-[1px] border-black text-center"
          />
        ))}
      </div>
    </div>
  );
};
