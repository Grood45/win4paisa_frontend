"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiFillBell, AiFillSetting } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import NotificationModal from "./NotificationModal";
const TopNavbar = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const path = usePathname();
  const pathMap: any = {
    usermanage: "User Manage",
    dashboard: "Dashboard",
    depositegetway: "Deposit Getway",
    depositmanage: "Deposit Manage",
    matchmanage: "Match Manage",
    sportmanage: "Sport Manage",
    withdrawmanage: "Withdrawal Manage",
    withdrawgetway: "Withdrawal Getway",
    promotion:'Promotion',
    generalsetting:'General Setting',
    logoAndFavicon:'Logo And Favicon',
    sporthistory:"Sports Bet History"
  };
  const last_part = path.split("/")[2];
  const formattedLastPart = pathMap[last_part] || last_part;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Adjust the scroll limit to your desired value
      const scrollLimit = 5;

      // Hide the navbar if the scroll position exceeds the limit
      setIsNavbarVisible(scrollPosition < scrollLimit);
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`  p-3 z-[1000] sticky w-[100%] top-2 py-4 rounded-xl  ${
        isNavbarVisible ? "" : "bg-[#052860] border  border-[#A0AEC0] shadow-2xl"
      } w-[100%]`}
    >
      <div className="flex justify-between   ">
        <div className="flex flex-col gap-1 ">
          <p className="text-[#A0AEC0] font-normal  text-xs">
            pages /{" "}
            <span className="text-white font-medium text-xs">
              {formattedLastPart}
            </span>
          </p>
          <p className="text-white font-medium text-sm"> {formattedLastPart}</p>
        </div>

        <div className="flex gap-5 text-[#A0AEC0] items-center">
          <input
            style={{ border: "0.5px solid rgba(226, 232, 240, 0.30)" }}
            className="h-[40px] items-center bg-[#0F1535] pl-3  outline-none rounded-[15px] w-[200px]  text-xs"
            placeholder="Type here..."
          />
          <p className="flex cursor-pointer gap-1 text-[#A0AEC0]">
            <span>
              <BiUser  fontSize="20px" color="#A0AEC0" />
            </span>{" "}
            Logout
          </p>
          <div>
            <span>
              <AiFillSetting cursor="pointer" fontSize="20px" color="#A0AEC0" />
            </span>
          </div>
          <div>
           <NotificationModal/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
