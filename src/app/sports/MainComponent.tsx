"use client";
import Carousel from "@/components/user/Carousel";
import RightSidebar from "@/components/user/RightSidebar";
import SidebarNavbar from "@/components/user/SidebarNavbar";
import TopNavbar from "@/components/user/TopNavbar";
import { AppDispatch, RootState, useAppSelector } from "../redux-arch/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { manageSideBar_Fn } from "../redux-arch/fetures/nav-slice";
import Image from "next/image";
import announcement from "../../assetuser/other/giphy 2.png";
import cricket from "../../assetuser/other/cricket.png";
import football from "../../assetuser/other/football.png";
import tennis from "../../assetuser/other/tennis.png";
import teams from "../../assetuser/other/team.png";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import sportbar from "../../assetuser/other/10068 1.png";
import trust from "../../assetuser/other/trustglobal.png";
import value from "../../assetuser/other/value.png";
import fair from "../../assetuser/other/fair.png";
import deposit from "../../assetuser/other/deposit.png";
import Link from "next/link";
import BottomNavbar from "@/components/user/BottomNavbar";
import CricketData from "@/components/user/subcomponent/CricketData";
import SoccerData from "@/components/user/subcomponent/SoccerData";
import TennisData from "@/components/user/subcomponent/TennisData";
import {
  GameProvider,
  LogoAndFav,
  Match,
} from "../../../utils/typescript.module";
import { fetchGetRequest, sendPostRequest } from "@/api/api";
import { getUserCookie } from "../redux-arch/userauth/auth.slice";
import { useToast } from "@chakra-ui/react";
import Footer from "@/components/user/Footer";
import themeChange from "@/theme";
import HCarousel from "../home/HCarousel";
import announ from "../../assetuser/other/dazzle-loudspeaker.gif";
import { GameCard } from "../casino/MainComponent";
import { AllGameType, SportsGameType } from "../../../utils/providerData";
import { useRouter } from "next/navigation";
import sportBook from "../../assetuser/other/sportsbook.png";
import image1 from '../../assetuser/other/play.png'
import image2 from '../../assetuser/other/upcoming.png'
import image5 from '../../assetuser/other/ball.png'
import image4 from '../../assetuser/other/football.png'
import image3 from '../../assetuser/other/tennis.png'
import TvModal from "@/components/user/subcomponent/TvModal";

import loader from '../../assetuser/other/loading1.gif'
type SportsCounts = {
  cricketLiveCount: number;
  cricketUpcomingCount: number;
  soccerLiveCount: number;
  soccerUpcomingCount: number;
  tennisLiveCount: number;
  tennisUpcomingCount: number;
};

