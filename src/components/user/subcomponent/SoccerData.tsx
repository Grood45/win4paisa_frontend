"use client";
import React, { useEffect, useState } from "react";

import football from "../../../assetuser/other/football.png";
import teams from "../../../assetuser/other/team.png";
import Image from "next/image";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import { Match } from "../../../../utils/typescript.module";
import { fetchGetRequest, sendPostRequest } from "@/api/api";
import { Spinner, useToast } from "@chakra-ui/react";
import io from "socket.io-client";
import { IoIosFootball } from "react-icons/io";
import soccer from "../../../assetuser/other/Soccer_ball.svg.png";
import getTeamShortName, {
  getDisplayDate,
  getDisplayDateSoccer,
} from "../../../../utils/getTeamShortName";
import { useAppSelector } from "@/app/redux-arch/store";
interface SoccerDataProps {
  soccerData: Match[] | undefined;
}

interface Odds {
  sid: number;
  psid: number;
  odds: number;
  otype: string;
  oname: string;
  tno: number;
  size: number;
}

interface Section {
  sid: number;
  sno: number;
  gstatus: string;
  gscode: number;
  nat: string;
  odds: Odds[];
}

interface GameData {
  gmid: number;
  ename: string;
  etid: number;
  cid: number;
  cname: string;
  iplay: boolean;
  stime: string;
  tv: boolean;
  bm: boolean;
  f: boolean;
  f1: boolean;
  oid: number;
  iscc: number;
  mid: number;
  mname: string;
  status: string;
  rc: number;
  gscode: number;
  m: number;
  gtype: string;
  section: Section[];
}

