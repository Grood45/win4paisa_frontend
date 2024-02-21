"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../../../asset/logo.png";
import "../usermanage/usermanage.css";
import { TbCoin } from "react-icons/tb";
import { SlScreenDesktop } from "react-icons/sl";
import { BiSolidWalletAlt } from "react-icons/bi";
import { AiOutlineGlobal } from "react-icons/ai";
import { VscUnverified } from "react-icons/vsc";
import { BsSearch } from "react-icons/bs";

import coin from "../../../asset/rupees.png";
import { BetHistory, betsCount } from "../../../../utils/typescript.module";
import { CircularProgress, Progress, useToast } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { fetchGetRequest } from "@/api/api";
import { getTimeAgo } from "../../../../utils/getTimeInDetail";
const MainComponent = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allBet, setAllBet] = useState<BetHistory[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [statusType, setStatusType] = useState("all");
  const [search, setSearch] = useState<string>("");
  const [betsCount, setBetsCount] = useState<betsCount>();
  const toast = useToast();
  const params = useParams();
  const [pagination, setPagination] = useState<any>({});
  const totalPages = pagination.totalPages; // Replace with your total number of pages

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
      setBetsCount(response.betsCount);
      setLoading(false);
      setPagination(response.pagination);
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

  useEffect(() => {
    let id: any;
    id = setTimeout(() => {
      getAllBetDetails();
    }, 700);

    return () => clearTimeout(id);
  }, [currentPage, search, statusType]);

  const handleFilter = (name: string) => {
    setStatusType(name);
  };

  const data1 = [
    {
      id: 1,
      title: "Won Bet",
      name: "win",
      balance:loading?<CircularProgress isIndeterminate color='orange.600' size={"16px"}  />: betsCount?.winBet,
      profit: "+53%",
      icon: <BiSolidWalletAlt fontSize={"20px"} color="white" />,
    },
    {
      id: 2,
      title: "Loose Bet",
      balance: loading?<CircularProgress isIndeterminate color='orange.600' size={"16px"}  />:  betsCount?.loseBet,
      name: "lose",
      profit: "+5%",
      icon: <AiOutlineGlobal fontSize={"20px"} color="white" />,
    },
    {
      id: 3,
      title: "Pending Bet",
      balance:loading?<CircularProgress isIndeterminate color='orange.600' size={"16px"}  />:  betsCount?.pendingBet,
      name: "pending",
      profit: "",
      icon: <VscUnverified fontSize={"20px"} color="white" />,
    },
    {
      id: 4,
      title: "Refunded Bet",
      balance: loading?<CircularProgress isIndeterminate color='orange.600' size={"16px"}  />: betsCount?.refundBet,
      name: "refund",
      profit: "+5%",
      icon: <VscUnverified fontSize={"20px"} color="white" />,
    },
  ];

  const handlePrevPage = () => {
  
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className=" ">
      {/* four-card */}
      <div className="flex flex-col  lg:flex-row justify-between  items-center">
        <div className=" grid  grid-cols-1 lg:grid-cols-2  w-[100%]   gap-4 mt-[30px] justify-between">
          {data1.map((item) => {
            return (
              <div
                onClick={() => handleFilter(item.name)}
                key={item?.id}
                className={`p-3 dash-top w-[100%]  cursor-pointer rounded-[20px] flex items-center justify-between`}
              >
                <div className="flex flex-col gap-1">
                  <p className="text-white text-xs font-medium ">
                    {item.title}
                  </p>
                  <div className="flex text-white items-center text-sm font-semibold gap-4">
                    <div className="flex items-center gap-2">
                      <Image src={coin} alt="" className="h-[15px] w-[15px]" />
                      <p>{item.balance}</p>
                    </div>
                    {/* <span className="text-green-700 text-xs">
                      {item.profit}
                    </span> */}
                  </div>
                </div>
                <span
                  className={`rounded-[30%]  p-2  bg-[#0075FF] flex items-center justify-center `}
                >
                  {item.icon}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 mt-3  justify-between items-center w-[100%]">
          <div className="input-group w-[100%] lg:w-[70%]">
            <input
              type="email"
              className={`input text-white text-sm`}
              id="Email"
              name="Email"
              placeholder="Select the range..........."
            />
            <button className={`button--submit flex items-center text-white`}>
              <BsSearch color="white" fontSize="20px" />
            </button>
          </div>

          <div className="input-group  w-[100%] lg:w-[70%]">
            <input
              type="email"
              className={`input text-white text-sm `}
              id="Email"
              name="Email"
              placeholder="Search the keyword..........."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className={`button--submit flex items-center text-white`}>
              <BsSearch color="white" fontSize="20px" />
            </button>
          </div>
        </div>
      </div>

      {/* table */}
      <div className=" hidden md:contents">
        <div
          style={{
            background:
              "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
          }}
          className="h-[100%] rounded-[16px] p-3  w-[100%]  mt-8 "
        >
          {loading && (
            <Progress size="xs" isIndeterminate colorScheme="#e91e63" />
          )}
          <p className="text-white font-semibold text-sm  pt-2 text-left">
            All Bet Details
          </p>
          <table className="w-[100%]  ">
            <tr className="text-center p-2   border-b h-[30px] border-gray-600 text-[10px] font-bold text-[#A0AEC0]">
              <th className="text-left">Username / User ID</th>
              <th>Event Type</th>
              <th>Event Name</th>
              <th>Runner Name</th>
              <th>Bet Type</th>
              <th className="">Rate</th>
              <th className="">Stake</th>
              <th className="">Place date</th>
              <th className="">Match date</th>
              <th className="text-right">Status</th>
            </tr>
            <tbody className=" ">
            {allBet &&
    allBet
      .filter(item => item.event_type === "casino") // Filter items with event_type equal to "casino"
      .map((item) => {
                  return (
                    <tr
                      key={item?._id}
                      className="text-center  h-[60px] m-auto  border-b border-gray-600 text-xs text-white"
                    >
                      <td className="">
                        <div className="flex text-left flex-col ">
                          <p>{item.username}</p>
                          <p className="text-xs  text-[#A0AEC0] ">
                            {item?.user_id?.slice(0, 10)}
                            <span>..</span>
                          </p>
                        </div>
                      </td>

                      <td>
                        <div className="flex items-center justify-center">
                          <button
                            style={{
                              background:
                                item.event_type === "sport"
                                  ? "linear-gradient(180deg, #0F61DC 0%, rgba(24, 109, 238, 0.00) 100%)"
                                  : "linear-gradient(180deg, #FF6B00 43.75%, rgba(24, 109, 238, 0.00) 100%)",
                            }}
                            className={`p-[6px] rounded-md w-[60px]  text-white`}
                          >
                            {item.event_type}
                          </button>
                        </div>
                      </td>

                      <td>{item.event_name}</td>

                      <td>{item.runner_name}</td>

                      <td>
                        <div className="flex items-center justify-center">
                          <button
                            className={`p-[6px] rounded-[8px] w-[60px]   ${
                              item.bet_type == "back"
                                ? "bg-blue-300"
                                : "bg-pink-300"
                            } text-white`}
                          >
                            {item.bet_type}
                          </button>
                        </div>
                      </td>

                      <td>{item.rate}</td>

                      <td className="">
                        <div className="flex justify-center text-center items-center gap-2">
                          <Image
                            src={coin}
                            alt=""
                            className="h-[15px] w-[15px]"
                          />
                          <p>{item.stake}</p>
                        </div>
                      </td>

                      <td>
                        <div className="flex text-center gap-[2px] flex-col ">
                          <p>{item.placed_at}</p>
                          <p className="text-xs  text-[#A0AEC0] ">
                            {getTimeAgo(item.placed_at)}
                          </p>
                        </div>
                      </td>

                      <td>
                        <div className="flex text-center gap-[2px] flex-col ">
                          <p>{item.match_date}</p>
                          <p className="text-xs  text-[#A0AEC0] ">
                            {getTimeAgo(item.placed_at)}
                          </p>
                        </div>
                      </td>
                      <td>
                        <div className="flex w-[100%] justify-end items-center">
                          <button
                            className={`p-[6px] w-[100%] rounded-[8px] px-1 text-white ${
                              item.status === "win" || item.result_type == "win"
                                ? "bg-[#01B574]"
                                : item.status === "lose"
                                ? "bg-[#E31A1A]"
                                :item.result_type == "pending"
                                ? "bg-[#CEB352]"
                                : item.status === "refund"
                                ? "bg-[#BD5DEB]"
                                :  item.status=="void"?"bg-[#E31A1A]":"bg-[#CEB352]"
                            }`}
                          >
                            {item.status}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* card show instead of table    */}

      <div className=" contents md:hidden pb-4 ">
        <p className="text-white font-bold text-md mt-8">All Bet details</p>
        <div className="flex flex-col gap-4 mt-2">
          {allBet &&
            allBet.map((item) => {
              return (
                <div
                  key={item._id}
                  style={{
                    background:
                      "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%",
                  }}
                  className=" p-2 flex flex-col gap-3 rounded-[20px] w-[100%]"
                >
                  <div className="flex items-center justify-between  w-[100%] ">
                    <p className="text-white p-3  text-xs font-bold ">
                      Bet Details
                    </p>
                    <button className="text-[#fff] h-[20px] px-2 p-1 rounded-lg bg-green-600 font-medium text-[10px]">
                      Online
                    </button>
                  </div>
                  <div className="flex  justify-start gap-4">
                    <Image
                      src={logo}
                      alt="logo"
                      className="h-[50px] rounded-[50%] border border-[#A0AEC0]  w-[50px]"
                    />
                    <div className="flex gap-[2px] flex-col ">
                      <p className="text-white">{item.username}</p>
                      <p className="text-xs  text-[#A0AEC0] ">{item.user_id}</p>
                    </div>
                  </div>

                  <div className="flex flex-col  ">
                    <div className="flex gap-3 w-[100%] p-3 ">
                      <p className="text-[#A0AEC0] font-medium text-xs">
                        Event:-
                      </p>
                      <p className="text-[#fff] font-medium text-xs">
                        {item.event_name}
                      </p>
                    </div>
                    <div className="flex gap-4 w-[100%] p-3">
                      <p className="text-[#A0AEC0] font-medium text-xs">
                        Runner Team:-
                      </p>
                      <p className="text-[#fff] font-medium text-xs">
                        {item.runner_name}
                      </p>
                    </div>
                    <div className="flex gap-4 w-[100%] p-3 ">
                      <p className="text-[#A0AEC0] font-medium text-xs">
                        Transaction :-
                      </p>
                      <div className="flex gap-[4px] items-center ">
                        <p className="text-white">{item.placed_at}</p>
                        <p className="text-xs  text-[#A0AEC0] ">
                          {" "}
                          {getTimeAgo(item.placed_at)}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 w-[100%] p-3">
                      <p className="text-[#A0AEC0] font-medium text-xs">
                        Balance:-
                      </p>
                      <div className="flex justify-center items-center gap-2">
                        <Image
                          src={coin}
                          alt=""
                          className="h-[15px] w-[15px]"
                        />
                        <p className="text-white text-xs">{item.stake}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 w-[100%] p-3">
                      <p className="text-[#A0AEC0] font-medium text-xs">
                        Rate:-
                      </p>
                      <p className="text-[#fff] font-medium text-xs">
                        {item.rate}
                      </p>
                    </div>

                    <div className="flex justify-between w-[100%] p-3">
                      <button
                        style={{
                          background:
                            item.event_type === "sport"
                              ? "linear-gradient(180deg, #0F61DC 0%, rgba(24, 109, 238, 0.00) 100%)"
                              : "linear-gradient(180deg, #FF6B00 43.75%, rgba(24, 109, 238, 0.00) 100%)",
                        }}
                        className={`p-[6px] rounded-md w-[60px]  text-white`}
                      >
                        {item.event_type}
                      </button>
                      <button
                        className={`p-[6px] rounded-[8px] w-[60px]   ${
                          item.bet_type == "back"
                            ? "bg-blue-300"
                            : "bg-pink-300"
                        } text-white`}
                      >
                        {item.bet_type}
                      </button>
                      <button
                        className={`p-[6px]  rounded-[8px] px-1 text-white ${
                          item.status === "win" || item.result_type == "win"
                            ? "bg-[#01B574]"
                            : item.status === "lose"
                            ? "bg-[#E31A1A]"
                            : item.status === "pending" ||
                              item.result_type == "pending"
                            ? "bg-[#CEB352]"
                            : item.status === "refund"
                            ? "bg-[#BD5DEB]"
                            : item.status === "running"
                            ? "bg-[#CEB352]"
                            : ""
                        }`}
                      >
                        {item.status}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {allBet && allBet.length > 0 && (
        <div className="text-[16px] text-white text-sm font-semibold flex m-auto mb-4 mr-5 justify-end gap-3 align-middle items-center mt-2">
      
            <button
              type="button"
              className="ml-1 px-2 py-[4px] cursor-pointer rounded-[5px] text-[20px]"
              // ref="btPrevious"
              onClick={() => handlePrevPage()}
              disabled={currentPage == 1}
              style={{ backgroundColor: "#e91e63", color: "white",fontSize:'12px' }}
            >
              {"<"}
            </button>
            Page <span>{currentPage}</span> of{" "}
            <span>{pagination.totalPages}</span>
            <button
              onClick={() => handleNextPage()}
              type="button"
              disabled={currentPage == pagination.totalPages}
              className="ml-1 px-2 py-[4px] cursor-pointer rounded-[5px] text-[20px]"
              style={{ backgroundColor: "#e91e63", color: "white", fontSize:'12px' }}
            >
              {">"}
            </button>
          
        </div>
      )}
    </div>
  );
};

export default MainComponent;
