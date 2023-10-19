"use client";
import Image from "next/image";
import CustomButton from "../dynamic/CustomButton";
import Chart from "../../assets/images/Cryptocurrency-chart.png";
import usd from "../../assets/icons/usd.svg";
import bts from "../../assets/icons/bts.svg";
import usdc from "../../assets/icons/usdc.svg";
import eth from "../../assets/icons/eth.svg";
import xrp from "../../assets/icons/xrp.svg";
import ada from "../../assets/icons/ada.svg";
import atom from "../../assets/icons/atom.svg";
import sol from "../../assets/icons/sol.svg";
import trx from "../../assets/icons/trx.svg";
import ltc from "../../assets/icons/ltc.svg";
import matic from "../../assets/icons/matic.svg";
import usdt from "../../assets/icons/usdt.svg";
import doge from "../../assets/icons/doge.svg";
import btc from "../../assets/icons/btc.svg";
import generic from "../../assets/icons/generic.svg";

const DashboardChart = (props) => {
  const { onBet, pair } = props;
  const getImageByType = (type) => {
    switch (type) {
      case "usd":
        return usd;
      case "bts":
        return bts;
      case "usdc":
        return usdc;
      case "eth":
        return eth;
      case "xrp":
        return xrp;
      case "ada":
        return ada;
      case "atom":
        return atom;
      case "sol":
        return sol;
      case "trx":
        return trx;
      case "ltc":
        return ltc;
      case "matic":
        return matic;
      case "usdt":
        return usdt;
      case "doge":
        return doge;
      case "btc":
        return btc;
      default:
        return generic;
    }
  };
  const [firstPart, secondPart] = pair
    .split("/")
    .map((part) => part.toLowerCase());

  const image1 = getImageByType(firstPart);
  const image2 = getImageByType(secondPart);

  return (
    <>
      <div className="hidden lg:flex justify-between gap-3 items-center bg-[#11243d] w-max mx-5 mb-5 py-3 px-3 border-0 outline-none rounded-[8px] text-white placeholder:text-gray-400 ">
        <div className="flex justify-between gap-2 w-max text-sm">
          <Image
            src={image1}
            alt="currencyIcon"
            className="rounded-full w-4"
            width={5}
            height={5}
          />
          <Image
            src={image2}
            alt="flag"
            className="rounded-full w-4 -translate-x-3"
            width={5}
            height={5}
          />
          <span className="">{pair}</span>
        </div>
      </div>
      <div className="w-full flex justify-between gap-[80px] lg:gap-[100px] items-center flex-col  px-5">
        <Image
          src={Chart}
          alt="chart"
          className="rounded-lg h-[300px] object-cover"
          priority
        />
        <div className="flex items-center gap-6 w-full justify-center ">
          <CustomButton
            onClick={() => onBet("higher")}
            className="flex uppercase items-center justify-center font-[600] w-full max-w-[190px] px-[24] py-[12px] text-[14px] rounded-[8px] text-white border-none outline-none transition-all delay-75 hover:shadow-[0_0_5px_2px_#31cd86]  bg-[#31cd86]"
          >
            Bet Higher
          </CustomButton>
          <CustomButton
            onClick={() => onBet("lower")}
            className="flex uppercase items-center justify-center font-[600] w-full max-w-[190px] px-[24] py-[12px] text-[14px] rounded-[8px] text-white border-none outline-none transition-all delay-75 hover:shadow-[0_0_5px_2px_#f1305f]  bg-[#f1305f]"
          >
            Bet Lower
          </CustomButton>
        </div>
      </div>
    </>
  );
};

export default DashboardChart;
