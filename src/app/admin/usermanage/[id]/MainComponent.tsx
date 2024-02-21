"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  AiOutlineHistory,
  AiOutlineShareAlt,
  AiOutlineTransaction,
} from "react-icons/ai";
import { BiMoneyWithdraw } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { RiLuggageDepositLine } from "react-icons/ri";
import Profile from "../component/Profile";
import Deposit from "../component/Deposit";
import WithDrawl from "../component/WithDrawl";
import Transaction from "../component/Transaction";
import Referral from "../component/Referral";
import ProfiltAndLoss from "../component/ProfiltAndLoss";
import BetHistory from "../component/BetHistory";
import Image from "next/image";
import logo from "../../../../asset/profile/Frame 24 1.png";
import { Switch, useToast } from "@chakra-ui/react";
import { fetchGetRequest, sendPatchRequest } from "@/api/api";
import { UserInterface } from "../../../../../utils/typescript.module";
import AddBalance from "../component/AddBalance";
import SubtractBalance from "../component/SubtractBalance";
import SendMail from "../component/SendMail";
import { getTimeAgo } from "../../../../../utils/getTimeInDetail";

interface Status{
  email_verified:Boolean;
  sms_verified: boolean;
  kyc_verified: boolean;
  status: boolean;
  bet_supported: boolean;
  is_blocked: boolean;
}

