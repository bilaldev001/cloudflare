import Image from "next/image";
import "../../assets/css/custom-card.css";
import infoIcon from "../../assets/icons/infoIcon.svg";

const CustomCard = ({ children, title }) => {
  return (
    <div className="custom-card-container relative bg-[#011026] py-2 my-2 flex items-center justify-center border-2 border-dashed border-gray-700 flex-col rounded-[12px]">
      <h3 className="text-gray-500 text-[14px]">{title}</h3>
      <Image src={infoIcon} alt="info" className="absolute right-3 top-3"/>
      {children}
    </div>
  );
};

export default CustomCard;
