"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import coin from "../../../../asset/rupees.png";
import pimg from "../../../../asset/profile/Frame 24 1.png";
import { useParams, useSearchParams } from "next/navigation";
import { DepositTransaction } from "../../../../../utils/typescript.module";
import { fetchGetRequest, sendPatchRequest } from "@/api/api";
import { CircularProgress, useToast } from "@chakra-ui/react";
import { BiSolidCopy } from "react-icons/bi";
const MainComponent = () => {
  const [depositData, setDepositData] = useState<DepositTransaction>();
  const [loading, setLoading] = useState<boolean>(false);
  const [depositLoading, setDepositLoading] = useState<boolean>(false);
  const [loading1, setLoading1] = useState<boolean>();
  const { id } = useParams();
  const toast = useToast();

  const getDepositDetails = async () => {
    setLoading(true);
    
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction/get-single-deposit/${id}?`;
    try {
      let response = await fetchGetRequest(url);
      const data = response.data;
      const receivedData: DepositTransaction = response.data;
      if (receivedData) {
        setDepositData(receivedData);
      }

      setLoading(false);
    } catch (error: any) {
      toast({
        description: `${error?.data?.message}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getDepositDetails();
  }, []);

  const approvedDeposit = async () => {
    setDepositLoading(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction/update-single-deposit/${id}?`;
    try {
      const updatedata = { status: "approved" };

      let response = await sendPatchRequest(url, updatedata);
      const data = response.data;
      const receivedData: DepositTransaction = response.data;
      if (receivedData) {
        setDepositData(receivedData);
        toast({
          description: `Approved Succesfully`,
          status: "success",
          duration: 4000,
          position: "top",
          isClosable: true,
        });
      }
      setDepositLoading(false);
    } catch (error: any) {
      toast({
        description: `${error.message}`,
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      setDepositLoading(false);
    }
  };
  const rejectDeposit = async () => {
    setLoading1(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction/update-single-deposit/${id}?`;
    try {
      const updatedata = { status: "reject" };

      let response = await sendPatchRequest(url, updatedata);
      const data = response.data;
      const receivedData: DepositTransaction = response.data;
      if (receivedData) {
        setDepositData(receivedData);
        toast({
          description: `Reject Succesfully`,
          status: "warning",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      }
      setLoading1(false);
    } catch (error: any) {
      toast({
        description: `${error?.data?.message||error?.message}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      setLoading1(false);
    }
  };

  const handleApproved = () => {
    approvedDeposit();
  };

  const handleReject = () => {
    rejectDeposit();
  };
  const [copiedItem, setCopiedItem] = useState(null);

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
            Deposit Via {depositData?.method}
          </p>
          <img
            src={depositData?.method_url}
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
          <p className="text-white p-3  text-xs font-bold ">Deposit Bill</p>
          <div className="flex flex-col   mt-2">
            <div className="flex justify-between w-[100%] p-3 border-t border-gray-600">
              <p className="text-[#fff] font-medium text-xs">Date</p>
              <p className="text-[#fff] font-medium text-xs">
                {depositData?.initiated_at}
              </p>
            </div>
            <div className="flex justify-between w-[100%] p-3 border-t border-gray-600">
              <p className="text-[#fff] font-medium text-xs">
                Transaction Number
              </p>
              <p className="text-[#fff] font-medium text-xs">
                {depositData?.transaction_id}
              </p>
            </div>
            <div className="flex justify-between w-[100%] p-3 border-t border-gray-600">
              <p className="text-[#fff] font-medium text-xs">Username</p>
              <p className="text-[#fff] font-medium text-xs">
                {depositData?.username}
              </p>
            </div>
            <div className="flex justify-between w-[100%] p-3 border-t border-gray-600">
              <p className="text-[#fff] font-medium text-xs">Method</p>
              <p className="text-[#fff] font-medium text-xs">
                {depositData?.method}
              </p>
            </div>
            <div className="flex justify-between w-[100%] p-3 border-t border-gray-600">
              <p className="text-[#fff] font-medium text-xs">Amount</p>
              <p className="text-[#fff] font-medium text-xs">
                {depositData?.deposit_amount}
              </p>
            </div>
            <div className="flex justify-between w-[100%] p-3 border-t border-gray-600">
              <p className="text-[#fff] font-medium text-xs">Wallet Amount</p>
              <p className="text-[#fff] font-medium text-xs">
                {depositData?.wallet_amount}
              </p>
            </div>
            <div className="flex justify-between w-[100%] p-3 border-t border-gray-600">
              <p className="text-[#fff] font-medium text-xs">After Deposit</p>
              <p className="text-[#fff] font-medium text-xs">
                {depositData?.after_deposit}
              </p>
            </div>
            <div className="flex justify-between w-[100%] p-3 border-t border-gray-600">
              <p className="text-[#fff] font-medium text-xs">Payable</p>
              <p className="text-[#fff] font-medium text-xs">
                {depositData?.payable}
              </p>
            </div>
            <div className="flex justify-between w-[100%] p-3 border-t border-gray-600">
              <p className="text-[#fff] font-medium text-xs">Status</p>
              <button
                className={`text-[#fff] p-[4px] px-2 rounded-lg ${
                  depositData?.status === "pending"
                    ? "bg-[#CEB352]"
                    : depositData?.status === "approved"
                    ? "bg-[green]"
                    : "bg-[red]"
                } font-medium text-[10px]`}
              >
                {depositData?.status}
              </button>
            </div>

            {/* if status is rejected then */}
            <div className="flex flex-col gap-1 w-[100%] p-3 border-t border-gray-600">
              <p className="text-[#fff] font-bold text-sm">Admin Response</p>
              <p className="text-[#fff] font-medium text-xs">
                {depositData?.admin_response}
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
        className=" w-[100%] lg:w-[45%] p-3 rounded-[20px] h-[100%]  "
      >
        <p className="text-white p-3  text-xs font-bold ">
          User Deposite Information
        </p>
        <div className="flex flex-col gap-4 mt-3">
        {depositData?.user_details?.map((data: any, index: any) => {
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
          <div className=" ">
            <p className="text-white   text-xs font-bold ">Deposit Slip</p>
            <div className="w-[100%] mt-3  rounded-sm">
              <img
                src={depositData?.deposit_slip}
                className="w-[100%] max-h-[400px]"
                alt=""
              />
            </div>

            {/* if status is pending then */}
            {depositData?.status === "pending" && (
              <div className="pl-3 mt-4 flex w-[100%] justify-between">
                <button
                  disabled={depositLoading || loading1}
                  onClick={handleApproved}
                  className="text-[#fff] p-[6px] px-2 rounded-lg bg-[#46F2099E] font-semibo;d text-xs"
                >
                  {depositLoading ? (
                    <CircularProgress
                      isIndeterminate
                      size={"16px"}
                      color="orange.600"
                    />
                  ) : (
                    "Approved"
                  )}
                </button>

                <button
                  disabled={depositLoading || loading1}
                  onClick={handleReject}
                  className="text-[#fff] p-[6px] px-3 rounded-lg bg-[#FF2222B5] font-semibold text-xs"
                >
                  {loading1 ? (
                    <CircularProgress
                      isIndeterminate
                      color="orange.600"
                      size={"16px"}
                    />
                  ) : (
                    "Reject"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
