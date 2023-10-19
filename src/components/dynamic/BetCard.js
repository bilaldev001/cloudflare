"use client";

import Image from "next/image";
import betHigher from "../../assets/icons/betHigher.svg";
import betLower from "../../assets/icons/betLower.svg";
import React, { useState, useEffect } from "react";

const BetCard = (props) => {
  const { bet } = props;
  const { price, time, betType, seconds } = bet;
  const [progress, setProgress] = useState(0);

  const formatTime = (date) => {
    const hours = date?.getHours().toString().padStart(2, "0");
    const minutes = date?.getMinutes().toString().padStart(2, "0");
    const seconds = date?.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };
  const ClosingFormatTime = (date) => {
    let hours = date?.getHours();
    let minutes = date?.getMinutes();
    let seconds = date?.getSeconds();
    seconds += seconds;
    if (seconds >= 60) {
      seconds -= 60;
      minutes += 1;
      if (minutes >= 60) {
        minutes -= 60;
        hours += 1;
        if (hours >= 24) {
          hours -= 24;
        }
      }
    }
    hours = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <>
      <div className="relative bg-transparent p-5 my-[12px] flex items-center justify-center border-2 border-dashed border-gray-700 flex-col rounded-[12px]">
        <div
          className={`flex items-center justify-start w-full gap-1  mb-4 ${betType === "lower" ? "text-[#f1305f]" : "text-[#31cd86]"
            }`}
        >
          <Image
            src={betType === "lower" ? betLower : betHigher}
            alt="betHigher"
            className="h-4 w-4"
          />{" "}
          ${price}
        </div>
        <div className="flex items-center justify-between w-full gap-2 text-green-500 text-[14px]">
          <p className="text-white">${price}</p>
          <p className="text-green-500">${price}</p>
          <p>$0</p>
        </div>
        <div className="flex items-center justify-between w-full gap-2 text-[12px]">
          <div className="flex flex-col gap-2 items-start justify-start text-start">
            <p className="text-[#8f9bab]">Entry Price</p>
            <p className="text-white">--</p>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center text-center">
            <p className="text-[#8f9bab]">Difference</p>
            <p className="text-white">--</p>
          </div>
          <div className="flex flex-col gap-2 items-end justify-end text-end">
            <p className="text-[#8f9bab]">Closing Price</p>
            <p className="text-white">--</p>
          </div>
        </div>
        <div className="flex items-center justify-between w-full gap-2 text-[12px] mb-3">
          <div className="flex flex-col gap-2 items-start justify-start text-start">
            <p className="text-[#8f9bab] ">Entry Time</p>
            <p className="text-white">{formatTime(time)}</p>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center text-center">
            <p className="text-[#8f9bab]">Time Left</p>
            <p className="text-white">00</p>
          </div>
          <div className="flex flex-col gap-2 items-end justify-end text-end">
            <p className="text-[#8f9bab]">Closing Time</p>
            <p className="text-white">{ClosingFormatTime(time)}</p>
          </div>
        </div>
        <ProgressBarWithTimer
          setProgress={setProgress}
          progress={progress}
          durationInSeconds={seconds}
        />
      </div>
    </>
  );
};

export default BetCard;

const ProgressBarWithTimer = ({ durationInSeconds, setProgress, progress }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 100 / durationInSeconds;
        }
        clearInterval(interval);
        return 100;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [durationInSeconds]);

  return (
    <div className="w-full h-2 bg-gray-500 rounded-md overflow-hidden">
      <div
        className="h-full text-center text-white bg-[#309bee]"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};
