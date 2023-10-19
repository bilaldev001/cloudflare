"use client";

import DashboardChart from "@/components/dashboard/DashboardChart";
import DashboardDetails from "@/components/dashboard/DashboardDetails";
import Platform from "@/components/dashboard/Platform";
import AnimatedSidebar from "@/components/dynamic/AnimatedSidebar";
import BetCard from "@/components/dynamic/BetCard";
import BetSidebar from "@/components/dynamic/BetSideBar";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Home() {
  const [price, setPrice] = useState(1);
  const [seconds, setSeconds] = useState(10);
  const [betHistory, setBetHistory] = useState([]);
  const [betTime, setBetTime] = useState(new Date());
  const [showBetColumn, setShowBetColumn] = useState(false);
  const [showBetSidebar, setShowBetSidebar] = useState(false);
  const [showPlatformSidebar, setShowPlatformSidebar] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [pair, setPair] = useState("");

  const addNewBet = (betType) => {
    const newBet = {
      price: price,
      seconds: seconds,
      time: betTime,
      betType: betType,
    };
    setBetHistory([...betHistory, newBet]);
    setShowBetColumn(true);

    if (window.innerWidth < 768) {
      setShowBetSidebar(true);
    }
  };

  return (
    <React.Fragment>
      <AnimatedSidebar
        showSidebar={showPlatformSidebar}
        setShowSidebar={setShowPlatformSidebar}
        direction="ltr"
      >
        <Platform setPair={setPair} pair={pair} />
      </AnimatedSidebar>
      {showDetails && (
        <AnimatedSidebar
          showSidebar={showDetails}
          setShowSidebar={setShowDetails}
          direction="rtl"
        >
          <DashboardDetails
            setPrice={setPrice}
            setSecondss={setSeconds}
            setBetTime={setBetTime}
          />
        </AnimatedSidebar>
      )}
      <div className="ssm:h-[calc(100vh-74px)] h-[calc(100vh-118px)] overflow-auto scroll-smooth">
        <div className="lg:hidden justify-between w-full flex items-center text-white gap-4 px-5 py-3">
          <GiHamburgerMenu
            className="text-xl cursor-pointer text-white lg:hidden block"
            onClick={() => setShowPlatformSidebar(true)}
          />
          <GiHamburgerMenu
            className="text-xl cursor-pointer text-white lg:hidden block"
            onClick={() => setShowDetails(true)}
          />
        </div>
        <div className="grid grid-cols-12 h-full">
          <div className="xl:col-span-2 col-span-3 sm:hidden lg:block w-full platform-side pl-5">
            <Platform setPair={setPair} pair={pair} />
          </div>
          <div
            className={`pb-[40px] ${
              showBetColumn
                ? "col-span-12 md:col-span-8 lg:col-span-4 xl:col-span-5"
                : "col-span-12 lg:col-span-7 xl:col-span-8"
            } transition-all`}
          >
            <DashboardChart onBet={addNewBet} pair={pair} />
          </div>
          <div className="col-span-2 sm:hidden lg:block dashboard-details-side bg-[#041328] px-3 rounded-tl-[8px]">
            <DashboardDetails
              setPrice={setPrice}
              setSecondss={setSeconds}
              setBetTime={setBetTime}
            />
          </div>
          {showBetColumn && (
            <div className="lg:col-span-3 md:col-span-4 col-span-5 md:block hidden bg-[#1d3554] rounded-tl-[8px] lg:rounded-none transition-all">
              {betHistory.length > 0 ? (
                <>
                  <h1 className="text-white text-lg text-center w-full px-4 py-2 bg-[#213856] rounded-tl-[8px]">
                    Trades
                  </h1>
                  <div className="px-3 overflow-auto dashboard-bet-side lg:h-[calc(100vh-74px-44px)] h-[calc(100vh-74px-44px-44px)] scroll-smooth">
                    {betHistory.map((bet, index) => (
                      <BetCard key={index} bet={bet} />
                    ))}
                  </div>
                </>
              ) : (
                <h1 className="text-white text-lg text-center w-full mt-4">
                  No Bet Added
                </h1>
              )}
            </div>
          )}
        </div>
      </div>

      <BetSidebar
        showSidebar={showBetSidebar}
        setShowSidebar={setShowBetSidebar}
        direction="rtl"
      >
        {betHistory.map((bet, index) => (
          <BetCard key={index} bet={bet} />
        ))}
      </BetSidebar>
    </React.Fragment>
  );
}
