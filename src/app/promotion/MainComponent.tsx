"use client";
import RightSidebar from "@/components/user/RightSidebar";
import SidebarNavbar from "@/components/user/SidebarNavbar";
import TopNavbar from "@/components/user/TopNavbar";
import { AppDispatch, useAppSelector } from "../redux-arch/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import p1 from "../../assetuser/other/p1.webp";
import p2 from "../../assetuser/other/p2.webp";
import p3 from "../../assetuser/other/p3.webp";
import p4 from "../../assetuser/other/p4.webp";
import Link from "next/link";
import BottomNavbar from "@/components/user/BottomNavbar";
import { fetchGetRequest } from "@/api/api";
import { PromotionData } from "../../../utils/typescript.module";
import Footer from "@/components/user/Footer";
import themeChange from "@/theme";

const MainComponent = () => {
  const [promotions, setPromotions] = useState<PromotionData[]>([]);
  const [query, setQuery] = useState("all");

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const data = await fetchGetRequest(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/promotion/get-all-promotion?type=${query}`
        );
        setPromotions(data.data);
       
      } catch (error) {
      }
    };

    fetchPromotions();
  }, [query]);

  const [showReadMore, setShowReadMore] = useState(false);
  const [invidualReadMore, setInvidualReadMore] = useState<any>(null);
  const [rulesTerm, setRulesTerm] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const { showSideBar1, theme } = useAppSelector(
    (store) => store.combineR.NavStateReducer
  );

  const handleReadMore = (data: any) => {
    if (data) {
      setInvidualReadMore(data);
    }
  
    setShowReadMore(true);
  };

  const handleRulesTerms = (id: number) => {
    setRulesTerm(id);
  };

  return (
    <div  className="flex flex-col gap-5">
   
          <div className="flex flex-col gap-10 w-[100%] mb-[80px] lg:mx-2 lg:w-[100%] ">
            {!showReadMore ? (
              <div
                className={` 
                ${
                  theme
                    ? `bg-[${themeChange.light.bg2}]`
                    : `bg-[${themeChange.dark.bg1}]`
                } 
                 shadow-2xl w-[100%] p-3 rounded-[16px]`}
              >
                <div className="flex w-[90%] sm:w-[50%]  justify-center m-auto gap-4">
                  <button
                    onClick={() => setQuery("all")}
                    className={`text-sm p-2 w-[90px] ${
                      query === "all" ? "bg-yellow-600" : ""
                    } rounded-[5px] border border-yellow-600 `}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setQuery("sports")}
                    className={`text-sm p-2 ${
                      query === "sports" ? "bg-yellow-600" : ""
                    }  w-[90px] border rounded-[5px] border-yellow-600 `}
                  >
                    Sports
                  </button>
                  <button
                    onClick={() => setQuery("casino")}
                    className={`text-sm ${
                      query === "casino" ? "bg-yellow-600" : ""
                    } p-2 w-[90px] rounded-[5px] border border-yellow-600 `}
                  >
                    Casino
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {promotions.length > 0 &&
                    promotions.map((item) => {
                      return (
                        <div
                          key={item._id}
                          className={`p-3 rounded-[8px] cursor-pointer ${
                            theme ? "border border-yellow-600 hover:border-red-900" : ""
                          } hover:border hover:border-yellow-600 relative flex flex-col gap-4 ${
                            theme
                              ? `text-[${themeChange.light.textColor1}]`
                              : `text-[${themeChange.dark.textColor1}]`
                          }  ${
                            theme
                              ? `bg-[${themeChange.light.bg1}]`
                              : `bg-[${themeChange.dark.bg2}]`
                          }`}
                        >
                          <img
                            className="rounded-[12px] h-[200px] w-[100%] "
                            src={item.image_url}
                            alt=""
                          />
                          <div className="absolute   pt-4 pl-6">
                            <p className="text-2xl text-white font-semibold ">
                              {item.title}
                            </p>
                            <p className="text-sm text-white mt-1 font-semibold ">
                              {item.full_name}
                            </p>
                          </div>
                          <div className="w-[100%]  flex justify-between">
                            <div className="flex flex-col gap-1">
                              <p className=" text-sm">{item.description}</p>
                              <p className="text-xs text-gray-400">
                                {item.timestamp}
                              </p>
                            </div>
                            <div>
                              <button
                                onClick={() => handleReadMore(item)}
                                className="px-3 p-2 rounded-[8px] text-xs font-semibold text-white bg-[gray]"
                              >
                                Read More
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              <div className={`${
                theme
                  ? `bg-[${themeChange.light.bg2}]`
                  : `bg-[${themeChange.dark.bg1}]`
              } shadow-2xl  w-[100%] p-6 rounded-[16px]`}>
                <div className="flex items-center justify-between">
                  {invidualReadMore ? (
                    <p className=" text-lg  w-[50%] sm:w-[70%] sm:text-xl text-white">
                      {invidualReadMore.title}
                    </p>
                  ) : (
                    ""
                  )}
                  <button
                    onClick={() => setShowReadMore(false)}
                    className="p-2 px-2 sm:px-3 flex items-center  text-xs sm:text-sm font-semibold rounded-[8px] bg-yellow-600 text-white"
                  >
                    <MdKeyboardArrowLeft color="white" fontSize="20px" />
                    Back To Home
                  </button>
                </div>
                <div className="mt-6">
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleRulesTerms(1)}
                      className={`text-sm pb-1 rounded-b-[3px]  ${
                        rulesTerm === 1 ? "border-b border-yellow-600" : ""
                      } font-medium`}
                    >
                      Rules
                    </button>
                    <button
                      onClick={() => handleRulesTerms(2)}
                      className={`text-sm pb-1 rounded-b-[4px]  ${
                        rulesTerm === 2 ? "border-b border-yellow-600" : ""
                      } font-medium`}
                    >
                      Terms And Condition
                    </button>
                  </div>

                  {rulesTerm === 1 && (
                    <div className="mt-4">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: invidualReadMore?.rules,
                        }}
                      />
                    </div>
                  )}
                  {rulesTerm === 2 && (
                    <div className="flex text-xs font-sans flex-col gap-2 mt-4">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: invidualReadMore?.tc,
                        }}
                      />

                      <div className="flex items-center justify-center">
                        <button className="w-[170px] m-auto rounded-[8px] p-2  text-sm bg-yellow-600">
                          Play Now
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            
          </div>

        
        </div>
   
  );
};

export default MainComponent;
