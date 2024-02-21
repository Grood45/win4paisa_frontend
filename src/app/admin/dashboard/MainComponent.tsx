"use client";

import Sidebar from "@/components/admin/Sidebar";
import React, { useEffect, useState } from "react";
import { BiDotsHorizontalRounded, BiUser } from "react-icons/bi";
import { BiSolidWalletAlt } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import {
  BsFillClockFill,
  BsArrowRightShort,
  BsFillRocketTakeoffFill,
  BsCartFill,
  BsCheckCircleFill,
  BsArrowDownCircle,
  BsArrowUpCircle,
} from "react-icons/bs";
import { RiLuggageDepositLine, RiTreeFill } from "react-icons/ri";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { TbCoin } from "react-icons/tb";
import { GoDotFill } from "react-icons/go";
import logo from "../../../asset/logo.png";
import Image from "next/image";
import TopNavbar from "@/components/admin/TopNavbar";
import SixCard from "@/components/admin/SixCard";
import email from "../../../asset/email.png";
import call from "../../../asset/call.png";
import tree from "../../../asset/tree.png";
import coin from "../../../asset/rupees.png";
import { AiOutlineGlobal } from "react-icons/ai";
import { VscUnverified } from "react-icons/vsc";
import {
  BetHistory,
  Notification,
  UserInterface,
} from "../../../../utils/typescript.module";
import { Badge, CircularProgress, Progress, useToast } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { fetchGetRequest } from "@/api/api";
import { getTimeAgo } from "../../../../utils/getTimeInDetail";
import redcard from "../../../assetuser/other/red.png";
import greencard from "../../../assetuser/other/green.png";
import Chart from "./Chart";