const counts: SportsCounts = {
  cricketLiveCount: 0,
  cricketUpcomingCount: 0,
  soccerLiveCount: 0,
  soccerUpcomingCount: 0,
  tennisLiveCount: 0,
  tennisUpcomingCount: 0,
};
const MainComponent = () => {
  const [matchFilter, setMatchFilter] = useState<String>("Inplay");
  const [gameCounts, setgameCounts] = useState<SportsCounts>(counts);
  const [logoAndFav, setLogoAndFav] = useState<LogoAndFav>();
  const userAuth = useSelector((state: RootState) => state);
  const [active, setCategoryActive] = useState<number>(1);
  const [gameType, setGameType] = useState<String>("");
  const [allMatch, setAllMatch] = useState<Match[]>();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const toast = useToast();
  const {
    token = "",
    otpless_token = "",
    username = "",
  } = userAuth?.combineR?.userAuth?.data?.data || {};
  const getData = async () => {
    return await fetchGetRequest(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/match/get-all-match`
    );
  };

  const category = [
    {
      id: 1,
      title: "Inplay",
      count2:
        gameCounts.cricketLiveCount +
        gameCounts.soccerLiveCount +
        gameCounts.tennisLiveCount,
      count1:
        gameCounts.cricketUpcomingCount +
        gameCounts.soccerUpcomingCount +
        gameCounts.tennisUpcomingCount,
    img:image1
      },
    {
      id: 2,
      title: "Upcoming",
      count2:
        gameCounts.cricketLiveCount +
        gameCounts.soccerLiveCount +
        gameCounts.tennisLiveCount,
      count1:
        gameCounts.cricketUpcomingCount +
        gameCounts.soccerUpcomingCount +
        gameCounts.tennisUpcomingCount,
    img:image2
    },
    {
      id: 3,
      title: "Cricket",
      count2: gameCounts.cricketLiveCount,
      count1: gameCounts.cricketUpcomingCount,
      img:image5
    },
    {
      id: 4,
      title: "Soccer",
      count2: gameCounts.soccerLiveCount,
      count1: gameCounts.soccerUpcomingCount,
      img:image4
    },
    {
      id: 5,
      title: "Tennis",
      count2: gameCounts.tennisLiveCount,
      count1: gameCounts.tennisUpcomingCount,
      img:image3
    },
  ];
  useEffect(() => {
    getData()
      .then((res) => {
        setAllMatch(res.data.data);
      })
      .catch((error) => {});
  }, []);

  // const cricketData = allMatch && allMatch.filter((elm) => elm.sport_id == "4");
  // const tennisData = allMatch && allMatch.filter((elm) => elm.sport_id == "2");
  // const soccerData = allMatch && allMatch.filter((elm) => elm.sport_id == "1");

  const handleFilter = (category: string, id: number) => {
    setMatchFilter(category);
    setGameType(category);
    setCategoryActive(id);
  };

  const handleGame = async (game: GameProvider) => {
    if (!token || !otpless_token) {
      toast({
        title: "Please login first.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const payload = {
      Portfolio: game,
      IsWapSports: false,
      Username: username,
      IsGetAll: "false",
      CompanyKey: "01E731A7A9564EAB917CA1BEC8EA63CE",
      ServerId: "568Win-TEST11",
    };
    try {
      const response = await sendPostRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/casinogame/login-casino`,
        payload
      );
      const data = response.data;
      // setData(response.data);
      let url = `https:${data.url}`;
      router.push(url);
    } catch (error: any) {
      toast({
        title: error,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleGetLogoAndFav = async () => {
    try {
      const response = await fetchGetRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/logofav/get-logo-fav/6532c132ed5efb8183a66703`
      );
      setLogoAndFav(response.data);
    } catch (error: any) {
      toast({
        title: error?.data?.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    handleGetLogoAndFav();
  }, []);

  const { showSideBar1, theme } = useAppSelector(
    (store) => store.combineR.NavStateReducer
  );

  return (
    <div
      className={`min-h-[100vh] flex flex-col gap-5 ${
        theme
          ? `text-[${themeChange.light.textColor1}]`
          : `text-[${themeChange.dark.textColor1}]`
      }  ${
        theme ? `bg-[${themeChange.light.bg2}]` : `bg-[${themeChange.dark.bg2}]`
      }`}
    >
      {/* announcement */}
      <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... -mt-3  p-[2px] rounded-l-[8px] rounded-r-[8px]">
        <div className="flex w-[100%] items-center rounded-l-[8px] rounded-r-[8px] justify-between text-sm bg-[#D79C27]">
          <div className=" flex w-[8%] lg:w-[5%] justify-center   rounded-l-[8px] h-[100%]]">
            <Image className=" w-[30px] m-auto " src={announ} alt="" />
          </div>
          {/* @ts-ignore */}

          <marquee className={`w-[100%] text-[#212632] font-semibold  p-2`}>
            {logoAndFav?.marque || ""}
            {/* @ts-ignore */}
          </marquee>
          <div className="  rounded-r-[8px] w-[5%] p-2 h-[100%]"></div>
        </div>
      </div>

      {/* sportsbook */}

      {/* <div className="">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Image src={sportBook} alt="" className="w-[35px] h-[35px]" />
            <p
              className={`text-md font-semibold ${
                theme ? "text-black" : "text-white"
              }`}
            >
              SportBook
            </p>
          </div>
        </div>
        <GameCard
          value={1}
          handleGame={handleGame}
          gameTypeData={SportsGameType}
        />
      </div> */}

      {/* category button */}
      <div
        className={`flex gap-2 md:gap-4 overflow-scroll p-2 w-[100wh] font-semibold text-white ${
          theme ? "text-black" : "text-white"
        } `}
      >
        {category.map((item) => {
          return (
            <span
              key={item.id}
              className={`flex relative items-center justify-center w-[100%]  bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... p-[1px] rounded-[16px] `}
            >
              <div className=" w-[40px] h-[15px] md:h-[20px] font-bold bg-white flex items-center justify-center text-center rounded-[4px] text-black text-[8px] md:text-[10px]  top-[-8px] right-0 absolute">
                <p className="w-[100%] h-[100%] p-1 text-red-600 flex items-center justify-center  ">
                  {item.count1}
                </p>
                <p className="w-[50%] text-white  flex items-center justify-center rounded-tr-[4px]  rounded-br-[4px] h-[100%] p-1 bg-red-600">
                  {item.count2}
                </p>
              </div>

              <button
                key={item.id}
                onClick={() => handleFilter(item.title, item.id)}
                className={` ${
                  item.id === active
                    ? "bg-[#DCA029]"
                    : theme
                    ? "bg-[gray]"
                    : "bg-[#212632]"
                }  text-[10px] md:text-sm flex items-center justify-center gap-1 sm:gap-3  w-[100px] sm:w-[100%] p-1  rounded-[16px] `}
              >
                <Image className="h-[25px] w-[25px] sm:h-[30px] sm:w-[30px]" src={item.img} alt=""/>
                {item.title}
              </button>
            </span>
          );
        })}
        {/* <div
                style={{
                  border: "1px solid rgba(217, 217, 217, 0.35)",
                
                }}
                className={`w-[100%] flex justify-between pr-1 items-center  rounded-[16px] text-white text-[10px] md:text-sm ${theme?"bg-[gray]":'bg-[#212632]'} `}
              >
                <input
                  className={`outline-none rounded-[16px] w-[70%]  text-white text-[10px] md:text-sm p-1 md:p-2 ${theme?"bg-[gray]":'bg-[#212632]'} border-none`}
                  placeholder="search"
                />
                <BsSearch />
              </div> */}
      </div>

      {gameType == "Cricket" ? (
        <div>
          {" "}
          <CricketData
            setgameCounts={setgameCounts}
            matchFilter={matchFilter}
          />{" "}
        </div>
      ) : gameType == "Soccer" ? (
        <div className="mt-4">
          {" "}
          <SoccerData
            setgameCounts={setgameCounts}
            matchFilter={matchFilter}
          />{" "}
        </div>
      ) : gameType == "Tennis" ? (
        <div className="mt-4">
          {" "}
          <TennisData
            setgameCounts={setgameCounts}
            matchFilter={matchFilter}
          />{" "}
        </div>
      ) : (
        <div className="flex flex-col mb-[100px]  gap-8">
          <CricketData
            setgameCounts={setgameCounts}
            matchFilter={matchFilter}
          />
          <SoccerData setgameCounts={setgameCounts} matchFilter={matchFilter} />
          <TennisData setgameCounts={setgameCounts} matchFilter={matchFilter} />
        </div>
      )}
      {/* <TvModal/> */}
    </div>
  );
};

export default MainComponent;
