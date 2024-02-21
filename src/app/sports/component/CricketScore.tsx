import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import team1 from "../../../assetuser/other/Team Logo (1).png";
import team2 from "../../../assetuser/other/Team Logo.png";
import { MdLiveTv } from "react-icons/md";
import { BiCricketBall } from "react-icons/bi";
import { TbCricket } from "react-icons/tb";
import getTeamShortName from "../../../../utils/getTeamShortName";
import Tv from "./Tv";
import { fetchGetRequest } from "@/api/api";
import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

declare global {
  interface Window {
    SIR: Function;
  }
}

function formatTime(ms: number) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
const CricketScore = ({
  scoreData,
  singleMatch,
}: {
  scoreData: any;
  singleMatch: any;
}) => {
  const [remainingTime, setTimeRemaining] = useState("");

  const lastBall =
    scoreData?.last24balls && scoreData.last24balls.length > 0
      ? scoreData.last24balls[scoreData.last24balls.length - 1]
      : null;
  const countdown = singleMatch?.open_date || "Match Start";
  useEffect(() => {
    // alert(countdown)

    try {
      const targetDate = new Date(countdown).getTime();
      if (isNaN(targetDate)) {
        throw new Error("0");
      }
      const timer = setInterval(() => {
        const currentTime = new Date().getTime();
        const remainingTime = targetDate - currentTime;

        if (remainingTime <= 0) {
          clearInterval(timer);
          setTimeRemaining("0");
        } else {
          setTimeRemaining(formatTime(remainingTime));
        }
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    } catch (error: any) {
      setTimeRemaining(error.message);
    }
  }, [singleMatch]);


  // useEffect(() => {
  //   const eventid = singleMatch?.ex_match_id
  //   if (eventid) {
  //     const loadScript = () => {
  //       window.SIR("addWidget", ".sr-widget-1", "match.lmtPlus", { layout: "double", matchId: eventid });
  //     };

  //     if (window.SIR) {
  //       loadScript();
  //     } else {
  //       const script = document.createElement('script');
  //       script.src = 'https://widgets.sir.sportradar.com/sportradar/widgetloader';
  //       script.async = true;
  //       script.onload = loadScript;
  //       document.body.appendChild(script);
  //     }
  //   }
  // }, [singleMatch]);



 
  return (
    <>
  
    {/* {singleMatch?.sport_name==="cricket" && singleMatch!==""?
   <div style={{ display: 'flex', justifyContent: 'center' ,height:'270px',overflow:'scroll',width:'100%'}} className="widgets">
   <div style={{ maxWidth: '100%', height: '100px', width: '100%', borderRadius: '60px' }}>
     <div className="sr-widget sr-widget-1" style={{ border: 'rgba(0,0,0,0.12) solid 1px', marginBottom: '24px' }}>
       <div id="sr-widget" data-sr-widget="match.lmtPlus" data-sr-match-id={singleMatch?.ex_match_id}></div>
       <script type="application/javascript" src="https://widgets.sir.sportradar.com/sportradar/widgetloader" async></script>
     </div>
   </div>
   {singleMatch?.ex_match_id===""&& <Box padding='6' boxShadow='lg' bg='#212632'  borderRadius={"18px"}>
 <SkeletonCircle size='10' />
 <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
</Box>}

 </div> */}

 

    {/* :singleMatch?.sport_name==="tennis"||singleMatch?.sport_name==="soccer"? */}
    <div className="bg-gradient-to-r from-indigo-700 to bg-purple-900 ... p-[1px] h-[240px] rounded-2xl  ">
      <div className="flex justify-between items-center p-3">
        <p className="text-sm font-semibold">{singleMatch?.league_name}</p>

        <div className="w-[33%] text-center m-auto">
          {remainingTime === "0" && (
            <p className="px-2 py-[2px] ml-[10px] w-[40px] rounded-[6px] bg-red-500 text-white animate-pulse text-xs">
              Live
            </p>
          )}
        </div>
       
      </div>
      <div className="flex mt-6 justify-between px-4 md:px-10">
        <div className="flex  gap-2 items-center flex-col">
          {/* <Image
            src={team2}
            className="h-[30px] w-[30px]  md:w-[60px] md:h-[60px]"
            alt=""
          /> */}
          {/* <TbCricket fontSize="50px" /> */}
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... flex items-center justify-center h-[40px] w-[40px] p-[2px] rounded-[50%] ">
            <p className="rounded-[50%] text-black text-xs w-[100%] h-[100%] flex items-center justify-center bg-orange-200 p-1">
              {singleMatch
                ? getTeamShortName(singleMatch?.match_name.split(" v ")[0])
                : ""}
            </p>
          </span>
          {singleMatch ? (
            <p className=" text-[10px] md:text-xs">
              {singleMatch?.match_name.split(" v ")[0] || ""}
            </p>
          ) : (
            ""
          )}
        </div>

        {/* before match start */}
        {/* {remainingTime !== "0" && ( */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs md:text-sm">Match Start In</p>
            <p className="text-lg  md:text-3xl"> {remainingTime}</p>
          </div>
        {/* )} */}

        {/* when match start */}

        {/* {remainingTime === "0" && (
          <div className="flex gap-4 sm:gap-16 items-center justify-between">
            <div className="flex flex-col gap-1">
              {scoreData?.teams ? (
                <p className="text-sm md:text-2xl font-semibold text-white">
                  {singleMatch ? singleMatch?.match_name?.split(" v ")[1] : ""}
                </p>
              ) : (
                ""
              )}
              {scoreData?.teams ? (
                <p className="text-xs md:text-lg font-semibold text-white">
                  over {scoreData?.teams[0]?.score.split(" ")[1] || ""}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="w-[70px] md:w-[100px] flex items-center justify-center  rounded-[40px] p-1 md:p-3 bg-[#15191E] ">
              <p
                className={`flex items-center  md:text-sm animate-pulse justify-center bg-[gray] font-bold h-[30px] w-[30px] md:w-[40px] md:h-[40px] rounded-[50%] ${
                  lastBall?.score_card === "0" ||
                  lastBall?.score_card === "1" ||
                  lastBall?.score_card === "2" ||
                  lastBall?.score_card === "3"
                    ? "bg-[gray]"
                    : lastBall?.score_card === "4"
                    ? "bg-[green]"
                    : lastBall?.score_card === "ww"
                    ? "bg-[red]"
                    : lastBall?.score_card === "6"
                    ? "bg-[blue]"
                    : "bg-[gray]"
                }`}
              >
                {lastBall?.score_card}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              {scoreData?.teams ? (
                <p className="text-sm md:text-2xl font-semibold text-white">
                  {scoreData?.teams[1]?.score.split(" ")[0] || ""}
                </p>
              ) : (
                ""
              )}
              {scoreData?.teams ? (
                <p className="text-xs md:text-lg font-semibold text-white">
                  over {scoreData?.teams[1]?.score.split(" ")[1] || ""}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        )} */}

        <div className="flex  gap-2 items-center flex-col">
          {/* <Image
            src={team1}
            className="h-[30px] w-[30px]  md:w-[60px] md:h-[60px]"
            alt=""
          /> */}
          {/* <BiCricketBall fontSize="50px" /> */}
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... flex items-center justify-center h-[40px] w-[40px] p-[2px] rounded-[50%] ">
            <p className="rounded-[50%] text-black text-xs w-[100%] h-[100%] flex items-center justify-center bg-orange-200 p-1">
              {singleMatch
                ? getTeamShortName(singleMatch?.match_name.split(" v ")[1])
                : ""}
            </p>
          </span>
          {singleMatch ? (
            <p className="text-[10px] md:text-xs">
              {singleMatch?.match_name.split(" v ")[1] || ""}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>

      {/* before match start */}

      {remainingTime !== "0" && (
        <div className="flex mt-6 w-[90%] text-xs md:text-sm text-center justify-center  text-[#FFF] lg:w-[60%] m-auto p-3 rounded-[12px] ">
          {singleMatch?.match_name}
        </div>
      )}

      {/* when  match start */}
      {remainingTime === "0" && (
        <div className="p-4  mt-6 w-[98%] h-[65px]  font-bold  mb-2  gap-6 rounded-[12px] m-auto bg-gradient-to-r from-yellow-700 to to-pink-500 ... flex items-center justify-between">
          {/* batsman details */}
          <div className="flex flex-col gap-2  w-[100%]">
            <div className="flex gap-2 justify-between">
              <p className="text-xs md:text-[15px] text-gray-300">
                {scoreData?.currentPlayersScore?.Batsman[0].on_play || ""}
              </p>
              <p className="text-white text-xs md:text-sm">
                {scoreData?.currentPlayersScore?.Batsman[0]?.runs}{" "}
                <span className="text-[12px] text-gray-400">
                  {scoreData?.currentPlayersScore?.Batsman[0].balls}
                </span>
              </p>
            </div>
            <div className="flex gap-2 justify-between">
              <p className="text-xs md:text-[15px] text-gray-300">
                {scoreData?.currentPlayersScore?.Batsman[1].on_play || ""}
              </p>
              <p className="text-white text-xs md:text-sm">
                {scoreData?.currentPlayersScore?.Batsman[1].runs}{" "}
                <span className="text-[12px] text-gray-400">
                  {" "}
                  {scoreData?.currentPlayersScore?.Batsman[1].runs}
                </span>
              </p>
            </div>
          </div>

          {/* current over */}
          <div className="hidden md:contents ">
            <div className=" flex flex-col gap-2 w-[100%] ">
              <p className="text-sm text-center text-gray-200">This Over</p>
              <div
                className={` text-[20px] rounded-md  text-center gap-1  flex items-center justify-center `}
              >
                {lastBall?.score_card === "ww" ? (
                  <div className="bg-[red] w-[100%]  rounded-lg animate-pulse">
                    Wicket
                  </div>
                ) : lastBall?.score_card === "4" ? (
                  <div className="bg-[green] w-[100%]  rounded-lg animate-pulse">
                    Four
                  </div>
                ) : lastBall?.score_card === "6" ? (
                  <div className="bg-[blue] w-[100%]  rounded-lg animate-pulse">
                    Six
                  </div>
                ) : (
                  <div className=" text-[10px] text-center gap-1  flex items-center justify-center ">
                    {scoreData?.last24balls?.map((ele: any) => (
                      <>
                        <p
                          className={`rounded-[50%] h-[20px] w-[20px] flex justify-center items-center ${
                            ele.score_card === "0" ||
                            ele.score_card === "1" ||
                            ele.score_card === "2" ||
                            ele.score_card === "3"
                              ? "bg-[gray]"
                              : ele.score_card === "4"
                              ? "bg-[green]"
                              : ele.score_card === "ww"
                              ? "bg-[red]"
                              : ele.score_card === "6"
                              ? "bg-[blue]"
                              : "bg-[gray]"
                          }`}
                        >
                          {ele.score_card}
                        </p>
                      </>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* bolwer details */}
          <div className=" flex flex-col gap-2  w-[100%]">
            <div className=" text-xs md:text-sm flex justify-between text-gray-200">
              <p className="text-xs  md:text-sm ">
                {scoreData?.currentPlayersScore?.bolwer || ""}
              </p>

              <p className="text-xs  md:text-sm  text-gray-300"></p>
            </div>
            <div className=" text-xs text-center gap-1  flex items-center  ">
              {scoreData?.last24balls?.map((ele: any) => (
                <>
                  <p
                    className={`rounded-[50%] h-[20px] w-[20px] flex justify-center items-center ${
                      ele.score_card === "0" ||
                      ele.score_card === "1" ||
                      ele.score_card === "2" ||
                      ele.score_card === "3"
                        ? "bg-[gray]"
                        : ele.score_card === "4"
                        ? "bg-[green]"
                        : ele.score_card === "ww"
                        ? "bg-[red]"
                        : ele.score_card === "6"
                        ? "bg-[blue]"
                        : "bg-[gray]"
                    }`}
                  >
                    {ele.score_card}
                  </p>
                </>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
    {/* :""} */}
    </>

  );
};

export default CricketScore;

