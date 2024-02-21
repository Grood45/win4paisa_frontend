"use client";
import { Progress, useToast } from "@chakra-ui/react";
import profile from "../../assetuser/other/profile.png";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MyProfileModel from "./MyProfileModel";
import WalletModel from "./WalletModel";
import PamentModel from "./PamentModel";
import StatementModel from "./StatementModel";
import GlobalSettingModel from "./GlobalSettingModel";
import ReferAndEarnModel from "./ReferAndEarnModel";
import Faq from "./Faq";
import TermsAndCondition from "./TermsAndCondition";
import { useSelector } from "react-redux";
import { RootState, useAppSelector } from "@/app/redux-arch/store";
import { removeUserCookie } from "@/app/redux-arch/userauth/auth.slice";
import { useRouter } from "next/navigation";
import themeChange from "@/theme";
import LoginModal from "./LoginModal";
import { fetchGetRequest } from "@/api/api";
const Profile = () => {
  const userAuth = useSelector((state: RootState) => state);
  const {
    username = "",
    max_limit = 0,
    min_limit = 0,
    user_id=""
  } = userAuth?.combineR?.userAuth?.data?.user || {};

  const profiledata = [
    {
      id: 1,
      modal: <MyProfileModel />,
    },
    {
      id: 2,
      modal: <WalletModel />,
    },
    {
      id: 3,
      modal: <PamentModel heading={"Withdrawl"} code={"1"} />,
    },
    {
      id: 4,
      modal: <PamentModel heading={"Transaction"} code={"2"} />,
    },
    {
      id: 5,
      modal: <StatementModel />,
    },
    {
      id: 6,
      modal: <GlobalSettingModel />,
    },
   
    {
      id: 8,
      modal: <Faq />,
    },
    {
      id: 9,
      modal: <TermsAndCondition />,
    },
  ];

  const router= useRouter()
  const handleLogout = () => {
    removeUserCookie("userData")
    
  };
  const { showSideBar1,showSideBar3,theme } = useAppSelector(
    (store) => store.combineR.NavStateReducer
  );

  const toast = useToast();
  const [todayWithdraw, setTodayWithdraw] = useState<number>(0);
  const getDaillyLimit = async () => {
    try {
      const response = await fetchGetRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/get-withdraw-amount/${user_id}`
      );
      let percentOfWithdraw = Math.round(response.amount / max_limit * 100);
      setTodayWithdraw(percentOfWithdraw);
     
    } catch (error: any) {
      // toast({
      //   description: error?.message,
      //   status: "error",
      //   position: "top",
      //   duration: 4000,
      //   isClosable: true,
      // });
    }
  };

  useEffect(() => {
    getDaillyLimit();
  }, []);

  return (
    <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...  p-[1px] fixed top-16 right-0 md:right-3 rounded-[20px]   text-green w-[60%] sm:w-[35%] lg:w-[20%] ">
    <div
      style={{ border: "0.5px solid #444" }}
      className={`text-2xl rounded-[20px] p-3  ${
        theme ? `bg-[${themeChange.light.bg1}]` : `bg-[${themeChange.dark.bg1}] `
      } ${theme?"text-black":'text-white'}  `}
    >
      <div className="flex flex-col items-center gap-1 justify-center ">
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...  rounded-[50px]  p-[1px]">
        <Image src={profile} alt="" />
        </div>
        <p className={`text-lg font-semibold  `}>{username}</p>
      </div>
      <div className="flex flex-col mt-3  gap-1  ">
        <p className="text-[11px] font-medium">
          Daily Withdrawal Limit
        </p>
        <div className="flex flex-col gap-1">
          <div className="flex text-xs  font-normal justify-between">
            <p>Min {min_limit}</p>
            <p>Max {max_limit}</p>
          </div>
          <Progress value={todayWithdraw} size="sm" colorScheme="orange" rounded={20} />
        </div>
      </div>

      <div className="flex flex-col mt-3 gap-[4px]">
        {profiledata.map((item) => {
          return <div key={item.id}>{item.modal}</div>;
        })}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... h-[1px] my-1"></div>
        <div className="p-2 pl-3 pt-2   flex items-center cursor-pointer gap-4 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
          >
            <path
              d="M13.1603 20.7205H13.0335C8.70145 20.7205 6.6135 19.0165 6.25249 15.1995C6.21347 14.8003 6.50617 14.44 6.91596 14.4011C7.30623 14.3621 7.67699 14.664 7.71601 15.0632C7.99896 18.1207 9.44296 19.2599 13.0432 19.2599H13.1701C17.1411 19.2599 18.546 17.8578 18.546 13.8948V7.54616C18.546 3.58316 17.1411 2.18102 13.1701 2.18102H13.0432C9.42345 2.18102 7.97945 3.33974 7.71601 6.4556C7.66723 6.85482 7.32574 7.15667 6.91596 7.11773C6.50617 7.08852 6.21347 6.72824 6.24274 6.32902C6.57447 2.45366 8.67218 0.720459 13.0335 0.720459H13.1603C17.9509 0.720459 19.9998 2.76525 19.9998 7.54616V13.8948C19.9998 18.6757 17.9509 20.7205 13.1603 20.7205Z"
              fill="red"
            />
            <path
              d="M12.9248 11.4508H1.8216C1.42157 11.4508 1.08984 11.1197 1.08984 10.7205C1.08984 10.3212 1.42157 9.99019 1.8216 9.99019H12.9248C13.3248 9.99019 13.6565 10.3212 13.6565 10.7205C13.6565 11.1197 13.3248 11.4508 12.9248 11.4508Z"
              fill="red"
            />
            <path
              d="M3.99784 14.7128C3.81247 14.7128 3.62709 14.6446 3.48073 14.4985L0.21221 11.2366C-0.0707367 10.9542 -0.0707367 10.4869 0.21221 10.2045L3.48073 6.94256C3.76368 6.66018 4.23201 6.66018 4.51495 6.94256C4.7979 7.22493 4.7979 7.69231 4.51495 7.97469L1.76354 10.7206L4.51495 13.4664C4.7979 13.7488 4.7979 14.2162 4.51495 14.4985C4.37836 14.6446 4.18322 14.7128 3.99784 14.7128Z"
              fill="red"
            />
          </svg>
          {/* <p
            onClick={() => handleLogout()}
            className="text-xs  font-medium"
          >
            Logout
          </p> */}

          <LoginModal ID={2}/>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;
