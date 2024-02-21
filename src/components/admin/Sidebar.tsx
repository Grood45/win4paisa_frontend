"use client";
import React, { useEffect, useState } from "react";
import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { VscGraph } from "react-icons/vsc";
import { BiMoneyWithdraw, BiSolidWalletAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { LiaSignInAltSolid } from "react-icons/lia";
import { HiOutlineLogin } from "react-icons/hi";
import { AiFillQuestionCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { GrSettingsOption } from "react-icons/gr";
import { SiGoogletagmanager, SiPrometheus } from "react-icons/si";
import { MdSportsVolleyball } from "react-icons/md";
import { PiCubeTransparentFill } from "react-icons/pi";
import { RiLuggageDepositFill } from "react-icons/ri";
import { FaVimeo } from "react-icons/fa";
import { fetchGetRequest } from "@/api/api";
import { LogoAndFav } from "../../../utils/typescript.module";
import { useToast } from "@chakra-ui/react";
import Link from "next/link";
import { RootState } from "@/app/redux-arch/store";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutAsync,
  removeCookie,
} from "@/app/redux-arch/adminauth/auth.slice";
import { ThunkDispatch } from "redux-thunk";
const Sidebar = ({ status, setShow }: { status: any; setShow: any }) => {
  const [active, setActive] = useState(-1);
  const router = useRouter();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const data1 = [
    {
      id: 1,
      title: "Dasboard",
      icon: <AiFillHome fontSize={"20px"} />,
      route: "/admin/dashboard",
    },
    {
      id: 2,
      title: "User manage",
      icon: <VscGraph fontSize={"20px"} />,
      route: "/admin/usermanage",
    },
    {
      id: 3,
      title: "Deposite manage",
      icon: <RiLuggageDepositFill fontSize={"20px"} />,
      route: "/admin/depositmanage",
    },
    {
      id: 4,
      title: "Withdrawal manage",
      icon: <BiMoneyWithdraw fontSize={"20px"} />,
      route: "/admin/withdrawmanage",
    },
    {
      id: 5,
      title: "Casino Bet History",
      icon: <PiCubeTransparentFill fontSize={"20px"} />,
      route: "/admin/betmanage",
    },
    {
      id: 50,
      title: "Sport Bet History",
      icon: <PiCubeTransparentFill fontSize={"20px"} />,
      route: "/admin/sporthistory",
    },
    {
      id: 6,
      title: "Sport manage",
      icon: <MdSportsVolleyball fontSize={"20px"} />,
      route: "/admin/sportmanage",
    },
    {
      id: 7,
      title: "Match manage",
      icon: <SiGoogletagmanager fontSize={"20px"} />,
      route: "/admin/matchmanage",
    },
    {
      id: 8,
      title: "Deposite Getway",
      icon: <RiLuggageDepositFill fontSize={"20px"} />,
      route: "/admin/depositegetway",
    },
    {
      id: 9,
      title: "Withdrawal Getway",
      icon: <BiMoneyWithdraw fontSize={"20px"} />,
      route: "/admin/withdrawgetway",
    },
    {
      id: 20,
      title: "Promotion",
      icon: <SiPrometheus fontSize={"20px"} />,
      route: "/admin/promotion",
    },
    {
      id: 21,
      title: "General Setting",
      icon: <AiFillSetting fontSize={"20px"} />,
      route: "/admin/generalsetting",
    },
    {
      id: 22,
      title: "Logo And Favicon",
      icon: <FaVimeo fontSize={"20px"} />,
      route: "/admin/logoAndFavicon",
    },
    {
      id: 23,
      title: "Casino Manage",
      icon: <FaVimeo fontSize={"20px"} />,
      route: "/admin/casinomanage",
    },
    {
      id: 24,
      title: "Sports Admin",
      icon: <FaVimeo fontSize={"20px"} />,
      route: "/sportsAdmin",
    },
  ];

  const data2 = [
    {
      id: 10,
      title: "Profile",
      icon: <CgProfile fontSize={"20px"} />,
      route: "/admin/profile",
    },
    {
      id: 12,
      title: "Logout",
      icon: <HiOutlineLogin fontSize={"20px"} />,
      route: "/signin",
    },
  ];

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
  }, []);
  const handleActive = (id: number, route: string) => {
    setActive(id);
    if (route == "/signin") {
      dispatch(logoutAsync({ name: "token" }));
    } else router.push(route);
  };

  const HideSidebar = () => {
    if (status === 1) {
      setShow(false);
    }
  };

  return (
    <div
      onClick={HideSidebar}
      style={{
        boxShadow:
          "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
        background:
          status == 0
            ? "linear-gradient(112deg, rgba(6, 11, 38, 0.94) 59.3%, rgba(26, 31, 55, 0.00) 100%)"
            : "linear-gradient(112deg, rgba(6, 11, 38, 0.94) 59.3%, rgba(26, 31, 55, 0.00) 100%)",
      }}
      className={`${status === 0 ? "h-[97vh]" : "h-[100vh]"
        }  w-[220px]  sticky top-3 text-white  py-2 left-3 p-4 ${status === 0 ? "rounded-[20px] " : "rounded-r-[20px]"
        }`}
    >
      <div>
        <img
          className=" font-medium text-center text-sm pt-2 pb-4 vision"
          src={"https://i.ibb.co/nzyVRyt/Whats-App-Image-2024-02-07-at-12-57-43-AM-removebg-preview.png"}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="90%"
          height="1"
          viewBox="0 0 234 1"
          fill="none"
        >
          <path d="M0 0.5H233.25" stroke="url(#paint0_linear_2_23558)" />
          <defs>
            <linearGradient
              id="paint0_linear_2_23558"
              x1="0"
              y1="0.5"
              x2="231"
              y2="0.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#E0E1E2" stop-opacity="0" />
              <stop offset="0.5" stop-color="#E0E1E2" />
              <stop offset="1" stop-color="#E0E1E2" stop-opacity="0.15625" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div
        className={`overflow-scroll ${status === 0 ? "h-[84vh]" : "h-[90vh]"
          } pb-[15px]`}
      >
        <div className="flex flex-col  mt-2">
          {data1.map((item) => {
            return (
              <Link
                href={item.route}
                key={item.id}
                onClick={() => handleActive(item.id, item.route)}
                className={`flex cursor-pointer items-center gap-3 p-[6px] pl-2 h-[54px] text-xs ${item.id == active ? "bg-[#1A1F37]" : ""
                  }  rounded-[15px]`}
              >
                <span
                  className={`rounded-[40%] p-[6px] ${item.id == active ? "bg-[#0075FF]" : "bg-[#1A1F37]"
                    }  ${item.id == active ? "text-white" : "text-[#0075FF]"}  `}
                >
                  {item.icon}
                </span>
                <p className="font-medium">{item.title}</p>
              </Link>
            );
          })}
        </div>

        <div className="flex flex-col  mt-5 ">
          <p className="font-medium text-xs mb-3">Account Pages</p>
          {data2.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => handleActive(item.id, item.route)}
                className={`flex cursor-pointer ${item.id == active ? "bg-[#1A1F37]" : ""
                  } items-center gap-3  p-[6px] pl-2 text-xs hover:bg-[#1A1F37] rounded-2xl`}
              >
                <span
                  className={`rounded-[40%]   ${item.id == active ? "bg-[#0075FF]" : "bg-[#1A1F37]"
                    }  ${item.id == active ? "text-white" : "text-[#0075FF]"
                    }  p-[6px] `}
                >
                  {item.icon}
                </span>
                <p>{item.title}</p>
              </div>
            );
          })}
        </div>
        {/* <div className="need h-[240px]   flex p-3 flex-col justify-start items-start gap-4 w-[100%] mt-10 m-auto rounded-2xl">
          <span className="rounded-[40%] cursor-pointer p-3 bg-[#1A1F37]">
            <AiFillQuestionCircle fontSize="25px" color="#0075FF" />
          </span>
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold cursor-pointer text-white text-sm">
              Need Help ?
            </h2>
            <h2 className="font-normal text-white text-sm">
              Please check your docs
            </h2>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
