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
  const [month, setMonth] = useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());
  const [day, setDay] = useState(currentDate.getDate());
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const newDate = new Date(year, month, day);
  const firstDayOfMonth = startOfMonth(newDate);
  const lastDayOfMonth = endOfMonth(newDate);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });
  const startingDayOfMonth = getDay(firstDayOfMonth);
  const totalDays = startingDayOfMonth + daysInMonth.length;
  const endingDayOfMonth = totalDays % 7 === 0 ? 0 : 7 - (totalDays % 7);
  console.log(day);

  return (
    <div>
      <input type="date" className="p-1 rounded-md text-black" />
      <div className="flex gap-2 justify-between">
        <button onClick={() => setYear((prev) => prev - 1)}>prev</button>
        <h1>{year}</h1>
        <button onClick={() => setYear((prev) => prev + 1)}>next</button>
      </div>
      <div className="flex gap-2 justify-between">
        <button
          disabled={month === 0}
          onClick={() => setMonth((prev) => prev - 1)}
        >
          prev
        </button>
        <h1>{months[month]}</h1>
        <button
          disabled={month === months.length - 1}
          onClick={() => setMonth((prev) => prev + 1)}
        >
          next
        </button>
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
            className={`${
              day === i ? "bg-blue-500" : ""
            } w-10 border-[1px] border-black text-center`}
          />
        ))}
        {daysInMonth.map((item, i) => (
          <div
            key={i}
            className={`${
              day === i + 1 ? "bg-blue-500" : ""
            } w-10 border-[1px] border-black text-center`}
            onClick={() => setDay(i + 1)}
          >
            {format(item, "d")}
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