const SoccerData = ({
  setgameCounts,
  matchFilter,
}: {
  setgameCounts?: any;
  matchFilter?: any;
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagnation, setPagination] = useState({});
  const [data, setData] = useState<String[]>([]);
  const [matchData, setMatchData] = useState<GameData[]>([]);
  const [seeAll, setSeeAll] = useState<Boolean>(false);
  const [isRunningMatchId, setIsRunningMatchId] = useState<String>("");
  const [isRunningTeamName, setIsRunningTeamName] = useState<String>("");
  const [limit, setLimit] = useState(false);
  const toast = useToast();
const [loading,setLoading]=useState(false)
  const FetchData = async () => {
    setLoading(true)
    try {
      // user id then match_id we have to pass here
      const response = await fetchGetRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/match/get-soccer-match?page=${currentPage}&limit=100000000`
      );
      const data = response.data;
      setData(data);

      setPagination(response.pagination);
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      toast({
        description: error || "d",
        status: "error",
        position: "top",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_BASE_URL}`);
    socket.on("connect", () => {});

    socket.on("Data", (data) => {
      if (data) {
        setMatchData(data?.t1 || []);
      }
    });

    socket.on("disconnect", () => {});
    socket.emit("startDataFetching", 1);

    return () => {
      // Clean up the socket connection when the component unmounts
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    FetchData();
  }, [currentPage]);

  const handleNextClick = () => {
    setCurrentPage((pre) => pre + 1);
  };
  const handlePrevClick = () => {
    setCurrentPage((pre) => pre - 1);
  };

  const finalData: any = [];

  useEffect(() => {
    const finaldata =
      matchData &&
      matchData.length > 0 &&
      matchData.map((item: any) => {
        let matchItem: any = data.find((ele: any) => ele.match_id == item.gmid);
        if (matchItem !== undefined) {
          finalData.push(matchItem);
        }
      });

    const countMatches = matchData.reduce((count, item: any) => {
      const matchItem = data.find(
        (ele: any) => ele.match_id == item.gmid && item.iplay === true
      );
      if (matchItem !== undefined) {
        count++;
      }
      return count;
    }, 0);

    let upcommingCount = finalData?.length - countMatches;
    setgameCounts((prev: any) => {
      return {
        ...prev,
        soccerLiveCount: countMatches,
        soccerUpcomingCount: upcommingCount,
        // Update other counts accordingly
      };
    });

  }, [matchData]);

  let newData =
    matchFilter === "Inplay"
      ? matchData.length > 0 &&
        matchData?.filter((item: any) => item.iplay === true)
      : matchFilter === "Upcoming"
      ? matchData.length > 0 &&
        matchData?.filter((item: any) => item.iplay === false)
      : matchData;

  const [isRunning, setIsRunning] = useState(false);
  const handleMouseOver = (team: String, match_id: String) => {
    setIsRunning(true);
    setIsRunningMatchId(match_id);
    setIsRunningTeamName(team);
  };
  const handleMouseOut = () => {
    setIsRunning(false);
    setIsRunningMatchId("");
    setIsRunningTeamName("");
  };

  const { showSideBar2, showSideBar1, theme } = useAppSelector(
    (store) => store.combineR.NavStateReducer
  );

  return (
    <div>
      <div className="w-[100%]">
        {/* football card map  */}

        {matchFilter == "Soccer" ? (
          <>
            <div className="flex px-2 md:px-0 justify-between">
              <div className="flex items-center gap-2">
                <Image src={soccer} alt="" className="w-[30px] h-[30px]" />
                <p
                  className={`text-md font-semibold ${
                    theme ? "text-black" : "text-white"
                  }`}
                >
                  Soccer
                </p>
              </div>
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... rounded-[5px] p-[1px] flex gap-3">
                <button
                  onClick={() => setLimit(!limit)}
                  style={{ border: "1px solid rgba(68, 68, 68, 0.86)" }}
                  className="bg-[#212632] text-white p-1 md:p-[6px] text-[10px] md:text-xs font-medium rounded-[5px]"
                >
                  {limit ? "See all" : "Hide"}
                </button>
              </div>
            </div>
            <div className="flex justify-center items-center">
              {loading && (
              <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              marginTop={"40px"}
              color='blue.500'
              size='xl'
            />
              )}
            </div>
            <div
              className={` m-auto w-[100%]
                 grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3
            sm:w-[100wh] mt-[16px]  `}
            >
              {matchData.length > 0 &&
                matchData.slice(0, limit ? 9 : 100).map((item: any) => {
                  let matchItem = data.find(
                    (ele: any) => ele.match_id == item.gmid
                  );
                  let team1 =
                    item.ename.split("v").length > 1
                      ? item.ename.split("v")[0]
                      : item.ename.split("-")[0];
                  let team2 =
                    item.ename.split("v").length > 1
                      ? item.ename.split("v")[1]
                      : item.ename.split("-")[1];
                  return (
                    <>
                      {/* {data.includes(item.gmid as any) && ( */}
                      {matchItem && (
                        <Link key={item.id} href={`/sports/${item.gmid}/1`}>
                          <div
                            className={`bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... p-[1px] w-[100%] 
                            rounded-[10px] md:rounded-[10px]   `}
                          >
                            <div
                              style={{ border: "0.5px solid #444" }}
                              className="flex flex-col gap-7 w-[100%]  justify-between  rounded-[10px] md:rounded-[10px] bg-[#212632]"
                            >
                              <div className="flex flex-col w-[100%] h-[100%] min-h-[210px] justify-between pb-3  gap-8">
                                <div className="flex justify-between w-[100%]  ">
                                  <div className="flex items-center w-[100%] px-2 bg-[#FABC37] rounded-tl-[10px] rounded-tr-[10px] justify-between  gap-2">
                                    <div className="marquee-container  w-[100%] text-left text-black">
                                      <p
                                        className={`marquee-text font-bold  text-xs w-[60px]  ${
                                          isRunning &&
                                          isRunningTeamName == item.cname &&
                                          item.gmid == isRunningMatchId
                                            ? "running"
                                            : ""
                                        }`}
                                        onMouseOver={() =>
                                          handleMouseOver(item.cname, item.gmid)
                                        }
                                        onMouseOut={() => handleMouseOut()}
                                      >
                                        {item.cname}
                                      </p>
                                    </div>
                                    {item?.iplay === true ? (
                                      <button className="px-1 text-center text-[8px] w-[50px] h-[20px] flex items-center justify-center animate-pulse font-semibold  rounded-[4px] p-[1px] bg-red-600">
                                        Live
                                      </button>
                                    ) : (
                                      <button className="px-1 text-center  text-[8px] w-[70px] h-[20px] flex items-center justify-center animate-pulse font-semibold rounded-[4px] p-[1px] bg-green-600">
                                        Upcoming
                                      </button>
                                    )}
                                  </div>
                                </div>

                                <div className="flex justify-between gap-1  px-2 w-[100%]">
                                  <div className="flex flex-col justify-between w-[100%] h-[100%]  gap-4 items-center">
                                    <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... flex items-center justify-center h-[50px] w-[50px] p-[2px] rounded-[50%] ">
                                      <p className="rounded-[50%] text-black text-xs w-[100%] h-[100%] flex items-center justify-center bg-orange-200 p-1">
                                        {getTeamShortName(team1)}
                                      </p>
                                    </span>
                                    <div className="marquee-container">
                                      <p
                                        className={`marquee-text text-center  text-xs w-[80px] lg:w-[40px] xl:w-[60px] ${
                                          isRunning &&
                                          isRunningTeamName == team1 &&
                                          item.gmid == isRunningMatchId
                                            ? "running"
                                            : ""
                                        }`}
                                        onMouseOver={() =>
                                          handleMouseOver(team1, item.gmid)
                                        }
                                        onMouseOut={() => handleMouseOut()}
                                      >
                                        {team1}
                                      </p>
                                    </div>
                                    <div className="flex w-[100%]">
                                      <button className=" w-[100%] p-1 border-r border-black bg-[#0096FF] text-black font-bold rounded-tl-[6px] rounded-bl-[6px]">
                                        {item.section[1].odds[0].odds}
                                      </button>
                                      <button className="w-[100%] border-r border-black p-1 bg-[#FF6A8A] text-black font-bold rounded-tr-[6px] rounded-br-[6px]">
                                        {item.section[1].odds[1].odds}
                                      </button>
                                    </div>
                                  </div>
                                  <div className="flex flex-col justify-between w-[100%]  gap-4 items-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="21"
                                      height="16"
                                      viewBox="0 0 21 16"
                                      fill="none"
                                    >
                                      <path
                                        d="M5.25 11.109H2.625V13.927H5.25V11.109ZM11.8125 7.35174H9.1875V13.927H11.8125V7.35174ZM18.375 2.65514V13.927H15.75V2.65514H18.375ZM15.75 1.71582C15.4019 1.71582 15.0681 1.81478 14.8219 1.99094C14.5758 2.1671 14.4375 2.40602 14.4375 2.65514V13.927C14.4375 14.1761 14.5758 14.415 14.8219 14.5912C15.0681 14.7673 15.4019 14.8663 15.75 14.8663H18.375C18.7231 14.8663 19.0569 14.7673 19.3031 14.5912C19.5492 14.415 19.6875 14.1761 19.6875 13.927V2.65514C19.6875 2.40602 19.5492 2.1671 19.3031 1.99094C19.0569 1.81478 18.7231 1.71582 18.375 1.71582H15.75ZM7.875 7.35174C7.875 7.10262 8.01328 6.8637 8.25942 6.68754C8.50556 6.51139 8.8394 6.41242 9.1875 6.41242H11.8125C12.1606 6.41242 12.4944 6.51139 12.7406 6.68754C12.9867 6.8637 13.125 7.10262 13.125 7.35174V13.927C13.125 14.1761 12.9867 14.415 12.7406 14.5912C12.4944 14.7673 12.1606 14.8663 11.8125 14.8663H9.1875C8.8394 14.8663 8.50556 14.7673 8.25942 14.5912C8.01328 14.415 7.875 14.1761 7.875 13.927V7.35174ZM1.3125 11.109C1.3125 10.8599 1.45078 10.621 1.69692 10.4448C1.94306 10.2687 2.2769 10.1697 2.625 10.1697H5.25C5.5981 10.1697 5.93194 10.2687 6.17808 10.4448C6.42422 10.621 6.5625 10.8599 6.5625 11.109V13.927C6.5625 14.1761 6.42422 14.415 6.17808 14.5912C5.93194 14.7673 5.5981 14.8663 5.25 14.8663H2.625C2.2769 14.8663 1.94306 14.7673 1.69692 14.5912C1.45078 14.415 1.3125 14.1761 1.3125 13.927V11.109Z"
                                        fill="#E1DB4E"
                                      />
                                    </svg>
                                    <div className="flex flex-col font-bold mb-3 justify-between ">
                                      <p className=" text-[12px] text-center  text-[#FFF]">
                                        {getDisplayDateSoccer(
                                          item?.stime.split(" ")[0]
                                        )}
                                      </p>
                                      <p className="text-[12px] text-center  text-[#FFF]">
                                        {item?.stime.split(" ")[1]}
                                      </p>
                                    </div>
                                    <div className="flex w-[100%] ">
                                      <button className="w-[100%] border-r border-black p-1 bg-[#0096FF] text-black font-bold rounded-tl-[6px] rounded-bl-[6px]">
                                        {item.section[2].odds[1].odds}
                                      </button>
                                      <button className="w-[100%] border-r border-black  p-1 bg-[#FF6A8A] text-black font-bold rounded-tr-[6px] rounded-br-[6px]">
                                        {item.section[2].odds[0].odds}
                                      </button>
                                    </div>
                                  </div>
                                  <div className="flex flex-col justify-between w-[100%] gap-4 items-center">
                                    <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... flex items-center justify-center h-[50px] w-[50px] p-[2px] rounded-[50%] ">
                                      <p className="rounded-[50%] text-black text-xs w-[100%] h-[100%] flex items-center justify-center bg-orange-200 p-1">
                                        {getTeamShortName(team2)}
                                      </p>
                                    </span>
                                    <div className="marquee-container">
                                      <p
                                        className={`marquee-text font-bold text-center text-xs w-[80px] lg:w-[40px] xl:w-[60px] ${
                                          isRunning &&
                                          isRunningTeamName == team2 &&
                                          item.gmid == isRunningMatchId
                                            ? "running"
                                            : ""
                                        }`}
                                        onMouseOver={() =>
                                          handleMouseOver(team2, item.gmid)
                                        }
                                        onMouseOut={() => handleMouseOut()}
                                      >
                                        {team2}
                                      </p>
                                    </div>
                                    <div className="flex w-[100%]  gap-2">
                                      <button className="w-[100%] flex justify-center items-center py-[6px] p-1 bg-[#35383F] text-black font-bold rounded-[4px]">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="19"
                                          height="20"
                                          viewBox="0 0 19 20"
                                          fill="none"
                                        >
                                          <g clip-path="url(#clip0_301_3852)">
                                            <path
                                              d="M3.40324 18.5625C3.31062 19.1175 3.83074 19.5512 4.28912 19.3037L9.50224 16.4837L14.7142 19.3037C15.1726 19.5512 15.6927 19.1175 15.6001 18.5637L14.6144 12.6512L18.7968 8.45621C19.1887 8.06371 18.9868 7.34622 18.4619 7.26871L12.6456 6.39872L10.0521 0.989965C10.0026 0.880326 9.9247 0.787694 9.82727 0.72283C9.72984 0.657967 9.61693 0.623535 9.50165 0.623535C9.38637 0.623535 9.27345 0.657967 9.17602 0.72283C9.07859 0.787694 9.00065 0.880326 8.95124 0.989965L6.35774 6.39996L0.541366 7.26997C0.0176783 7.34747 -0.185384 8.06496 0.205303 8.45746L4.38887 12.6525L3.40324 18.565V18.5625ZM9.22793 15.1037L4.8508 17.4712L5.67493 12.525C5.69423 12.4111 5.68668 12.294 5.65293 12.1839C5.61918 12.0739 5.56027 11.9742 5.48137 11.8937L2.03049 8.43121L6.84224 7.71122C6.94188 7.69538 7.03638 7.65435 7.11766 7.59165C7.19894 7.52896 7.26457 7.44645 7.30893 7.35122L9.49987 2.77871L11.6932 7.35122C11.7375 7.44645 11.8032 7.52896 11.8844 7.59165C11.9657 7.65435 12.0602 7.69538 12.1599 7.71122L16.9716 8.42997L13.5207 11.8925C13.4417 11.9731 13.3826 12.0729 13.3489 12.1833C13.3151 12.2936 13.3077 12.4109 13.3272 12.525L14.1513 17.4712L9.77418 15.1037C9.68954 15.0578 9.59569 15.0338 9.50046 15.0338C9.40523 15.0338 9.31257 15.0578 9.22793 15.1037Z"
                                              fill="#FABC38"
                                            />
                                          </g>
                                          <defs>
                                            <clipPath id="clip0_301_3852">
                                              <rect
                                                width="19"
                                                height="20"
                                                fill="white"
                                              />
                                            </clipPath>
                                          </defs>
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      )}
                    </>
                  );
                })}
            </div>
          </>
        ) : (
          <>
            <div className="flex px-2 md:px-0 justify-between">
              <div className="flex items-center gap-2">
                <Image src={soccer} alt="" className="w-[30px] h-[30px]" />
                <p
                  className={`text-md font-semibold ${
                    theme ? "text-black" : "text-white"
                  }`}
                >
                  Soccer
                </p>
              </div>
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... rounded-[5px] p-[1px] flex gap-3">
                <button
                  onClick={() => setSeeAll(!seeAll)}
                  style={{ border: "1px solid rgba(68, 68, 68, 0.86)" }}
                  className="bg-[#212632] text-white  p-1 md:p-[6px] text-[10px] md:text-xs font-medium rounded-[5px]"
                >
                  {!seeAll ? "See all" : "Hide"}
                </button>
              </div>
            </div>
            <div className="flex justify-center items-center">
              {loading && (
              <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              marginTop={"40px"}
              color='blue.500'
              size='xl'
            />
              )}
            </div>
            <div
              className={` m-auto w-[100%]  ${
                !seeAll
                  ? "sm:overflow-scroll"
                  : "grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
              }  sm:w-[100wh] mt-[16px] flex flex-col sm:flex-row gap-2 `}
            >
              {newData &&
                newData.map((item: any) => {
                  let matchItem = data.find(
                    (ele: any) => ele.match_id == item.gmid
                  );

                  let team1 =
                    item.ename.split("v").length > 1
                      ? item.ename.split("v")[0]
                      : item.ename.split("-")[0];
                  let team2 =
                    item.ename.split("v").length > 1
                      ? item.ename.split("v")[1]
                      : item.ename.split("-")[1];
                  return (
                    <>
                      {/* {data.includes(item.gmid as any) && ( */}
                      {matchItem && (
                        <Link key={item.id} href={`/sports/${item.gmid}/1`}>
                          <div
                            className={`bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... p-[1px] w-[100%] ${
                              !seeAll ? "lg:w-[300px]" : "w-[100%] "
                            }
                          rounded-[10px] md:rounded-[10px]   `}
                          >
                            <div
                              style={{ border: "0.5px solid #444" }}
                              className="flex flex-col gap-7 w-[100%]  justify-between  rounded-[10px] md:rounded-[10px] bg-[#212632]"
                            >
                              <div className="flex flex-col w-[100%] h-[100%] min-h-[210px] justify-between pb-3  gap-8">
                                <div className="flex justify-between w-[100%]  ">
                                  <div className="flex items-center w-[100%] px-2 bg-[#FABC37] rounded-tl-[10px] rounded-tr-[10px] justify-between  gap-2">
                                    <div className="marquee-container  w-[100%] text-left text-black">
                                      <p
                                        className={`marquee-text font-bold  text-xs w-[60px]  ${
                                          isRunning &&
                                          isRunningTeamName == item.cname &&
                                          item.gmid == isRunningMatchId
                                            ? "running"
                                            : ""
                                        }`}
                                        onMouseOver={() =>
                                          handleMouseOver(item.cname, item.gmid)
                                        }
                                        onMouseOut={() => handleMouseOut()}
                                      >
                                        {item.cname}
                                      </p>
                                    </div>
                                    {item?.iplay === true ? (
                                      <button className="px-1 text-center text-[8px] w-[50px] h-[20px] flex items-center justify-center animate-pulse font-semibold  rounded-[4px] p-[1px] bg-red-600">
                                        Live
                                      </button>
                                    ) : (
                                      <button className="px-1 text-center  text-[8px] w-[70px] h-[20px] flex items-center justify-center animate-pulse font-semibold rounded-[4px] p-[1px] bg-green-600">
                                        Upcoming
                                      </button>
                                    )}
                                  </div>
                                </div>
                                <div className="flex justify-between gap-1  px-2 w-[100%]">
                                  <div className="flex flex-col justify-between w-[100%] h-[100%]  gap-4 items-center">
                                    <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... flex items-center justify-center h-[50px] w-[50px] p-[2px] rounded-[50%] ">
                                      <p className="rounded-[50%] text-black text-xs w-[100%] h-[100%] flex items-center justify-center bg-orange-200 p-1">
                                        {getTeamShortName(team1)}
                                      </p>
                                    </span>
                                    <div className="marquee-container">
                                      <p
                                        className={`marquee-text text-center  text-xs w-[80px] ${
                                          isRunning &&
                                          isRunningTeamName == team1 &&
                                          item.gmid == isRunningMatchId
                                            ? "running"
                                            : ""
                                        }`}
                                        onMouseOver={() =>
                                          handleMouseOver(team1, item.gmid)
                                        }
                                        onMouseOut={() => handleMouseOut()}
                                      >
                                        {team1}
                                      </p>
                                    </div>
                                    <div className="flex w-[100%]">
                                      <button className=" w-[100%] p-1 border-r border-black bg-[#0096FF] text-black font-bold rounded-tl-[6px] rounded-bl-[6px]">
                                        {item.section[1].odds[0].odds}
                                      </button>
                                      <button className="w-[100%] border-r border-black p-1 bg-[#FF6A8A] text-black font-bold rounded-tr-[6px] rounded-br-[6px]">
                                        {item.section[1].odds[1].odds}
                                      </button>
                                    </div>
                                  </div>
                                  <div className="flex flex-col justify-between w-[100%]  gap-4 items-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="21"
                                      height="16"
                                      viewBox="0 0 21 16"
                                      fill="none"
                                    >
                                      <path
                                        d="M5.25 11.109H2.625V13.927H5.25V11.109ZM11.8125 7.35174H9.1875V13.927H11.8125V7.35174ZM18.375 2.65514V13.927H15.75V2.65514H18.375ZM15.75 1.71582C15.4019 1.71582 15.0681 1.81478 14.8219 1.99094C14.5758 2.1671 14.4375 2.40602 14.4375 2.65514V13.927C14.4375 14.1761 14.5758 14.415 14.8219 14.5912C15.0681 14.7673 15.4019 14.8663 15.75 14.8663H18.375C18.7231 14.8663 19.0569 14.7673 19.3031 14.5912C19.5492 14.415 19.6875 14.1761 19.6875 13.927V2.65514C19.6875 2.40602 19.5492 2.1671 19.3031 1.99094C19.0569 1.81478 18.7231 1.71582 18.375 1.71582H15.75ZM7.875 7.35174C7.875 7.10262 8.01328 6.8637 8.25942 6.68754C8.50556 6.51139 8.8394 6.41242 9.1875 6.41242H11.8125C12.1606 6.41242 12.4944 6.51139 12.7406 6.68754C12.9867 6.8637 13.125 7.10262 13.125 7.35174V13.927C13.125 14.1761 12.9867 14.415 12.7406 14.5912C12.4944 14.7673 12.1606 14.8663 11.8125 14.8663H9.1875C8.8394 14.8663 8.50556 14.7673 8.25942 14.5912C8.01328 14.415 7.875 14.1761 7.875 13.927V7.35174ZM1.3125 11.109C1.3125 10.8599 1.45078 10.621 1.69692 10.4448C1.94306 10.2687 2.2769 10.1697 2.625 10.1697H5.25C5.5981 10.1697 5.93194 10.2687 6.17808 10.4448C6.42422 10.621 6.5625 10.8599 6.5625 11.109V13.927C6.5625 14.1761 6.42422 14.415 6.17808 14.5912C5.93194 14.7673 5.5981 14.8663 5.25 14.8663H2.625C2.2769 14.8663 1.94306 14.7673 1.69692 14.5912C1.45078 14.415 1.3125 14.1761 1.3125 13.927V11.109Z"
                                        fill="#E1DB4E"
                                      />
                                    </svg>
                                    <div className="flex flex-col font-bold mb-3 justify-between ">
                                      <p className=" text-[12px] text-center  text-[#FFF]">
                                        {getDisplayDateSoccer(
                                          item?.stime.split(" ")[0]
                                        )}
                                      </p>
                                      <p className="text-[12px] text-center  text-[#FFF]">
                                        {item?.stime.split(" ")[1]}
                                      </p>
                                    </div>
                                    <div className="flex w-[100%] ">
                                      <button className="w-[100%] border-r border-black p-1 bg-[#0096FF] text-black font-bold rounded-tl-[6px] rounded-bl-[6px]">
                                        {item.section[2].odds[1].odds}
                                      </button>
                                      <button className="w-[100%] border-r border-black  p-1 bg-[#FF6A8A] text-black font-bold rounded-tr-[6px] rounded-br-[6px]">
                                        {item.section[2].odds[0].odds}
                                      </button>
                                    </div>
                                  </div>
                                  <div className="flex flex-col justify-between w-[100%] gap-4 items-center">
                                    <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... flex items-center justify-center h-[50px] w-[50px] p-[2px] rounded-[50%] ">
                                      <p className="rounded-[50%] text-black text-xs w-[100%] h-[100%] flex items-center justify-center bg-orange-200 p-1">
                                        {getTeamShortName(team2)}
                                      </p>
                                    </span>
                                    <div className="marquee-container">
                                      <p
                                        className={`marquee-text font-bold text-center text-xs w-[80px] ${
                                          isRunning &&
                                          isRunningTeamName == team2 &&
                                          item.gmid == isRunningMatchId
                                            ? "running"
                                            : ""
                                        }`}
                                        onMouseOver={() =>
                                          handleMouseOver(team2, item.gmid)
                                        }
                                        onMouseOut={() => handleMouseOut()}
                                      >
                                        {team2}
                                      </p>
                                    </div>
                                    <div className="flex w-[100%]  gap-2">
                                      <button className="w-[100%] flex justify-center items-center py-[6px] p-1 bg-[#35383F] text-black font-bold rounded-[4px]">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="19"
                                          height="20"
                                          viewBox="0 0 19 20"
                                          fill="none"
                                        >
                                          <g clip-path="url(#clip0_301_3852)">
                                            <path
                                              d="M3.40324 18.5625C3.31062 19.1175 3.83074 19.5512 4.28912 19.3037L9.50224 16.4837L14.7142 19.3037C15.1726 19.5512 15.6927 19.1175 15.6001 18.5637L14.6144 12.6512L18.7968 8.45621C19.1887 8.06371 18.9868 7.34622 18.4619 7.26871L12.6456 6.39872L10.0521 0.989965C10.0026 0.880326 9.9247 0.787694 9.82727 0.72283C9.72984 0.657967 9.61693 0.623535 9.50165 0.623535C9.38637 0.623535 9.27345 0.657967 9.17602 0.72283C9.07859 0.787694 9.00065 0.880326 8.95124 0.989965L6.35774 6.39996L0.541366 7.26997C0.0176783 7.34747 -0.185384 8.06496 0.205303 8.45746L4.38887 12.6525L3.40324 18.565V18.5625ZM9.22793 15.1037L4.8508 17.4712L5.67493 12.525C5.69423 12.4111 5.68668 12.294 5.65293 12.1839C5.61918 12.0739 5.56027 11.9742 5.48137 11.8937L2.03049 8.43121L6.84224 7.71122C6.94188 7.69538 7.03638 7.65435 7.11766 7.59165C7.19894 7.52896 7.26457 7.44645 7.30893 7.35122L9.49987 2.77871L11.6932 7.35122C11.7375 7.44645 11.8032 7.52896 11.8844 7.59165C11.9657 7.65435 12.0602 7.69538 12.1599 7.71122L16.9716 8.42997L13.5207 11.8925C13.4417 11.9731 13.3826 12.0729 13.3489 12.1833C13.3151 12.2936 13.3077 12.4109 13.3272 12.525L14.1513 17.4712L9.77418 15.1037C9.68954 15.0578 9.59569 15.0338 9.50046 15.0338C9.40523 15.0338 9.31257 15.0578 9.22793 15.1037Z"
                                              fill="#FABC38"
                                            />
                                          </g>
                                          <defs>
                                            <clipPath id="clip0_301_3852">
                                              <rect
                                                width="19"
                                                height="20"
                                                fill="white"
                                              />
                                            </clipPath>
                                          </defs>
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      )}
                    </>
                  );
                })}
            </div>
          </>
        )}

        {/* <div className="grid w-[95%] m-auto sm:w-[100%] mt-[16px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {matchData &&
            matchData.map((item: CricketData) => {
              return (
                <>
                  
                  <Link key={item.gmid} href={`/sports/${item.gmid}/4`}>
                    <div
                      style={{ border: "0.5px solid #444" }}
                      className="flex flex-col gap-7 p-2 md:p-3 w-[100%] min-h-[260px] justify-between  rounded-[10px] md:rounded-[16px] bg-[#212632]"
                    >
                      <div className="flex flex-col w-[100%]  gap-3">
                        <div className="flex justify-between w-[100%]  ">
                          <div className="flex flex-col w-[85%] gap-4  sm:gap-2">
                            <p className="  text-[18px] sm:text-[14px] font-bold text-white">
                               League Name
                            </p>
                            <div className="flex justify-between ">
                              <p className=" text-[12px] sm:text-[10px] text-[#FFF]">
                                Date:
                                {item.eventName.split(" / ")[1].split("  ")[0]}
                              </p>
                              <p className="text-[12px] sm:text-[10px]  text-[#FFF]">
                                Time:
                                {item.eventName.split(" / ")[1].split("  ")[1]}
                              </p>
                            </div>
                          </div>
                          <div className="">
                            <Image src={teams} alt="teams" />
                          </div>
                        </div>
                        <div className="flex justify-between mt-2 sm:mt-0 items-center gap-4 sm:gap-2 ">
                          <p className="text-[13px] sm:text-[11px] flex gap-1  font-semibold text-white">
                            <span className="mt-[2px]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="10"
                                viewBox="0 0 10 10"
                                fill="none"
                              >
                                <path
                                  d="M1.68542 9.27603C1.63953 9.53898 1.89722 9.74448 2.12433 9.62722L4.70718 8.29115L7.28944 9.62722C7.51655 9.74448 7.77424 9.53898 7.72835 9.27662L7.24002 6.47537L9.31219 4.48785C9.50634 4.30189 9.40632 3.96195 9.14627 3.92523L6.26454 3.51304L4.97958 0.950464C4.95511 0.898519 4.91649 0.854631 4.86822 0.8239C4.81994 0.793169 4.764 0.776855 4.70688 0.776855C4.64977 0.776855 4.59382 0.793169 4.54555 0.8239C4.49728 0.854631 4.45866 0.898519 4.43418 0.950464L3.14923 3.51363L0.267495 3.92583C0.00803298 3.96254 -0.0925747 4.30248 0.100992 4.48844L2.17375 6.47597L1.68542 9.27721V9.27603ZM4.57127 7.63733L2.40261 8.75901L2.81093 6.41556C2.82049 6.36161 2.81675 6.30613 2.80003 6.25398C2.78331 6.20183 2.75412 6.15462 2.71503 6.11648L1.00528 4.47601L3.38928 4.13488C3.43864 4.12738 3.48546 4.10794 3.52573 4.07824C3.566 4.04853 3.59852 4.00944 3.6205 3.96432L4.706 1.79794L5.79268 3.96432C5.81466 4.00944 5.84718 4.04853 5.88745 4.07824C5.92772 4.10794 5.97454 4.12738 6.0239 4.13488L8.4079 4.47541L6.69815 6.11589C6.65897 6.15409 6.62973 6.2014 6.613 6.25366C6.59628 6.30592 6.59258 6.36152 6.60225 6.41556L7.01057 8.75901L4.84191 7.63733C4.79997 7.61556 4.75348 7.60421 4.7063 7.60421C4.65911 7.60421 4.61321 7.61556 4.57127 7.63733Z"
                                  fill="#949498"
                                />
                              </svg>
                            </span>


                            {item.eventName.split(" / ")[0]}
                          </p>
                          {item.inPlay == "True" ? (
                            <button className="px-2 text-[8px] md:text-[10px] rounded-[4px] p-[2px] bg-red-600">
                              Live
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      <div className="flex text-white justify-between text-[9px] w-[90%] m-auto sm:w-[100%]">
                        <div className="flex  gap-2">
                          <button className="px-2 p-1 bg-[#0096FF] rounded-[6px]">
                            {item.back1}
                          </button>
                          <button className="px-2 p-1 bg-[#FF6A8A] rounded-[6px]">
                            {item.lay1}
                          </button>
                        </div>
                        <div className="flex  gap-2">
                          <button className="px-2 p-1 bg-[#0096FF] rounded-[6px]">
                            {item.back11}
                          </button>
                          <button className="px-2 p-1 bg-[#FF6A8A] rounded-[6px]">
                            {item.lay11}
                          </button>
                        </div>
                      </div>

                      <div>
                        <button className="w-[100%] mb-3 flex justify-center gap-1 items-center text-[10px] md:text-xs p-2 bg-[#DCA029] rounded-[10px]">
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
                          <span>Place Bet</span>
                        </button>
                      </div>
                    </div>
                  </Link>
                 
                </>
              );
            })}
        </div> */}
      </div>
    </div>
  );
};

export default SoccerData;
