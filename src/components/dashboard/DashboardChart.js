"use client";
import Image from "next/image";
import CustomButton from "../dynamic/CustomButton";
import Chart from "../../assets/images/Cryptocurrency-chart.png";
import usd from "../../../node_modules/cryptocurrency-icons/svg/color/usd.svg";
import bts from "../../../node_modules/cryptocurrency-icons/svg/color/bts.svg";
import usdc from "../../../node_modules/cryptocurrency-icons/svg/color/usdc.svg";
import eth from "../../../node_modules/cryptocurrency-icons/svg/color/eth.svg";
import xrp from "../../../node_modules/cryptocurrency-icons/svg/color/xrp.svg";
import ada from "../../../node_modules/cryptocurrency-icons/svg/color/ada.svg";
import atom from "../../../node_modules/cryptocurrency-icons/svg/color/atom.svg";
import sol from "../../../node_modules/cryptocurrency-icons/svg/color/sol.svg";
import trx from "../../../node_modules/cryptocurrency-icons/svg/color/trx.svg";
import ltc from "../../../node_modules/cryptocurrency-icons/svg/color/ltc.svg";
import matic from "../../../node_modules/cryptocurrency-icons/svg/color/matic.svg";
import usdt from "../../../node_modules/cryptocurrency-icons/svg/color/usdt.svg";
import doge from "../../../node_modules/cryptocurrency-icons/svg/color/doge.svg";
import btc from "../../../node_modules/cryptocurrency-icons/svg/color/btc.svg";
import generic from "../../../node_modules/cryptocurrency-icons/svg/color/generic.svg";

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
      <div className="h-full w-full flex justify-between gap-[80px] lg:gap-[100px] items-center flex-col  px-5">
        <Image
          src={Chart}
          alt="chart"
          className="rounded-lg h-full object-cover"
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
