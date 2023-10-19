"use client";

import React, { useState, useEffect } from "react";
import CustomCard from "../dynamic/CustomCard";
import CustomCardPlainBorder from "../dynamic/CustomCardPlainBorder";
import io from "socket.io-client";

const DashboardDetails = (props) => {
  const [amount, setAmount] = useState(1);
  const [seconds, setSeconds] = useState(10);
  const [socket, setSocket] = useState(null);
  const [timer, setTimer] = useState(new Date());

  const digits = [1, 2, 5, 10, 15, 20, 30, 50, 90];
  const timeSecondss = [10, 15, 20, 25, 30, 35, 40, 50, 60];
  const [time, setTime] = useState(new Date());
  const { setSecondss, setPrice, setBetTime } = props;

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTime(new Date());
  //     setBetTime ? setBetTime(new Date()) : "";
  //   }, 1);

  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    console.log("Connecting to WebSocket server...");
    const newSocket = io.connect("wss://ethicalbetting.org:8443", {
      transports: ["websocket"],
    });
    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    console.log({ newSocket });
    setSocket(newSocket);

    return () => {
      console.log("Disconnecting from WebSocket server...");
      newSocket.disconnect();
    };
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  };
  console.log(timer, "timer");
  return (
    <React.Fragment>
      <CustomCard title="Payout">
        <h1 className="text-2xl text-green-500 py-2">+91%</h1>
        <p className="text-green-500 text-[14px]">$19.25</p>
        <p className="text-gray-500 text-[14px] py-2">Profit</p>
        <p className="text-green-500 text-[14px]">+$8.22</p>
      </CustomCard>

      <CustomCardPlainBorder title="Amount">
        <h1 className="text-lg w-full text-center text-white border-b-2 border-gray-700 pb-2">{`$${amount}`}</h1>
        <div className="grid grid-cols-12 w-full pt-3 px-2 gap-y-2">
          {digits.map((digit, index) => {
            return (
              <div
                key={index}
                className="col-span-4 flex items-center justify-center cursor-pointer hover:bg-[#0f223b] rounded-sm"
              >
                <p
                  className={`w-full text-center ${
                    digit === amount
                      ? "text-white cursor-pointer text-sm mb-1"
                      : "text-gray-500 cursor-pointer text-sm mb-1"
                  }`}
                  onClick={() => {
                    setAmount(digit);
                    setPrice ? setPrice(digit) : "";
                  }}
                >
                  {`$${digit}`}
                </p>
              </div>
            );
          })}
        </div>
      </CustomCardPlainBorder>
      <CustomCardPlainBorder title="Time">
        <h1 className="text-lg w-full text-center border-b-2 text-white border-gray-700 pb-2">{`${seconds} seconds`}</h1>
        <div className="grid grid-cols-12 w-full pt-3 px-2 gap-y-2">
          {timeSecondss.map((second, index) => {
            return (
              <div
                key={index}
                className="col-span-4 flex items-center justify-center cursor-pointer hover:bg-[#0f223b] rounded-sm"
              >
                <p
                  className={`w-full text-center ${
                    second === seconds
                      ? "text-white cursor-pointer text-sm mb-1"
                      : " text-gray-500 cursor-pointer text-sm mb-1"
                  }`}
                  onClick={() => {
                    setSecondss ? setSecondss(second) : "";
                    setSeconds(second);
                  }}
                >
                  {`${second}`}
                </p>
              </div>
            );
          })}
        </div>
      </CustomCardPlainBorder>
      <CustomCardPlainBorder title="Time UTC-4">
        {/* <div>
          <p className="text-lg text-center text-white">{timer}</p>
        </div> */}
      </CustomCardPlainBorder>
    </React.Fragment>
  );
};

export default DashboardDetails;
