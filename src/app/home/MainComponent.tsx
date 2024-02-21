"use client";
import Carousel from "@/components/user/Carousel";
import RightSidebar from "@/components/user/RightSidebar";
import SidebarNavbar from "@/components/user/SidebarNavbar";
import TopNavbar from "@/components/user/TopNavbar";
import { AppDispatch, useAppSelector } from "../redux-arch/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { manageSideBar_Fn } from "../redux-arch/fetures/nav-slice";
import Image from "next/image";
import announcement from "../../assetuser/other/giphy 2.png";
import cricket from "../../assetuser/other/cricket.png";
import football from "../../assetuser/other/football.png";
import tennis from "../../assetuser/other/tennis.png";
import CricketData from "@/components/user/subcomponent/CricketData";
import SoccerData from "@/components/user/subcomponent/SoccerData";
import TennisData from "@/components/user/subcomponent/TennisData";

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
import img1 from "../../assetuser/other/Akbar-Romeo-Walter.webp";
import img2 from "../../assetuser/other/Andar-Bahar.webp";
import HCarousel from "./HCarousel";
import { useToast } from "@chakra-ui/react";
import { LogoAndFav } from "../../../utils/typescript.module";
import { fetchGetRequest } from "@/api/api";
import Footer from "@/components/user/Footer";
import themeChange from "@/theme";
import announ from "../../assetuser/other/dazzle-loudspeaker.gif";
import { SeamlessGame } from "../casino/MainComponent";
import { useRouter } from "next/navigation";
import image1 from '../../assetuser/other/play.png'
import image2 from '../../assetuser/other/upcoming.png'
import image5 from '../../assetuser/other/ball.png'
import image4 from '../../assetuser/other/football.png'
import image3 from '../../assetuser/other/tennis.png'
const MainComponent = () => {
  const [active, setCategoryActive] = useState<number>(1);
  const [matchFilter, setMatchFilter] = useState<String>("all");
  const [gameType, setGameType] = useState<String>("");
  const dispatch = useDispatch<AppDispatch>();
  const [provider, setProvider] = useState<any>([]);
  const [gameCounts, setgameCounts] = useState<any>(0);
  const [loading, setLoading] = useState(false);
  
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
  const casinodata = [
    {
      id: 1,
      title: "Provider Name",
      img: img1,
    },
    {
      id: 2,
      title: "Provider Name",
      img: img1,
    },
    {
      id: 3,
      title: "Provider Name",
      img: img2,
    },
    {
      id: 4,
      title: "Provider Name",
      img: img1,
    },
    {
      id: 5,
      title: "Provider Name",
      img: img1,
    },
    {
      id: 6,
      title: "Provider Name",
      img: img2,
    },
    {
      id: 7,
      title: "Provider Name",
      img: img1,
    },
    {
      id: 8,
      title: "Provider Name",
      img: img1,
    },
  ];
  const sportbardata = [
    {
      id: 1,
      img: sportbar,
    },
    {
      id: 2,
      img: sportbar,
    },
    {
      id: 3,
      img: sportbar,
    },
    {
      id: 4,
      img: sportbar,
    },
    {
      id: 5,
      img: sportbar,
    },
  ];

  const router = useRouter();

  const handleGetProvider = async () => {
    setLoading(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/casinoprovider/get-provider?`;
    try {
      const response = await fetchGetRequest(url);
      setProvider(response.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast({
        title: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleFilter = (category: string, id: number) => {
    setMatchFilter(category);
    setCategoryActive(id);
    router.push("/sports");
  };

  const sportdata = [
    {
      id: 1,
      title: "One Day Internationl",
      data: "16/11/2024",
      time: "9:12",
      teamA: "South Africa",
      teamB: "India",
    },
    {
      id: 2,
      title: "One Day Internationl",
      data: "16/11/2024",
      time: "9:12",
      teamA: "South Africa",
      teamB: "India",
    },
    {
      id: 3,
      title: "One Day Internationl",
      data: "16/11/2024",
      time: "9:12",
      teamA: "South Africa",
      teamB: "India",
    },
    {
      id: 4,
      title: "One Day Internationl",
      data: "16/11/2024",
      time: "9:12",
      teamA: "South Africa",
      teamB: "India",
    },
    {
      id: 5,
      title: "One Day Internationl",
      data: "16/11/2024",
      time: "9:12",
      teamA: "South Africa",
      teamB: "India",
    },
    {
      id: 6,
      title: "One Day Internationl",
      data: "16/11/2024",
      time: "9:12",
      teamA: "South Africa",
      teamB: "India",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerPage = 4;
  const totalCards = sportdata.length;

  // const handleNextClick = () => {
  //   if (currentIndex + 1 < totalCards) {
  //     setCurrentIndex(currentIndex + 1);
  //   }
  // };

  // const handlePrevClick = () => {
  //   if (currentIndex > 0) {
  //     setCurrentIndex(currentIndex - 1);
  //   }
  // };

  const { showSideBar1, theme } = useAppSelector(
    (store) => store.combineR.NavStateReducer
  );

  const toast = useToast();
  const [logoAndFav, setLogoAndFav] = useState<LogoAndFav>();
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
    Promise.all([handleGetLogoAndFav(), handleGetProvider()])
      .then(([logoAndFavResult, providerResult]) => {})
      .catch((error) => {
      });
  }, []);


  return (
    <div
      className={`min-h-[100vh] flex flex-col gap-5 ${
        theme
          ? `text-[${themeChange.light.textColor1}]`
          : `text-[${themeChange.dark.textColor1}]`
      }  
      ${
        theme ? `bg-[${themeChange.light.bg2}]` : `bg-[${themeChange.dark.bg2}]`
      }
      `}
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

      {/* trending imges */}
      <div className="contents ">
        {provider.length > 0 && (
          <div className="flex flex-col gap-[40px]">
            {provider
              .slice(10, 15)
              .map(
                (ele: any) =>
                  ele.status == true && (
                    <SeamlessGame
                      gpName={ele.gpName}
                      id={ele.gpId}
                      key={ele.gpId}
                    />
                  )
              )}
          </div>
        )}
      </div>
      {/* <div className="flex flex-col  gap-1">
        <p
          className={`font-semibold ${
            theme ? "text-black" : "text-white"
          } text-sm`}
        >
          TRENDING GAMES
        </p>

        <HCarousel casinodata={casinodata} />
      </div> */}

      {/* category button */}
      <div
        className={`flex gap-2 md:gap-4 overflow-scroll p-2 w-[100wh] font-semibold text-white ${
          theme ? "text-black" : "text-white"
        } `}
      >
        {category.map((item: any) => {
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

      {/* cricket  */}
      <CricketData setgameCounts={setgameCounts} matchFilter={matchFilter} />

      {/* soccer */}
      <SoccerData setgameCounts={setgameCounts} matchFilter={matchFilter} />

      {/* tennis */}

      <TennisData setgameCounts={setgameCounts} matchFilter={matchFilter} />

      {/* <div className="">
        {provider.length > 0 && (
          <div className="flex flex-col gap-[40px]"> */}
            {/* {seamless game} */}
            {/* {provider
              .slice(42, 60)
              .map(
                (ele: any) =>
                  ele.status == true && (
                    <SeamlessGame
                      gpName={ele.gpName}
                      id={ele.gpId}
                      key={ele.gpId}
                    />
                  )
              )}
          </div>
        )} */}

        {/* <HCarousel casinodata={casinodata} /> */}
      {/* </div> */}
    </div>
  );
};

export default MainComponent;
