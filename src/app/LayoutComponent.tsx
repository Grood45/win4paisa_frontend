"use client";
import BottomNavbar from "@/components/user/BottomNavbar";
import Carousel from "@/components/user/Carousel";
import Footer from "@/components/user/Footer";
import MainSidebar from "@/components/user/MainSidebar";
import RightSidebar from "@/components/user/RightSidebar";
import TopNavbar from "@/components/user/TopNavbar";
import { usePathname } from "next/navigation";
import React from "react";
import { useAppSelector } from "./redux-arch/store";
import themeChange from "@/theme";

const LayoutComponent = ({ children }: { children?: any }) => {
  const pathname = usePathname();
  const { showSideBar1, theme } = useAppSelector(
    (store:any) => store.combineR.NavStateReducer
  );
  return (
    <div  className={`min-h-[100vh] flex flex-col gap-5 ${
        theme
          ? `text-[${themeChange.light.textColor1}]`
          : `text-[${themeChange.dark.textColor1}]`
      }  ${
        theme ? `bg-[${themeChange.light.bg2}]` : `bg-[${themeChange.dark.bg2}]`
      }`}>
      <div className="w-[100%]">
        <div className=" fixed top-0 w-[100%] z-[1000]">
          <TopNavbar value={1} />
        </div>
        <div className="flex justify-between w-[100%] pt-[84px]  px-2 py-5 lg:px-6">
             <div className=" sticky top-[84px] z-50 max-h-[80vh] ">
                 <MainSidebar />
                 </div>
          <div className={`flex  flex-col gap-10 w-[100%] lg:mx-2 lg:w-[69%] `}>
            {/* carousel  */}
            {pathname.includes("home") ||
            pathname.includes("sports") ||
            pathname.includes("casino") || pathname==="/" ? (
              <div>
                <Carousel />
              </div>
            ) : null}

            {children}

            <div className="hidden lg:contents">
              <Footer />
            </div>
            <div className="contents lg:hidden">
              <BottomNavbar  />
            </div>
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

export default LayoutComponent;
