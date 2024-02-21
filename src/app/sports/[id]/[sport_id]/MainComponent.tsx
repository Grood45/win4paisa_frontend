"use client";

import RightSidebar from "@/components/user/RightSidebar";
import SidebarNavbar from "@/components/user/SidebarNavbar";
import TopNavbar from "@/components/user/TopNavbar";
import { Tooltip, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import cancel from "../../../assetuser/authsocial/CANCLE.png";
import Image from "next/image";
import Bet from "@/components/user/Bet";
import { useDispatch } from "react-redux";
import { manageSideBar_Fn } from "../../../redux-arch/fetures/nav-slice";
import { AppDispatch, useAppSelector } from "../../../redux-arch/store";
import Bookmaker from "@/components/user/subcomponent/BookMaker";
import WhoWinTheToss from "@/components/user/subcomponent/WhoWinTheToss";
import MatchOdds from "@/components/user/subcomponent/MatchOdds";
import Fancy from "@/components/user/subcomponent/Fancy";
import socketIOClient from "socket.io-client";
import { useParams } from "next/navigation";
import { fetchGetRequest } from "@/api/api";
import { Match, RulesRegulation } from "../../../../../utils/typescript.module";
import CricketScore from "../../component/CricketScore";
import TennisScore from "../../component/TennisScore";
import SoccerScore from "../../component/SoccerScore";
import BottomNavbar from "@/components/user/BottomNavbar";
import Tv from "../../component/Tv"
import { MdLiveTv } from "react-icons/md";
;
const MainComponent = () => {
  const [categoryActive, setCategoryActive] = useState(1);
  const [betShow, setBetShow] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loading1, setLoading1] = useState<boolean>(false);
  const [betfairId, setBetfairId] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const [singleMatch, setSingleMatch] = useState<Match>();
  const [rulesRegulation, setRulesRegulation] = useState<RulesRegulation>();
  const [show,setShowTv]=useState(false)

  const [scoreData, setScoreData] = useState<any>();
  const toast = useToast();
  const param:any = useParams();
  const { showSideBar2, showSideBar1 } = useAppSelector(
    (store) => store.combineR.NavStateReducer
  );


  // fetch rules and regulaition
  const rulesAndRegulation = async () => {
    try {
      const response = await fetchGetRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/rules/get-rules/652a38fb2a2e359a326f3cd3`
      );
      let data = response.data[0];
      setRulesRegulation(data);
    } catch (error: any) {
      toast({
        description: error?.data?.message,
        status: "error",
        position: "top",
        duration: 4000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    rulesAndRegulation();
  }, []);

  const getMatch = async () => {
    try {
      const response = await fetchGetRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/match/get-single-match/${param.id}`
      );
      let data = response.data;
      setSingleMatch(data);
    } catch (error: any) {
      toast({
        description: error?.data?.message,
        status: "error",
        position: "top",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getMatch();

  }, []);

  useEffect(() => {
    const socket = socketIOClient(`${process.env.NEXT_PUBLIC_BASE_URL}`);
    socket.on("connect", () => {
      setLoading(true);
    });
    socket.on("scoreData", (data) => {
      if (data) {
        setScoreData(data);
      }
      setLoading(false);
    });
    socket.on("disconnect", () => {
      setLoading(false);
    });

    socket.emit("startFetchingScore", param.id);

    return () => {
      socket.disconnect();

      setLoading(false);
    };
  }, [param.id, param.sport_id]);

  const countdown: any = singleMatch?.open_date;
  // const countdown:any="12/11/2023 8:15:00 AM"
  const countdownDate = new Date(countdown && countdown).getTime();
  const hasCountdownPassed = () => {
    if (isNaN(countdownDate)) {
      // Handle invalid date
      console.error("Invalid date format for open_date");
      return false;
    }
    const currentTime = new Date().getTime();
    return currentTime > Number(countdownDate);
  };
  const isCountdownPassed = hasCountdownPassed();
localStorage.setItem("eventid",param.id)

  const category = [
    {
      id: 1,
      title: "ALL",
    },
    {
      id: 2,
      title: "MATCH ODDS",
    },
    {
      id: 3,
      title: "BOOKMAKER",
    },
    {
      id: 4,
      title: isCountdownPassed?"":"TOSS",
    },
    {
      id: 5,
      title: "FANCY",
    },
  ];
  const handleShowTv=()=>{
    setShowTv(!show)
      }
  return (
    <div className=" text-white bg-gray-950 min-h-[100vh]">
      <div className="w-[100%]">
        <div className="sticky top-0 w-[100%] z-[1000]">
          <TopNavbar />
        </div>
        <div className="flex justify-between w-[100%]   px-2 py-5 lg:px-6">
          <div className="hidden lg:contents">
            <div className=" ">
              <SidebarNavbar identity={1} value={1} />
            </div>
          </div>

          {showSideBar1 && (
            <div className="contents lg:hidden">
              <div className=" fixed top-[64px]  left-0 z-[1000]  ">
                <SidebarNavbar identity={2} value={1} />
              </div>
            </div>
          )}

          {/* singlesport contensts here */}
          <div className=" w-[100%] lg:w-[70%] first-letter: mx-auto">
            {/* cricket srcore */}
            <div>
           {/* {!scoreData?<> */}
           <CricketScore scoreData={scoreData} singleMatch={singleMatch} />
         
           {/* </>:<> */}
           {/* <div >

                <iframe
                  src={`https://diamondapi.uk/dcasino/sr.php?eventid=${param.id}&sportid=${param.sport_id}`}
                  className="w-[100%] border border-yellow-500 p-[1px] overflow-visible min-h-[263px]"
                  style={{
                    overflow: "visible",
                    padding: 10,
                    borderRadius: "10px",
                  }}
                ></iframe>
              </div> */}
           {/* </>} */}
            

            </div>
            <div className="flex justify-between items-center  w-[100%]">
            <div className="p-2 flex gap-4 mt-3 ">
              {category.map((item) => {
                return (
                  <span
                    onClick={() => setCategoryActive(item.id)}
                    key={item.id}
                    className={`pb-[2px] text-white ${
                      categoryActive === item.id
                        ? "border-b-2 border-[#FBC133]"
                        : ""
                    } cursor-pointer font-semibold text-[12px]`}
                  >
                    {item.title}
                  </span>
                );
              })}
            </div>
            {/* <div className="">
           <MdLiveTv onClick={handleShowTv} cursor="pointer" fontSize={"25px"} color="white" />
           
            </div> */}
            </div>
            {show&&<Tv eventid={param.id} setShowTv={setShowTv}/>}
            <div className="bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500 ... h-[1px] my-1"></div>

            <div className="flex flex-col gap-10 mt-8">
              {categoryActive == 1 ? (
                <div className="flex flex-col gap-8">
                  <MatchOdds singleMatch={singleMatch} />
                  {param.sport_id == (4).toString() && (
                    <Bookmaker singleMatch={singleMatch} />
                  )}
                  {!isCountdownPassed ? (
                    <>
                      {" "}
                      {param.sport_id == (4).toString() && (
                        <WhoWinTheToss singleMatch={singleMatch} />
                      )}
                    </>
                  ) : (
                    ""
                  )}
                  {param.sport_id == (4).toString() && (
                    <Fancy singleMatch={singleMatch} />
                  )}
                </div>
              ) : categoryActive == 2 ? (
                <MatchOdds singleMatch={singleMatch} />
              ) : categoryActive == 3 && param.sport_id == (4).toString() ? (
                <Bookmaker singleMatch={singleMatch} />
              ) : categoryActive == 4 && param.sport_id == (4).toString() ? (
                isCountdownPassed ? (
                  <>
                    <WhoWinTheToss singleMatch={singleMatch} />
                  </>
                ) : (
                  ""
                )
              ) : (
                param.sport_id == (4).toString() && (
                  <Fancy singleMatch={singleMatch} />
                )
              )}
            </div>
          </div>
          {/* end here */}

          <div className="contents lg:hidden">
            <BottomNavbar />
          </div>
          <div className="hidden lg:contents">
            <div className="   w-[20%]  ">
              <RightSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainComponent;
