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
import { Match } from "../../../../utils/typescript.module";
import { CircularProgress, Progress, useToast } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { fetchGetRequest, sendPatchRequest } from "@/api/api";
const MainComponent = () => {
  const [route, setRoute] = useState(1);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allMatch, setAllMatch] = useState<Match[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [matchType, setMatchType] = useState("all");
  const [search, setSearch] = useState<string>("");
  const [statusLoading, setStatusLoading] = useState<boolean>(false);
  const [matchsCount, setMatchsCount] = useState();
  const [index, setIndex] = useState<Number>();
  // const [betsCount, setBetsCount] = useState<betsCount>();
  const toast = useToast();
  const params = useParams();
  const [pagination, setPagination] = useState<any>({});
  const totalPages = pagination.totalPages; // Replace with your total number of pages


  const getAllBetDetails = async () => {
    setLoading(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/match/get-all-match?page=${currentPage}&limit=20&search=${search}&status=${matchType}`;
    try {
      let response = await fetchGetRequest(url);
      const data = response.data;
      const receivedData: Match[] = response.data;
      if (receivedData) {
        setAllMatch(receivedData);
      }
      // setMatchsCount(response.matchsCount);

      setLoading(false);
      setPagination(response.pagination)
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

  const handleStatus = async (
    match: Match,
    match_id: string,
    index: number
  ) => {
    setIndex(index);
    setLoading(true);
    setStatusLoading(true);
    try {
      const response = await sendPatchRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/match/update-match-status/${match_id}`,
        { name: "status" }
      );
      setLoading(false);
      if (allMatch) {
        const updatedData = allMatch.map((ele: Match) => {
          if (match_id === ele.match_id) {
            ele.status = match.status == true ? false : true;
            return ele;
          } else {
            return ele;
          }
        });
        setAllMatch(updatedData);
      }
      setStatusLoading(false);
    } catch (error: any) {
      toast({
        title: "Update Status.",
        description: `${error.message}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      setLoading(false);

      setStatusLoading(false);
    }
  };

  useEffect(() => {
    let id: any;
    id = setTimeout(() => {
      getAllBetDetails();
    }, 700);

    return () => clearTimeout(id);
  }, [currentPage, search, matchType]);

  const handleFilter = (name: string) => {
    setMatchType(name);
  };

  const data1 = [
    {
      id: 1,
      title: "All Match",
      balance: "2300",
      profit: "+5%",
      icon: <AiOutlineGlobal fontSize={"20px"} color="white" />,
    },
    {
      id: 2,
      title: "Running Match",
      balance: "90",
      profit: "+50%",
      icon: <VscUnverified fontSize={"20px"} color="white" />,
    },
    {
      id: 3,
      title: "Upcoming Match",
      balance: "50",
      profit: "+10%",
      icon: <VscUnverified fontSize={"20px"} color="white" />,
    },
    {
      id: 4,
      title: "Complete Match",
      balance: "12",
      profit: "+15%",
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
      <div className="flex flex-col-reverse lg:flex-row justify-between   items-center">
        <div className=" grid grid-cols-1 lg:grid-cols-2  w-[100%]   gap-4 mt-[30px] justify-between">
          {data1.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => setRoute(item.id)}
                className={`p-3 cursor-pointer dash-top w-[100%]  rounded-[8px] flex items-center justify-between`}
              >
                <div className="flex flex-col gap-1">
                  <p className="text-[#A0AEC0] text-xs font-medium ">
                    {item.title}
                  </p>
                  <div className="flex text-white items-center text-sm font-semibold gap-4">
                    <p>{item.balance}</p>
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

      <div
        style={{
          background:
            "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
        }}
        className="h-[100%] min-h-[500px] rounded-[16px] p-3  w-[100%]  mt-8 "
      >
        {loading && (
          <Progress size="xs" isIndeterminate colorScheme="#e91e63" />
        )}
        <p className="text-white font-semibold text-sm  pt-2 text-left">
          {route === 1
            ? "All Matches"
            : route == 2
            ? "Running Matches"
            : route === 3
            ? "Upcoming Matches"
            : "Complete Matches"}
        </p>
        <table className="w-[100%] mt-2 ">
          <tr className="text-center p-2   border-b h-[30px] border-gray-600 text-[8px] sm:text-[10px] font-bold text-[#A0AEC0]">
            <th className="text-left">S.Number</th>
            <th>Event Name</th>
            <th>Leagues Name</th>
            <th>Sport Name</th>
            <th>Match Name</th>
            {/* <th>Running Status</th> */}

            <th className="text-right">Status</th>
          </tr>
          {allMatch &&
            allMatch.map((item, dex) => {
              return (
                <tr
                  key={item.match_id}
                  className="text-center  h-[60px] m-auto  border-b border-gray-600 text-[8px] sm:text-[12px] text-white"
                >
                  <td className="text-left">{item.match_id}</td>
                  <td>{item.sport_id}</td>
                  <td>{item.league_name}</td>
                  <td>{item.sport_id=="1"?"Soccer":item.sport_id=="2"?"Tennis":"Cricket"}</td>
                  <td>{item.match_name}</td>
                  <td>{item.status}</td>

                  <td>
                    <div className="flex justify-start">
                      {/* {index==dex? */}

                      <button
                        className={`p-[6px] rounded-md w-[70px]  ${
                          item.status == true ? "bg-green-600" : "bg-red-600"
                        } text-white`}
                        // onClick={() => handleStatus(item, item.match_id, dex)}
                      >
                        {index === dex && statusLoading ? (
                          <CircularProgress
                            isIndeterminate
                            color="orange.600"
                            size={"16px"}
                          />
                        ) : item.status ? (
                          "Active"
                        ) : (
                          "InActive"
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
      {allMatch && allMatch.length > 0 && (
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
