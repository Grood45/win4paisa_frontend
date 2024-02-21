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
import { Badge, Box, Button, CircularProgress, Input, Progress, Select, useDisclosure, useToast } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { fetchGetRequest, sendPatchRequest } from "@/api/api";
import { getTimeAgo } from "../../../../utils/getTimeInDetail";
const MainComponent = () => {
    const [currentPage, setCurrentPage] = useState<any>(1);
    const [loading, setLoading] = useState<any>(false);
    const [allData, setAllData] = useState<any>([]);
    const [betCategory, setBetCategory] = useState<any>("toss");
    const [search, setSearch] = useState<any>("");
    const [search2, setSearch2] = useState<any>("");
    
    const [result, setResult] = useState<any>("");
  const [betsCount, setBetsCount] = useState<betsCount>();
const [eventName,setEventName]=useState("")
  const [status,setStatus]=useState("")
    const [pagination, setPagination] = useState<any>({});
    const totalPages = allData?.pagination?.totalPages || 0; // Replace with your total number of pages
    const toast = useToast();
    const getAlldashboardDetails = async () => {
      setLoading(true);
      let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/bet/get-all-bet-for-result?bet_category=${betCategory}&page=${currentPage}&limit=20&status=${status}&event_name=${eventName}`;
      if (search) {
        url += `&search=${search}`;
      }
 
      if (search2) {
        url += `&question=${search2}`;
      }
      try {
        let response = await fetchGetRequest(url);
        const data = response;
        setAllData(data);
        setPagination(data.pagination);
        setLoading(false);
      setBetsCount(response.betsCount);
        
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
      let id: any;
      id = setTimeout(() => {
        getAlldashboardDetails();
      }, 700);
      return () => clearTimeout(id);
    }, [currentPage, search, betCategory,status,eventName,search2]);
  
  
    
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
  const handleFilter = (name: string) => {
    setStatus(name);
  };

  
  return (
    <div className=" min-h-[100vh]">
      {/* four-card */}
      <div className="flex flex-col  lg:flex-row justify-between  items-center">
        <div className=" grid  grid-cols-1 lg:grid-cols-4  w-[100%]   gap-4 mt-[30px] justify-between">
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
      </div>
      <Box className="flex flex-col md:flex-row gap-4 items-center mt-6 justify-between mb-2">
      <Box className="flex  gap-2">
            <input
              placeholder={"search by user/match/league name"}
              className=" bg-transparent lg:w-[250px] outline-none border border-blue-400 rounded-md  text-xs text-white p-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <input
              placeholder={"search by  question"}
              className=" bg-transparent outline-none border border-blue-400 rounded-md  text-xs text-white p-2"

              value={search2}
              onChange={(e) => setSearch2(e.target.value)}
            />
          </Box>

            <Box className="flex gap-2 ">
            <select
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="bg-transparent text-white outline-none p-2 border rounded-lg border-blue-400 text-sm"

            >
              <option value={""}>Sports</option>
              <option value={"cricket"}>Cricket</option>

              <option value={"soccer"}>Football</option>
              <option value={"tennis"}>Tennis</option>

            </select>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-transparent text-white outline-none p-2 border rounded-lg border-blue-400 text-sm"

            >
              <option value={""}>Result</option>
              <option value={"pending"}>Pending</option>

              <option value={"declaired"}>Declaired</option>
            </select>
           <select
              value={betCategory}
              onChange={(e) => setBetCategory(e.target.value)}
              className="bg-transparent text-white outline-none p-2 border rounded-lg border-blue-400 text-sm"

            >
              <option  value={""}>Category</option>
              <option value={"odds"}>Odds</option>

              <option value={"toss"}>Toss</option>
              <option value={"fancy"}>Fancy</option>
            </select>
            </Box>
        </Box>
      {/* table */}
      <div className=" hidden md:contents">
        <div
          style={{
            background:
              "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
          }}
          className="h-[100%] rounded-[16px] p-3  w-[100%]  mt-2 "
        >
          {loading && (
            <Progress size="xs" isIndeterminate colorScheme="#e91e63" />
          )}
          <p className="text-white font-semibold text-sm  pt-2 text-left">
            All Sports Bet 
          </p>
          <div className=" ">

          <table className=" overflow-scroll w-[100%] ">
            <tr className="text-center p-2   border-b h-[30px] border-gray-600 text-[10px] font-bold text-[#A0AEC0]">
              <th className="text-left ">Date</th>
              <th  className="">User </th>
              <th className="">Sport </th>
              <th className="w-[100px] pl-2">League</th>
              <th className="w-[100px] pl-2 ">Match</th>
              <th className="">Team</th>
              <th className="">Question</th>
              <th className=""> Rate, Odds</th>
              <th className="">Invest Amount</th>
              <th className="">Win</th>
              <th className="">Loss</th>
              <th className="">BetType</th>
              <th className="">BetCategory</th>
              <th className="text-right">Result</th>

            </tr>
            <tbody className=" ">
              {
                !loading&&allData?.data?.length &&
                allData.data.map((row: any, index: any) =>{
                  return (
                    <tr
                      key={index}
                      className="text-center   h-[60px] m-auto  border-b border-gray-600 text-[9px] font-semibold text-white"
                    >
                      <td className="text-left">
                        <div className="flex flex-col items-center ">
                        <p>{row?.match_date.split(" ")[0]}</p>
                        <p>{row?.match_date.split(" ")[1]}</p>

                        </div>
                      
                      </td>

                      <td>
                       {row?.username}
                      </td>

                      <td>
                     {row?.event_name}
                      </td>

                      <td className="pl-2">
                      {row.league_name}
                      </td>

                      <td className="pl-2">
                      {row.match_name}
                      </td>

                      <td>
                      {row?.bet_category=="fancy"?"N/A":row.runner_name}
                      </td>

                      <td>
                      {!row.question?"N/A":row.question}
                      </td>

                      <td>
                      Rate:{" "}
                    <button className="text-[md] text-center cursor-pointer bg-orange-500 rounded-md p-1 w-[70px] text-white ">
                      {" "}
                      {row.rate}
                    </button>
                      </td>

                      <td>
                      {row.stake.toFixed(2)}
                      </td>

                      <td>
                      {row?.bet_category==="fancy"?row.stake:(row.rate*row.stake-row.stake).toFixed(2)} 

                      </td>
                      <td>
                      {row.stake.toFixed(2)}
                       
                       </td>
                       <td>
                    {row?.bet_category=="fancy"?row.bet_type=="lay"?<Badge colorScheme="red">No</Badge>:<Badge colorScheme="green">Yes</Badge>:row.bet_type}
                       
                       </td>
                       <td>
                       {row.bet_category}
                       </td>
                       <td className="text-right">
                       {row.status==="declaired"?<Badge colorScheme={row.result==="win"?"green":row.result==="lose"?"red":'orange'}>{row.result}</Badge>:<Badge>{row.status}</Badge>}
                       
                       </td>
                       
                       
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {allData && allData.length > 0 && (
          <div className="text-[16px] flex m-auto justify-end gap-3 align-middle items-center p-6">
            <span className="ag-paging-row-summary-panel">
              <span>{(currentPage - 1) * 20 || 1}</span> to{" "}
              <span>{20 * currentPage}</span> of{" "}
              <span>{pagination.totalItems}</span>
            </span>
            <span className="">
              <Button
                type="button"
                className="ml-1 disabled:text-gray-400 text-[20px]"
                disabled={currentPage == 1}
                onClick={() => setCurrentPage(1)}
                style={{ backgroundColor: "#e91e63", color: "white",fontSize:'12px' }}
              >
                {"First"}
              </Button>
              <Button
                type="button"
                className="ml-1 disabled:text-gray-400 text-[20px] mr-1"
                // ref="btPrevious"
                onClick={() => handlePrevPage()}
                disabled={currentPage == 1}
                style={{ backgroundColor: "#e91e63", color: "white" ,fontSize:'12px'}}
              >
                {"<"}
              </Button>
              Page <span>{currentPage}</span> of{" "}
              <span>{pagination.totalPages}</span>
              <Button
                onClick={() => handleNextPage()}
                type="button"
                disabled={currentPage == pagination.totalPages}
                className="ml-1 disabled:text-gray-400 text-[20px]"
                style={{ backgroundColor: "#e91e63", color: "white",fontSize:'12px' }}
              >
                {">"}
              </Button>
              <Button
                onClick={() => setCurrentPage(pagination.totalPages)}
                type="button"
                className="ml-1 disabled:text-gray-400 text-[20px]"
                disabled={currentPage == pagination.totalPages}
                style={{ backgroundColor: "#e91e63", color: "white",fontSize:'12px' }}
              >
                {"Last"}
              </Button>
            </span>
          </div>
        )}
          </div>

        </div>
      </div>

      {/* card show instead of table    */}

      <div className=" contents md:hidden pb-4 ">
        <p className="text-white font-bold text-md mt-8">All Bet details</p>
        <div className="flex flex-col gap-4 mt-2">
        {loading && (
            <Progress size="xs" isIndeterminate colorScheme="#e91e63" />
          )}
          { allData?.data?.length &&
                allData.data.map((row: any, index: any) =>{
              return (
                <div
                  key={index}
                  style={{
                    background:
                      "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%",
                  }}
                  className=" p-2 flex flex-col gap-3 rounded-[20px] w-[100%]"
                >
                  <div className="flex items-center justify-between  w-[100%] ">
                   
                  </div>
                  <div className="flex  justify-start gap-4">
                    <Image
                      src={logo}
                      alt="logo"
                      className="h-[50px] rounded-[50%] border border-[#A0AEC0]  w-[50px]"
                    />
                    <div className="flex gap-[2px] flex-col ">
                      <p className="text-white">{row?.username}</p>
                    </div>
                  </div>

                  <div className="flex flex-col  ">
                    <div className="flex gap-3 w-[100%] p-3 ">
                      <p className="text-[#A0AEC0] font-medium text-xs">
                        Event:-
                      </p>
                      <p className="text-[#fff] font-medium text-xs">
                        {row?.event_name}
                      </p>
                    </div>
                    <div className="flex gap-4 w-[100%] p-3">
                      <p className="text-[#A0AEC0] font-medium text-xs">
                        Team/Qus:-
                      </p>
                      <p className="text-[#fff] font-medium text-xs">
                        {row?.runner_name}
                      </p>
                    </div>
                    <div className="flex gap-4 w-[100%] p-3 ">
                      <p className="text-[#A0AEC0] font-medium text-xs">
                        Date :-
                      </p>
                      <div className="flex gap-[4px] items-center ">
                        <p className="text-white text-xs">

                        {row?.match_date}

                        </p>
                        
                      </div>
                    </div>

                    <div className="flex gap-4 w-[100%] p-3">
                      <p className="text-[#A0AEC0] font-medium text-xs">
                        Invest Amount:-
                      </p>
                      <div className="flex justify-center items-center gap-2">
                        <Image
                          src={coin}
                          alt=""
                          className="h-[15px] w-[15px]"
                        />
                        <p className="text-white text-xs"> {row.stake.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 w-[100%] p-3">
                      <p className="text-[#A0AEC0] font-medium text-xs">
                        Rate:-
                      </p>
                      <p className="text-[#fff] font-medium text-xs">
                        {row?.rate}
                      </p>
                    </div>

                    <div className="flex justify-between w-[100%] p-3">
                      <button
                        style={{
                          background:
                            row?.event_type === "sport"
                              ? "linear-gradient(180deg, #0F61DC 0%, rgba(24, 109, 238, 0.00) 100%)"
                              : "linear-gradient(180deg, #FF6B00 43.75%, rgba(24, 109, 238, 0.00) 100%)",
                        }}
                        className={`p-[6px] rounded-md w-[60px]  text-white`}
                      >
                        {row?.event_type}
                      </button>
                      <button
                        className={`p-[6px] rounded-[8px] w-[60px]   ${
                          row?.bet_type == "back"
                            ? "bg-blue-300"
                            : "bg-pink-300"
                        } text-white`}
                      >
                {row?.bet_category=="fancy"?row.bet_type=="lay"?<Badge colorScheme="red">No</Badge>:<Badge colorScheme="green">Yes</Badge>:row.bet_type}

                      </button>
                      <button
                        className={`p-[6px]  rounded-[8px] px-1 text-white ${
                          row?.status === "win" || row?.result_type == "win"
                            ? "bg-[#01B574]"
                            : row?.status === "lose"
                            ? "bg-[#E31A1A]"
                            : row?.status === "pending" ||
                            row?.result_type == "pending"
                            ? "bg-[#CEB352]"
                            : row?.status === "refund"
                            ? "bg-[#BD5DEB]"
                            : row?.status === "running"
                            ? "bg-[#CEB352]"
                            : ""
                        }`}
                      >
                        {row?.status}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* {allData && allData.length > 0 && ( */}
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
      {/* )} */}
    </div>
  );
};

export default MainComponent;