const MainComponent = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allBet, setAllBet] = useState<BetHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loading1, setLoading1] = useState<boolean>(false);
  const [statusType, setStatusType] = useState("all");
  const [search, setSearch] = useState<string>("");
  const [notification, setNotification] = useState<Notification[]>([]);
  const [depositDataCount, setDepositDataCount] = useState<any>([]);
  const [withdrawDataCount, setWithDrawDataCount] = useState<any>([]);
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [withdrawAmount, setWithDrawAmount] = useState<number>(0);
  const [adminSportsCount, setAdminSportCount] = useState<any>({});
  const [adminSportLoading, setAdminSportLoading] = useState<boolean>(false);

  const [usersCount, setUsersCount] = useState({
    totalEmailVerifiedUsers: 0,
    totalSmsUnverifiedUsers: 0,
    activeUsers: 0,
    bannedUsers: 0,
    totalVerifiedUsers: 0,
    withBalanceUsers: 0,
    totalUsers: 0,
  });
  const [admin, setAdmin] = useState<any>({});

  const toast = useToast();
  const params = useParams();

  const getAllBetDetails = async () => {
    setLoading(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/bet/get-all-bet?page=${currentPage}&limit=20&search=${search}&status=${statusType}`;
    try {
      let response = await fetchGetRequest(url);
      const data = response.data;
      const receivedData: BetHistory[] = response.data;
      if (receivedData) {
        setAllBet(receivedData);
      }
      setLoading(false);
    } catch (error: any) {
      // toast({
      //   description: `${error?.data?.message}`,
      //   status: "error",
      //   duration: 4000,
      //   position: "top",
      //   isClosable: true,
      // });
    }
  };

  const getAllNotification = async () => {
    setLoading1(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/notification/get-all-notification?type=admin&admin_id=admin1&limit=20`;
    try {
      let response = await fetchGetRequest(url);
      const data = response.data;
      const receivedData: Notification[] = response.data;
      if (receivedData) {
        setNotification(receivedData);
      }
      setLoading1(false);
    } catch (error: any) {
      toast({
        description: `${error?.data?.message}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
    }
  };

  const getAllDeposit = async () => {
    setLoading1(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction/get-all-deposit?transaction_type=all`;
    try {
      let response = await fetchGetRequest(url);
      const data = response.data;
      const receivedData: any = response.data;
      if (receivedData) {
        setDepositDataCount(response);
        setDepositAmount(response.total_deposit_amount);
      }
      setLoading1(false);
    } catch (error: any) {
      toast({
        description: `${error?.data?.message}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
    }
  };
  const getAllWithDrawal = async () => {
    setLoading1(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction/get-all-withdraw?transaction_type=all`;
    try {
      let response = await fetchGetRequest(url);
      const data = response.data;
      const receivedData: any = response.data;
      if (receivedData) {
        setWithDrawDataCount(response);
        setWithDrawAmount(response.total_withdraw_amount);
      }
      setLoading1(false);
    } catch (error: any) {
      toast({
        description: `${error?.data?.message}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
    }
  };

  const getAlldashboardDetails = async () => {
    setLoading(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/get-all-user?page=${currentPage}&limit=2000`;
    try {
      let response = await fetchGetRequest(url);
      const data = response.data;
      const receivedData: UserInterface[] = response.data;
      setUsersCount(response.usersCount);

      setLoading(false);
    } catch (error: any) {
      toast({
        description: `${error?.data?.message}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
    }
  };

  const getAdmin = async () => {
    // setAdminLoading(true);
    try {
      const response = await fetchGetRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/get-admin/${1}`
      );

      // setAdminLoading(false);

      setAdmin(response.data);
    } catch (error: any) {
      toast({
        title: error.message,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
    // setAdminLoading(false);
  };

  const getAdminSportsCount = async () => {
    setAdminSportLoading(true);
    try {
      const response = await fetchGetRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/match/get-admin-sports-count`
      );

      setAdminSportCount(response.data);
      setAdminSportLoading(false);
    } catch (error: any) {
      toast({
        title: error.message,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
    setAdminSportLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          getAdmin(),
          getAlldashboardDetails(),
          getAllBetDetails(),
          getAllNotification(),
          getAllDeposit(),
          getAllWithDrawal(),
          getAdminSportsCount(),
        ]);
      } catch (error) {
        // Handle errors here
      }
    };

    fetchData(); // Call the function to initiate API calls
  }, []);

  const data2 = [
    {
      id: 1,
      title: "Pending deposit",
      icon: <BiSolidWalletAlt fontSize="10px" color="white" />,
      data: depositDataCount?.transactionsCount?.pendingTransaction,
    },
    {
      id: 2,
      title: "Reject deposit",
      icon: <BsFillRocketTakeoffFill fontSize="10px" color="white" />,
      data: depositDataCount?.transactionsCount?.rejectTransaction,
    },
    {
      id: 3,
      title: "Pending withdrawal",
      icon: <RiLuggageDepositLine fontSize="10px" color="white" />,
      data: withdrawDataCount?.transactionsCount?.pendingTransaction,
    },
    {
      id: 4,
      title: "Reject withdrawal",
      icon: <BsCartFill fontSize="10px" color="white" />,
      data: withdrawDataCount?.transactionsCount?.rejectTransaction,
    },
  ];
  const data1 = [
    {
      id: 1,
      title: "Total User",
      balance: "53,000",
      profit: "+53%",
      value: usersCount?.totalUsers,
      icon: <BiSolidWalletAlt fontSize={"20px"} color="white" />,
    },
    {
      id: 2,
      title: "Total Verified User",
      balance: "2300",
      profit: "+5%",
      value: usersCount?.totalVerifiedUsers,
      icon: <AiOutlineGlobal fontSize={"20px"} color="white" />,
    },
    {
      id: 3,
      title: "Total Email Unverified User",
      balance: "+3050",
      profit: "",
      value:
        usersCount?.totalVerifiedUsers - usersCount?.totalSmsUnverifiedUsers,
      icon: <VscUnverified fontSize={"20px"} color="white" />,
    },
    {
      id: 4,
      title: "Total Sms Unverified User",
      balance: "$75,000",
      profit: "+5%",
      value: usersCount?.totalSmsUnverifiedUsers,
      icon: <VscUnverified fontSize={"20px"} color="white" />,
    },
  ];

  const data3 = [
    {
      id: 1,
      title: "Total Sport",
      balance: "53,000",
      profit: "+53%",
      value: loading ? (
        <CircularProgress isIndeterminate color="orange.600" size={"16px"} />
      ) : (
        adminSportsCount?.totalSport
      ),
      icon: <BiSolidWalletAlt fontSize={"20px"} color="white" />,
    },
    {
      id: 2,
      title: "Sport League",
      balance: "2300",
      profit: "+5%",
      value: loading ? (
        <CircularProgress isIndeterminate color="orange.600" size={"16px"} />
      ) : (
        adminSportsCount?.totalLeague
      ),
      icon: <AiOutlineGlobal fontSize={"20px"} color="white" />,
    },
    {
      id: 3,
      title: "Sports Match",
      balance: "+3050",
      profit: "",
      value: loading ? (
        <CircularProgress isIndeterminate color="orange.600" size={"16px"} />
      ) : (
        adminSportsCount?.totalMatch
      ),
      icon: <VscUnverified fontSize={"20px"} color="white" />,
    },
    {
      id: 4,
      title: "Total Sport Bet",
      balance: "$75,000",
      profit: "+5%",
      value: loading ? (
        <CircularProgress isIndeterminate color="orange.600" size={"16px"} />
      ) : (
        adminSportsCount?.totalSportBet
      ),
      icon: <VscUnverified fontSize={"20px"} color="white" />,
    },
  ];
  const data4 = [
    {
      id: 1,
      title: "Total Casino",
      balance: "53,000",
      profit: "+53%",
      value: loading ? (
        <CircularProgress isIndeterminate color="orange.600" size={"16px"} />
      ) : (
        adminSportsCount?.totalCasinoProvider
      ),

      icon: <BiSolidWalletAlt fontSize={"20px"} color="white" />,
    },
    {
      id: 2,
      title: "Total Casino Provider",
      balance: "2300",
      profit: "+5%",
      value: loading ? (
        <CircularProgress isIndeterminate color="orange.600" size={"16px"} />
      ) : (
        adminSportsCount?.totalCasinoProvider
      ),
      icon: <AiOutlineGlobal fontSize={"20px"} color="white" />,
    },
    {
      id: 3,
      title: "Total Casino Event",
      balance: "+3050",
      profit: "",
      value: loading ? (
        <CircularProgress isIndeterminate color="orange.600" size={"16px"} />
      ) : (
        adminSportsCount?.totalCasinoEvent
      ),
      icon: <VscUnverified fontSize={"20px"} color="white" />,
    },
    {
      id: 4,
      title: "Total Casino Bet",
      balance: "$75,000",
      profit: "+5%",
      value: loading ? (
        <CircularProgress isIndeterminate color="orange.600" size={"16px"} />
      ) : (
        adminSportsCount?.totalCasinoBet
      ),
      icon: <VscUnverified fontSize={"20px"} color="white" />,
    },
  ];

  const data = [
    { name: "Deposits", deposits: 10, withdrawals: 100 },
    { name: "Withdrawals", deposits: 0, withdrawals: 20 },
  ];

  return (
    <div>
      <div className="mt-[30px]">
        <SixCard data1={data1} />
      </div>

      {/* third-child */}
      <div className="w-[100%]   mt-4 flex  flex-col  lg:flex-row gap-4 justify-between">
        <div className="thirdbg1 p-4 h-[220px] flex flex-col justify-between w-[100%]">
          <div className="flex flex-col gap-1">
            <p className="text-[14px] font-medium  text-[#A0AEC0]">
              Welcome Back,
            </p>
            <p className="text-[20px] font-bold text-[white]">
              {admin.full_name}
            </p>
            <p className="text-[14px] font-normal gap-2 flex  items-center text-[#A0AEC0]">
              <Image src={email} className="h-[20px] w-[20px]" alt="email" />
              {admin?.email}
            </p>

            <p className="text-[14px] flex gap-2 items-center text-[#A0AEC0]">
              <Image src={call} className="h-[20px] w-[20px]" alt="call" />
              {admin?.phone}
            </p>
          </div>
          <div className="text-xs flex items-center text-[#FFF]">
            <p className="text-[12px] font-medium gap-2 flex items-center text-[#FFF]">
              Tap to record{" "}
              <span>
                <BsArrowRightShort
                  cursor="pointer"
                  color="white"
                  fontSize="20px"
                />
              </span>
            </p>
          </div>
        </div>

        <div className="thirdbg2 h-[100%] lg:h-[220px] p-3 w-[80%] m-auto lg:w-[50%]">
          <div>
            <p className="text-[14px] font-bold text-[white]">Casino GGR</p>
            <p className="text-[10px] text-[#A0AEC0]">From all provider</p>
          </div>
          <div className="   flex flex-col gap-3 justify-between items-center">
            <div className="text-white">Progress chart</div>
            <span className={`rounded-[50%]  p-2 bg-[#0075FF] `}>
              <Image src={tree} className="w-[20px] h-[20px]" alt="" />
            </span>

            <div className="w-[100%] flex flex-col bg-[#0C1130] justify-between rounded-[20px] p-[6px] pl-3 ">
              <div className="flex w-[100%]  justify-between">
                <p className="text-[9px] text-[#A0AEC0]">0%</p>
                <p className="text-[16px] text-white">75%</p>
                <p className="text-[9px] text-gray-400">100%</p>
              </div>
              <p className="text-center text-[12px] text-[#A0AEC0] ">
                Total used Coin
              </p>
            </div>
          </div>
        </div>

        <div className="thirdbg3  p-3 flex flex-col gap-3  justify-between h-[100%] lg:h-[220px] w-[100%]">
          <div className="flex justify-between items-center">
            <p className="text-sm text-white text-medium">Referral Tracking</p>
            <span className="p-2 bg-[#275B5C] rounded-[12px]">
              <BiDotsHorizontalRounded color="#7551FF" />
            </span>
          </div>
          <div className="flex gap-3 justify-between">
            <div className="flex flex-col gap-3 w-[100%] justify-between">
              <div className="w-[80%] flex flex-col bg-[#0C1130] justify-between rounded-[20px]  p-3 ">
                <p className="text-left text-[9px] text-[#A0AEC0] ">Invited</p>
                <p className="text-[14px] text-left text-white">145 people</p>
              </div>
              <div className="w-[80%] flex flex-col bg-[#0C1130] justify-between rounded-[20px]  p-3 ">
                <p className="text-left text-[9px] text-[#A0AEC0] ">Bonus</p>
                <p className="text-[14px] text-left text-white">145 </p>
              </div>
            </div>
            <div className=" w-[100%] flex flex-col items-center justify-center gap-2">
              <div className="text-white">Progress chart</div>

              <p className="text-[12px] text-[#A0AEC0]">Safety</p>
              <p className="text-[24px] text-white font-semibold">9.3</p>
              <p className="text-center text-[12px] text-[#A0AEC0] ">
                Total Score
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* fourth-child */}

      <div className="flex flex-col lg:flex-row gap-4 mt-4 w-[100%]">
        <div className="bg-[#09215E] p-3 rounded-[12px] h-[300px] w-[100%]">
          <Chart />
        </div>
        <div className="bg-[#061F4D] rounded-[20px] flex flex-col justify-between p-3 h-[300px] w-[100%] lg:w-[80%]">
          <div className=" w-[100%] flex gap-3 justify-between rounded-lg p-2">
            <div className=" w-[100%] relative  rounded-[10px]">
              <Image className="w-[100%] h-[150px]" src={greencard} alt="" />

              <div className="flex absolute  p-4 top-4 items-center   h-[80%] justify-center">
                <p className="text-center  text-blue-800 font-bold text-md">
                  {depositAmount}
                </p>
              </div>
              <p className="text-center  p-4 absolute top-0 text-red-600 font-bold text-xs">
                Total Deposit
              </p>
            </div>
            <div className=" w-[100%] relative  rounded-[10px]">
              <Image className="w-[100%] h-[150px] " src={redcard} alt="" />

              <div className="flex absolute top-4 p-4 items-center  h-[80%] justify-center">
                <p className="text-center  text-green-500 font-bold text-md">
                  {withdrawAmount}
                </p>
              </div>
              <p className="text-center absolute top-0  p-4  text-white font-bold text-xs">
                Total WithDraw
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex flex-col mt-2 gap-1">
              <p className="text-white font-semibold text-sm">
                Deposit & Withdrawal Details
              </p>
              {/* <p className="text-[#A0AEC0] text-sm">
                <span className="text-[#01B574] text-xs">+(23%)</span> than last
                week
              </p> */}
            </div>
            <div className="flex gap-2 mt-4">
              {data2.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex flex-col gap-1 justify-between"
                  >
                    <div className="flex  items-center gap-2 text-white text-[9px]">
                      <p className="flex items-center gap-1 text-[#A0AEC0]">
                        <span className="p-1 bg-[#0075FF] rounded-[30%]">
                          {item.icon}
                        </span>
                        {item.title}
                      </p>
                    </div>
                    <div>
                      <p className="font-bold pl-4 text-white text-left text-md">
                        {item.data}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* fivth-div */}
      <div className="mt-5 flex flex-col gap-4">
        <div>
          <SixCard data1={data3} />
        </div>

        <div>
          <SixCard data1={data4} />
        </div>
      </div>

      {/* sixth-div */}
      <div className="flex flex-col  lg:flex-row gap-3 mt-3 justify-between">
        <div
          style={{
            background:
              "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
          }}
          className="rounded-[20px] h-[100%] lg:h-[450px] p-4 py-5 w-[100%]"
        >
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-white text-sm">Recent Betting</p>
              <p className="font-medium flex items-center gap-1 text-[#A0AEC0] text-xs">
                <span>
                  <BsCheckCircleFill fontSize="15px" color="green" />
                </span>
                30 done this match
              </p>
            </div>
            <div>
              <span>
                <HiOutlineDotsVertical
                  cursor="pointer"
                  fontSize="20px"
                  color="white"
                />
              </span>
            </div>
          </div>
          <div className="h-[300px] w-[100%] mt-8 overflow-scroll">
            <table className="w-[100%]">
              <thead
               
              className="text-left sticky top-0 p-2 z-[1000] bg-[#011237]  border-b h-[30px]  border-gray-600 text-[10px] font-bold text-[#A0AEC0]">
                <tr className=" ">
                  <th className="pl-10">USER NAME</th>
                  <th>Sports/Casino</th>
                  <th>Stack</th>
                  <th className="text-center">Back/Lay</th>
                </tr>
              </thead>
              <tbody className=''>
                {allBet &&
                  allBet.slice(0, 10).map((item, index) => {
                    return (
                      <tr
                        key={index}
                        className="text-left h-[50px]  m-auto border-b border-gray-600 text-[10px] sm:text-xs text-white"
                      >
                        <td>
                          <div className="flex gap-1 items-center">
                            <Image
                              src={logo}
                              alt="logo"
                              className="h-[35px] border border-[#A0AEC0] rounded-[50%] w-[35px]"
                            />
                            <p>{item.username}</p>
                          </div>
                        </td>
                        <td>
                          <button
                            style={{
                              background:
                                item.event_type === "sport"
                                  ? "linear-gradient(180deg, #0F61DC 0%, rgba(24, 109, 238, 0.00) 100%)"
                                  : "linear-gradient(180deg, #FF6B00 43.75%, rgba(24, 109, 238, 0.00) 100%)",
                            }}
                            className="p-[3px] sm:p-[6px] rounded-[4px] sm:rounded-[8px] w-[60px] sm:w-[80px] text-white"
                          >
                            {item.event_type}
                          </button>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <Image
                              src={coin}
                              alt=""
                              className="h-[15px] w-[15px]"
                            />
                            <p>{item.stake}</p>
                          </div>
                        </td>
                        <td className="text-center">
                          <button
                            className={`p-[3px] sm:p-[6px] rounded-[4px] sm:rounded-[8px] w-[60px] sm:w-[80px] text-white ${
                              item.bet_type === "back"
                                ? "bg-[#01B574]"
                                : "bg-[#F4134A]"
                            }`}
                          >
                            {item.bet_type || "N/A"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        <div
          style={{
            background:
              "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
          }}
          className="p-3 h-[100%] lg:h-[450px] rounded-[20px]  overflow-scroll w-[100%] lg:w-[50%]"
        >
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-white text-sm">Notification</p>
              <p className="font-medium flex items-center gap-1 text-[#A0AEC0] text-xs">
                <span>
                  <BsCheckCircleFill fontSize="15px" color="green" />
                </span>
                30% of this match
              </p>
              <p className="font-medium flex items-center gap-1  text-[#A0AEC0] text-xs">
                Newest
              </p>
            </div>
          </div>
          <div className="flex flex-col mt-3 gap-4  h-[350px] overflow-scroll">
            {notification &&
              notification.map((item) => {
                return (
                  <div key={item._id} className="flex justify-between">
                    <div className="flex items-start gap-2 w-[100px]">
                      <div className="flex flex-col gap-1">
                        <p className="text-white text-xs ">
                          {item.username.toUpperCase()}
                        </p>
                        <p className=" text-[#A0AEC0] text-xs ">
                          {getTimeAgo(item.timestamp)}
                        </p>
                      </div>
                    </div>

                    <div className="m-auto flex  ml-2 w-[120px]">
                      <div
                        className={` ${
                          item.category == "withdraw"
                            ? "bg-red-600"
                            : item.category == "deposit"
                            ? "bg-green-600"
                            : "bg-orange-600"
                        } w-[90px] text-center m-auto text-[12px] p-1  text-white rounded-md`}
                      >
                        {item.category.toUpperCase()}
                      </div>
                    </div>
                    <div>
                      {item.amount === 0 ? (
                        <span>
                          <GoDotFill fontSize="25px" color="green" />
                        </span>
                      ) : (
                        <span
                          className={`
                            ${
                              item.category === "withdraw"
                                ? "text-red-500"
                                : "text-green-500"
                            }
                            m-auto
                            flex align-middle items-center
                          `}
                        >
                          {item.category === "withdraw" ? "-" : "+"}{" "}
                          {item.amount}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
