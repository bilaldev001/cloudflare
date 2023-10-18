import Image from "next/image";
import "../../assets/css/custom-card.css";
import infoIcon from "../../assets/icons/infoIcon.svg";

const CustomCardPlainBorder = ({ children, title }) => {
  return (
    <div className=" relative bg-transparent py-3 my-[26px] flex items-center justify-center border-2 border-gray-700 flex-col rounded-[12px]">
      <h3 className="text-gray-500 text-[14px] flex items-center gap-1 absolute -top-3 bg-[#041328] w-[80%] justify-center">
        {title}
        <Image src={infoIcon} alt="info" />
      </h3>

      {children}
    </div>
  );
};

export default CustomCardPlainBorder;
