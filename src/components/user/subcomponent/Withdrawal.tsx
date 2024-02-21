"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import coin from "../../../assetuser/other/ruppes.png";
import { HiPlus } from "react-icons/hi";
import cancel from "../../../assetuser/authsocial/CANCLE.png";

import { useState } from "react";
import { PiInfo } from "react-icons/pi";
import { BiSolidCopy } from "react-icons/bi";
import transactionSuccesfull from "../../../assetuser/other/transactionSuccesfull.png";
import { GoDotFill } from "react-icons/go";
import { CircularProgress, Radio, useToast } from "@chakra-ui/react";
import { fetchGetRequest, sendPostRequest } from "@/api/api";
import { useSelector } from "react-redux";
import { RootState, useAppSelector } from "@/app/redux-arch/store";
import themeChange from "@/theme";
const Withdrawal = ({
  onClose,
  setShowPayment,
}: {
  onClose: () => void;
  setShowPayment?: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [Wnext, setWNext] = useState(false);
  const [radio, setRadioBtn] = useState("");
  const [withdrawalData, setWithdrawData] = useState<any>([]);
  const [withdrawDetails, setWithdrawDetails] = useState<any>({});
  const [viewReceipt, setViewReceipt] = useState<any>({});
  const [withdrawLoading, setWithdrawLoading] = useState<boolean>(false);
  const [value, setValue] = useState<any>(100);
  const minValue = 10;
  const maxValue = 10000000;
  const [inputError, setInputError] = useState(false);
  const toast = useToast();
  const userAuth = useSelector((state: RootState) => state);

  const {
    username = "",
    user_id = "",
    max_limit = 0,
    min_limit = 0,
    full_name = "",
    exposure_limit = 0,
    amount = 0,
  } = userAuth?.combineR?.userAuth?.data?.user || {};

  const [userfilldetails, setUserFillDetails] = useState<any>([]);
  const [copiedItem, setCopiedItem] = useState(null);
  const [minutes, setMinutes] = useState(Number(10));
  const [seconds, setSeconds] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [wagerData, setWagerData] = useState<any>({});
  const handleUserFillDetails = (event: any) => {
    const { name, value } = event.target;
    setUserFillDetails({ ...userfilldetails, [name]: value });
  };

  const getPaymentGateway = async () => {
    try {
      const response = await fetchGetRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/get-payment-method?type=withdraw`
      );
      setWithdrawData(response.data);
    } catch (error: any) {
      toast({
        title: error.message,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
  };

  const getWager = async () => {
    const payload = { username, user_id };
    try {
      const response = await sendPostRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction/get-total-deposit-and-wager`,
        payload
      );
      setWagerData(response.data);
    } catch (error: any) {
      toast({
        title: error.message,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    Promise.all([getPaymentGateway(), getWager()]);
  }, []);

  //localhost:8094/api/transaction/get-total-deposit-and-wager

  const createWithdrawDetails = async (cardIndex: any) => {
    const payload = {
      method: withdrawDetails.gateway,
      method_id: withdrawDetails._id,
      method_url: withdrawDetails.image,
      username: username,
      user_id: user_id,
      withdraw_amount: value,
      bonus: withdrawDetails.bonus,
      withdraw_slip: "",
      payable: Number(value) + withdrawDetails.bonus,
      after_withdraw: amount - value,
      wallet_amount: amount,
      admin_response: "",
      user_details: userfilldetails,
      admin_details: withdrawDetails.admin_details,
      utr_no: "",
      type: withdrawDetails.type,
    };
    setWithdrawLoading(true);
    try {
      const response = await sendPostRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction/create-withdraw-request/${user_id}`,
        payload
      );
      if (response.success) {
        setViewReceipt(response.data);
        setActiveCard(cardIndex);
      }
      setWithdrawLoading(false);
    } catch (error: any) {
      // alert(error?.data?.message)
      toast({
        title: error?.data?.message,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
      setWithdrawLoading(false);
    }
  };

  const withdrawAmount = [100, 200, 300, 500, 600, 700, 800, 900];
  const WithdrawalNext = () => {
    setWNext(true);
  };

  const [activeCard, setActiveCard] = useState(1);

  const selectPaymentOption = (id: any, data: any) => {
    setRadioBtn(id);
    setWithdrawDetails(data);
  };

  const handleButtonClick = (cardIndex: any, e: any) => {
    e.preventDefault();
    if (cardIndex === 2) {
      if (radio) {
        if (value > amount - exposure_limit) {
          toast({
            title: `insufficent balance is ${amount - exposure_limit}`,
            status: "error",
            duration: 2000,
            position: "top",
            isClosable: true,
          });
        } else if (
          withdrawDetails.min_limit > value ||
          withdrawDetails.max_limit < value
        ) {
          toast({
            title: `balance should be between ${withdrawDetails.min_limit}-${withdrawDetails.max_limit}`,
            status: "error",
            duration: 2000,
            position: "top",
            isClosable: true,
          });
          return;
        } else if (wagerData.wagerLeft) {
          toast({
            title: `Please complete TurnOver first ${wagerData.wagerLeft}`,
            status: "error",
            duration: 2000,
            position: "top",
            isClosable: true,
          });
          return;
        } else if (
          value >= withdrawDetails.min_limit &&
          value <= withdrawDetails.max_limit &&
          value <= amount - exposure_limit
        ) {
          setActiveCard(cardIndex);
        }
      } else if (value > amount) {
        toast({
          title: `Maximum withdraw amount is ${amount}`,
          status: "error",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
        return;
      } else {
        toast({
          title: "Select Payment Mode",
          status: "error",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
      }
    } else if (true) {
      toast({
        title: `Please complete TurnOver first ${wagerData.wagerLeft}`,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
      return;
    }

    if (cardIndex === 3) {
      createWithdrawDetails(cardIndex);
    }
    if (cardIndex === 4) {
      setActiveCard(cardIndex);
      setTimerStarted(true);
    }
  };

  const HandleArrow = () => {
    if (setShowPayment) {
      setShowPayment(0);
    } else {
      onClose();
    }
  };
  const handleCancel = () => {
    setActiveCard(1);
    onClose();
    if (setShowPayment) {
      setShowPayment(0);
    }
  };

  const handleValueChange = (event: any) => {
    const inputValue = event.target.value;
    setValue(inputValue);
  };

  const handleAddAmount = (item: any) => {
    const newValue = Number(value) + item;
    setValue(newValue);
  };

  const handleDownload = (imageUrl: any) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "image.jpg";
    link.click();
  };

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

  useEffect(() => {
    if (timerStarted) {
      const interval = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
          onClose();
          clearInterval(interval);
        } else if (seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [minutes, seconds, timerStarted]);

  const { showSideBar1, theme } = useAppSelector(
    (store) => store.combineR.NavStateReducer
  );

  return (
    <div className={`  ${theme ? "text-black" : "text-white"}`}>
      <div className="flex justify-end">
        <svg
          onClick={handleCancel}
          cursor={"pointer"}
          width="40"
          height="25"
          viewBox="0 0 40 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0H20C31.0457 0 40 8.95431 40 20V25H20C8.95431 25 0 16.0457 0 5V0Z"
            fill="#EAAB0F"
          />
          <line
            y1="-1"
            x2="17.8443"
            y2="-1"
            transform="matrix(0.728288 0.685271 -0.75454 0.656254 12.1129 8.19092)"
            stroke="black"
            stroke-width="2"
          />
          <line
            y1="-1"
            x2="17.6965"
            y2="-1"
            transform="matrix(0.67785 -0.7352 0.80052 0.599306 14.2448 20.0854)"
            stroke="black"
            stroke-width="2"
          />
        </svg>
      </div>
      {/* withdrawl  */}
      {activeCard === 1 && (
        <div className="min-h-[85vh]">
          <div onClick={HandleArrow} className="w-[90%] relative m-auto">
            <div className="absolute cursor-pointer left-2 ">
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

          <div className="flex flex-col gap-5 w-[90%] min-h-[85vh]  m-auto ">
            <p className="text-lg text-center font-semibold">Withdraw</p>

            <div className="flex flex-col gap-3 ">
              <p className="text-sm mt-2  text-left font-normal">
                Choose payment gatways
              </p>
              <div className="flex flex-col gap-2">
                {withdrawalData.length > 0 &&
                  withdrawalData?.map((item: any) => {
                    return (
                      <div
                        key={item._id}
                        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... w-[100%] rounded-[10px] p-[1px]"
                      >
                        {item.status ? (
                          <div
                            onClick={() => selectPaymentOption(item._id, item)}
                            style={{
                              boxShadow:
                                "1px 5px 40px 8px rgba(110, 117, 136, 0.07)",
                            }}
                            className={`${
                              theme
                                ? `bg-[${themeChange.light.bg2}]`
                                : `bg-[${themeChange.dark.bg3}]`
                            } shadow-2xl px-5 flex justify-between items-center rounded-[10px] p-3`}
                          >
                            <div className="flex items-center gap-2">
                              <img
                                className="h-[40px] w-[40px] rounded-[50%]"
                                src={item.image}
                                alt=""
                              />
                              <div className="flex flex-col gap-1">
                                <p className="text-xs font-medium">
                                  {item.gateway}
                                </p>
                                <p className=" text-[10px] font-light">
                                  Min {item.min_limit}-{item.max_limit}
                                </p>
                              </div>
                            </div>
                            <p className="text-[10px] ">
                              Processing Time :{" "}
                              <span className="text-green-500">
                                {item.processing_time} minute
                              </span>{" "}
                            </p>
                            <Radio
                              isChecked={radio === item._id ? true : false}
                            ></Radio>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
            <form onSubmit={(e) => handleButtonClick(2, e)}>
              <div className="flex flex-col gap-2 ">
                <div className="flex justify-between">
                  <p className="text-sm mt-2  text-left font-normal">
                    Enter Amount
                  </p>
                  <p
                    className={`text-sm mt-2  text-left font-normal ${
                      wagerData.wagerLeft > 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    TurnOver: ({wagerData?.wagerLeft}.00)
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... w-[100%] rounded-[10px] p-[1px]">
                    <input
                      value={value}
                      onChange={handleValueChange}
                      className={`p-4  ${
                        theme ? `bg-[${themeChange.light.bg2}]` : `bg-[#353A45]`
                      } shadow-2xl  w-[100%] focus:outline-none rounded-[10px] ${
                        inputError ? "border border-red-500" : ""
                      }`}
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-3 w-[100%]">
                    {withdrawAmount.map((item, index) => {
                      return (
                        <div
                          onClick={() => handleAddAmount(item)}
                          key={index}
                          className="rounded-[5px] text-center cursor-pointer p-1 px-2 bg-[#EAAB0F]  text-xs"
                        >
                          {item}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="flex w-[60%] m-auto pb-6 items-center justify-center">
                <button
                  type="submit"
                  className="p-2 px-5 mt-10 w-[100%] bg-[#EAAB0F] rounded-[6px] text-white text-sm"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* withdraw details */}
      {activeCard === 2 && (
        <div className="min-h-[85vh]">
          <div className="w-[90%] relative m-auto">
            <div
              onClick={() => setActiveCard(1)}
              className="absolute cursor-pointer left-2 "
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
          <div className="flex flex-col gap-5 w-[88%]   m-auto ">
            <p className="text-lg  text-center font-semibold">
              Withdrawal Details
            </p>
            <div className="  mt-10 w-[100%]  m-auto  flex justify-between ">
              <img
                className="h-[35px] ml-2 w-[35px] rounded-[50%]"
                src={withdrawDetails.image}
                alt=""
              />

              <div className="text-sm flex flex-col items-center justify-center gap-1 font-medium">
                <p>Withdrawal Amount</p>
                <p className="text-xs font-light">{value}INR</p>
              </div>
            </div>

            <div
              className={`${
                theme
                  ? `bg-[${themeChange.light.bg2}]`
                  : `bg-[${themeChange.dark.bg2}]`
              } shadow-2xl pl-5 flex items-center gap-3 w-[100%] p-2 rounded-[4px]`}
            >
              <PiInfo />
              <p className="text-[10px]   font-light ">
                {withdrawDetails.instruction}
              </p>
            </div>
            <form onSubmit={(e) => handleButtonClick(3, e)}>
              <div className="flex flex-col gap-2">
                <p className=" text-sm font-medium">Enter your bank detail?</p>
                <div
                  className={` ${
                    theme
                      ? `bg-[${themeChange.light.bg2}]`
                      : `bg-[${themeChange.dark.bg2}]`
                  } shadow-2xl p-3 py-5 flex flex-col gap-[14px] rounded-[4px]`}
                >
                  {withdrawDetails?.user_details?.map(
                    (item: any, index: number) => {
                      return (
                        <div
                          key={index}
                          className="flex flex-col gap-1 w-[100%]"
                        >
                          <label className=" text-sm font-light">
                            {item.name}
                          </label>
                          <input
                            key={item._id}
                            type={item.type}
                            name={item.name}
                            required={item.required}
                            placeholder={item.name}
                            className={`w-[100%] border border-gray-600 rounded-[4px] ${
                              theme
                                ? `bg-[${themeChange.light.bg2}]`
                                : `bg-[${themeChange.dark.bg2}]`
                            } outline-none p-2 text-xs `}
                            value={userfilldetails[item.name] || ""}
                            onChange={handleUserFillDetails}
                          />
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
              <div className="flex w-[60%] m-auto mt-3 pb-6 items-center justify-center">
                <button
                  disabled={withdrawLoading}
                  type="submit"
                  className="p-2 px-5 mt-5 w-[100%] bg-[#EAAB0F] rounded-[6px]  text-sm"
                >
                  {withdrawLoading ? (
                    <CircularProgress
                      size={"16px"}
                      isIndeterminate
                      color="orange.600"
                    />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* withdraw confirmation */}

      {activeCard === 3 && (
        <div className="min-h-[85vh]">
          <div className="w-[90%] relative m-auto">
            <div
              onClick={() => setActiveCard(2)}
              className="absolute cursor-pointer left-2 "
            >
              {/* <svg
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
              </svg> */}
            </div>
          </div>
          <div className="flex flex-col gap-5 w-[88%]  m-auto ">
            <p className="text-lg  text-center font-semibold">Confitmation</p>
            <div className="flex flex-col mt-6 justify-between ">
              <div className="flex text-center flex-col gap-1">
                <p className="text-[#456EFE] font-semibold text-lg">
                  Transfer Successful!
                </p>
                <p className="text-[#A4A9AE] text-sm font-normal">
                  Your money has been tranfered successfuly
                </p>
              </div>
              <form onSubmit={(e) => handleButtonClick(4, e)}>
                <div className="">
                  <Image src={transactionSuccesfull} alt="succesT" />
                </div>

                <div className="flex w-[60%] m-auto mt-3 pb-6 items-center justify-center">
                  <button
                    type="submit"
                    className="p-2 px-5 w-[100%] bg-[#EAAB0F] rounded-[6px]  text-sm"
                  >
                    View Receipt
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* withdraw statement */}
      {activeCard === 4 && (
        <div className="min-h-[85vh]">
          <div className="w-[90%] relative m-auto">
            <div
              onClick={() => setActiveCard(3)}
              className="absolute cursor-pointer left-2 "
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
            <p className="text-sm text-center mt-6 text-[#18FB05]">
              {viewReceipt.payable} INR
            </p>
            <div
              className={`${
                theme
                  ? `bg-[${themeChange.light.bg2}]`
                  : `bg-[${themeChange.dark.bg2}]`
              }  shadow-2xl pl-5 flex items-center gap-3 w-[100%] p-2 rounded-[4px]`}
            >
              <PiInfo />
              <p className="text-[10px]   font-light ">
                {withdrawDetails.instruction}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <p className="text-sm text-center">Merchant bank detail</p>
                <p className="text-[10px] text-center ">
                  Time :{" "}
                  <span className="text-red-600">
                    {minutes < 10 ? "0" : ""}
                    {minutes}:{seconds < 10 ? "0" : ""}
                    {seconds}
                  </span>
                </p>
              </div>

              <div
                className={`${
                  theme
                    ? `bg-[${themeChange.light.bg2}]`
                    : `bg-[${themeChange.dark.bg2}]`
                }  shadow-2xl p-3 pb-10 flex flex-col gap-[14px] rounded-[4px]`}
              >
                <div className="flex justify-between w-[100%]">
                  <p className=" text-sm font-medium">Status</p>
                  <p className=" text-sm flex items-center gap-4">
                    <span>
                      <GoDotFill color="#EAAB0F" fontSize="20px" />
                    </span>
                    {viewReceipt.status}
                  </p>
                </div>
                <div className="flex justify-between w-[100%]">
                  <p className=" text-sm font-medium">Time</p>
                  <p className="text-xs flex items-center gap-4">
                    {viewReceipt.initiated_at}
                  </p>
                </div>

                {viewReceipt?.user_details?.map((data: any, index: any) => {
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Withdrawal;
