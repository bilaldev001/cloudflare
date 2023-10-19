"use client";

import React, { useState } from "react";
import Dropdown from "./dynamic/Dropdown";

const MainNavbar = () => {
  const items = [
    { route: "/", title: "Dashboard" },
    { route: "/logout", title: "Logout" },
  ];
  return (
    <React.Fragment>
      <nav className="flex flex-col ssm:flex-row items-center justify-between px-5 pt-4 md:pt-0 md:h-[70px] pb-2 ssm:gap-2 gap-4">
        <div className="flex items-center text-white gap-4">
          {/* <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg> */}
          <span className="font-bold text-[1.5rem] tracking-wide text-[#309bee]">
            WAHOO<span className="text-white">PREDICT</span>
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <button className="flex max-w-[210px] w-full font-[500] px-[20px] md:px-[30px] py-[12px] leading-none border-2 bg-[#0e3632] rounded text-white border-[#267f4b] hover:opacity-[0.7]">
            Connect Wallet
          </button>
          <Dropdown btnTitle="Account" items={items} />
        </div>
      </nav>
    </React.Fragment>
  );
};

export default MainNavbar;