"use client";

import RightSidebar from "@/components/user/RightSidebar";
import SidebarNavbar from "@/components/user/SidebarNavbar";
import TopNavbar from "@/components/user/TopNavbar";
import React, { useRef, useState } from "react";
import { RootState, useAppSelector } from "../redux-arch/store";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { RiWhatsappFill } from "react-icons/ri";
import { Button, Input, useToast } from "@chakra-ui/react";
import Footer from "@/components/user/Footer";
import BottomNavbar from "@/components/user/BottomNavbar";
import themeChange from "@/theme";
import { useSelector } from "react-redux";
import { sendPostRequest } from "@/api/api";
const MainComponent = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [copiedItem, setCopiedItem] = useState(null);
  const [refferalLink, setRefferalLink] = useState("bajilive.com");
  const [loading1, setLoading1] = useState<boolean>(false);
  const [referBy, setReferBy] = useState<string>("");
  const { showSideBar2, showSideBar1, theme } = useAppSelector(
    (store) => store.combineR.NavStateReducer
  );
  const toast = useToast();
  const userAuth = useSelector((state: RootState) => state);
  const {
    user_id = "",
    username,
    refer_by = "",
    referral_code = "",
    refer_by_code = "",
    referred_users = 0,
  } = userAuth?.combineR?.userAuth?.data?.user || {};

  const copyToClipboard = (text: any) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedItem(text);
        toast({
          title: `copied ${text}`,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };

  const handleApply = async () => {
    if (referBy === referral_code) {
      toast({
        description: "Invalid code.",
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      return;
    }
    const payload = {
      referral_code: referBy,
      username,
    };
    setLoading1(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/referearn/apply-refer-code`;
    try {
      let response = await sendPostRequest(url, payload);
      const data = response.data;
      toast({
        description: response.message,
        status: "success",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      setLoading1(false);
    } catch (error: any) {
      toast({
        description: error?.data?.message,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      setLoading1(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
          <div
            className={`w-[100%]    ${
              theme
                ? `bg-[${themeChange.light.bg2}]`
                : `bg-[${themeChange.dark.bg1}]`
            }  ${theme?"text-black":"text-white"} shadow-2xl lg:rounded-lg lg:p-8`}
          >
            <div className="  p-3 lg:p-6 rounded-lg ">
              <h1 className=" text-lg lg:text-2xl font-semibold mb-4">
                Referral Program
              </h1>

              <div className="mb-4">
                <label
                  htmlFor="referralCode"
                  className="block text-sm font-semibold"
                >
                  Apply Code
                </label>
                <div className="flex text-xs mt-2 items-center">
                  <Input
                    type="text"
                    id="text"
                    value={referBy || refer_by_code}
                    readOnly={refer_by_code !== "" ? true : false}
                    className=" border text-xs border-gray-300 rounded p-[6px]"
                    onChange={(e: any) => setReferBy(e.target.value)}
                  />
                  <Button
                    isDisabled={refer_by_code !== ""}
                    className="ml-2 bg-blue-500 text-white hover:bg-blue-500 p-2 rounded"
                    onClick={() => handleApply()}
                    isLoading={loading1}
                  >
                    {refer_by_code !== "" ? "Applied" : "Apply"}
                  </Button>
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="referralCode"
                  className="block text-sm font-semibold"
                >
                  Referral Code
                </label>
                <div className="flex text-xs mt-2 items-center">
                  <Input
                    type="text"
                    id="text"
                    value={referral_code}
                    className=" border text-xs border-gray-300 rounded p-[6px]"
                    readOnly
                    ref={inputRef}
                  />
                  <button
                    className="ml-2 bg-blue-500  p-3 rounded"
                    onClick={() => copyToClipboard(referral_code)}
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="mb-4 mt-2">
                <label className="block text-sm font-semibold">
                  Referral Link
                </label>
                <div className="flex text-xs mt-2  items-center">
                  <Input
                    type="text"
                    value={refferalLink}
                    className=" border text-xs  border-gray-300 rounded p-[6px]"
                    readOnly
                    ref={inputRef}
                  />
                  <button
                    className="ml-2 bg-blue-500  p-3 rounded"
                    onClick={() => copyToClipboard(refferalLink)}
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="mb-4 mt-8">
                <p className="font-semibold">Share via social media:</p>
                <div className="flex gap-3 mt-3 items-center">
                  <BsFacebook
                    cursor="pointer"
                    color="#3B5998"
                    fontSize="30px"
                  />
                  <RiWhatsappFill
                    cursor="pointer"
                    color="#075e54"
                    fontSize="30px"
                  />
                  <BsTwitter cursor="pointer" color="#26a7de" fontSize="30px" />
                  <BsInstagram cursor="pointer" color="pink" fontSize="25px" />
                </div>
              </div>

              <div className="flex  mt-10 justify-between">
                <div className="mb-4 md:mb-0">
                  <p className="font-semibold text-sm">Total Rewards:</p>
                  <p className="text-sm font-bold">0 RS</p>
                </div>
                <div>
                  <p className="font-semibold text-sm">
                    Total Friends Referred:
                  </p>
                  <p className="text-sm font-bold">{referred_users.length}</p>
                </div>
              </div>
            </div>

            
          </div>

       
        </div>

  );
};

export default MainComponent;
