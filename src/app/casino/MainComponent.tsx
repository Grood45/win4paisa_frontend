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
import CricketData from "@/components/user/subcomponent/CricketData";
import SoccerData from "@/components/user/subcomponent/SoccerData";
import TennisData from "@/components/user/subcomponent/TennisData";
import casino from "../../assetuser/other/casino1.png";
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
import roulette from "../../assetuser/other/roulette.png";
import liveCasino from "../../assetuser/other/live.png";
import tennisc from "../../assetuser/other/tennisc.png";
import Footer from "@/components/user/Footer";
import HCarousel from "../home/HCarousel";
import { Spinner, useToast } from "@chakra-ui/react";
import announ from "../../assetuser/other/dazzle-loudspeaker.gif";

import {
  CasinoProduct,
  GameProduct,
  GameProvider,
  LogoAndFav,
} from "../../../utils/typescript.module";
import {
  AllGameType,
  CasinoProducts,
  GamesProducts,
} from "../../../utils/providerData";
import { fetchGetRequest, sendPostRequest } from "@/api/api";
import themeChange from "@/theme";
import { useRouter } from "next/navigation";
import SportsBookCarousel from "./SportsBookCarousel";
const MainComponent = () => {
  const [active, setCategoryActive] = useState(1);
  const [logoAndFav, setLogoAndFav] = useState<LogoAndFav>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState<GameProvider[]>([]);
  const [provider, setProvider] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const userAuth = useSelector((state: RootState) => state);
  const router = useRouter();
  const { token = "", otpless_token = "" } =
    userAuth?.combineR?.userAuth?.data?.data || {};
  const toast = useToast();

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

  const { showSideBar1, theme } = useAppSelector(
    (store) => store.combineR.NavStateReducer
  );
  const {
    username = "",
    max_limit = 0,
     user_id="",
    min_limit = 0,
  } = userAuth?.combineR?.userAuth?.data?.user || {};

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

  const handleGetLogoAndFav = async () => {
    try {
      const response = await fetchGetRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/logofav/get-logo-fav/6532c132ed5efb8183a66703`
      );
      setLogoAndFav(response.data);
    } catch (error: any) {
      toast({
        title: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const handleGetGame = async () => {
    const payload = {
      GpId: "1020",
      IsGetAll: "false",
      CompanyKey: "01E731A7A9564EAB917CA1BEC8EA63CE",
      ServerId: "568Win-TEST11",
    };
    try {
      const response = await sendPostRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/casinogame/get-seamless-game?page=1&limit=6`,
        payload
      );

      setData(response.data);
    } catch (error: any) {
      toast({
        title: error,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    handleGetLogoAndFav();
    handleGetGame();
    handleGetProvider();
  }, []);
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
      let url = `https:${data.url}&device=m`;
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
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // Adjust the threshold as needed for your specific case
      const isMobile = width <= 768;
    };
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    // Call handleResize initially to log the initial state
    handleResize();
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

                <marquee
                  className={`w-[100%] text-[#212632] font-semibold  p-2`}
                >
                  {logoAndFav?.marque || ""}
                  {/* @ts-ignore */}
                </marquee>
                <div className="  rounded-r-[8px] w-[5%] p-2 h-[100%]"></div>
              </div>
            </div>

          
            {/* <div className="w-[100%]">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Image src={tennisc} alt="" />
                  <p
                    className={`text-md font-semibold ${
                      theme ? "text-black" : "text-white"
                    }`}
                  >
                    ALL Game Types
                  </p>
                </div>
              </div>
              <GameCard handleGame={handleGame} gameTypeData={AllGameType} />
            </div> */}
            {/* Casino*/}
            {/* <CasinoGame /> */}

            {/* Games game */}

            {/* <GamesGame /> */}
{provider.length==0&&
<div className="w-full flex item-center justify-center">
  <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              marginTop={"40px"}
              color='blue.500'
              size='xl'
            /></div>}
           {provider.length > 0 && (
  <div className="flex flex-col gap-[40px]">
    {/* Map elements with gpId equal to 20 first */}
    {provider
      .filter((ele:any) => ele.gpId === 20)
      .map((ele:any) => (
        ele.status && (
          <SeamlessGame
            gpName={ele.gpName}
            id={ele.gpId}
            key={ele.gpId}
          />
        )
      ))}
    {/* Map the rest of the elements */}
    {provider
      .filter((ele:any) => ele.gpId !== 20)
      .map((ele:any) => (
        ele.status && (
          <SeamlessGame
            gpName={ele.gpName}
            id={ele.gpId}
            key={ele.gpId}
          />
        )
      ))}
  </div>
)}


            {/* sport book */}

           
          </div>

         
    
  );
};

