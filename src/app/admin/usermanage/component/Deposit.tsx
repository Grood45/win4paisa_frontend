"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import wallet from "../asset/wallet.png";
import watch from "../asset/Watch.png";
import cross from "../asset/BookmarkX.png";
import coin from "../../../../asset/rupees.png";
import Link from "next/link";
import { SlScreenDesktop } from "react-icons/sl";
import logo from "../../../../asset/logo.png";
import { Progress, useToast } from "@chakra-ui/react";
import { fetchGetRequest } from "@/api/api";
import {
  DepositTransaction,
  WithdrawalTransaction,
} from "../../../../../utils/typescript.module";
import { useParams } from "next/navigation";
import { getTimeAgo } from "../../../../../utils/getTimeInDetail";
const Deposit = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allDeposit, aetAllDeposit] = useState<DepositTransaction[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [transactionType, setTransactionType] = useState("all");
  const [transactionCount, aetTransactionCount] = useState();
  const [allAmount,setAllAmount]=useState<any>(0)
  const toast = useToast();
  const params = useParams();

  const getAlldashboardDetails = async () => {
    setLoading(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction/get-deposit/${params.id}?page=${currentPage}&limit=20&transaction_type=${transactionType}`;
    try {
      let response = await fetchGetRequest(url);
       setAllAmount(response?.transactionAmount)
      const data = response.data;
      const receivedData: DepositTransaction[] = response.data;
      if (receivedData) {
        aetAllDeposit(receivedData);
       

      }
      aetTransactionCount(response.usersCount);
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
    getAlldashboardDetails();
  }, [currentPage, transactionType]);

  const handleFilter = (name: string) => {
    setTransactionType(name);
  };

 
 
  return (
    <div className="flex flex-col mt-5 gap-6">
      {/* first */}
      <div className="flex flex-col md:flex-row gap-4">
        <div
          onClick={() => handleFilter("approved")}
          style={{
            background: "linear-gradient(96deg, #46F209 0%, #01B574 64.37%)",
          }}
          className="flex items-center cursor-pointer w-[100%] p-3 gap-2 py-6 rounded-[12px] justify-between"
        >
          <div>
            <p className="font-semibold text-md text-white">
              Successful Deposit
            </p>
            <p className="font-semibold text-lg text-white">{allAmount.approvedAmount}</p>
          </div>
          <Image src={wallet} className="h-[70px] w-[70px]" alt="" />
        </div>

        <div
          onClick={() => handleFilter("pending")}
          style={{
            background: "linear-gradient(96deg,  #CEB352 0%,  #FFA800 64.37%)",
          }}
          className="flex items-center cursor-pointer p-3 gap-2 py-6 w-[100%] rounded-[12px] justify-between"
        >
          <div>
            <p className="font-semibold text-md text-white">Pending Deposit</p>
            <p className="font-semibold text-lg text-white">{allAmount.pendingAmount}</p>
          </div>
          <Image src={watch} className="h-[70px] w-[70px]" alt="" />
        </div>

        <div
          onClick={() => handleFilter("reject")}
          style={{
            background: "linear-gradient(100deg, #FF6A6A 35.51%, #F00 103.54%)",
          }}
          className="flex items-center cursor-pointer p-3 gap-2 py-6 w-[100%] rounded-[12px] justify-between"
        >
          <div>
            <p className="font-semibold text-md text-white">Reject Deposit</p>
            <p className="font-semibold text-lg text-white">{allAmount.rejectAmount}</p>
          </div>
          <Image src={cross} className="h-[70px] w-[70px]" alt="" />
        </div>
      </div>

      {/* second table -div */}
      <div className="lg:contents hidden">
        <div
          style={{
            background:
              "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
          }}
          className="h-[100%] rounded-[20px] p-3  w-[100%]   "
        >
          {loading && (
            <Progress size="xs" isIndeterminate colorScheme="#e91e63" />
          )}
          <p className="text-white font-semibold text-sm pb-2 pt-2 text-left">
            All Deposit Details
          </p>
          <table className="w-[100%] ">
            <tr className="text-center p-2   border-b h-[30px] border-gray-600 text-[10px] font-bold text-[#A0AEC0]">
              <th className="text-left">Geteway / Trx</th>
              <th>Initiated</th>
              <th>User/UserId</th>
              <th>Deposite Amount</th>
              <th>Wallet Balance</th>
              <th>Status</th>
              <th className="text-right">Action</th>
            </tr>
            {allDeposit &&
              allDeposit.map((item) => {
                return (
                  <tr
                    key={item.user_id}
                    className="text-left  h-[60px] m-auto  border-b border-gray-600 text-xs text-white"
                  >
                    <td>
                      <div className="flex flex-col gap-[2px]  ">
                        <p>{item.method}</p>
                        <p className="text-xs  text-[#A0AEC0] ">
                          {item.transaction_id}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col text-center gap-[2px] ">
                        <p>{item.initiated_at}</p>
                        <p className="text-xs  text-[#A0AEC0] ">
                        {getTimeAgo(item.initiated_at)}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col text-center gap-[2px] ">
                        <p>{item.username}</p>
                        <p className="text-xs  text-[#A0AEC0] ">
                          {item.user_id}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col text-center gap-[2px]">
                        <p className="text-[16px] ">
                          <span>&#8377;</span> {item.deposit_amount} +{" "}
                          <span className="text-xs text-red-500 ">
                            {item.bonus}
                          </span>
                        </p>
                        <p className="text-xs  text-[#A0AEC0]  ">
                          {item.deposit_amount + item.bonus} INR
                        </p>
                      </div>
                    </td>
                    <td className="">
                      <div className="flex   justify-center text-center items-center gap-2">
                        <Image
                          src={coin}
                          alt=""
                          className="h-[15px] w-[15px]"
                        />
                        <span>{item.wallet_amount}</span>
                      </div>
                    </td>

                    <td>
                      <div className="flex flex-col items-center justify-between gap-[4px]  ">
                        <button
                          className={`py-[4px] w-[100%] text-[9px] m-auto rounded-[4px]   ${
                            item.status == "approved"
                              ? "bg-[#01B574]"
                              : "bg-red-500"
                          } text-white`}
                        >
                          {item.status}
                        </button>
                        <p className="text-[10px] text-center  text-[#A0AEC0] ">
                        {getTimeAgo(item.initiated_at)}

                        </p>
                      </div>
                    </td>
                    <td>
                      <div className=" flex justify-end">
                        <Link
                          key={item.user_id}
                          href={`/admin/depositmanage/${item._id}`}
                        >
                          <SlScreenDesktop
                            cursor="pointer"
                            color="white"
                            fontSize="15px"
                          />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>

      {/* show card instead of table */}

      <div className=" contents lg:hidden pb-4 ">
        <p className="text-white font-bold text-md mt-8">All Deposit details</p>
        {loading && (
            <Progress size="xs" isIndeterminate colorScheme="#e91e63" />
          )}
        <div className="flex flex-col gap-4 mt-2">
        {allDeposit &&
              allDeposit.map((item) => {
            return (
              <div
                key={item.user_id}
                style={{
                  background:
                    "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%",
                }}
                className=" p-2 flex flex-col gap-3 rounded-[20px] w-[100%]"
              >
                <div className="flex items-center justify-between  w-[100%] ">
                  <p className="text-white p-3  text-xs font-bold ">
                    User Details
                  </p>
                  <button
                          className={`py-[4px] w-[100px] text-[9px] m-auto rounded-[4px]   ${
                            item.status == "approved"
                              ? "bg-[#01B574]"
                              : "bg-red-500"
                          } text-white`}
                        >
                          {item.status}
                        </button>
                </div>
                <div className="flex  justify-start gap-4">
                  <Image
                    src={logo}
                    alt="logo"
                    className="h-[50px] rounded-[50%] border border-[#A0AEC0]  w-[50px]"
                  />
                  <div className="flex gap-[2px] flex-col ">
                    <p className="text-white">{item.username}</p>
                    <p className="text-xs  text-[#A0AEC0] ">{item.user_id}</p>
                  </div>
                </div>

                <div className="flex flex-col  ">
                  <div className="flex gap-3 w-[100%] p-3 ">
                    <p className="text-[#A0AEC0] font-medium text-xs">
                      Getway:-
                    </p>
                    <p className="text-[#fff] font-medium text-xs">
                      {item.method}{" "}
                      <span className="text-[#A0AEC0] text-[10px]">
                        {item.transaction_id}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-4 w-[100%] p-3">
                    <p className="text-[#A0AEC0] font-medium text-xs">
                      Initiated :-
                    </p>
                    <p className="text-[#fff] font-medium text-xs">
                      {item.initiated_at}{" "}
                      <span className="text-[#A0AEC0] text-[10px]">
                        {getTimeAgo(item.initiated_at)}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-4 w-[100%] p-3 ">
                    <p className="text-[#A0AEC0] font-medium text-xs">
                      Deposit Amount :-
                    </p>
                    <p className="text-[#fff] font-medium text-xs">
                      ${item.deposit_amount}
                    </p>
                  </div>

                  <div className="flex gap-4 w-[100%] p-3">
                    <p className="text-[#A0AEC0] font-medium text-xs">
                      Balance:-
                    </p>
                    <div className="flex justify-center items-center gap-2">
                      <Image src={coin} alt="" className="h-[15px] w-[15px]" />
                      <p className="text-white text-xs">{item.wallet_amount}</p>
                    </div>
                  </div>

                  <div className="flex justify-end p-3">
                    <Link
                      key={item.user_id}
                      href={`/admin/depositmanage/${item._id}`}
                    >
                      <button className="p-[6px] px-2 text-xs text-white rounded-[4px] bg-none border ">
                        View All
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Deposit;
