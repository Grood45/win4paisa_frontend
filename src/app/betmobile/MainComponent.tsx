"use client";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import crown from "../../assetuser/other/crown.png";
import Image from "next/image";
import axios from "axios";
import { fetchGetRequest } from "@/api/api";
import { BetSlip, BetSlipGroup } from "../../../utils/typescript.module";
import { useAppSelector } from "@/app/redux-arch/store";
import themeChange from "@/theme";
import {GiQueenCrown} from "react-icons/gi"
import BottomNavbar from "@/components/user/BottomNavbar";
import Footer from "@/components/user/Footer";
import TopNavbar from "@/components/user/TopNavbar";
import SidebarNavbar from "@/components/user/SidebarNavbar";
import RightSidebar from "@/components/user/RightSidebar";
const MainComponent = () => {
  const [betslipdata, setBetslipData] = useState<BetSlip[]>([]);
  const [totalBet, setTotalBet] = useState("");
  const [loading1, setLoading1] = useState<boolean>(false);
  const toast = useToast();

  const getAllBetData = async () => {
    setLoading1(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/bet/get-all-bet?status=all`;
    try {
      let response = await fetchGetRequest(url);
      const data = response.data;
      const receivedData: BetSlip[] = response.data;
      if (response) {
        setTotalBet(response.betsCount.allBet);
      }
      if (receivedData) {
        setBetslipData(receivedData);
      }
      setLoading1(false);
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
    getAllBetData();
  }, []);

  const betslipGroupsByMatch: BetSlipGroup[] = betslipdata.reduce(
    (acc: BetSlipGroup[], item, index) => {
      // Check if the match ID is the same as the previous item
      const isSameMatch =
        index > 0 && item.match_id === betslipdata[index - 1].match_id;
  
      if (isSameMatch) {
        // If the match ID is the same, increment the match count
        acc[acc.length - 1].matchCount += 1;
        acc[acc.length - 1].items.push(item);
      } else {
        // If the match ID is different, create a new group
        acc.push({
          match_id: item.match_id,
          matchCount: 1,
          items: [item],
        });
      }
      return acc; // Make sure to return the accumulator at the end of each iteration
    },
    []
  );

  const { showSideBar2, showSideBar1, theme } = useAppSelector(
    (store) => store.combineR.NavStateReducer
  );

  return (
    <div  className={` min-h-[100vh] ${theme ?`text-[${themeChange.light.textColor1}]` : `text-[${themeChange.dark.textColor1}]`}  ${theme ?`bg-[${themeChange.light.bg2}]` : `bg-[${themeChange.dark.bg2}]`}`}>


<div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... p-[1px] rounded-2xl w-[100%] lg:w-[70%] sticky top-[85px]">
 <div
      className={`${
        theme
          ? `text-[${themeChange.light.textColor1}]`
          : `text-[${themeChange.dark.textColor1}]`
      }  ${
        theme ? `bg-[${themeChange.light.bg1}]` : `bg-[${themeChange.dark.bg1}]`
      } overflow-scroll  h-[75vh] shadow-2xl min-h-[400px] rounded-[17px]  flex flex-col w-[100%] `}
    >
      <div className="sticky top-0">
      <div className={`flex  sticky top-0 z-1 pt-8 ${
        theme ? `bg-[${themeChange.light.bg1}]` : `bg-[${themeChange.dark.bg1}]`
      }  pb-3 w-[100%] justify-center items-center relative gap-0`}>
        <GiQueenCrown className="absolute top-5 -ml-[80px] " color="#F3AF06" />
        
        <p className="text-sm  flex gap-4 text-center font-normal">
          Bet Slip
          <span className={`w-[20px] text-gray-700 font-bold flex items-center text-[9px] justify-center text-center  h-[20px] rounded-[50%] bg-[#F3AF06]`}>
            {totalBet}
          </span>
        </p>
      </div>
      <div className="bg-gradient-to-r h-[1px]  from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... p-[1px] rounded-2xl"></div>

      </div>
     
      <Accordion
        defaultIndex={[0]}
        style={{
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "50px",
        }}
        allowMultiple
      >
        {betslipGroupsByMatch.map((group, groupIndex) => (
          <AccordionItem
            key={group.match_id}
            style={{
              borderTop: "none",
              marginTop: "20px",
              borderBottom: "none",
            }}
          >
            <h2>
              <AccordionButton
                style={{
                  background: "linear-gradient(92deg, #FABC38 0%, #D59A27 100%",
                }}
                className="rounded-[10px]"
              >
                <Box
                  as="span"
                  flex="1"
                  style={{ fontSize: "14px", display: "flex", gap:'5px', justifyContent:'space-between'}}
                  textAlign="left"
                >
                  <Box className="text-xs font-bold text-[#212632]  flex items-center justify-start w-[80%]">{group.items[0].match_name}</Box>
                  <span className="w-[30px] mr-2 flex items-center text-yellow-500 font-bold  justify-center text-center h-[30px] rounded-[50%] bg-blue-900">
                    {group.matchCount}
                  </span>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel
              className="rounded-[10px] text-[12px]"
              style={{ borderBottom: "3px solid purple" }}
              pb={4}
            >
              <Box className="w-[100%] flex flex-col gap-3  py-2">
                {group.items.map((item, itemIndex) => (
                  <div
                    className="flex flex-col gap-[6px] font-semibold text-xs"
                    key={item._id}
                  >
                    <div className="flex justify-between ">
                      <p className="text-gray-300 font-bold">Bet category</p>
                      <p className="text-[#d8b4fe] font-bold">{item.bet_category}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-300 font-bold">Match Bet</p>
                      <p className="text-[#3b82f6]">{item.event_name}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-300 font-bold">Odd</p>
                      <p className="text-[#5eead4]">{item.rate}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-300 font-bold">Stack</p>
                      <p className="text-[#fef08a]">{item.stake}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-300 font-bold">Bet Type</p>
                      <button
                        className={`py-[2px] text-xs px-2 ${
                          item.bet_type === "back"
                            ? "bg-[#FF6A8A]"
                            : "bg-[#0096FE]"
                        }  rounded-[5px]`}
                      >
                        {item.bet_type}
                      </button>
                    </div>

                    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... h-[1px] my-1"></div>
                  </div>
                ))}
              </Box>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
   
    </div>

       
      </div>

   
  );
};

export default MainComponent;
