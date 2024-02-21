"use client";
import React, { useState, useEffect } from "react";
import Menu from "../../assetuser/navbar/slider.png";
import Image from "next/image";
import { Flex, Button, Avatar, Tooltip, useToast } from "@chakra-ui/react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { SlArrowDown, SlBell } from "react-icons/sl";
import coin from "../../assetuser/other/ruppes.png";
import { HiPlus } from "react-icons/hi";
import SidebarNavbar from "./SidebarNavbar";
import RightSidebar from "./RightSidebar";
import { AppDispatch, RootState, useAppSelector } from "@/app/redux-arch/store";
import { useDispatch, useSelector } from "react-redux";
import { manageSideBar_Fn } from "@/app/redux-arch/fetures/nav-slice";

import Profile from "./Profile";
import PamentModel from "./PamentModel";
import Notification from "./Notification";
import { usePathname, useRouter } from "next/navigation";
import profile from "../../assetuser/other/profile.png";
import {
  fetchUserDataAsync,
  getUserCookie,
} from "@/app/redux-arch/userauth/auth.slice";
import { LogoAndFav } from "../../../utils/typescript.module";
import { fetchGetRequest } from "@/api/api";
import themeChange from "@/theme";
import { FaRupeeSign } from "react-icons/fa";
import LoginModal from "./LoginModal";
import { TbCurrencyTaka } from "react-icons/tb";
import SignUpModal from "./SignUpModal";
const TopNavbar = ({ value }: { value?: number }) => {
  const [isLeftActive, setIsLeftActive] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const userAuth = useSelector((state: RootState) => state);
  const data = useSelector((state: RootState) => state.combineR.userAuth.data);
  const router = useRouter();
  const handleToggle = () => {
    setIsLeftActive(!isLeftActive);
  };
  const dispatch = useDispatch<AppDispatch>();
  const { showSideBar1, showSideBar3, theme } = useAppSelector(
    (store) => store.combineR.NavStateReducer
  );
const [login,setLogin]=useState(false)
  const {
    first_name = "",
    last_name = "",
    email = "",
    username = "",
    exposure_limit = 0,
    amount = 0,
  } = userAuth?.combineR?.userAuth?.data?.user || {};

  const { token = "", otpless_token = "" } =
    userAuth?.combineR?.userAuth?.data?.data || {};

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
    handleGetLogoAndFav();
    dispatch(fetchUserDataAsync());
  }, [theme]);



  

