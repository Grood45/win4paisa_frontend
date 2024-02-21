"use client";
import { Spinner, Tooltip, useToast } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import Bet from "../Bet";
import { BetSlip, Match } from "../../../../utils/typescript.module";
import { fetchGetRequest, sendPostRequest } from "@/api/api";
import { calculatePL } from "../../../../utils/betCalculation";
type BetType = "back" | "lay";
import timeInSecond from "../../../../utils/timeInSecond";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux-arch/store";
interface BookmakerData {
  b1: string;
  b1s: string;
  b2: string;
  b2s: string;
  b3: string;
  b3s: string;
  bs1: string;
  bs2: string;
  bs3: string;
  gtype: string;
  l1: string;
  l1s: string;
  l2: string;
  l2s: string;
  l3: string;
  l3s: string;
  ls1: string;
  ls2: string;
  ls3: string;
  max: string;
  mid: string;
  min: string;
  mname: string;
  nat: string;
  remark: string;
  remark1: string;
  s: string;
  sid: string;
  sr: string;
  utime: string;
}

interface FancyProps {
  singleMatch: Match | undefined;
}
const Bookmaker: React.FC<FancyProps> = ({ singleMatch }) => {
  const [betShow, setBetShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loading1, setLoading1] = useState<boolean>(false);

  const [data, setData] = useState<any>([]);
  const [rate, setRate] = useState<number>(0);
  const [stake, setStake] = useState<number>(0);
  const [team, setTeam] = useState<string>("");
  const [leagueName, setLeagueName] = useState<string>("");
  const [betType, setBetType] = useState<BetType>();
  const [matchName, setMatchName] = useState<string>("");
  const [firstTeamPl, setFirstTeamPl] = useState(0);
  const [secondTeamPl, setSecondTeamPl] = useState(0);
  const [bet, setBet] = useState<BetSlip[]>([]);
  const [betLoading, setBetLoading] = useState<boolean>();
  const [prevCricketDataofOdds, setPrevCricketDataofOdds] = useState<any>([]);
  const userAuth = useSelector((state: RootState) => state);
  const {
    username = "",
    amount = 0,
    exposure_limit = 0,
    max_limit = 10000,
    min_limit = 100,
    user_id = "",
    parent_admin_id = "",
    parent_admin_username = "",
    parent_admin_role_type = "",
  } = userAuth?.combineR?.userAuth?.data?.user || {};
  const { token = "", otpless_token = "" } =
    userAuth?.combineR?.userAuth?.data?.data || {};
  const param = useParams();
  const toast = useToast();

  const handleBet = (
    odd: number,
    team: string,
    betType: BetType
    // matchName: string
  ) => {
    if (odd < 1) {
      return;
    }
    if (odd > 10) {
      toast({
        description: "odd value should be less than 10",
        status: "warning",
        duration: 4000,
        position: "bottom",
        isClosable: true,
      });
      return;
    }
    setBetShow(false);
    setRate(odd);
    // setMatchName(matchName);
    setTeam(team);
    setBetType(betType);
  };
  const handlePlaceBet = async () => {
    if (!token || !otpless_token) {
      toast({
        description: "Please login first.",
        status: "warning",
        duration: 4000,
        position: "bottom",
        isClosable: true,
      });
      return;
    }
    toast({
      description: "Coming soon.",
      status: "warning",
      duration: 4000,
      position: "bottom",
      isClosable: true,
    });
    return;
    if (stake < min_limit) {
      toast({
        description: `Minimun amount to place a bet is ${min_limit}.`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      return;
    }

    if (stake > max_limit) {
      toast({
        description: `Maximum amount to place a bet is ${max_limit}.`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      return;
    }
    let event_name =
      param.sport_id == "4"
        ? "cricket"
        : param.sport_id == "1"
        ? "soccer"
        : "tennis";
    const match_id = param.id;
    const payload = {
      user_id: user_id,
      username,
      league_id: singleMatch?.league_id,
      match_name: singleMatch?.match_name,
      bet_type: betType,
      runner_name: team,
      stake: stake,
      match_id,
      match_date: singleMatch?.open_date,
      event_name: event_name,
      event_type: "sport",
      league_name: singleMatch?.league_name,
      rate,
      bet_category: "bookmaker",
      parent_admin_id,
      parent_admin_username,
      parent_admin_role_type,
    };
    setBetLoading(true);
    let oldExposure = Math.min(firstTeamPl, secondTeamPl);
    let originalExposure = exposure_limit;

    if (oldExposure < 0) {
      originalExposure = originalExposure - Math.abs(oldExposure);
    }
    let allBet = [...bet, payload];
    let [l1, l2] = calculatePL(allBet, data[0]?.nat, data[1]?.nat);
    let newExposure = Math.min(l1, l2);

    if (newExposure < 0) {
      originalExposure += Math.abs(newExposure);
    }
    if (originalExposure > amount) {
      toast({
        description: "Insufficient Balance.",
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      return;
    }
    try {
      const response = await sendPostRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/bet/place-sport-bet`,
        { ...payload, exposure_limit: originalExposure }
      );
      setBet((prev: any) => [...prev, response.data.bet]);
      setBetLoading(false);
      setBetShow(false);
      toast({
        description: response.message,
        status: "success",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        description: error.message,
        status: "error",
        position: "top",
        duration: 4000,
        isClosable: true,
      });
      setBetLoading(false);
    }
  };
  // fetch data of odds, bbokmaker, fancy, toss
  useEffect(() => {
    const socket = socketIOClient(`${process.env.NEXT_PUBLIC_BASE_URL}`);
    socket.on("connect", () => {
      setLoading(true);
    });
    socket.on("bookmakerData", (data) => {
      if (data.t2) {
        setData((prev: any) => {
          setPrevCricketDataofOdds(prev);
          const filteredData = data.t2.filter((item:any) => item.bm1.some((bm:any) => bm.nat !== "NO" && bm.nat !== "YES"));

          


          return filteredData[0]?.bm1 || [];
        });
      }
    });
    socket.on("disconnect", () => {
      setLoading(false);

    });

    // Emit the "startFetching" event with the eventID
    socket.emit("startFetchingBookmaker", param.id);

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
      setLoading(false);

    };
  }, [param.id]);

  const fetchBetData = async () => {
    const category = "bookmaker";
    const match_id = param.id;
    setLoading1(true)
    if (!user_id) {
      setLoading1(false)
      return;
    }

    try {
      // user id then match_id we have to pass here
      const response = await fetchGetRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/bet/get-all-bet/${user_id}?category=${category}&match_id=${match_id}&status=pending`
      );

      const data = response.data;
    setLoading1(false)

      setBet(data);

    } catch (error: any) {
    setLoading1(false)

      toast({
        description: error.message || "d",
        status: "error",
        position: "top",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchBetData();
  }, []);

  useEffect(() => {
    let team = singleMatch?.match_name.split(" v " || "vs");
    if (Array.isArray(team)) {
      const result = calculatePL(bet, team[0], team[1]);
      let [pl1, pl2] = result;
      setFirstTeamPl(pl1);
      setSecondTeamPl(pl2);
    }
  }, [bet]);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex w-[100%] justify-between">
          <p className="flex items-center text-white text-sm font-semibold gap-1">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="20"
                viewBox="0 0 23 20"
                fill="none"
              >
                <path
                  d="M10.4022 16.2503H7.7932C6.51768 16.2503 5.47407 17.1503 5.47407 18.2502V18.5002H4.3145C3.83908 18.5002 3.44482 18.8402 3.44482 19.2502C3.44482 19.6602 3.83908 20.0002 4.3145 20.0002H18.2293C18.7047 20.0002 19.099 19.6602 19.099 19.2502C19.099 18.8402 18.7047 18.5002 18.2293 18.5002H17.0697V18.2502C17.0697 17.1503 16.0261 16.2503 14.7506 16.2503H12.1416V13.9604C11.8517 13.9904 11.5618 14.0004 11.2719 14.0004C10.982 14.0004 10.6921 13.9904 10.4022 13.9604V16.2503Z"
                  fill="white"
                />
                <path
                  d="M18.785 9.63955C19.5503 9.38956 20.2229 8.97958 20.7563 8.5196C21.8347 7.48965 22.542 6.25971 22.542 4.81977C22.542 3.37984 21.2317 2.24989 19.5619 2.24989H18.9125C18.1588 0.919957 16.5818 0 14.7497 0H7.79229C5.96018 0 4.38317 0.919957 3.62945 2.24989H2.98009C1.31031 2.24989 0 3.37984 0 4.81977C0 6.25971 0.707336 7.48965 1.78573 8.5196C2.31914 8.97958 2.99168 9.38956 3.757 9.63955C4.96295 12.1994 7.86187 13.9993 11.271 13.9993C14.6801 13.9993 17.579 12.1994 18.785 9.63955ZM14.5642 6.4497L13.8452 7.20966C13.7293 7.31966 13.6481 7.53965 13.6597 7.68964L13.7293 8.66959C13.7757 9.26957 13.277 9.57955 12.6277 9.35956L11.5725 8.99958C11.4101 8.94958 11.1318 8.94958 10.9695 8.99958L9.9143 9.35956C9.26495 9.57955 8.76633 9.26957 8.81271 8.66959L8.88229 7.68964C8.89388 7.53965 8.81271 7.31966 8.69676 7.20966L7.97783 6.4497C7.52559 5.98972 7.72272 5.47974 8.39527 5.32975L9.49686 5.08976C9.67079 5.04976 9.87952 4.90977 9.97228 4.77978L10.5869 3.95981C10.9695 3.44984 11.5725 3.44984 11.9551 3.95981L12.5697 4.77978C12.6625 4.90977 12.8712 5.04976 13.0451 5.08976L14.1467 5.32975C14.8193 5.47974 15.0164 5.98972 14.5642 6.4497Z"
                  fill="white"
                />
              </svg>
            </span>
            BOOKMAKER
          </p>

          <div>
            <Tooltip
              hasArrow
              arrowSize={20}
              label={
                <div className="  text-white p-2 flex text-xs flex-col items-center gap-5">
                  <p>
                    Stake Limit : {min_limit} - {max_limit}
                  </p>
                  <p>Max Profit : 10000000</p>
                </div>
              }
              width="100%"
              height={"100%"}
              borderRadius={"10px"}
              placement="left"
              bg="#212632"
              border="1px solid gray"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M10 0C4.49 0 0 4.49 0 10C0 15.51 4.49 20 10 20C15.51 20 20 15.51 20 10C20 4.49 15.51 0 10 0ZM9.25 6C9.25 5.59 9.59 5.25 10 5.25C10.41 5.25 10.75 5.59 10.75 6V11C10.75 11.41 10.41 11.75 10 11.75C9.59 11.75 9.25 11.41 9.25 11V6ZM10.92 14.38C10.87 14.51 10.8 14.61 10.71 14.71C10.61 14.8 10.5 14.87 10.38 14.92C10.26 14.97 10.13 15 10 15C9.87 15 9.74 14.97 9.62 14.92C9.5 14.87 9.39 14.8 9.29 14.71C9.2 14.61 9.13 14.51 9.08 14.38C9.03 14.26 9 14.13 9 14C9 13.87 9.03 13.74 9.08 13.62C9.13 13.5 9.2 13.39 9.29 13.29C9.39 13.2 9.5 13.13 9.62 13.08C9.86 12.98 10.14 12.98 10.38 13.08C10.5 13.13 10.61 13.2 10.71 13.29C10.8 13.39 10.87 13.5 10.92 13.62C10.97 13.74 11 13.87 11 14C11 14.13 10.97 14.26 10.92 14.38Z"
                  fill="white"
                />
              </svg>
            </Tooltip>
          </div>
        </div>
        <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... p-[1px] rounded-[16px]">
          <div
            style={{ border: "0.5px solid #444" }}
            className="rounded-[16px] bg-[#212632] min-h-[140px]  flex flex-col w-[100%] "
          >
                       {loading1?
            <div className="w-full mt-12 flex item-center justify-center">
               <div className="spinner">
  <span>L</span>
  <span>O</span>
  <span>A</span>
  <span>D</span>
  <span>I</span>
  <span>N</span>
  <span>G</span>
</div></div>
:data.length===0?<div className="text-center flex items-center min-h-[140px]  justify-center font-semibold "><p>Not Data Found</p></div>:""}
            {data &&
              data.length > 0 &&
              data.map((item: any, index: any) => (
                <>
                  {item.nat !== "The Draw" && (
                    <div key={index}>
                      <div className="h-[100%] flex items-center gap-2 justify-between p-3   w-[100%]">
                        <div className="flex  gap-3">
                          {/* <button className="h-[30px] w-[30px] text-[10px] bg-[#EAAB0F] border-2 border-[black]  text-white rounded-[50%]">
                      BA
                    </button> */}
                          <div>
                            <p className="text-white text-xs font-semibold">
                              {item?.nat}
                            </p>
                            <p
                              className={`${
                                secondTeamPl < 0 && index == 1
                                  ? "text-red-800"
                                  : "text-[#0FBF00]"
                              } ${
                                firstTeamPl < 0 && index == 0
                                  ? "text-red-800"
                                  : "text-[#0FBF00]"
                              } text-xs font-semibold`}
                            >
                              {index == 0 ? firstTeamPl : secondTeamPl}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 lg:gap-3">
                          <div className="flex gap-1">
                            <div className="hidden lg:contents">
                              <button
                                onClick={() =>
                                  handleBet(Number(item.b3), item.nat, "back")
                                }
                                className={`${
                                  (prevCricketDataofOdds &&
                                    prevCricketDataofOdds[index]?.b3 !==
                                      item?.b3) ||
                                  prevCricketDataofOdds[index]?.bs3 !==
                                    item?.bs3
                                    ? "animate-pulse  bg-blue-600 opacity-4 w-[90px] items-center justify-center text-white flex flex-col rounded-[8px] py-1 px-6"
                                    : "bg-[#41ADFA] w-[90px] items-center justify-center text-white flex flex-col  rounded-[8px] py-1 px-6"
                                }`}
                              >
                                <span className="text-xs">{item?.b3}</span>
                                <span className="text-[10px]">
                                  {Math.round(+item?.bs3)}
                                </span>
                              </button>
                            </div>
                            <div className="hidden lg:contents">
                              <button
                                onClick={() =>
                                  handleBet(Number(item.b2), item.nat, "back")
                                }
                                className={`${
                                  (prevCricketDataofOdds &&
                                    prevCricketDataofOdds[index]?.b2 !==
                                      item?.b2) ||
                                  prevCricketDataofOdds[index]?.bs2 !==
                                    item?.bs2
                                    ? "animate-pulse  bg-blue-600 opacity-4 w-[90px] items-center justify-center text-white flex flex-col rounded-[8px] py-1 px-6"
                                    : "bg-[#41ADFA] w-[90px] items-center justify-center text-white flex flex-col  rounded-[8px] py-1 px-6"
                                }`}
                              >
                                <span className="text-xs">{item?.b2}</span>
                                <span className="text-[10px]">
                                  {Math.round(+item?.bs2)}
                                </span>
                              </button>
                            </div>
                            <div className="">
                              <button
                                onClick={() =>
                                  handleBet(Number(item.b1), item.nat, "back")
                                }
                                className={`${
                                  (prevCricketDataofOdds &&
                                    prevCricketDataofOdds[index]?.b1 !==
                                      item.b1) ||
                                  prevCricketDataofOdds[index]?.bs1 !== item.bs1
                                    ? "animate-pulse  bg-blue-600 opacity-4 w-[90px] items-center justify-center text-white flex flex-col rounded-[8px] py-1 px-6"
                                    : "bg-[#41ADFA] w-[90px] items-center justify-center text-white flex flex-col  rounded-[8px] py-1 px-6"
                                }`}
                              >
                                <span className="text-xs">{item.b1}</span>
                                <span className="text-[10px]">
                                  {Math.round(+item.bs1)}
                                </span>
                              </button>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <div className="hidden lg:contents">
                              <button
                                onClick={() =>
                                  handleBet(Number(item.l1), item.nat, "lay")
                                }
                                className={`${
                                  (prevCricketDataofOdds &&
                                    prevCricketDataofOdds[index]?.l1 !==
                                      item?.l1) ||
                                  prevCricketDataofOdds[index]?.ls1 !==
                                    item?.ls1
                                    ? "animate-pulse opacity-3 bg-red-600 w-[90px] items-center justify-center  text-white flex flex-col  rounded-[8px] py-1 px-6"
                                    : "bg-[#FD5FA1] w-[90px] items-center justify-center  text-white flex flex-col  rounded-[8px] py-1 px-6"
                                }`}
                              >
                                <span className="text-xs">{item?.l1}</span>
                                <span className="text-[10px]">
                                  {Math.round(+item?.ls1)}
                                </span>
                              </button>
                            </div>
                            <div className="hidden lg:contents">
                              <button
                                onClick={() =>
                                  handleBet(Number(item.l2), item.nat, "lay")
                                }
                                className={`${
                                  (prevCricketDataofOdds &&
                                    prevCricketDataofOdds[index]?.l2 !==
                                      item.l2) ||
                                  prevCricketDataofOdds[index]?.ls2 !== item.ls2
                                    ? "animate-pulse opacity-3 bg-red-600 w-[90px] items-center justify-center  text-white flex flex-col  rounded-[8px] py-1 px-6"
                                    : "bg-[#FD5FA1] w-[90px] items-center justify-center  text-white flex flex-col  rounded-[8px] py-1 px-6"
                                }`}
                              >
                                <span className="text-xs">{item?.l2}</span>
                                <span className="text-[10px]">
                                  {Math.round(+item?.ls2)}
                                </span>
                              </button>
                            </div>
                            <div className="">
                              <button
                                onClick={() =>
                                  handleBet(Number(item.l3), item.nat, "lay")
                                }
                                className={`${
                                  (prevCricketDataofOdds &&
                                    prevCricketDataofOdds[index]?.l3 !==
                                      item?.l3) ||
                                  prevCricketDataofOdds[index]?.ls3 !==
                                    item?.ls3
                                    ? "animate-pulse opacity-3 bg-red-600 w-[90px] items-center justify-center  text-white flex flex-col  rounded-[8px] py-1 px-6"
                                    : "bg-[#FD5FA1] w-[90px] items-center justify-center  text-white flex flex-col  rounded-[8px] py-1 px-6"
                                }`}
                              >
                                <span className="text-xs">{item?.l3}</span>
                                <span className="text-[10px]">
                                  {Math.round(+item?.ls3)}
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {index === 0 && (
                        <div className="bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500 ... h-[1px] my-1"></div>
                      )}
                                         {/* {index === 1  && (
                    <div className="bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500 ... h-[1px] my-1"></div>
                  )} */}
                    </div>
                  )}
                </>
              ))}

            {/* {data && data.length>0&&
            data.map((item: any, index: Number) => (
              <>
                <div className="h-[100%] flex items-center justify-between p-3   w-[100%]">
                  <div className="flex  gap-3">
                    <button className="h-[30px] w-[30px] text-[10px] bg-[#EAAB0F] border-2 border-[black]  text-white rounded-[50%]">
                      BA
                    </button>
                    <div>
                      <p className="text-white text-xs font-semibold">
                        {item.section[0].nat}
                      </p>
                      <p className="text-[#0FBF00] text-xs font-semibold">0</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <div className="hidden lg:contents">
                        <button
                          onClick={() =>
                            handleBet(
                              item.section[0].odds[0].odds,
                              item.section[0].nat,
                              "back"
                            )
                          }
                          className="bg-[#41ADFA]  text-white flex flex-col  rounded-[8px] py-1 px-6 "
                        >
                          <span className="text-xs">
                            {item.section[0].odds[0].odds || "-"}
                          </span>
                          <span className="text-[10px]">
                            {item.section[0].odds[0].size || "-"}
                          </span>
                        </button>
                      </div>
                      <div className="hidden lg:contents">
                        <button
                          onClick={() =>
                            handleBet(
                              item.section[1].odds[0].odds,
                              item.section[0].nat,
                              "back"
                            )
                          }
                          className="bg-[#41ADFA]  text-white flex flex-col  rounded-[8px] py-1 px-6 "
                        >
                          <span className="text-xs">
                            {item.section[1].odds[0].odds || "-"}
                          </span>
                          <span className="text-[10px]">
                            {item.section[1].odds[0].size || "-"}
                          </span>
                        </button>
                      </div>
                      <div className="">
                        <button
                          onClick={() =>
                            handleBet(
                              Number(item.b1),
                              item.section[0].nat,
                              "back"
                            )
                          }
                          className="bg-[#41ADFA]  text-white flex flex-col  rounded-[8px] py-1 px-6 "
                        >
                          <span className="text-xs">
                            {item.section[2].odds[0].odds || "-"}
                          </span>
                          <span className="text-[10px]">
                            {item.section[2].odds[0].size || "-"}
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <div className="hidden lg:contents">
                        <button
                          onClick={() =>
                            handleBet(
                              item.section[0].odds[1].odds,
                              item.section[1].nat,
                              "lay"
                            )
                          }
                          className="bg-[#FD5FA1]  text-white flex flex-col  rounded-[8px] py-1 px-6 "
                        >
                          <span className="text-xs">
                            {item.section[0].odds[1].odds || "-"}
                          </span>
                          <span className="text-[10px]">
                            {item.section[0].odds[1].size || "-"}
                          </span>
                        </button>
                      </div>
                      <div className="hidden lg:contents">
                        <button
                          onClick={() =>
                            handleBet(
                              item.section[1].odds[1].odds,
                              item.section[1].nat,
                              "lay"
                            )
                          }
                          className="bg-[#FD5FA1]  text-white flex flex-col  rounded-[8px] py-1 px-6 "
                        >
                          <span className="text-xs">
                            {item.section[1].odds[1].odds || "-"}
                          </span>
                          <span className="text-[10px]">
                            {item.section[1].odds[1].size || "-"}
                          </span>
                        </button>
                      </div>
                      <div className="">
                        <button
                          onClick={() =>
                            handleBet(
                              item.section[2].odds[1].odds,
                              item.section[1].nat,
                              "lay"
                            )
                          }
                          className="bg-[#FD5FA1]  text-white flex flex-col  rounded-[8px] py-1 px-6 "
                        >
                          <span className="text-xs">
                            {item.section[2].odds[1].odds || "-"}
                          </span>
                          <span className="text-[10px]">
                            {item.section[2].odds[1].size || "-"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-[1px] bg-[#444444C7]"></div><div className="h-[100%] flex items-center justify-between p-3   w-[100%]">
                  <div className="flex  gap-3">
                    <button className="h-[30px] w-[30px] text-[10px] bg-[#EAAB0F] border-2 border-[black]  text-white rounded-[50%]">
                      BA
                    </button>
                    <div>
                      <p className="text-white text-xs font-semibold">
                        {item.section[0].nat}
                      </p>
                      <p className="text-[#0FBF00] text-xs font-semibold">0</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <div className="hidden lg:contents">
                        <button
                          onClick={() =>
                            handleBet(
                              item.section[0].odds[0].odds,
                              item.section[0].nat,
                              "back"
                            )
                          }
                          className="bg-[#41ADFA]  text-white flex flex-col  rounded-[8px] py-1 px-6 "
                        >
                          <span className="text-xs">
                            {item.section[0].odds[0].odds || "-"}
                          </span>
                          <span className="text-[10px]">
                            {item.section[0].odds[0].size || "-"}
                          </span>
                        </button>
                      </div>
                      <div className="hidden lg:contents">
                        <button
                          onClick={() =>
                            handleBet(
                              item.section[1].odds[0].odds,
                              item.section[0].nat,
                              "back"
                            )
                          }
                          className="bg-[#41ADFA]  text-white flex flex-col  rounded-[8px] py-1 px-6 "
                        >
                          <span className="text-xs">
                            {item.section[1].odds[0].odds || "-"}
                          </span>
                          <span className="text-[10px]">
                            {item.section[1].odds[0].size || "-"}
                          </span>
                        </button>
                      </div>
                      <div className="">
                        <button
                          onClick={() =>
                            handleBet(
                              Number(item.b1),
                              item.section[0].nat,
                              "back"
                            )
                          }
                          className="bg-[#41ADFA]  text-white flex flex-col  rounded-[8px] py-1 px-6 "
                        >
                          <span className="text-xs">
                            {item.section[2].odds[0].odds || "-"}
                          </span>
                          <span className="text-[10px]">
                            {item.section[2].odds[0].size || "-"}
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <div className="hidden lg:contents">
                        <button
                          onClick={() =>
                            handleBet(
                              item.section[0].odds[1].odds,
                              item.section[1].nat,
                              "lay"
                            )
                          }
                          className="bg-[#FD5FA1]  text-white flex flex-col  rounded-[8px] py-1 px-6 "
                        >
                          <span className="text-xs">
                            {item.section[0].odds[1].odds || "-"}
                          </span>
                          <span className="text-[10px]">
                            {item.section[0].odds[1].size || "-"}
                          </span>
                        </button>
                      </div>
                      <div className="hidden lg:contents">
                        <button
                          onClick={() =>
                            handleBet(
                              item.section[1].odds[1].odds,
                              item.section[1].nat,
                              "lay"
                            )
                          }
                          className="bg-[#FD5FA1]  text-white flex flex-col  rounded-[8px] py-1 px-6 "
                        >
                          <span className="text-xs">
                            {item.section[1].odds[1].odds || "-"}
                          </span>
                          <span className="text-[10px]">
                            {item.section[1].odds[1].size || "-"}
                          </span>
                        </button>
                      </div>
                      <div className="">
                        <button
                          onClick={() =>
                            handleBet(
                              item.section[2].odds[1].odds,
                              item.section[1].nat,
                              "lay"
                            )
                          }
                          className="bg-[#FD5FA1]  text-white flex flex-col  rounded-[8px] py-1 px-6 "
                        >
                          <span className="text-xs">
                            {item.section[2].odds[1].odds || "-"}
                          </span>
                          <span className="text-[10px]">
                            {item.section[2].odds[1].size || "-"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-[1px] bg-[#444444C7]"></div>
              </>
            ))} */}

            {betShow && (
              <Bet
                betShow={betShow}
                setBetShow={setBetShow}
                stake={stake}
                rate={rate}
                betType={betType}
                betCategory={"bookmaker"}
                setStake={setStake}
                setRate={setRate}
                handlePlaceBet={handlePlaceBet}
                team={team}
                betLoading={betLoading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookmaker;
