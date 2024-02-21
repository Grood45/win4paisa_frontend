"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { DepositTransaction } from "../../../../../utils/typescript.module";
import { useToast } from "@chakra-ui/react";
import { fetchGetRequest, sendPatchRequest } from "@/api/api";
import { BiSolidCopy } from "react-icons/bi";
const MainComponent = () => {
  const [withdrawData, setWithdrawData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const toast = useToast();
  const [copiedItem, setCopiedItem] = useState(null);

  const getWithdrawDetails = async () => {
    setLoading(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction/get-single-withdraw/${id}?`;
    try {
      let response = await fetchGetRequest(url);
      const data = response.data;
      const receivedData = response.data;
      if (receivedData) {
        setWithdrawData(receivedData);
      }
      setLoading(false);
    } catch (error: any) {
      toast({
        description: `${error.message}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getWithdrawDetails();
  }, []);

  const approvedWithdraw = async () => {
    setLoading(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction/update-single-withdraw/${id}?`;
    try {
      const updatedata = { status: "approved" };

      let response = await sendPatchRequest(url, updatedata);
      const data = response.data;
      const receivedData: DepositTransaction = response.data;
      if (receivedData) {
        setWithdrawData(receivedData);
        toast({
          description: response.message,
          status: "success",
          duration: 4000,
          position: "top",
          isClosable: true,
        });
      }
      setLoading(false);
    } catch (error: any) {
      toast({
        description: `${error.message}`,
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
  };
  const rejectWithdraw = async () => {
    setLoading(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction/update-single-withdraw/${id}?`;
    try {
      const updatedata = { status: "reject" };

      let response = await sendPatchRequest(url, updatedata);
      const data = response.data;
      const receivedData: DepositTransaction = response.data;
      if (receivedData) {
        setWithdrawData(receivedData);
        toast({
          description: `Reject Succesfully`,
          status: "warning",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      }
      setLoading(false);
    } catch (error: any) {
      toast({
        description: `${error?.data?.message || error?.message}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
    }
  };

  const handleApproved = () => {
    approvedWithdraw();
  };

  const handleReject = () => {
    rejectWithdraw();
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
  return (
    <div className=" w-[95%] lg:w-[80%] flex flex-col pb-[100px] lg:pb-[0px] lg:flex-row gap-8 mt-8  m-auto">
      <div className="flex w-[90%] m-auto lg:w-[35%] flex-col gap-2 ">
        <div
          style={{
            background:
              "linear-gradient(to bottom, rgba(6, 11, 40, 0.94), rgba(10, 14, 35, 0.49))",
          }}
          className="w-[90%] flex m-auto  relative items-center justify-center rounded-[20px]  h-[190px]"
        >
          <p className="text-white absolute left-3 top-3 text-xs font-bold ">
            Withdrawal Via {withdrawData?.method}
          </p>
          <img
            src={withdrawData?.method_url}
            className="w-[90px] rounded-[50%] h-[90px]"
            alt=""
          />
        </div>

        <div
          style={{
            background:
              "linear-gradient(to bottom, rgba(6, 11, 40, 0.94), rgba(10, 14, 35, 0.49))",
          }}
          className=" p-1  rounded-[20px] w-[100%]"
        >
          <p className="text-white p-3  text-xs font-bold ">Withdrawal Bill</p>
          <div className="flex flex-col   mt-2">
            <div className="flex justify-between w-[100%] p-3 border-t border-gray-600">
              <p className="text-[#fff] font-medium text-xs">Date</p>
              <p className="text-[#fff] font-medium text-xs">
                {withdrawData?.initiated_at}
              </p>
            </div>
            <div className="flex justify-between gap-4 w-[100%] p-3 border-t border-gray-600">
              <p className="text-[#fff] font-medium text-xs">
                Transaction Number
              </p>
              <p className="text-[#fff] font-medium text-xs">
                {withdrawData?.transaction_id}
              </p>
            </div>
            <div className="flex justify-between w-[100%] p-3 border-t border-gray-600">
              <p className="text-[#fff] font-medium text-xs">Username</p>
              <p className="text-[#fff] font-medium text-xs">
                {withdrawData?.username}
              </p>
            </div>
            <div className="flex justify-between w-[100%] p-3 border-t border-gray-600">
              <p className="text-[#fff] font-medium text-xs">Method</p>
              <p className="text-[#fff] font-medium text-xs">
                {withdrawData?.method}
              </p>
            </div>
            <div className="flex justify-between w-[100%] p-3 border-t border-gray-600">
              <p className="text-[#fff] font-medium text-xs">Amount</p>
              <p className="text-[#fff] font-medium text-xs">
                {withdrawData?.withdraw_amount.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between w-[100%] p-3 border-t border-gray-600">
              <p className="text-[#fff] font-medium text-xs">Wallet Amount</p>
              <p className="text-[#fff] font-medium text-xs">
                {withdrawData?.wallet_amount.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between w-[100%] p-3 border-t border-gray-600">
              <p className="text-[#fff] font-medium text-xs">
                After Withdrawal
              </p>
              <p className="text-[#fff] font-medium text-xs">
                {withdrawData?.after_withdraw.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between w-[100%] p-3 border-t border-gray-600">
              <p className="text-[#fff] font-medium text-xs">Payable</p>
              <p className="text-[#fff] font-medium text-xs">
                {withdrawData?.payable}
              </p>
            </div>
            <div className="flex justify-between w-[100%] p-3 border-t border-gray-600">
              <p className="text-[#fff] font-medium text-xs">Status</p>
              <button
                className={`text-[#fff] p-[4px] px-2  ${
                  withdrawData?.status === "pending"
                    ? "bg-[#CEB352]"
                    : withdrawData?.status === "approved"
                    ? "bg-[green]"
                    : "bg-[red]"
                } rounded-lg bg-[#CEB352] font-medium text-[10px]`}
              >
                {withdrawData?.status}
              </button>
            </div>

            {/* if status is rejected then */}
            <div className="flex flex-col gap-1 w-[100%] p-3 border-t border-gray-600">
              <p className="text-[#fff] font-bold text-sm">Admin Response</p>
              <p className="text-[#fff] font-medium text-xs">
                {withdrawData?.admin_response}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          background:
            "linear-gradient(to bottom, rgba(6, 11, 40, 0.94), rgba(10, 14, 35, 0.49))",
        }}
        className=" w-[100%] lg:w-[45%] p-3 rounded-[20px] h-[100%]   "
      >
        <p className="text-white p-3  text-xs font-bold ">
          User Withdrawal Information
        </p>
        <div className="flex flex-col  w-[100%] gap-4 mt-3">
          {withdrawData?.type === "deposit" ? (
            <>
              {withdrawData?.admin_details?.map((item: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between  flex-col gap-1 text-gray-200  p-3 w-[100%]"
                  >
                    <label className="text-[10px] font-medium">
                      {" "}
                      {item.fieldName}
                    </label>
                    <div className="w-[100%] flex justify-between items-center  border outline-none bg-[#05183A] rounded-xl p-3">
                      <p> {item.fieldValue}</p>
                      <div className="cursor-pointer">
                        <span>
                          <BiSolidCopy
                            onClick={() => copyToClipboard(item.fieldValue)}
                            cursor="pointer"
                            fontSize="20px"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {withdrawData?.user_details?.map((data: any, index: any) => {
                return (
                  <div key={index}>
                    {Object.keys(data).map((key) => {
                      return (
                        <div
                          key={index}
                          className="flex justify-between flex-col gap-1 text-gray-200  p-3 w-[100%]"
                        >
                          <label className="text-[14px] font-semibold">
                            {" "}
                            {key}
                          </label>

                          <div className="w-[100%] flex justify-between items-center  border outline-none bg-[#05183A] rounded-xl p-3">
                            <p> {data[key]}</p>
                            <div className="cursor-pointer">
                              <span>
                                <BiSolidCopy
                                  onClick={() => copyToClipboard(data[key])}
                                  cursor="pointer"
                                  fontSize="20px"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </>
          )}

          <div className=" ">
            <p className="text-white  p-3   text-xs font-bold ">
              Withdrawal Slip
            </p>
            <div className="w-[100%] mt-3  rounded-sm">
              <img
                src={withdrawData?.withdraw_slip}
                className="w-[100%] max-h-[400px]"
                alt=""
              />
            </div>

            {/* if status is pending then */}

            <div className=" flex w-[100%] justify-between">
              {withdrawData?.status === "pending" && (
                <div className="px-8 pb-5   flex w-[100%] justify-between">
                  <button
                    onClick={handleApproved}
                    className="text-[#fff] p-[6px] px-2 rounded-lg bg-[#46F2099E] font-semibo;d text-xs"
                  >
                    Approved
                  </button>

                  <button
                    onClick={handleReject}
                    className="text-[#fff] p-[6px] px-3 rounded-lg bg-[#FF2222B5] font-semibold text-xs"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
