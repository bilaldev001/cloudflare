"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import pairIconMapping from "@/assets/icons/PairIcons";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";

const CustomTable = ({ thead, setPair, allData }) => {
  const [fav, setFav] = useState(null);
  const [activeTrade, setActiveTrade] = useState(0);

  const [pairSorting, setPairSorting] = useState(true);
  const [pairSortable, setPairSortable] = useState(false);
  const [ascendingSort, setAscendingSort] = useState(false);

  const [payoutSorting, setPayoutSorting] = useState(true);
  const [payoutSortable, setPayoutSortable] = useState(false);

  const [sortedData, setSortedData] = useState([]);
  useEffect(() => {
    setSortedData(allData);
  }, [allData]);

  const sortData = (key) => {
    let formatedData;
    if (key === "payouts") {
      setPayoutSorting(!payoutSorting);
      setPairSortable(false);
      formatedData = allData.sort((a, b) => {
        return payoutSorting ? a.payout - b.payout : b.payout - a.payout;
      });
    } else {
      setPairSorting(!pairSorting);
      setPayoutSortable(false);
      if (!ascendingSort) {
        formatedData = allData.sort((a, b) => {
          let fa = a.name.toUpperCase().split("/")[0],
            fb = b.name.toUpperCase().split("/")[0];
          return pairSorting && fa > fb ? 1 : -1;
        });
        setAscendingSort(true);
      } else {
        formatedData = allData.sort((a, b) => {
          let fa = a.name.toUpperCase().split("/")[0],
            fb = b.name.toUpperCase().split("/")[0];
          return pairSorting && fa < fb ? 1 : -1;
        });
        setAscendingSort(false);
      }
    }
    setSortedData(formatedData);
  };

  const sortableHandler = (key) => {
    if (key === "Payouts") {
      setPayoutSortable(true);
      setPairSortable(false);
    } else {
      setPayoutSortable(false);
      setPairSortable(true);
    }
  };

  const arrowHandler = (th) => {
    if (th === "Pairs" && pairSortable && pairSorting) {
      return (
        <BiDownArrowAlt
          className="text-lg cursor-pointer text-yellow-600"
          onClick={() => sortData("name")}
        />
      );
    } else if (th === "Pairs" && pairSortable && !pairSorting) {
      return (
        <BiUpArrowAlt
          className="text-lg cursor-pointer text-yellow-600"
          onClick={() => sortData("name")}
        />
      );
    }

    if (th === "Payouts" && payoutSortable && payoutSorting) {
      return (
        <BiDownArrowAlt
          className="text-lg cursor-pointer text-yellow-600"
          onClick={() => sortData("payouts")}
        />
      );
    } else if (th === "Payouts" && payoutSortable && !payoutSorting) {
      return (
        <BiUpArrowAlt
          className="text-lg cursor-pointer text-yellow-600"
          onClick={() => sortData("payouts")}
        />
      );
    }
  };

  const activeTabHandler = (index, name) => {
    setPair(name);
    setActiveTrade(index);
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
                  <div className="flex items-center gap-2 justify-center cursor-pointer">
                    <span onClick={() => sortableHandler(th)}>{th}</span>
                    {arrowHandler(th)}
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
                  onClick={() => activeTabHandler(index, item.name)}
                  className={`${
                    activeTrade === index
                      ? "cursor-pointer bg-[#203553] rounded"
                      : "cursor-pointer"
                  }`}
                >
                  <td className="py-2 text-center flex justify-center">
                    <div className="flex justify-between gap-2 w-max">
                      {fav !== index ? (
                        <AiOutlineStar
                          className="text-xl"
                          onClick={() => setFav(index)}
                        />
                      ) : (
                        <AiTwotoneStar
                          className="text-xl text-yellow-600"
                          onClick={() => setFav(index)}
                        />
                      )}
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