export default MainComponent;

export const GameCard: any = ({
  handleGame,
  gameTypeData,
  value,
}: {
  handleGame: any;
  gameTypeData: any;
  value: any;
}) => {
  return (
    <div className="flex flex-col  gap-1">
      <SportsBookCarousel
        value={value}
        gameTypeData={gameTypeData}
        handleGame={handleGame}
      />
    </div>
  );
};

export const SeamlessGame: any = ({
  id,
  gpName,
}: {
  id: String | number;
  gpName: String;
}) => {
  const [data, setData] = useState<GameProvider[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(6);
  const [gameId, setGameId] = useState<String | number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<any>({
    currentPage: page,
    totalPages: 1,
    totalItems: 8,
    limit: limit,
  });
  const userAuth = useSelector((state: RootState) => state);
  const { token = "", otpless_token = "", username="" } =
    userAuth?.combineR?.userAuth?.data?.data || {};
  const toast = useToast();
  const handleNextClick = () => {
    setPage((pre) => pre + 1);
  };

  const handlePrevClick = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const handleGetGame = async () => {
    const payload = {
      GpId: id,
      IsGetAll: "false",
      CompanyKey: "01E731A7A9564EAB917CA1BEC8EA63CE",
      ServerId: "568Win-TEST11",
    };
    try {
      const response = await sendPostRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/casinogame/get-seamless-game?page=${page}&limit=${limit}`,
        payload
      );

      setData(response.data);
      setPagination(response.pagination);
    } catch (error: any) {
      toast({
        title: error,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    handleGetGame();
  }, [page, limit]);

  const router = useRouter();
  const handleGame = async (
    game: String,
    gpid: number | String,
    gameid: number | String
  ) => {
    if (!token || !otpless_token) {
        toast({
          title: "Please login first.",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
      return;
    }
    setGameId(gameid);
    const payload = {
      Portfolio: game,
      IsWapSports: false,
      Username: username,
      IsGetAll: "false",
      CompanyKey: "01E731A7A9564EAB917CA1BEC8EA63CE",
      ServerId: "568Win-TEST11",
    };
    setLoading(true);
    try {
      const response = await sendPostRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/casinogame/login-casino`,
        payload
      );
      const data = response.data;
      // setData(response.data);
      setLoading(false);
      let url = `https:${data.url}&gpid=${gpid}&gameid=${gameid}`;
      router.push(url);
    } catch (error: any) {
      setLoading(false);
      toast({
        title: error,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleSeeAll = () => {
    const newLimit = limit == 1000 ? 6 : 1000;
    setLimit(newLimit);
  };
  const { showSideBar1, theme } = useAppSelector(
    (store) => store.combineR.NavStateReducer
  );
  return (
    <>
      {data.length > 0 && (
        <div className="w-[100%] ">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Image src={casino} alt="" />
              <p
                className={`text-md font-semibold ${
                  theme ? "text-black" : "text-white"
                }`}
              >
                {gpName || ""}
              </p>
            </div>

            <div className="flex gap-3 ">
              <button
                onClick={handleSeeAll}
                style={{ border: "1px solid rgba(68, 68, 68, 0.86)" }}
                className="bg-[#212632] text-white p-[6px] text-xs font-medium rounded-[5px]"
              >
                {limit === 1000 ? "Hide" : "See all"}
              </button>

              <button
                disabled={page == 1}
                onClick={handlePrevClick}
                className="bg-[#212632] p-[6px] text-white text-sm font-medium rounded-[5px]"
              >
                <MdKeyboardArrowLeft fontSize="20px" />
              </button>

              <button
                disabled={pagination.totalPages == page}
                onClick={handleNextClick}
                className="bg-[#212632] p-[6px] text-white text-sm font-medium rounded-[5px]"
              >
                <MdKeyboardArrowRight fontSize="20px" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-3 gap-3 lg:gap-2">
            {data.map((item) => {
              return (
                <div
                onClick={() =>
                  handleGame("SeamlessGame", item.gameProviderId, item.gameID)
                }
                key={item.gameID}
                className="cursor-pointer relative h-[100px] group"
              >
                <div className="h-[100px]">
                <img
                    src={
                      item?.gameInfos[0]?.gameIconUrl ||
                      "https://img.freepik.com/free-vector/casino-background-logo-with-game-card-signs_172107-1205.jpg?size=626&ext=jpg&ga=GA1.1.775584884.1689143940&semt=ais"
                    }
                    className="w-[100%] h-[100%] rounded-md transition-transform transform-gpu group-hover:blur-[2px]"
                    alt=""
                  />
                </div>
                <div className="title text-[12px]  Game Game1    font-bold text-black  absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="px-2 bg-yellow-300 rounded-[6px] ">{item?.gameInfos[0]?.language == "en" && (
                      <p className="">
                        {item.gameInfos[0].gameName.slice(0,10)}
                      </p>
                    )}
                    {item?.gameInfos[1]?.language == "en" && (
                      <p className="">
                        {item.gameInfos[0].gameName.slice(0,10)}
                      </p>
                    )}
                    </span> 
                </div>
              </div>
              
                // <div
                //   onClick={() =>
                //     handleGame("SeamlessGame", item.gameProviderId, item.gameID)
                //   }
                //   key={item.gameID}
                //   className="flex flex-col cursor-pointer  text-center min-h-[100px] items-center  justify-between rounded-[10px] bg-[#212632]  "
                // >
                  // <img
                  //   src={
                  //     item?.gameInfos[0]?.gameIconUrl ||
                  //     "https://img.freepik.com/free-vector/casino-background-logo-with-game-card-signs_172107-1205.jpg?size=626&ext=jpg&ga=GA1.1.775584884.1689143940&semt=ais"
                  //   }
                  //   className="w-[100%] h-[100%] rounded-md"
                  //   alt=""
                  // />
                //    <div className="flex flex-col px-2 gap-2">
                //     {item?.gameInfos[0]?.language == "en" && (
                //       <p className="text-[10px]">
                //         {item.gameInfos[0].gameName}
                //       </p>
                //     )}
                //     {item?.gameInfos[1]?.language == "en" && (
                //       <p className="text-[10px]">
                //         {item.gameInfos[0].gameName}
                //       </p>
                //     )}
                //     <button
                //       onClick={() =>
                //         handleGame(
                //           "SeamlessGame",
                //           item.gameProviderId,
                //           item.gameID
                //         )
                //       }
                //       className="px-1 w-[100px] text-white m-auto p-1 font-bold bg-[#DCA029] text-[12px] rounded-[8px]"
                //     >
                //       {gameId == item.gameID && loading ? "..." : "Play Now"}
                //     </button>
                //   </div> 
                //  </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export const CasinoGame: any = ({ id }: { id: String | number }) => {
  const [productId, setProductId] = useState<String | number>();
  const [loading, setLoading] = useState<boolean>(false);
  const userAuth = useSelector((state: RootState) => state);
  const { token = "", otpless_token = "", username="" } =
    userAuth?.combineR?.userAuth?.data?.data || {};
  const toast = useToast();
  const router = useRouter();
  const handleGame = async (game: String, productId: number | String) => {
    if (!token || !otpless_token) {
     
        toast({
          title: "Please login first.",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
      return;
    }
    setProductId(productId);
    const payload = {
      Portfolio: "Casino",
      IsWapSports: false,
      Username: username,
      IsGetAll: "false",
      CompanyKey: "01E731A7A9564EAB917CA1BEC8EA63CE",
      ServerId: "568Win-TEST11",
    };
    setLoading(true);
    try {
      const response = await sendPostRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/casinogame/login-casino`,
        payload
      );
      const data = response.data;
      // setData(response.data);
      setLoading(false);
      let url = `https:${data.url}&device=${"d"}&productId=${productId}`;
      router.push(url);
    } catch (error: any) {
      setLoading(false);
      toast({
        title: error,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const { showSideBar1, theme } = useAppSelector(
    (store) => store.combineR.NavStateReducer
  );
  return (
    <div className="">
      {CasinoProducts.length > 0 && ( 
        <div className="overflow-scroll w-[100wh] pb-[200px] ">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Image src={casino} alt="" />
              <p
                className={`text-md font-semibold ${
                  theme ? "text-black" : "text-white"
                } `}
              >
                Casino
              </p>
            </div>
          </div>
          <div className="flex gap-2 overflow-scroll w-[100wh] p-2">
            {CasinoProducts.map((item: CasinoProduct) => {
              return (
                <div
                  onClick={() => handleGame("Casino", item.productId)}
                  key={item.productId}
                  className="cursor-pointer relative h-[100px] group"
                >
                  <div className="h-[100px]">
                    <img
                      src={item.image}
                      className="w-[100%] h-[100%] rounded-md transition-transform transform-gpu group-hover:blur-[2px]"
                      alt=""
                    />
                  </div>
                  <p className="w-[160px]"></p>
                  <span className="title text-[12px]  Game Game1  font-bold text-black  absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-yellow-200 px-2 rounded-[6px]">{item.gameName.slice(0, 10)}</button>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export const GamesGame: any = ({ id }: { id: String | number }) => {
  const [gameId, setGameId] = useState<String | number>();
  const [loading, setLoading] = useState<boolean>(false);
  const userAuth = useSelector((state: RootState) => state);
  const { token = "", otpless_token = "", username="" } =
    userAuth?.combineR?.userAuth?.data?.data || {};
  const toast = useToast();
  const router = useRouter();
  const handleGame = async (game: String, gameId: number | String) => {
    if (!token || !otpless_token) {
  
        toast({
          title: "Please login first.",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
      return;
    }
    setGameId(gameId);
    const payload = {
      Portfolio: game,
      IsWapSports: false,
      Username: username,
      IsGetAll: "false",
      CompanyKey: "01E731A7A9564EAB917CA1BEC8EA63CE",
      ServerId: "568Win-TEST11",
    };
    setLoading(true);
    try {
      const response = await sendPostRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/casinogame/login-casino`,
        payload
      );
      const data = response.data;
      // setData(response.data);
      setLoading(false);
      let url = `https:${data.url}&device=${"d"}&gameId=${gameId}`;
      router.push(url);
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

  const { showSideBar1, theme } = useAppSelector(
    (store) => store.combineR.NavStateReducer
  );
  return (
    <>
      {GamesProducts.length > 0 && (
        <div className="overflow-scroll w-[100wh]">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Image src={casino} alt="" />
              <p
                className={`text-md font-semibold ${
                  theme ? "text-black" : "text-white"
                } `}
              >
                Games
              </p>
            </div>
          </div>
          <div className="flex gap-2 overflow-scroll w-[100wh] p-2">
            {GamesProducts.map((item: any) => {
              return (

                <div
                key={item.gameId}
                  onClick={() => handleGame("Games", item.gameId)}
                className="cursor-pointer relative h-[100px] group"
              >
                <div className="h-[100px]">
                  <img
                    src={item.image}
                    className="w-[100%]  h-[100%] rounded-md transition-transform transform-gpu group-hover:blur-[2px]"
                    alt=""
                  />
                
                </div>
                <p className="w-[160px]"></p>
                <span className="title text-[12px]  Game Game1   font-bold text-black  absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-yellow-200 px-1 rounded-[6px]">{item.gameName.slice(0, 15)}</button>
                </span>
              </div>
              
                
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
