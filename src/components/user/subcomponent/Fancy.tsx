"use client";
import { Spinner, Text, Tooltip, useToast } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import Bet from "../Bet";
import { fetchGetRequest, sendPostRequest } from "@/api/api";
import { BetSlip, Match } from "../../../../utils/typescript.module";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux-arch/store";
import { fetchUserDataAsync } from "@/app/redux-arch/userauth/auth.slice";
import { ThunkDispatch } from "redux-thunk";
type BetType = "back" | "lay";

interface FancytData {
  b1: string;
  b2: string;
  b3: string;
  ballsess: string;
  bs1: string;
  bs2: string;
  bs3: string;
  gstatus: string;
  gtype: string;
  gvalid: string;
  l1: string;
  l2: string;
  l3: string;
  ls1: string;
  ls2: string;
  ls3: string;
  max: string;
  mid: string;
  min: string;
  nat: string;
  remark: string;
  s1: string;
  s2: string;
  sid: string;
  srno: string;
  utime: string;
}
interface FancyProps {
  singleMatch: Match | undefined;
}
const Fancy: React.FC<FancyProps> = ({ singleMatch }) => {
  const [betShow, setBetShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<FancytData[]>([]);
  const [rate, setRate] = useState<number>(0);
  const [stake, setStake] = useState<number>(0);
  const [team, setTeam] = useState<string>("");
  const [size, setSize] = useState<string>("0");
  const [leagueName, setLeagueName] = useState<string>("");
  const [betType, setBetType] = useState<BetType>();
  const [matchName, setMatchName] = useState<string>("");
  const [question, setQuestion] = useState<string>("");

  const [sId, setSId] = useState<any>();
  const [marketId, setMarketId] = useState<string>();
  const [bet, setBet] = useState<any>();
  const [betLoading, setBetLoading] = useState<boolean>();
  const toast = useToast();
  const param = useParams();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const userAuth = useSelector((state: RootState) => state);
  const {
    username = "",
    user_id = "",
    min_limit = 100,
    max_limit = 10000,
    exposure_limit = 0,
    amount = 0,
    parent_admin_id = "",
    parent_admin_username = "",
    parent_admin_role_type = "",
  } = userAuth?.combineR?.userAuth?.data?.user || {};
  const { token = "", otpless_token = "" } =
    userAuth?.combineR?.userAuth?.data?.data || {};
  // fetch data of odds, bbokmaker, fancy, toss
  useEffect(() => {
    const socket = socketIOClient(`${process.env.NEXT_PUBLIC_BASE_URL}`);
    socket.on("connect", () => {
      setLoading(true);
    });
    socket.on("fancyData", (data) => {
      if (data) {
        let sortedData = (data?.t3 || data?.t4 || []).sort(
          (a: any, b: any) => a.sid - b.sid
        );
        setData(sortedData || []);
      }
      setLoading(false);
    });
    socket.on("disconnect", () => {
      setLoading(false);
    });

    // Emit the "startFetching" event with the eventID
    socket.emit("startFetchingFancy", param.id);

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
      setLoading(false);
    };
  }, [param.id]);

  const handleBet = (
    odd: number,
    team: string,
    betType: BetType,
    size: string,
    sid: string,
    nat: string,
    mid: string

    // matchName: string
  ) => {
    if (odd < 1) {
      return;
    }
    setBetShow(true);
    setRate(odd);
    // setMatchName(matchName);
    setTeam(team);
    setBetType(betType);
    setSize(size);
    setSId(sid);
    setQuestion(nat);
    setMarketId(mid);
    // alert(mid+sid)
  };

  const [rules, setRules] = useState<any>({});
  const fetchGeneralSetting = async () => {
    try {
      const response = await fetchGetRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/rules/get-rules/652a38fb2a2e359a326f3cd3`
      );

      setRules(response.data);
    } catch (error) {
    }
  };
  useEffect(() => {
    fetchGeneralSetting();
  }, []);

  const handlePlaceBet = async () => {
    if (!token || !otpless_token) {
      toast({
        description: "Please login first.",
        status: "warning",
        duration: 4000,
        position: "bottom",
        isClosable: true,
      });
      setBetShow(false);
      setBetLoading(false);
      return;
    }
    let singleFancy = data.find((ele: any) => ele.sid == sId);
    if (singleFancy?.gstatus !== "") {
      toast({
        description: `Fancy ${singleFancy?.gstatus}`,
        status: "warning",
        duration: 4000,
        position: "bottom",
        isClosable: true,
      });
      setBetShow(false);
      setBetLoading(false);
      return;
    }
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
      question: question,
      stake: stake,
      match_id,
      match_date: singleMatch?.open_date,
      event_name: event_name,
      event_type: "sport",
      league_name: singleMatch?.league_name,
      rate,
      bet_category: "fancy",
      size: size,
      parent_admin_id,
      parent_admin_username,
      parent_admin_role_type,
      question_id: sId,
      market_id: marketId,
    };
    let oldExposure = stake + exposure_limit;
    let allBet = [...bet, payload];
    if (oldExposure > amount) {
      toast({
        description: "Insufficient Balance.",
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      return;
    }
    setBetLoading(true);
    setTimeout(async() => {

    try {
      const response = await sendPostRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/bet/place-sport-bet`,
        { ...payload, exposure_limit: oldExposure }
      );
      setBetLoading(false);
      setBetShow(false);
      setBet((prev: any) => [...prev, response.data.bet]);
      dispatch(fetchUserDataAsync());
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
  }, rules.bet_timing || 4000);
  };

  const fetchBetData = async () => {
    const category = "fancy";
    const match_id = param.id;

    if (!user_id) {
      return;
    }

    try {
      // user id then match_id we have to pass here
      const response = await fetchGetRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/bet/get-all-bet/${user_id}?category=${category}&match_id=${match_id}`
      );
      const data = response.data || [];
      setBet(data);
    } catch (error: any) {
      toast({
        description: error || "d",
        status: "error",
        position: "top",
        duration: 4000,
        isClosable: true,
      });
      //console.error(error);
    }
  };

  useEffect(() => {
    fetchBetData();
  }, []);

  return (
    <div className="min-h-[140px]">
      
    
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
                FANCY
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
            {loading?
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
           
            <div className="  flex flex-col  gap-3 w-[100%] ">
              {data &&
                data.map((item) => (
                  <div
                    key={item.sid}
                    className=" bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... p-[1px] rounded-[16px]"
                  >
                    <div
                      key={item.sid}
                      style={{ border: "0.5px solid #444" }}
                      className="h-[100%]  flex items-center rounded-[16px] bg-[#212632] justify-between p-3   w-[100%]"
                    >
                      <div className="flex  gap-3">
                        <div>
                          <p className="text-white text-xs font-semibold">
                            {item.nat}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center  gap-2 lg:gap-6">
                        {item.gstatus !== "" ? (
                          <div className=" text-center  bg-black  opacity-60 rounded-2xl flex items-center justify-center h-[45px]">
                            <Text className="m-auto flex  justify-center opacity-150 text-red-600 items-center font-bold text-center rounded-[8px]  py-1 px-6">
                              {" "}
                              {item.gstatus}
                            </Text>
                          </div>
                        ) : (
                          <div className="flex  gap-1">
                            <button
                              onClick={() =>
                                handleBet(
                                  Number(item.l1),
                                  item.nat,
                                  "lay",
                                  item.bs1,
                                  item.sid,
                                  item.nat,
                                  item.mid
                                )
                              }
                              className="bg-[#FD5FA1] w-[70px]  flex items-center justify-center   text-white  flex-col  rounded-[8px]  py-1 px-6"
                            >
                              <span className="text-xs">{item.l1}</span>
                              <span className="text-[10px]">{item.ls1}</span>
                            </button>
                            <button
                              onClick={() =>
                                handleBet(
                                  Number(item.b1),
                                  item.nat,
                                  "back",
                                  item.bs1,
                                  item.sid,
                                  item.nat,
                                  item.mid
                                )
                              }
                              className="bg-[#41ADFA] w-[70px]  flex items-center justify-center text-white  flex-col  rounded-[8px] py-1 px-6 "
                            >
                              <span className="text-xs text-center">
                                {item.b1}
                              </span>
                              <span className="text-[10px] text-center">
                                {item.bs1}
                              </span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              <div className="h-[1px] bg-[#444444C7]"></div>
              {betShow && (
                <Bet
                  betShow={betShow}
                  setBetShow={setBetShow}
                  stake={stake}
                  rate={rate}
                  betType={betType}
                  betCategory={"fancy"}
                  setStake={setStake}
                  setRate={setRate}
                  handlePlaceBet={handlePlaceBet}
                  team={team}
                  question={question}
                  betLoading={betLoading}
                />
              )}
            </div>
          </div>
        </div>
      
    </div>
  );
};

export default Fancy;
