"use client";

import React, { useEffect, useState } from "react";
import { PiInfo } from "react-icons/pi";
import cancel from "../../../assetuser/authsocial/CANCLE.png";
import Image from "next/image";
import transactionpng from "../../../assetuser/other/transactionCoin.png";
import { GoDotFill } from "react-icons/go";
import { BiSolidCopy } from "react-icons/bi";
import { fetchGetRequest } from "@/api/api";
import { useToast } from "@chakra-ui/react";
import { AllTransaction } from "../../../../utils/typescript.module";
import { useSelector } from "react-redux";
import { RootState, useAppSelector } from "@/app/redux-arch/store";
import { useParams } from "next/navigation";
import themeChange from "@/theme";
import { TbCoin } from "react-icons/tb";
const Transaction = ({
  onClose,
  setShowtransaction,
  setShowPayment,
  setShowProfile,
}: {
  onClose: () => void;
  setShowPayment?: React.Dispatch<React.SetStateAction<number>>;
  setShowProfile?: any;
  setShowtransaction?: any;
}) => {
  const [activeTransaction, setTransaction] = useState(1);
  const [loading1, setLoading1] = useState(false);
  const [transactiondata, setTransactionData] = useState<AllTransaction[]>([]);
  const [transactionDetails, setTransactionDetails] =
    useState<AllTransaction>();
  const [copiedItem, setCopiedItem] = useState(null);

  const toast = useToast();
  const userAuth = useSelector((state: RootState) => state);
  const { user_id = "" } = userAuth?.combineR?.userAuth?.data?.user || {};

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

  const handleTransaction = (cardIndex?: any, data?: AllTransaction) => {
    setTransaction(cardIndex);
    if (setShowPayment) {
      setShowPayment(3);
    }

    if (cardIndex === 2) {
      if (data) {
        setTransactionDetails(data);
      }
    }
  };

  const handleArrow = () => {
    if (setShowPayment) {
      setShowPayment(0);
      setShowtransaction(1);
    }
    if (setShowtransaction) {
      setShowtransaction(1);
    } else {
      onClose();
    }
  };

  const { showSideBar1, theme } = useAppSelector(
    (store) => store.combineR.NavStateReducer
  );

  const copyToClipboard = (text: any) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedItem(text);
        toast({
          title: "copied",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };
  return (
    <div className="">
      {activeTransaction === 1 && (
        <div>
          <div className="w-[90%]  relative m-auto">
            <div
              onClick={handleArrow}
              className="absolute    cursor-pointer left-2 "
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
          <div className="flex flex-col gap-5 w-[100%] md:w-[98%]  m-auto ">
            <p className="text-lg  text-center font-semibold">Transaction</p>
            <div className="mt-12 h-[80vh] overflow-scroll">
              <div className="flex justify-between">
                <p className="text-sm "> Transaction</p>
                <p className="text-sm ]">View All</p>
              </div>

              <div className="flex   pb-[50px] mt-2  flex-col gap-2">
                {transactiondata.map((item) => {
                  return (
                    <div
                      key={item._id}
                      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... p-[1px] w-[100%] rounded-[10px] "
                    >
                      <div
                        style={{
                          boxShadow:
                            "1px 5px 40px 8px rgba(110, 117, 136, 0.07)",
                        }}
                        onClick={() => handleTransaction(2, item)}
                        className={`flex justify-between cursor-pointer ${
                          theme
                            ? `bg-[${themeChange.light.bg2}]`
                            : `bg-[${themeChange.dark.bg1}]`
                        } items-center rounded-[10px] w-[100%] p-2`}
                      >
                        <div className="flex gap-2 items-center">
                          {/* <Image src={transactionpng} alt="" /> */}
                          <TbCoin color="#F3AF06" fontSize="40px" />

                          <div className="flex flex-col gap-1">
                            <p className="text-sm ">{item.method}</p>
                            <p className="text-xs ]">{item.initiated_at}</p>
                          </div>
                        </div>
                        <div className="flex text-center flex-col gap-1">
                          <p
                            className={`text-sm  ${
                              item.status === "pending"
                                ? "text-orange-500"
                                : item.status === "reject"
                                ? "text-red-600"
                                : "text-[#0FBF00]"
                            }  font-medium`}
                          >
                            {item.type === "withdraw" ? "-" : "+"}{" "}
                            {item.deposit_amount || item.withdraw_amount}{" "}
                            <span className="text-[10px] font-light">INR</span>
                          </p>
                          <p
                            className={`text-xs ${
                              item.status === "pending"
                                ? "text-orange-500"
                                : item.status === "reject"
                                ? "text-red-600"
                                : "text-[#0FBF00]"
                            }`}
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
        </div>
      )}

      {activeTransaction === 2 && (
        <div className="min-h-[85vh]">
          <div className="w-[90%]  relative m-auto">
            <div
              onClick={() => handleTransaction(1)}
              className="absolute  cursor-pointer left-2 "
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
                className={`mt-6  ${
                  transactionDetails?.status === "pending"
                    ? "text-orange-600": transactionDetails?.status==="reject"?"text-red-600"
                    : "text-green-600"
                } text-center font-semibold text-xs`}
              >
                {transactionDetails?.type}
              </p>
              <p
                className={`text-sm mt-1 text-center ${
                  transactionDetails?.status === "pending"
                  ? "text-orange-600": transactionDetails?.status==="reject"?"text-red-600"
                  : "text-green-600"
                }  `}
              >
                {transactionDetails?.deposit_amount ||
                  transactionDetails?.withdraw_amount}{" "}
                <span className="">INR</span>
              </p>
            </div>
            <div
              className={` ${
                theme
                  ? `bg-[${themeChange.light.bg2}]`
                  : `bg-[${themeChange.dark.bg2}]`
              } shadow-2xl pl-5 flex items-center gap-3 w-[100%] p-2 rounded-[4px]`}
            >
              <PiInfo />
              <p className="text-[10px]   font-light ">
                deposit amount admin information
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className=" text-sm font-medium">Marchend bank detail</p>
              <div
                className={`${
                  theme
                    ? `bg-[${themeChange.light.bg2}]`
                    : `bg-[${themeChange.dark.bg2}]`
                } shadow-2xl p-3 pb-10 flex flex-col gap-[14px] rounded-[4px]`}
              >
                <div className="flex justify-between w-[100%]">
                  <p className=" text-sm font-medium">Status</p>
                  <p className=" text-sm flex items-center gap-4">
                    <span>
                      <GoDotFill
                        color={
                          transactionDetails?.status === "pending"
                            ? "orange"
                            : transactionDetails?.status === "reject"
                            ? "red"
                            : "green"
                        }
                        font
                        fontSize="20px"
                      />
                    </span>
                    {transactionDetails?.status}
                  </p>
                </div>
                <div className="flex justify-between gap-4 w-[100%]">
                  <p className=" text-sm font-medium">TrxID</p>
                  <p className=" text-sm  flex items-center gap-2">
                    {transactionDetails?.transaction_id}
                    <span>
                      <BiSolidCopy
                        onClick={() =>
                          copyToClipboard(transactionDetails?.method)
                        }
                        cursor="pointer"
                        fontSize="20px"
                      />
                    </span>
                  </p>
                </div>
                <div className="flex justify-between w-[100%]">
                  <p className=" text-sm font-medium">Time</p>
                  <p className=" text-sm flex items-center gap-4">
                    {transactionDetails?.initiated_at}
                  </p>
                </div>
               
              </div>

              <div className="flex flex-col gap-2">
                <div
                  className={` ${
                    theme
                      ? `bg-[${themeChange.light.bg2}]`
                      : `bg-[${themeChange.dark.bg2}]`
                  } shadow-2xl p-3 mb-8  py-5 flex flex-col gap-[14px] rounded-[4px]`}
                >
                  <p className="text-sm text-center">Merchant bank detail</p>
                  <div className="flex justify-between w-[100%]">
                    <p className=" text-sm font-medium">Gatway Name</p>
                    <p className="text-sm flex items-center gap-4">
                      {transactionDetails?.method}
                      <span>
                        <BiSolidCopy
                          onClick={() =>
                            copyToClipboard(transactionDetails?.method)
                          }
                          cursor="pointer"
                          fontSize="20px"
                        />
                      </span>
                    </p>
                  </div>

                  {transactionDetails?.type === "deposit" ? (
                    <>
                      {transactionDetails?.admin_details?.map(
                        (item: any, index: any) => {
                          return (
                            <div
                              key={index}
                              className="flex justify-between w-[100%]"
                            >
                              <p className="text-sm font-medium">
                                {item.fieldName}
                              </p>
                              <p className="text-sm flex items-center gap-4">
                                {item.fieldValue}
                                <span>
                                  <BiSolidCopy
                                    onClick={() =>
                                      copyToClipboard(item.fieldValue)
                                    }
                                    cursor="pointer"
                                    fontSize="20px"
                                  />
                                </span>
                              </p>
                            </div>
                          );
                        }
                      )}
                    </>
                  ) : (
                    <>
                      {transactionDetails?.user_details?.map(
                        (data: any, index: any) => {
                          return (
                            <div key={index}>
                              {Object.keys(data).map((key) => {
                                return (
                                  <div
                                    key={index}
                                    className="flex justify-between w-[100%]"
                                  >
                                    <p className=" text-sm font-medium">
                                      {key}
                                    </p>
                                    <p className=" text-xs flex items-center gap-4">
                                      {data[key]}
                                      <span>
                                        <BiSolidCopy
                                          onClick={() =>
                                            copyToClipboard(data[key])
                                          }
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
                        }
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transaction;
