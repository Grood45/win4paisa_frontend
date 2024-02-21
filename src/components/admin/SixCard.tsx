import React from "react";
import { AiOutlineGlobal } from "react-icons/ai";
import { BiSolidWalletAlt } from "react-icons/bi";
import { VscUnverified } from "react-icons/vsc";
import "./sixcard.css";
const SixCard = ({
  data1,
  handleFilter,
}: {
  data1: any;
  handleFilter?: Function;
}) => {
  return (
    <div className=" flex flex-col cursor-pointer lg:flex-row gap-4  w-[100%] justify-between">
      {data1.map((item: any) => {
        return (
          <div
            key={item.id}
            className="dash-top w-[100%] p-4  flex   items-center justify-between"
            onClick={() => (handleFilter ? handleFilter(item?.name) : "")}
          >
            <div className="flex flex-col gap-1">
              <p className="text-[#718096] text-xs font-medium ">
                {item.title}
              </p>
              <div className="flex text-white text-[16px] items-center font-bold gap-4">
                <p>{item.value}</p>
                {/* <span className="text-[#01B574] text-xs">{item.profit}</span> */}
              </div>
            </div>
            <span
              className={`rounded-[30%] p-2  bg-[#0075FF] flex items-center justify-center `}
            >
              {item.icon}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default SixCard;
