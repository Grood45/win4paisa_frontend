"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../../../../asset/logo.png";
import "../../usermanage/usermanage.css"
import { TbCoin } from "react-icons/tb";
import { BiSolidWalletAlt } from "react-icons/bi";
import { AiOutlineGlobal } from "react-icons/ai";
import { VscUnverified } from "react-icons/vsc";
import { BsSearch } from "react-icons/bs";

import coin from "../../../../asset/rupees.png"
import { fetchGetRequest } from "@/api/api";
import { Allbets } from "../../../../../utils/typescript.module";
import { Progress, useToast } from "@chakra-ui/react";
import { useParams } from "next/navigation";
const BetHistory = () => {
  const [loading1,setLoading1]=useState(false)
  const [statementData,setStateMentData]=useState<any>([])
  const [totalAmount,setTotalAmount]=useState<any>(0)
  const params = useParams();
const [query,setQuery]=useState('sport')
  const toast=useToast()
  const data1 = [
    {
      id: 1,
      title: "Total Sport Bet",
      balance:totalAmount?.sportBetAmount,
      profit: "+53%",
      icon: <BiSolidWalletAlt fontSize={"20px"} color="white" />,
      query:'sport'
    },
    {
      id: 2,
      title: "Total Casino Bet",
      balance: totalAmount?.casinoBetAmount,
      profit: "+5%",
      icon: <AiOutlineGlobal fontSize={"20px"} color="white" />,
      query:'casino'
    },
    
  ];
  const getAllBets = async () => {
    setLoading1(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/bet/get-all-bet/${params.id}?status=all&event_type=${query}`;
    try {
      let response = await fetchGetRequest(url);
      setTotalAmount(response.betAmount)
      const data = response.data;
      const receivedData:Allbets[]= response.data;
      if (receivedData) {
        setStateMentData(receivedData);
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

  useEffect(() => {
    getAllBets();
  }, [query]);


 
 
  return (
    <div className="mt-2 ">
      {/* four-card */}
      <div className="flex  flex-col lg:flex-row  justify-between  items-end">

        <div className=" grid grid-cols-1 md:grid-cols-2  w-[100%] items-center  gap-2 mt-[30px] justify-between">
      
          {data1.map((item:any) => {
            return (
              <div
              onClick={()=>setQuery(item.query)}
                key={item.id}
                className={`p-3 cursor-pointer  dash-top w-[100%]  rounded-[4px] flex items-center justify-between`}
              >
                <div className="flex flex-col gap-1">
                  <p className="text-white text-xs font-medium ">
                    {item.title}
                  </p>
                  <div className="flex text-white items-center text-sm font-semibold gap-4">
                  <div className="flex items-center  gap-2">
                    <Image src={coin} alt="" className="h-[15px] w-[15px]" />
                    <p>{item.balance}</p>
                  </div>
                    <span className="text-green-700 text-xs">
                      {item.profit}
                    </span>
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

        <div className="flex  gap-3 justify-end mt-7 lg:mt-0 items-center w-[100%] lg:w-[90%]">
          <div className="input-group w-[70%] ">
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

        </div>
      </div>

      {/* table */}
      <div className="lg:contents hidden">
    
      <div
        style={{
          background:
            "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
        }}
        className="h-[100%] rounded-[16px] p-3  w-[100%]  mt-4 "
      >
         {loading1 && (
            <Progress size="xs" isIndeterminate colorScheme="#e91e63" />
          )}
        <p className="text-white font-semibold text-sm  pt-2 text-left">
          All Bet Details
        </p>
        <table className="w-[100%] ">
       
        <tr className="text-center p-2   border-b h-[30px] border-gray-600 text-[10px] font-bold text-[#A0AEC0]">
          
            <th className="text-left">Event Type</th>
            <th>Event Name</th>
            <th>Runner Name</th>
            <th>Bet Type</th>
            <th className="">Rate</th>
            <th className="">Stake</th>
            <th className="">Place date</th>
            <th className="">Match date</th>
            <th className="text-right">Status</th>
          </tr>
          {statementData?.map((item:any) => {
            return (
              <tr
                key={item.id}
                className="text-center  h-[60px] m-auto  border-b border-gray-600 text-xs text-white"
              >
                <td>
                  <div className="flex items-center justify-start">

                  <button
                   style={{
                    background:
                      item.event_type === "Sport"
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
                      item.bet_type == "Back" ? "bg-blue-300" : "bg-pink-300"
                    } text-white`}
                  >
                    {item.bet_type}
                  </button>
                  </div>
                </td>

                <td>{item.rate}</td>

                <td className="">
                <div className="flex justify-center text-center items-center gap-2">
                    <Image src={coin} alt="" className="h-[15px] w-[15px]" />
                    <p>{item.stake}</p>
                  </div>
                </td>

                <td>
                  <div className="flex text-center gap-[2px] flex-col ">
                    <p>{item.placed_at}</p>
                    <p className="text-xs  text-[#A0AEC0] ">{item.placedatet}</p>
                  </div>
                </td>

                <td>
                  <div className="flex text-center gap-[2px] flex-col ">
                    <p>{item.match_date}</p>
                    <p className="text-xs  text-[#A0AEC0] ">{item.matchdatet}</p>
                  </div>
                </td>

                <td >
                  <div className="flex justify-end items-center">
                  <button
                    className={`p-[6px] w-[55px] rounded-[8px] px-1 text-white ${
                      item.status === "Win"
                        ? "bg-[#01B574]"
                        : item.status === "Lose"
                        ? "bg-[#E31A1A]"
                        : item.status === "Pending"
                        ? "bg-[#CEB352]"
                        : item.status === "Refund"
                        ? "bg-[#BD5DEB]"
                        : ""
                    }`}
                  >
                    {item.status}
                  </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      </div>

      {/* show card instead of table */}
      <div className=" contents lg:hidden pb-4 ">
        <p className="text-white font-bold text-md mt-8">All Bet details</p>
        <div className="flex flex-col gap-4 mt-2">
          {statementData.map((item:any) => {
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
                  {/* <button className="text-[#fff] h-[20px] px-2 p-1 rounded-lg bg-green-600 font-medium text-[10px]">
                  Online
                  </button> */}
                </div>
              <div className="flex  justify-start gap-4">
                      <Image
                        src={logo}
                        alt="logo"
                        className="h-[50px] rounded-[50%] border border-[#A0AEC0]  w-[50px]"
                      />
                       <div className="flex gap-[2px] flex-col ">
                      <p className="text-white">
                        {item.username}
                      </p>
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
                      <p className="text-white">
                        {item.placed_at}
                      </p>
                      {/* <p className="text-xs  text-[#A0AEC0] ">2 week ago</p> */}
                    </div>
                  </div>

                  <div className="flex gap-4 w-[100%] p-3">
                    <p className="text-[#A0AEC0] font-medium text-xs">
                      Balance:-
                    </p>
                    <div className="flex justify-center items-center gap-2">
                      <Image src={coin} alt="" className="h-[15px] w-[15px]" />
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
                      item.event_type === "Sport"
                        ? "linear-gradient(180deg, #0F61DC 0%, rgba(24, 109, 238, 0.00) 100%)"
                        : "linear-gradient(180deg, #FF6B00 43.75%, rgba(24, 109, 238, 0.00) 100%)",
                  }}
                    className={`p-[6px] rounded-md w-[60px]  text-white`}
                  >
                    {item.event_type}
                  </button>
                  <button
                    className={`p-[6px] rounded-[8px] w-[60px]   ${
                      item.bet_type == "Back" ? "bg-blue-300" : "bg-pink-300"
                    } text-white`}
                  >
                    {item.bet_type}
                  </button>
                  <button
                    className={`p-[6px]  rounded-[8px] px-1 text-white ${
                      item.status === "Win"
                        ? "bg-[#01B574]"
                        : item.status === "Lose"
                        ? "bg-[#E31A1A]"
                        : item.status === "Pending"
                        ? "bg-[#CEB352]"
                        : item.status === "Refund"
                        ? "bg-[#BD5DEB]"
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

    </div>
  );
};

export default BetHistory;