const pathname=usePathname()
  return (
    <div className="">
      <div
        className={`w-[100%] flex shadow-2xl  justify-between z-[1000] px-2 h-[64px] ${
          theme
            ? `bg-[${themeChange.light.bg1}]`
            : `bg-[${themeChange.dark.bg1}]`
        }   lg:px-10 ${theme?"text-black":'text-white'}  items-center`}
      >
        <div className="   flex gap-2 w-[60%] justify-between">
          <div className="w-[100%] lg:w-[20%]  flex items-center gap-3  ">
            <div className="">
              {showSideBar1 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="15"
                  viewBox="0 0 25 15"
                  fill="none"
                  cursor="pointer"
                  onClick={() =>
                    dispatch(manageSideBar_Fn({ type: "sidebar1" }))
                  }
                >
                  <rect
                    x="2"
                    width="21.9581"
                    height="2.71488"
                    rx="1.35744"
                    fill="#EAAB0F"
                  />
                  <rect
                    x="2"
                    y="12.2169"
                    width="21.9581"
                    height="2.71488"
                    rx="1.35744"
                    fill="#EAAB0F"
                  />
                  <path
                    d="M2.10863 6.15663C1.30797 6.49947 1.30525 7.63399 2.10423 7.98955L4.66501 9.12912C5.32491 9.42278 6.06555 8.9446 6.06728 8.22378L6.07264 5.98539C6.07437 5.26457 5.33604 4.77464 4.67477 5.0578L2.10863 6.15663Z"
                    fill="#EAAB0F"
                  />
                  <rect
                    width="16.1797"
                    height="2.71488"
                    rx="1.35744"
                    transform="matrix(-1 0 0 1 24.2778 5.35745)"
                    fill="#EAAB0F"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="15"
                  viewBox="0 0 25 15"
                  fill="none"
                  cursor="pointer"
                  onClick={() =>
                    dispatch(manageSideBar_Fn({ type: "sidebar1" }))
                  }
                >
                  <rect
                    x="0.277344"
                    y="0.0644531"
                    width="21.9581"
                    height="2.71488"
                    rx="1.35744"
                    fill={theme ? "black" : "white"}
                  />
                  <rect
                    x="0.277344"
                    y="12.2815"
                    width="21.9581"
                    height="2.71488"
                    rx="1.35744"
                    fill={theme ? "black" : "white"}
                  />
                  <path
                    d="M22.4461 6.29334C23.2467 6.63619 23.2494 7.77071 22.4505 8.12627L19.8897 9.26584C19.2298 9.5595 18.4891 9.08132 18.4874 8.3605L18.482 6.12211C18.4803 5.40129 19.2186 4.91136 19.8799 5.19452L22.4461 6.29334Z"
                    fill={theme ? "black" : "white"}
                  />
                  <rect
                    x="0.277344"
                    y="5.49414"
                    width="16.1797"
                    height="2.71488"
                    rx="1.35744"
                    fill={theme ? "black" : "white"}
                  />
                </svg>
              )}
            </div>

            <img
              className=" w-[100px] lg:hidden  md:w-[150px]"
              src={"https://i.ibb.co/nzyVRyt/Whats-App-Image-2024-02-07-at-12-57-43-AM-removebg-preview.png"}
            />
          </div>
          <div className="hidden lg:contents">
            <div className=" w-[100%]  flex items-center gap-10 ">
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... p-[1px] rounded-[50px] w-[80%]">
                <div
                  style={{ boxShadow: "5px 7px 15px 0px rgba(0, 0, 0, 0.25)" }}
                  className={`flex border border-[#444]  rounded-[50px] w-[100%]  ${
                    theme
                      ? `bg-[${themeChange.light.bg1}]`
                      : `bg-[${themeChange.dark.bg1}]`
                  }`}
                >
                  <Button
                    onClick={() => router.push("/casino")}
                    colorScheme=""
                    style={{
                      color: pathname.includes("casino")? "white" : "#DA9E2A",
                      backgroundColor:pathname.includes("casino")?"#F3AF06":"",
                      borderRadius: "50px",
                      height: "34px",
                  
                      transition: "background-color 0.5s ease-in-out",
                      width: "95%",
                    }}
                  >
                    Casino
                  </Button>
                  <Button
                    onClick={() => router.push("/sports")}
                    colorScheme=""
                    style={{
                      color: pathname.includes("sports")? "white" : "#DA9E2A",
                     backgroundColor:pathname.includes("sports")?"#F3AF06":"",
                      borderRadius: "50px",
                      height: "34px",
                      width: "100%",
                   
                      transition: "background-color 0.5s ease-in-out",
                    }}
                  >
                    Sports
                  </Button>
                </div>
              </div>
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... p-[1px] rounded-[50px] w-[80%]">
                <div
                  style={{ boxShadow: "5px 7px 15px 0px rgba(0, 0, 0, 0.25)" }}
                  className={`h-[34px] border ${
                    theme
                       ? `bg-[white]`
                      : `bg-[${themeChange.dark.bg2}]`
                  } border-[#444] px-3 flex justify-between items-center p-1 rounded-[50px] w-[100%] }`}
                >
                  <input
                    className={`text-sm  ${
                      theme
                        ? `bg-[${themeChange.light.bg2}]`
                        : `bg-[${themeChange.dark.bg2}]`
                    } 
                    ${
                      theme
                        ? `text-[${themeChange.light.textColor1}]`
                        : `text-[${themeChange.dark.textColor1}]`
                    } outline-none`}
                    placeholder="search"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 17 16"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_0_1589)">
                      <path
                        d="M13.0086 11.4039C13.9163 10.3302 14.3229 8.99901 14.1469 7.67666C13.971 6.35431 13.2255 5.1383 12.0596 4.27192C10.8937 3.40553 9.39345 2.95267 7.8589 3.00392C6.32436 3.05517 4.86872 3.60676 3.78321 4.54834C2.69771 5.48992 2.06239 6.75204 2.00436 8.08221C1.94633 9.41237 2.46986 10.7125 3.47023 11.7224C4.4706 12.7324 5.87402 13.3777 7.39972 13.5292C8.92542 13.6808 10.4609 13.3274 11.6989 12.5399H11.698C11.7261 12.5724 11.7561 12.6032 11.7898 12.6333L15.3991 15.7617C15.5749 15.9142 15.8133 15.9999 16.062 16C16.3107 16.0001 16.5492 15.9145 16.7251 15.7622C16.901 15.6098 16.9999 15.4031 17 15.1875C17.0001 14.972 16.9014 14.7652 16.7256 14.6128L13.1164 11.4843C13.0828 11.4549 13.0468 11.4285 13.0086 11.4039ZM13.2504 8.28029C13.2504 8.8672 13.1171 9.44835 12.8579 9.99058C12.5988 10.5328 12.219 11.0255 11.7402 11.4405C11.2615 11.8555 10.6931 12.1847 10.0675 12.4093C9.44194 12.6339 8.77147 12.7495 8.09436 12.7495C7.41726 12.7495 6.74679 12.6339 6.12123 12.4093C5.49566 12.1847 4.92726 11.8555 4.44848 11.4405C3.9697 11.0255 3.5899 10.5328 3.33079 9.99058C3.07167 9.44835 2.93831 8.8672 2.93831 8.28029C2.93831 7.09498 3.48153 5.95822 4.44848 5.12008C5.41543 4.28194 6.72689 3.81108 8.09436 3.81108C9.46183 3.81108 10.7733 4.28194 11.7402 5.12008C12.7072 5.95822 13.2504 7.09498 13.2504 8.28029Z"
                        fill="#444444"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_0_1589">
                        <rect
                          width="15.1796"
                          height="15.1111"
                          fill="white"
                          transform="translate(0.981934 0.827148)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden  lg:contents">
            <div className=" border-none">
            <img className=" w-[170px] ml-5 xl:ml-16" src={"https://i.ibb.co/nzyVRyt/Whats-App-Image-2024-02-07-at-12-57-43-AM-removebg-preview.png"}/>
            </div>
          </div>
        </div>

        {/* after auth */}
        {token && otpless_token ? (
          <div className="flex items-center  gap-4  sm:gap-6 lg:gap-10 ">
            <div className="">
              {/* <Notification /> */}
            </div>
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... p-[1px] rounded-[50px] ">
              <div
                // style={{ boxShadow: "6px 5px 4px 0px #373A40 inset" }}
                className={`flex w-[120px] relative   ${
                  theme ? "border" : ""
                } lg:w-[200px] shadow-2xl  ${
                  theme ? `bg-[${themeChange.light.bg1}]` : `bg-[#2E3543]`
                } rounded-[28px] items-center p-1 lg:p-[6px]  lg:gap-5`}
              >
                {/* <Image className="w-[20px] h-[20px] " src={coin} alt="coin" /> */}
                <span className="h-[20px] w-[20px] rounded-[50%] flex items-center justify-center bg-yellow-400">
                <FaRupeeSign     color="white" fontSize="15px" /> 
                </span>
                <Tooltip
                  hasArrow
                  arrowSize={20}
                  label={
                    
                    <div
                      className={` ${
                        theme ? "black" : "white"
                      }  m-auto p-2 flex text-xs justify-between items-center gap-5`}
                    >
                      <p>Exposure</p>
                      <p>{exposure_limit}</p>
                    </div>
                  }
                  width="130px"
                  height={"40px"}
                  borderRadius={"10px"}
                  placement="bottom"
                  bg="#212632"
                  border="1px solid gray"
                > 
                  <div className="flex flex-col justify-center pl-3 lg:pl-0 lg:flex-row items-center lg:gap-4">
                  <p
                    className={`flex items-center ${
                      theme ? "black" : "white"
                    } text-[10px] md:ml-0  lg:text-sm gap-2 md:gap-6`}
                  >
                    {amount}
                    {/* <span className=" mr-1 md:mr-0">
                      <SlArrowDown color={theme ? "black" : "white"} />
                    </span> */}
                  </p>
                      <p className="text-[8px] lg:text-[10px]">Exp: <span className="text-red-400">{exposure_limit}</span></p>
                  </div>
              
                </Tooltip>

                <PamentModel heading="deposit" code="3" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...  rounded-[50px] w-[35px] h-[35px] ml-1 sm:ml-0 sm:w-[45px] sm:h-[45px] flex items-center justify-center p-[1px]">
              <Image
                onClick={() => dispatch(manageSideBar_Fn({ type: "sidebar3" }))}
                src={profile}
                alt=""
                className="cursor-pointer w-[35px] h-[35px] sm:w-[45px] sm:h-[45px]"
              />
            </div>

          </div>
        ) : (
          <div className="flex item-center gap-2">
<SignUpModal/>
    <LoginModal ID={1} />
          </div>
      
        )}
      </div>
   
      {token && otpless_token && showSideBar3 && (
        <div className="">
          <Profile />
        </div>
)}
    </div>
  );
};

export default TopNavbar;
