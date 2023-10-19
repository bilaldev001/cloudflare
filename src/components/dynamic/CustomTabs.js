"use client";

import { useState } from "react";

const CustomTabs = ({ tabs }) => {
  const [openTab, setOpenTab] = useState(0);
  return (
    <div className="flex flex-wrap">
      <div className="w-full h-[calc(100vh-74px-48px)] overflow-auto scroll-smooth">
        <ul className="flex sticky top-0 z-50 bg-[#031126] mb-0 pt-3 pb-3 flex-row">
          {tabs.map((tab, index) => {
            return (
              <li
                key={index}
                className={
                  "-mb-px mr-2 cursor-pointer last:mr-0 flex-auto text-center text-sm font-bold py-1 shadow-lg rounded block leading-normal " +
                  (openTab === index
                    ? "text-white bg-gray-800 border-b"
                    : "text-gray-400 bg-blueGray-600")
                }
                onClick={() => setOpenTab(index)}
              >
                {tab.title}
              </li>
            );
          })}
        </ul>
        <div className="relative flex flex-col min-w-0 break-words bg-blueGray-600 w-full mb-6 shadow-lg rounded h-full">
          <div className="pb-2 flex-auto">
            <div className="tab-content tab-space">{tabs[openTab].content}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomTabs;