const MainComponent = () => {
  const router = useRouter();
  const [active, setActive] = useState(1);
  const [userData, setUserData] = useState<UserInterface>();
  const [plData, setPlData] = useState<any>();

  const [loading, setLoading] = useState<Boolean>(false);
  const [loading1, setLoading1] = useState<Boolean>(false);

  const [statusLoading, setStatusLoading] = useState<Boolean>(false);
  const toast = useToast();
  const param = useParams();
  const data = [
    {
      id: 1,
      title: "Profile",
      icon: <CgProfile />,
    },
    {
      id: 2,
      title: "Deposite",
      icon: <RiLuggageDepositLine />,
    },
    {
      id: 3,
      title: "WithDrawal",
      icon: <BiMoneyWithdraw />,
    },
    {
      id: 4,
      title: "Transaction",
      icon: <AiOutlineTransaction />,
    },
    {
      id: 5,
      title: "Refferrals",
      icon: <AiOutlineShareAlt />,
    },
    // {
    //   id: 6,
    //   title: "Profit & Loss",
    //   icon: <MdOutlineAccountBalanceWallet />,
    // },
    {
      id: 7,
      title: "Bet History",
      icon: <AiOutlineHistory />,
    },
  ];

  const getUserData = async () => {
    setLoading(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/get-single-user/${param.id}`;

    try {
      let response = await fetchGetRequest(url);
      const data = response.data;
      setLoading(false);
      const receivedData: UserInterface = response.data;
      if (receivedData) {
        setUserData(receivedData);
      }
    } catch (error: any) {
      toast({
        description: `${error.data.error}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
    }
  };

  const profitLossData = async () => {
    if(!userData){
      return
    }
     setLoading1(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction/get-transaction-pl/${userData?.user_id}?username=${userData?.username}&type=user`;

    try {
      let response = await fetchGetRequest(url);
      setLoading1(false);
      if (response) {
        setPlData(response);
      }
    } catch (error: any) {
      setLoading1(false);
      toast({
        description: `${error?.data?.message|| error?.message}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
    }
  };
  

  useEffect(()=>{
    profitLossData();

  },[userData])

  useEffect(() => {
    getUserData();
  }, [param.id]);

  const handleActive = (id: number) => {
    setActive(id);
  };

  const handleStatusChange = async (name: string) => {
    setStatusLoading(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/toggle-user-status/${param.id}`;

    try {
      let response = await sendPatchRequest(url, { name });
      const data = response.data;

      getUserData()

      toast({
        description: `${response.message}`,
        status: "success",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        description: `${error.message}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      setStatusLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between mt-4 gap-4 w-[98%] m-auto  ">
      {/* sidebar */}
      <div className=" w-[100%] md:w-[24%]">
        <div className="flex flex-col-reverse  md:flex-col gap-6">
          {/* first box */}
          <div
            style={{
              background:
                "linear-gradient(127deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.50) 91.2%)",
            }}
            className="  w-[100%]  text-white  p-4 pb-8 rounded-[16px] "
          >
            <div className="flex flex-row overflow-scroll md:flex-col  mt-2">
              {data.map((item) => {
                return (
                  <div
                    key={item.id}
                    onClick={() => handleActive(item.id)}
                    className={`flex cursor-pointer items-center   w-[130px] md:w-[100%] px-4 md:px-0 gap-3 md:p-[6px] text-xs ${
                      item.id == active ? "bg-[#1A1F37]" : ""
                    }  rounded-2xl`}
                  >
                    <span
                      className={`rounded-[40%] p-2 ${
                        item.id == active ? "bg-[#0075FF]" : "bg-[#1A1F37]"
                      }  ${
                        item.id == active ? "text-white" : "text-[#0075FF]"
                      }  `}
                    >
                      {item.icon}
                    </span>
                    <p>{item.title}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* second box */}

          <div
            style={{
              background:
                "linear-gradient(127deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.50) 91.2%)",
            }}
            className="  w-[100%]    text-white  p-4 pb-8 rounded-[16px] "
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-2 mt-2">
              <div
                className={`flex justify-between cursor-pointer items-center gap-3 p-[6px] text-xs rounded-2xl`}
              >
                <p>Bet Suported</p>
                <Switch
                  colorScheme="green"
                  name="bet_supported"
                  isChecked={userData?.bet_supported == true ? true : false}
                  onChange={() => handleStatusChange("bet_supported")}
                />
              </div>

              <div
                className={`flex justify-between cursor-pointer items-center gap-3 p-[6px] text-xs rounded-2xl`}
              >
                <p>Status</p>
                <Switch
                  colorScheme="green"
                  name="status"
                  isChecked={userData?.status == true ? true : false}
                  onChange={() => handleStatusChange("status")}
                />
              </div>

              <div
                className={`flex justify-between cursor-pointer items-center gap-3 p-[6px] text-xs rounded-2xl`}
              >
                <p>Block A/c</p>
                <Switch
                  colorScheme="green"
                  name="is_blocked"
                  isChecked={userData?.is_blocked == true ? true : false}
                  defaultValue={"checked"}
                  onChange={() => handleStatusChange("is_blocked")}
                />
              </div>

              <div
                className={`flex justify-between cursor-pointer items-center gap-3 p-[6px] text-xs rounded-2xl`}
              >
                <p>Email Verification</p>
                <Switch
                  name="email_verified"
                  colorScheme="green"
                  // defaultChecked={userData?.email_verified==true?true:false}
                  onChange={() => handleStatusChange("email_verified")}
                />
              </div>

              <div
                className={`flex justify-between cursor-pointer items-center gap-3 p-[6px] text-xs rounded-2xl`}
              >
                <p>SMS Verification</p>
                <Switch
                  name="sms_verified"
                  colorScheme="green"
                  isChecked={userData?.sms_verified == true ? true : false}
                  onChange={() => handleStatusChange("sms_verified")}
                />
              </div>

              <div
                className={`flex justify-between cursor-pointer items-center gap-3 p-[6px] text-xs rounded-2xl`}
              >
                <p>KYC Verification</p>
                <Switch
                  name="kyc_verified"
                  colorScheme="green"
                  isChecked={userData?.kyc_verified == true ? true : false}
                  onChange={() => handleStatusChange("kyc_verified")}
                />
              </div>
            </div>
          </div>

          {/* third box */}

          <div
            style={{
              background:
                "linear-gradient(127deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.50) 91.2%)",
            }}
            className="  w-[100%] flex flex-col gap-4   text-white  p-4 pb-8 rounded-[16px] "
          >
            <p className="text-xs font-medium">User Actions</p>
            <div className="grid w-[100%] grid-cols-2 md:grid-cols-1 gap-3">
              <AddBalance/>
            <SubtractBalance/>
            <SendMail/>

              <button
                style={{
                  background:
                    " linear-gradient(90deg, #47E67D 0%, #8E54E9 100%)",
                }}
                className="w-[100%] text-xs rounded-[5px] p-[7px]"
              >
                Login User
              </button>

              <button
                style={{
                  background:
                    "linear-gradient(90deg, #F3CF4C 0%, #8E54E9 100%)",
                }}
                className="w-[100%] text-xs rounded-[5px] p-[7px]"
              >
                Login as User
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[95%]  md:w-[90%] mx-auto">
        <div className="w-[100%] flex  bg-[#071845] rounded-[10px]   justify-between items-center p-1 md:p-3   ">
          <div className="flex w-[100%] items-center gap-2">
            <Image
              className="rounded-[50%] cursor-pointer h-[40px] w-[40px] md:h-[60px] md:w-[60px]"
              src={logo}
              alt=""
            />
            <div className="flex flex-col">
              <p className="text-white text-xs  md:text-sm font-semibold">
                {userData?.username}
              </p>
              <p className="text-[#A0AEC0] text-[10px] pr-3 md:text-xs font-normal">
                {userData?.user_id}
              </p>
            </div>
          </div>
         
          <div className="flex w-[100%] justify-center items-center flex-col gap-1">
          <p className=" text-[12px] md:text-xl font-semibold  text-white">Total Balance : <span className="text-gray-500 text-xs md:text-lg"> &#8377; {userData?.amount.toFixed(2)}</span></p>

            <p className=" text-[10px] md:text-xs font-semibold  text-white">
              Profit / Loss :{" "}
              <span className={`text-xs ${plData?.totalAmount>0?"text-green-400":"text-red-400"} text-green-400 text-[10px] md:text-xs`}>
                {" "}
                &#8377; {plData&&plData?.totalAmount.toFixed(2)}
              </span>
            </p>
          </div>
          

          <div className="flex w-[100%] flex-col justify-between items-center gap-2">
            <button className=" flex items-center gap-1 p-1 md:p-[6px]  px-4 text-xs text-white font-semibold bg-[#01B574] rounded-md">
              Onilne
            </button>

            <div className="text-[#FFF] flex flex-col items-center justify-center font-medium text-[10px]">
              <p>{userData?.joined_at}</p>
              <p>{getTimeAgo(userData?.joined_at)}</p>
            </div>
          </div>
        </div>
        {active === 1 && userData && <Profile userData={userData} />}
        {active === 2 && <Deposit />}
        {active === 3 && <WithDrawl />}
        {active === 4 && <Transaction />}
        {active === 5 && <Referral />}
        {active === 7 && <BetHistory />}
      </div>
    </div>
  );
};

export default MainComponent;
