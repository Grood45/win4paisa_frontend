"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BiSolidCopy } from "react-icons/bi";
import { GoDotFill } from "react-icons/go";
import { PiInfo } from "react-icons/pi";
import transactionpng from "../../../assetuser/other/transactionCoin.png";
import userprofile from "../../../assetuser/other/userprofile.png";
import { useControllableState, useToast } from "@chakra-ui/react";
import { fetchGetRequest } from "@/api/api";
import { AllTransaction } from "../../../../utils/typescript.module";
import { useSelector } from "react-redux";
import { RootState, useAppSelector } from "@/app/redux-arch/store";
import themeChange from "@/theme";
import { TbCoin } from "react-icons/tb";
const MyProfile = ({
  onClose,
  setShowProfile,
}: {
  onClose: any;
  setShowProfile?: any;
}) => {
  const [profiletransaction, setProfileTransaction] = useState(0);

  const [loading1, setLoading1] = useState(false);
  const [transactiondata, setTransactionData] = useState<AllTransaction[]>([]);
  const [copiedItem, setCopiedItem] = useState(null);
  const [transactionDetails, setTransactionDetails] =
    useState<AllTransaction>();
  const userAuth = useSelector((state: RootState) => state);
  const {
    first_name = "",
    last_name = "",
    email = "",
    username = "",
    amount = 0,
    max_limit = 0,
    min_limit = 0,
    joined_at,
    exposure_limit = 0,
    user_id = "",
    referal_code = "",
  } = userAuth?.combineR?.userAuth?.data?.user || {};
  const toast = useToast();
  const getAllTransaction = async () => {
    setLoading1(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction/get-all-transaction/${user_id}`;
    try {
      let response = await fetchGetRequest(url);
      const data = response.data;
      const receivedData: AllTransaction[] = response.data;
      if (receivedData) {
        setTransactionData(receivedData);
      }
      setLoading1(false);
    } catch (error: any) {

      // toast({
      //   description: `${error?.data?.message}`,
      //   status: "error",
      //   duration: 4000,
      //   position: "top",
      //   isClosable: true,
      // });
    }
  };

  useEffect(() => {
    getAllTransaction();
  }, []);

  const handleProfileTransaction = (id: number, data?: AllTransaction) => {
    setProfileTransaction(id);

    if (data) {
      setTransactionDetails(data);
    }
  };

  const leftArrow = () => {
    if (setShowProfile) {
      setShowProfile(0);
    } else {
      onClose();
    }
  };

  const { showSideBar1, theme } = useAppSelector(
    (store) => store.combineR.NavStateReducer
  );
  const copyToClipboard = (text:any) => {
    navigator.clipboard.writeText(text)
      .then(() =>{setCopiedItem(text)
        toast({
          title: "copied.",
          status: "success",
          duration: 2000,
          isClosable: true,
          position:'top'
        });
  })
      .catch(err => console.error('Failed to copy: ', err));
  };

  
  return (
    <div >
      {profiletransaction === 0 && (
        <div className="w-[90%] relative m-auto">
          <div onClick={leftArrow} className="absolute  cursor-pointer left-2 ">
            
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="43"
              height="42"
              viewBox="0 0 48 47"
              fill="none"
            >
              <rect
                x="0.386719"
                width="47"
                height="47"
                rx="23.5"
                fill="#A4A9AE"
                fill-opacity="0.25"
              />
              <path
                d="M27.3867 16L19.3867 24L27.3867 31.5"
                stroke="#A4A9AE"
                stroke-width="1.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <div className="flex flex-col gap-5 justify-center items-center">
            <p className="text-lg  font-semibold">Profile</p>
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... p-[1px] rounded-[50%] flex items-center justify-center">
            <Image src={userprofile} alt="user" />
            </div>
            <div className="text-center">
              <p className="text-lg text-[#456EFE] font-semibold">{username}</p>
              <p className="text-sm  font-normal">
                {`${user_id.slice(0, 10)}...`} | {joined_at}
              </p>
            </div>
          </div>
          <div
            style={{
              boxShadow: "1px 5px 40px 8px rgba(110, 117, 136, 0.07)",
              background: "rgba(255, 255, 255, 0.15)",
            }}
            className={`rounded-[10px] mt-5 flex justify-between w-[100%]  p-3 py-5`}
          >
            <p className="text-sm  font-medium">Total Balance</p>
            <p className="text-sm  font-medium">
              {amount}.00<span className="text-[10px] font-light">INR</span>
            </p>
          </div>

          <div className="mt-5 justify-between flex w-[100%] gap-2 sm:gap-4 ">
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... w-[100%] rounded-[8px] p-[1px]">
            <div
              style={{
                boxShadow: "1px 5px 24px 8px rgba(110, 117, 136, 0.07",
              }}
              className={`flex w-[100%] flex-col justify-center items-center ${
                theme
                  ? `text-[${themeChange.light.textColor1}]`
                  : `text-[${themeChange.dark.textColor1}]`
              }  ${
                theme
                  ? `bg-[${themeChange.light.bg2}]`
                  : `bg-[${themeChange.dark.bg1}]`
              } rounded-[10px]  p-3`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="58"
                height="57"
                viewBox="0 0 58 57"
                fill="none"
              >
                <g opacity="0.15" filter="url(#filter0_d_12_1027)">
                  <rect
                    x="10.5918"
                    y="6.52783"
                    width="34.471"
                    height="34.471"
                    rx="5"
                    fill="#13C999"
                  />
                </g>
                <path
                  d="M22.4717 20.3433V28.7186C22.4717 30.706 23.5767 31.1724 24.929 29.7596C25.0573 29.6081 25.2231 29.4876 25.4122 29.4085C25.6014 29.3294 25.8083 29.294 26.0154 29.3052C26.2225 29.3165 26.4235 29.3742 26.6015 29.4733C26.7794 29.5724 26.9289 29.7101 27.0373 29.8745L27.8079 30.8817C27.9211 31.0627 28.0834 31.2129 28.2786 31.3173C28.4738 31.4217 28.6951 31.4766 28.9202 31.4766C29.1454 31.4766 29.3667 31.4217 29.5619 31.3173C29.757 31.2129 29.9193 31.0627 30.0326 30.8817L30.8032 29.8813C30.9133 29.7168 31.0642 29.5792 31.2433 29.4802C31.4225 29.3812 31.6246 29.3237 31.8326 29.3124C32.0406 29.3011 32.2486 29.3365 32.4388 29.4155C32.6291 29.4945 32.7962 29.6148 32.9261 29.7664C34.2783 31.1792 35.3834 30.7127 35.3834 28.7254V20.3433C35.3834 17.3487 34.6564 16.5983 31.7919 16.5983H20.6178"
                  stroke="#13C999"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20.9306 16.5713C19.7019 16.5713 19.3966 17.3216 19.3966 20.3162V22.3441C19.347 22.7884 19.4855 23.2331 19.7828 23.584C20.08 23.9348 20.5126 24.1642 20.9888 24.2233H22.4428V20.3432C22.4719 17.3216 22.1665 16.5713 20.9306 16.5713Z"
                  stroke="#13C999"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M27.1612 25.075C27.2256 25.3176 27.3747 25.5335 27.5852 25.6889C27.7957 25.8443 28.0557 25.9303 28.3245 25.9335H29.6912C29.9773 25.9264 30.2487 25.8144 30.4462 25.6219C30.6437 25.4294 30.7513 25.172 30.7454 24.906C30.7769 24.6878 30.7199 24.4666 30.5855 24.2854C30.4511 24.1041 30.2489 23.976 30.0184 23.9258L27.8374 23.2499C27.6077 23.1984 27.4065 23.0699 27.2723 22.889C27.1382 22.7082 27.0805 22.4876 27.1104 22.2697C27.1045 22.0019 27.2128 21.7428 27.4117 21.5491C27.6106 21.3553 27.8838 21.2425 28.1718 21.2355H29.5386C29.807 21.2398 30.0664 21.3262 30.2766 21.4814C30.4869 21.6366 30.6363 21.8519 30.7018 22.0939"
                  stroke="#13C999"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M28.9287 20.5392V26.623"
                  stroke="#13C999"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <defs>
                  <filter
                    id="filter0_d_12_1027"
                    x="0.591797"
                    y="0.527832"
                    width="56.471"
                    height="56.471"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feMorphology
                      radius="2"
                      operator="dilate"
                      in="SourceAlpha"
                      result="effect1_dropShadow_12_1027"
                    />
                    <feOffset dx="1" dy="5" />
                    <feGaussianBlur stdDeviation="4.5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.431373 0 0 0 0 0.458824 0 0 0 0 0.533333 0 0 0 0.11 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_12_1027"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_12_1027"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
              <p className="text-[10px] sm:text-xs  -mt-2">Profit & Loss</p>
              <p className="text-sm  font-medium">
                50.00<span className="text-[10px] font-light">INR</span>
              </p>
            </div>
            </div>
           
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... w-[100%] rounded-[8px] p-[1px]">
            <div
              style={{
                boxShadow: "1px 5px 24px 8px rgba(110, 117, 136, 0.07",
              }}
              className={`flex w-[100%] flex-col justify-center items-center ${
                theme
                  ? `text-[${themeChange.light.textColor1}]`
                  : `text-[${themeChange.dark.textColor1}]`
              }  ${
                theme
                  ? `bg-[${themeChange.light.bg2}]`
                  : `bg-[${themeChange.dark.bg1}]`
              } rounded-[10px]  p-3`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="58"
                height="57"
                viewBox="0 0 58 57"
                fill="none"
              >
                <g opacity="0.15" filter="url(#filter0_d_12_989)">
                  <rect
                    x="10.5898"
                    y="6.52783"
                    width="34.471"
                    height="34.471"
                    rx="5"
                    fill="#456EFE"
                  />
                </g>
                <path
                  d="M35.0857 20.2955V27.8606C35.0857 30.1301 33.8653 31.6431 31.0177 31.6431H24.5087C21.6611 31.6431 20.4407 30.1301 20.4407 27.8606V20.2955C20.4407 18.026 21.6611 16.513 24.5087 16.513H31.0177C33.8653 16.513 35.0857 18.026 35.0857 20.2955Z"
                  stroke="#456EFE"
                  stroke-width="1.2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M30.6103 16.513V22.4591C30.6103 22.792 30.1872 22.9584 29.9269 22.739L28.0393 21.1201C27.8848 20.984 27.6406 20.984 27.486 21.1201L25.5985 22.739C25.3381 22.9584 24.915 22.792 24.915 22.4591V16.513H30.6103Z"
                  stroke="#456EFE"
                  stroke-width="1.2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M28.7795 25.591H32.2373"
                  stroke="#456EFE"
                  stroke-width="1.2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M25.3234 28.6171H32.2391"
                  stroke="#456EFE"
                  stroke-width="1.2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <defs>
                  <filter
                    id="filter0_d_12_989"
                    x="0.589844"
                    y="0.527832"
                    width="56.4711"
                    height="56.471"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feMorphology
                      radius="2"
                      operator="dilate"
                      in="SourceAlpha"
                      result="effect1_dropShadow_12_989"
                    />
                    <feOffset dx="1" dy="5" />
                    <feGaussianBlur stdDeviation="4.5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.431373 0 0 0 0 0.458824 0 0 0 0 0.533333 0 0 0 0.11 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_12_989"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_12_989"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
              <p className="text-[10px] sm:text-xs  -mt-2 ">Sport Profit</p>
              <p className="text-sm  font-medium">
                50.00<span className="text-[10px] font-light">INR</span>
              </p>
            </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... w-[100%] rounded-[8px] p-[1px]">
            <div
              style={{
                boxShadow: "1px 5px 24px 8px rgba(110, 117, 136, 0.07",
              }}
              className={`flex w-[100%] flex-col justify-center items-center ${
                theme
                  ? `text-[${themeChange.light.textColor1}]`
                  : `text-[${themeChange.dark.textColor1}]`
              }  ${
                theme
                  ? `bg-[${themeChange.light.bg2}]`
                  : `bg-[${themeChange.dark.bg1}]`
              } shadow-2xl rounded-[10px]  p-3`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="58"
                height="57"
                viewBox="0 0 58 57"
                fill="none"
              >
                <g opacity="0.15" filter="url(#filter0_d_12_989)">
                  <rect
                    x="10.5898"
                    y="6.52783"
                    width="34.471"
                    height="34.471"
                    rx="5"
                    fill="#456EFE"
                  />
                </g>
                <path
                  d="M35.0857 20.2955V27.8606C35.0857 30.1301 33.8653 31.6431 31.0177 31.6431H24.5087C21.6611 31.6431 20.4407 30.1301 20.4407 27.8606V20.2955C20.4407 18.026 21.6611 16.513 24.5087 16.513H31.0177C33.8653 16.513 35.0857 18.026 35.0857 20.2955Z"
                  stroke="#456EFE"
                  stroke-width="1.2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M30.6103 16.513V22.4591C30.6103 22.792 30.1872 22.9584 29.9269 22.739L28.0393 21.1201C27.8848 20.984 27.6406 20.984 27.486 21.1201L25.5985 22.739C25.3381 22.9584 24.915 22.792 24.915 22.4591V16.513H30.6103Z"
                  stroke="#456EFE"
                  stroke-width="1.2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M28.7795 25.591H32.2373"
                  stroke="#456EFE"
                  stroke-width="1.2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M25.3234 28.6171H32.2391"
                  stroke="#456EFE"
                  stroke-width="1.2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <defs>
                  <filter
                    id="filter0_d_12_989"
                    x="0.589844"
                    y="0.527832"
                    width="56.4711"
                    height="56.471"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feMorphology
                      radius="2"
                      operator="dilate"
                      in="SourceAlpha"
                      result="effect1_dropShadow_12_989"
                    />
                    <feOffset dx="1" dy="5" />
                    <feGaussianBlur stdDeviation="4.5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.431373 0 0 0 0 0.458824 0 0 0 0 0.533333 0 0 0 0.11 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_12_989"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_12_989"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
              <p className="text-[10px] sm:text-xs  -mt-2 ">Casino Profit</p>
              <p className="text-sm  font-medium">
                50.00<span className="text-[10px] font-light">INR</span>
              </p>
            </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between">
              <p className="text-sm  ">Recent Transaction</p>
            </div>

            <div className="flex   pb-[50px] mt-2 overflow-scroll h-[300px] md:h-[200px]  flex-col gap-2">
              {transactiondata.slice(0, 3).map((item) => {
                return (
                  <div   key={item._id} className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... p-[1px] w-[100%] rounded-[10px] ">
                  <div
                    style={{
                      boxShadow: "1px 5px 40px 8px rgba(110, 117, 136, 0.07)",
                    }}
                  
                    onClick={() => handleProfileTransaction(1, item)}
                    className={`flex  ${
                      theme
                        ? `bg-[${themeChange.light.bg2}]`
                        : `bg-[${themeChange.dark.bg1}]`
                    } justify-between shadow-2xl cursor-pointer items-center rounded-[10px] w-[100%] p-2`}
                  >
                    <div className="flex gap-2 items-center">
                      {/* <Image src={transactionpng} alt="" /> */}
                      <TbCoin color="#F3AF06" fontSize="40px" />

                      <div className="flex flex-col gap-1">
                        <p className="text-sm ">{item.method}</p>
                        <p className="text-xs ">{item.initiated_at}</p>
                      </div>
                    </div>
                    <div className="flex text-center flex-col gap-1">
                      <p
                        className={`text-sm  ${
                          item.status === "pending"
                            ? "text-orange-500":item.status==="reject"?"text-red-600": "text-[#0FBF00]"
                        }  font-medium`}
                      >
                        {item.type === "withdraw" ? "-" : "+"}{" "}
                        {item.deposit_amount || item.withdraw_amount}{" "}
                        <span className="text-[10px] font-light">INR</span>
                      </p>
                      <p
                        className={`text-xs ${
                          item.status === "pending"
                            ? "text-orange-500":item.status==="reject"?"text-red-600": "text-[#0FBF00]"
                        } `}
                      >
                        {item.type} : <span>{item.status}</span>
                      </p>
                    </div>
                  </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {profiletransaction === 1 && (
        <div className="">
          <div className="w-[90%]  relative m-auto">
            <div
              onClick={() => handleProfileTransaction(0)}
              className="absolute   cursor-pointer left-2 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="43"
                height="42"
                viewBox="0 0 48 47"
                fill="none"
              >
                <rect
                  x="0.386719"
                  width="47"
                  height="47"
                  rx="23.5"
                  fill="#A4A9AE"
                  fill-opacity="0.25"
                />
                <path
                  d="M27.3867 16L19.3867 24L27.3867 31.5"
                  stroke="#A4A9AE"
                  stroke-width="1.9"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="flex flex-col gap-5 w-[88%]  m-auto ">
            <p className="text-lg  text-center font-semibold">
              Transaction Details
            </p>
            <div>
              <p
                className={`mt-6  
                ${
                  transactionDetails?.status === "pending"
                ? "text-orange-500":transactionDetails?.status==="reject"?"text-red-600": "text-[#0FBF00]"
            }
                
                
                text-center font-semibold text-xs`}
              >
                {transactionDetails?.type}
              </p>
              <p
                className={`text-sm mt-1 text-center ${
                  transactionDetails?.status === "pending"
                  ? "text-orange-500":transactionDetails?.status==="reject"?"text-red-600": "text-[#0FBF00]"
                }  `}
              >
                {transactionDetails?.deposit_amount ||
                  transactionDetails?.withdraw_amount}{" "}
                <span className="">INR</span>
              </p>
            </div>
            <div className={`${theme ?`bg-[${themeChange.light.bg2}]` : `bg-[${themeChange.dark.bg2}]`} shadow-2xl  pl-5 flex items-center gap-3 w-[100%] p-2 rounded-[4px]`}>
              <PiInfo  />
              <p className="text-[10px]   font-light ">
                deposit amount admin information
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className=" text-sm font-medium">
                Marchend bank detail
              </p>
              <div className={`${theme ?`bg-[${themeChange.light.bg2}]` : `bg-[${themeChange.dark.bg2}]`} shadow-2xl  p-3 pb-10 flex flex-col gap-[14px] rounded-[4px]`}>
                <div className="flex justify-between w-[100%]">
                  <p className=" text-sm font-medium">Status</p>
                  <p className=" text-sm flex items-center gap-4">
                    <span>
                      <GoDotFill
                        color={
                          transactionDetails?.status === "pending"
                            ? "orange": transactionDetails?.status==="reject"?"red"
                            : "green"
                        }
                        fontSize="20px"
                      />
                    </span>
                    {transactionDetails?.status}
                  </p>
                </div>
                <div className="flex justify-between w-[100%]">
                  <p className=" text-sm font-medium">TrxID</p>
                  <p className=" text-sm flex items-center gap-4">
                    {transactionDetails?.transaction_id}
                    <span>
                      <BiSolidCopy cursor='pointer'  onClick={() => copyToClipboard(transactionDetails?.method)} fontSize="20px" />
                    </span>
                  </p>
                </div>
                <div className="flex justify-between w-[100%]">
                  <p className=" text-sm font-medium">Time</p>
                  <p className=" text-sm flex items-center gap-4">
                    {transactionDetails?.initiated_at}
                  </p>
                </div>
                <div className="flex justify-between w-[100%]">
                  <p className="text-sm font-medium">UTR Number</p>
                  <p className=" text-sm flex items-center gap-4">
                    {transactionDetails?.transaction_id}
                    <span>
                      <BiSolidCopy cursor='pointer' onClick={() => copyToClipboard(transactionDetails?.method)} fontSize="20px" />
                    </span>
                  </p>
                </div>
              </div>

              
                <div className={` ${theme ?`bg-[${themeChange.light.bg2}]` : `bg-[${themeChange.dark.bg2}]`} shadow-2xl p-3 mb-8  py-5 flex flex-col gap-[14px] rounded-[4px]`}>
                <p className="text-sm text-center">
                  Merchant bank detail
                </p>
                <div className="flex justify-between w-[100%]">
                  <p className=" text-sm font-medium">Gatway Name</p>
                  <p className="text-sm flex items-center gap-4">
                   {transactionDetails?.method}
                    <span>
                      <BiSolidCopy onClick={() => copyToClipboard(transactionDetails?.method)} cursor='pointer'  fontSize="20px" />
                    </span>
                  </p>
                </div>
             

{transactionDetails?.type==="deposit"?<>
                {transactionDetails?.admin_details?.map((item:any, index:any)=>{
                return  <div key={index} className="flex justify-between w-[100%]">
                <p className="text-sm font-medium">
                 {item.fieldName}
                </p>
                <p className="text-sm flex items-center gap-4">
                 {item.fieldValue}
                  <span>
                    <BiSolidCopy onClick={() => copyToClipboard(item.fieldValue)} cursor='pointer' fontSize="20px" />
                  </span>
                </p>
              </div>
               })} 
                </>:
                <>
                {transactionDetails?.user_details?.map((data: any, index: any) => {
                  return (
                    <div key={index}>
                      {Object.keys(data).map((key) => {
                        return (
                          <div
                            key={index}
                            className="flex justify-between w-[100%]"
                          >
                            <p className=" text-sm font-medium">{key}</p>
                            <p className=" text-xs flex items-center gap-4">
                              {data[key]}
                              <span>
                                <BiSolidCopy
                                  onClick={() => copyToClipboard(data[key])}
                                  cursor="pointer"
                                  fontSize="20px"
                                />
                              </span>
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
                </>}
               
                
              </div>
            
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
