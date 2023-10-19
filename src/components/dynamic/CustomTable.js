"use client";

import Image from "next/image";
import starIcon from "../../assets/icons/starIcon.svg";
import { useEffect, useState } from "react";
import pairIconMapping from "@/assets/icons/PairIcons";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";

const CustomTable = ({ thead, setPair, allData }) => {
  const [pairSorting, setPairSorting] = useState(true);
  const [pairSortable, setPairSortable] = useState(false);

  const [payoutSorting, setPayoutSorting] = useState(true);
  const [payoutSortable, setPayoutSortable] = useState(false);

  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    setSortedData(allData);
  }, [allData]);

  const sortData = (key) => {
    const formatedData = allData.sort((a, b) => {
      if (key === "payouts") {
        setPayoutSorting((prev) => !prev);
        setPairSortable(false);
        return payoutSorting ? a.payout - b.payout : b.payout - a.payout;
      } else {
        setPairSorting((prev) => !prev);
        setPayoutSortable(false);
        let fa = a.name.toUpperCase(),
          fb = b.name.toUpperCase();
        return pairSorting && fa < fb ? -1 : 1;
      }
    });
    setSortedData(formatedData);
  };

  const sortableHandler = (key) => {
    console.log({ key });
    if (key === "Payouts") {
      setPayoutSortable(true);
      setPairSortable(false);
    } else {
      setPayoutSortable(false);
      setPairSortable(true);
    }
  };

  return (
    sortedData.length > 0 && (
      <table className="table-auto w-full text-left text-xs text-gray-400">
        <thead className="pb-5 sticky top-[3.2rem] bg-[#031126] z-10">
          <tr>
            {thead.map((th, index) => {
              return (
                <th
                  key={index}
                  className="pb-4 text-center w-[115px] text-gray-600"
                >
                  <div
                    className="flex items-center gap-2 justify-center cursor-pointer"
                    onClick={() => sortableHandler(th)}
                  >
                    {th}
                    {th === "Pairs" && pairSortable && pairSorting ? <BiDownArrowAlt
                      className="text-lg cursor-pointer text-yellow-600"
                      onClick={() => sortData("pairs")}
                    /> : th === "Pairs" && <BiUpArrowAlt
                      className="text-lg cursor-pointer text-yellow-600"
                      onClick={() => sortData("pairs")}
                    />}
                    {th === "Payouts" && payoutSortable && payoutSorting ? <BiDownArrowAlt
                      className="text-lg cursor-pointer text-yellow-600"
                      onClick={() => sortData("payouts")}
                    /> : th === "Payouts" && <BiUpArrowAlt
                      className="text-lg cursor-pointer text-yellow-600"
                      onClick={() => sortData("payouts")}
                    />}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="overflow-auto scroll-smooth">
          {sortedData.length > 0 &&
            sortedData.map((item, index) => {
              const [firstPart, secondPart] = item.name.split("/");
              let currencyImage1;
              let currencyImage2;

              if (
                pairIconMapping[firstPart] &&
                (pairIconMapping[firstPart].tableHeaders === "forex" ||
                  pairIconMapping[firstPart].tableHeaders === "crypto")
              ) {
                currencyImage1 = pairIconMapping[firstPart];
              } else {
                currencyImage1 = pairIconMapping["GENERIC"];
              }

              if (
                pairIconMapping[secondPart] &&
                (pairIconMapping[secondPart].tableHeaders === "forex" ||
                  pairIconMapping[secondPart].tableHeaders === "crypto")
              ) {
                currencyImage2 = pairIconMapping[secondPart];
              } else {
                currencyImage2 = pairIconMapping["GENERIC"];
              }
              return (
                <tr
                  key={index}
                  onClick={() => setPair(item.name)}
                  className="cursor-pointer"
                >
                  <td className="py-2 text-center flex justify-center">
                    <div className="flex justify-between gap-2 w-max">
                      <Image src={starIcon} alt="start" />
                      <Image
                        src={currencyImage1?.flagUrl}
                        alt="currencyIcon"
                        className="rounded-full w-4"
                        width={5}
                        height={5}
                      />
                      <Image
                        src={currencyImage2?.flagUrl}
                        alt="flag"
                        className="rounded-full w-4 -translate-x-3"
                        width={5}
                        height={5}
                      />
                    </div>
                  </td>
                  <td className="py-2 text-center ">
                    <div className="flex justify-between gap-2 w-max">
                      <span className="">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-2 text-center">{`${item.payout}%`}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    )
  );
};

export default CustomTable;
