import Image from "next/image";
import React, { useState } from "react";
import cancel from "../../assetuser/authsocial/CANCLE.png";
import { CircularProgress } from "@chakra-ui/react";
type BetType = "back" | "lay";
interface BetProps {
  betShow: boolean;
  setBetShow: React.Dispatch<React.SetStateAction<boolean>>;
  stake: number;
  rate: number;
  betType?: BetType;
  betCategory: string;
  setStake: React.Dispatch<React.SetStateAction<number>>;
  setRate: React.Dispatch<React.SetStateAction<number>>;
  handlePlaceBet: () => void;
  team: string;
  question?: string;
  betLoading?: boolean;
}

const Bet: React.FC<BetProps> = ({
  betShow,
  setBetShow,
  stake,
  rate,
  betType,
  betCategory,
  setStake,
  setRate,
  team,
  question,
  handlePlaceBet,
  betLoading,
}) => {
  const value = [10, 50, 100, 200, 500, 1000, 10000, 200000];
  const [activeValue, setActiveValue] = useState(-1);

  const handleStake = (value: string) => {
    setStake(Number(value));
  };

  const handleRate = (value: string) => {
    setRate(Number(value));
  };

  const handleIncreaseRate = () => {
    setRate(rate + 0.01);
  };
  const handleDecreaseRate = () => {
    if (rate > 1.1) {
      setRate(rate - 0.01);
    }
  };

  const handleChip = (value: number, index: number) => {
    setStake(value);
    setActiveValue(index);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... p-[1px] w-[100%] lg:w-[50%] left-0 lg:left-[18%] lg:mx-auto  fixed bottom-0 z-50  rounded-[15px]">
      <div className=" flex flex-col gap-3 rounded-[15px] border border-[#3A3B3F] pb-2 bg-[#212632]">
        <div className="flex justify-end">
          <svg
            onClick={() => setBetShow(false)}
            cursor={"pointer"}
            width="40"
            height="25"
            viewBox="0 0 40 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0H20C31.0457 0 40 8.95431 40 20V25H20C8.95431 25 0 16.0457 0 5V0Z"
              fill="#EAAB0F"
            />
            <line
              y1="-1"
              x2="17.8443"
              y2="-1"
              transform="matrix(0.728288 0.685271 -0.75454 0.656254 12.1129 8.19092)"
              stroke="black"
              stroke-width="2"
            />
            <line
              y1="-1"
              x2="17.6965"
              y2="-1"
              transform="matrix(0.67785 -0.7352 0.80052 0.599306 14.2448 20.0854)"
              stroke="black"
              stroke-width="2"
            />
          </svg>
        </div>
        <div className="flex w-[80%] ml-2 mt-[-20px] justify-between">
          <div className="flex  gap-3">
            <button className="h-[30px] w-[30px] text-[10px] bg-[#EAAB0F] border-2 border-[black]  text-white rounded-[50%]">
              BA
            </button>
            <div>
              <p className="text-white text-xs font-medium">
                {team || question}
              </p>
              <p className="text-white text-[10px] font-normal">
                Match {betCategory}
              </p>
            </div>
          </div>
          {/* <div>
            <p className="text-[white] text-center text-xs font-semibold">
              Profit
            </p>
            <div className="bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500 ...  rounded-[10px] p-[1px] w-[100%]">
              <p className="text-[#0FBF00] bg-gray-600 h-[100%] rounded-[10px] px-3 w-[100%] text-[9px]  font-semibold">
                +{(rate * stake).toFixed(2)}
              </p>
            </div>
          </div> */}
        </div>

        <div className="flex w-[100%] px-2 gap-4 jusify-between">
          <div
            className={`flex  w-[100%] justify-between ${
              betType == "back" ? "bg-[#39ACFF]" : "bg-[#FD5FA1]"
            } items-center border rounded-[7px]`}
          >
            <button
              onClick={handleDecreaseRate}
              className=" w-[20%] text-center text-white rounded-full "
            >
              -
            </button>
            <input
              type="number"
              value={rate.toFixed(2)}
              onChange={(e) => handleRate(e.target.value)}
              disabled={true}
              className=" border-l border-r w-[60%]  p-2  text-center outline-none focus:outline-none"
            />
            <button
              onClick={handleIncreaseRate}
              className=" text-white w-[20%] text-center  rounded-full "
            >
              +
            </button>
          </div>

          <div className="bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500 ...  rounded-[7px] p-[1px]  w-[100%]">
            <div className="flex  w-[100%] h-[100%] justify-between bg-[#44444452]   rounded-[7px]">
              <button className="bg-[#EAAB0F] rounded-l-[7px] h-[100%] text-[9px] w-[30%] text-center text-white  ">
                INR
              </button>
              <input
                type="number"
                className=" w-[70%]  bg-[#44444452]  p-2 text-sm  text-center outline-none focus:outline-none"
                placeholder="Stake"
                value={stake}
                onChange={(e) => handleStake(e.target.value)}
              />
            </div>
          </div>
          <div className="bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500 ...  rounded-[7px] p-[1px]  w-[100%]">
            <div className="flex  w-[100%] h-[100%] justify-between bg-[#44444452]   rounded-[7px]">
              <button className={` ${betType==="lay"?"bg-blue-600":"bg-[#EAAB0F]"}  rounded-l-[7px] h-[100%] text-[8px] w-[30%] text-center text-white  `}>
               
                {betType==="lay"&&betCategory==="bookmaker"||betType==="lay"&&betCategory==="odds"?"EXP":"P/L"}
              </button>
              <input
                type="text"
                className=" w-[70%]  bg-[#44444452] text-sm  p-2  text-center outline-none focus:outline-none"
                placeholder=""
                value={betCategory=="fancy"?stake:Number((+(rate * stake) - stake).toFixed(2))}

              />

            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 w-[100%] px-2  gap-2 lg:gap-4 jusify-between">
          {value.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => handleChip(item, index)}
                className={`px-2 w-[100%] border border-[#3A3B3F] ${
                  activeValue === index ? "bg-[#EAAB0F]" : "bg-[#44444452] "
                } py-2 rounded-[5px] text-sm font-semibold`}
              >
                {item}
              </button>
            );
          })}
        </div>

        <div className="flex w-[100%] px-2  gap-2 lg:gap-4 jusify-between">
          <button    onClick={() => setBetShow(false)} className="w-[100%] flex justify-center gap-1 items-center text-[10px] md:text-xs p-2 bg-[#DCA029] rounded-[10px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <g clip-path="url(#clip0_7_3883)">
                <path
                  d="M12.7548 7.93466H16.9325C16.983 7.93468 17.0324 7.94907 17.075 7.97617C17.1176 8.00326 17.1516 8.04192 17.173 8.08763C17.1944 8.13334 17.2023 8.1842 17.1959 8.23426C17.1894 8.28432 17.1688 8.3315 17.1365 8.37028L15.0477 10.8778C15.0227 10.9077 14.9915 10.9317 14.9563 10.9482C14.921 10.9647 14.8826 10.9733 14.8437 10.9733C14.8047 10.9733 14.7663 10.9647 14.731 10.9482C14.6958 10.9317 14.6646 10.9077 14.6397 10.8778L12.5508 8.37028C12.5185 8.3315 12.4979 8.28432 12.4914 8.23426C12.485 8.1842 12.4929 8.13334 12.5143 8.08763C12.5357 8.04192 12.5697 8.00326 12.6123 7.97617C12.6549 7.94907 12.7043 7.93468 12.7548 7.93466ZM1.06728 10.0597H5.24503C5.29551 10.0596 5.34493 10.0452 5.38751 10.0181C5.4301 9.99106 5.46408 9.95239 5.48549 9.90668C5.50689 9.86097 5.51483 9.81011 5.50838 9.76005C5.50192 9.71 5.48134 9.66281 5.44903 9.62403L3.36016 7.11653C3.33523 7.08664 3.30404 7.06259 3.26878 7.04609C3.23353 7.02958 3.19508 7.02103 3.15616 7.02103C3.11723 7.02103 3.07879 7.02958 3.04353 7.04609C3.00828 7.06259 2.97709 7.08664 2.95216 7.11653L0.863283 9.62403C0.830981 9.66281 0.810396 9.71 0.80394 9.76005C0.797484 9.81011 0.805423 9.86097 0.826828 9.90668C0.848233 9.95239 0.882218 9.99106 0.924803 10.0181C0.967388 10.0452 1.01681 10.0596 1.06728 10.0597Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.99995 3.68466C7.35095 3.68466 5.8762 4.43585 4.90188 5.61629C4.85838 5.67268 4.80398 5.71975 4.74192 5.75469C4.67985 5.78963 4.6114 5.81174 4.54062 5.8197C4.46985 5.82766 4.39819 5.8213 4.32992 5.80101C4.26165 5.78072 4.19816 5.74691 4.14321 5.70159C4.08827 5.65627 4.043 5.60036 4.0101 5.53719C3.9772 5.47402 3.95734 5.40489 3.95169 5.33389C3.94605 5.26289 3.95473 5.19148 3.97724 5.12391C3.99974 5.05633 4.03561 4.99397 4.0827 4.94054C4.86065 3.99866 5.89276 3.30005 7.05628 2.9278C8.21979 2.55555 9.46575 2.52532 10.6459 2.84071C11.8261 3.1561 12.8909 3.80384 13.7136 4.70688C14.5363 5.60993 15.0824 6.73027 15.2868 7.93466H14.2062C13.9609 6.7349 13.3088 5.65666 12.3601 4.88226C11.4115 4.10786 10.2245 3.68481 8.99995 3.68466ZM3.7937 10.0597C3.99484 11.0421 4.46982 11.9475 5.16377 12.6714C5.85771 13.3953 6.7423 13.9081 7.71534 14.1506C8.68839 14.393 9.71017 14.3553 10.6626 14.0416C11.6151 13.7279 12.4594 13.1512 13.098 12.378C13.1415 12.3216 13.1959 12.2746 13.258 12.2396C13.32 12.2047 13.3885 12.1826 13.4593 12.1746C13.53 12.1667 13.6017 12.173 13.67 12.1933C13.7382 12.2136 13.8017 12.2474 13.8567 12.2927C13.9116 12.3381 13.9569 12.394 13.9898 12.4571C14.0227 12.5203 14.0426 12.5894 14.0482 12.6604C14.0538 12.7314 14.0452 12.8028 14.0227 12.8704C14.0001 12.938 13.9643 13.0004 13.9172 13.0538C13.1392 13.9957 12.1071 14.6943 10.9436 15.0665C9.7801 15.4388 8.53415 15.469 7.35395 15.1536C6.17375 14.8382 5.10897 14.1905 4.28626 13.2874C3.46355 12.3844 2.91753 11.2641 2.71313 10.0597H3.7937Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_7_3883">
                  <rect
                    width="17"
                    height="17"
                    fill="white"
                    transform="translate(0.5 0.497162)"
                  />
                </clipPath>
              </defs>
            </svg>
            <span>Clear</span>
          </button>
          <button onClick={handlePlaceBet} className="w-[100%] flex justify-center gap-1 items-center text-[10px] md:text-xs p-2 bg-[#DCA029] rounded-[10px]">
            {betLoading ? (
              <CircularProgress size={"16px"} />
            ) : (
              <span className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                >
                  <path
                    d="M1.73584 6.51318V13.2438L8.29834 17.1089V10.4097L1.73584 6.51318Z"
                    fill="white"
                  />
                  <path
                    d="M9.39209 17.1089L15.9546 13.2438V6.51318L9.39209 10.4097V17.1089Z"
                    fill="white"
                  />
                  <path
                    d="M15.4077 5.625L8.84521 1.79688L2.28271 5.625L8.84521 9.45312L15.4077 5.625Z"
                    fill="white"
                  />
                </svg>{" "}
                <button >Place Bet</button>
              </span>
            )}
          </button>
        </div>
        {betLoading ? 
        <div style={{backgroundColor:'rgba(0.5,0.5,0.5,0.6'}} className="rounded-[20px] absolute  h-[100%] z-10 w-[99.5%] bg-red-500   flex justify-center items-center">
<div className="loader"></div>
</div>:""
}
      </div>
    
    </div>
  );
};

export default Bet;
