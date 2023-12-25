"use client";
import { useEffect, useState } from "react";
import { FaCalendar } from "react-icons/fa";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
} from "date-fns";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

interface InputDateProps {
  onChange: (date: Date) => void;
  date: Date;
  reset: boolean;
}

export const InputDate: React.FC<InputDateProps> = (props) => {
  const [month, setMonth] = useState(props.date.getMonth());
  const [year, setYear] = useState(props.date.getFullYear());
  const [day, setDay] = useState(props.date.getDate());
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(props.date);
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

  useEffect(() => {
    const selectedDate = new Date(year, month, day);
    setDate(selectedDate);
    props.onChange(selectedDate);
  }, [day, month, year]);

  useEffect(() => {
    if (props.reset) {
      setMonth(props.date.getMonth());
      setYear(props.date.getFullYear());
      setDay(props.date.getDate());
      setDate(props.date);
    }
  }, [props.reset, props.date]);

  const firstDayOfMonth = startOfMonth(date);
  const lastDayOfMonth = endOfMonth(date);
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });
  const startingDayOfMonth = getDay(firstDayOfMonth);
  const totalDays = startingDayOfMonth + daysInMonth.length;
  const endingDayOfMonth = totalDays % 7 === 0 ? 0 : 7 - (totalDays % 7);
  return (
    <div className="">
      <div className="flex justify-between gap-7 border-[2px] border-black rounded-md p-1 items-center bg-white">
        <h1>{`${day}/${month + 1}/${year}`}</h1>
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          <FaCalendar />
        </button>{" "}
      </div>
      {isOpen ? (
        <div className="absolute mt-5 p-1 flex flex-col gap-1 rounded-md bg-white text-sm ">
          <div className="flex gap-2 justify-between">
            <button type="button" onClick={() => setYear((prev) => prev - 1)}>
              <IoIosArrowDropleft />
            </button>
            <h1>{year}</h1>
            <button type="button" onClick={() => setYear((prev) => prev + 1)}>
              <IoIosArrowDropright />
            </button>
          </div>
          <div className="flex gap-2 justify-between">
            <button
              type="button"
              disabled={month === 0}
              onClick={() => setMonth((prev) => prev - 1)}
            >
              <IoIosArrowDropleft />
            </button>
            <h1>{months[month]}</h1>
            <button
              type="button"
              disabled={month === months.length - 1}
              onClick={() => setMonth((prev) => prev + 1)}
            >
              <IoIosArrowDropright />
            </button>
          </div>
          <div className="grid grid-cols-7 w-full gap-1">
            {weekDays.map((weekDay) => (
              <div
                key={weekDay}
                className="w-10 border-[1px] border-black text-center rounded-md"
              >
                {weekDay}
              </div>
            ))}
            {Array.from({ length: startingDayOfMonth }).map((_, i) => (
              <div
                key={`fake-${i}`}
                className={`${
                  day === i ? "bg-blue-500" : ""
                } w-10 border-[1px] border-black text-center rounded-md`}
              />
            ))}
            {daysInMonth.map((item, i) => (
              <div
                key={i}
                className={`${
                  day === i + 1 ? "bg-blue-500 hover:bg-blue-500 " : ""
                } w-10 border-[1px] border-black text-center rounded-md hover:bg-neutral-300 cursor-pointer`}
                onClick={() => {
                  setDay(i + 1);
                  console.log(i + 1);
                }}
              >
                {format(item, "d")}
              </div>
            ))}
            {Array.from({ length: endingDayOfMonth }).map((_, i) => (
              <div
                key={`fakee-${i}`}
                className="w-10 border-[1px] border-black text-center rounded-md"
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
