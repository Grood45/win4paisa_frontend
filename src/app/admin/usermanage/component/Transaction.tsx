"use client"

import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import coin from "../../../../asset/rupees.png"
import logo from "../../../../asset/logo.png"
import { fetchGetRequest } from '@/api/api';
import { AllTransaction } from '../../../../../utils/typescript.module';
import { useToast } from '@chakra-ui/react';
import { useParams } from 'next/navigation';

const Transaction = () => {
  const [loading1,setLoading1]=useState(false)
  const [transactionData,setTransactionData]=useState<any>([])
  const toast =useToast()
   const params=useParams()
      const getAllTransaction = async () => {
        setLoading1(true);
        let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction/get-all-transaction/${params.id}`;
        try {
          let response = await fetchGetRequest(url);
          const data = response.data;
          const receivedData:AllTransaction[]= response.data;
          if (receivedData) {
            setTransactionData(receivedData);
          }
          setLoading1(false);
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
        getAllTransaction();
      }, []);
      
  return (
    <div className='mt-8 flex flex-col gap-2'>
        <div className="flex justify-end">
           <div className="input-group w-[50%]">
                <input
                  type="email"
                  className={`input text-white text-sm`}
                  id="Email"
                  name="Email"
                  placeholder="Select the range..........."
                />
                <button
                  className={`button--submit flex items-center text-white`}
                >
                  <BsSearch color="white" fontSize="20px" />
                </button>
              </div>
        </div>


{/* table */}
<div className='lg:contents hidden'>
        <div
        style={{
          background:
            "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
        }}
        className="h-[100%] rounded-[16px] p-3  w-[100%] "
      >
        <p className="text-white font-medium text-sm  pt-2 text-left">
         User Transaction Details
        </p>
        <table className="w-[100%] ">
        <tr className="text-center p-2   border-b h-[30px] border-gray-600 text-[10px] font-bold text-[#A0AEC0]">
            <th className="text-left">Username / User ID</th>
            <th>Trx id</th>
            <th>Transacted</th>
            <th>Amount</th>
            <th>Wallet Balance</th>
          <th className='text-right'>Detail</th>
          </tr>
          {transactionData?.map((item:any) => {
            return (
              <tr
                key={item._id}
                className="text-center  h-[60px] m-auto  border-b border-gray-600 text-xs text-white"
              >
                <td className="">
                  <div className="flex text-left flex-col ">
                    <p>{item.username}</p>
                    <p className="text-xs  text-[#A0AEC0] ">{item.user_id}</p>
                  </div>
                </td>
                 <td>{item.transaction_id}</td>
                 <td className="">
                  <div className="flex text-center flex-col ">
                    <p>{item.initiated_at}</p>
                    {/* <p className="text-xs  text-[#A0AEC0] ">{item.userid}</p> */}
                  </div>
                </td>
                <td className='text-[#46F209]'> + <span>&#8377;</span> {item.withdraw_amount}</td>
                <td>
                <div className="flex justify-center text-center items-center gap-2">
                    <Image src={coin} alt="" className="h-[15px] w-[15px]" />
                    <p >{item.wallet_amount}</p>
                  </div>
                </td>
                
                <td className='text-right'>{item.admin_response}</td>
              </tr>
            );
          })}
        </table>
      </div>
      </div>
 {/* showing card instead of table */}
 <div className=" contents lg:hidden pb-4 ">
        <p className="text-white font-bold text-md mt-8">All user details</p>
        <div className="flex flex-col gap-4 mt-2">
          {transactionData&&transactionData?.map((item:any) => {
            return (
              <div
              key={item._id}
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
                  {/* <button className="text-[#fff] h-[20px] px-2 p-1 rounded-lg bg-green-600 font-medium text-[10px]">
                  Online
                  </button> */}
                </div>
              <div className="flex  justify-start gap-4">
                      <Image
                        src={logo}
                        alt="logo"
                        className="h-[50px] rounded-[50%] border border-[#A0AEC0]  w-[50px]"
                      />
                       <div className="flex gap-[2px] flex-col ">
                      <p className="text-white">
                        {item.username}
                      </p>
                      <p className="text-xs  text-[#A0AEC0] ">{item.user_id}</p>
                    </div>
                    </div>
                   
                <div className="flex flex-col  ">
                  <div className="flex gap-3 w-[100%] p-3 ">
                    <p className="text-[#A0AEC0] font-medium text-xs">
                      Trx ID :-
                    </p>
                    <p className="text-[#fff] font-medium text-xs">
                      {item.transaction_id}{" "}
                      <span className="text-[#A0AEC0] text-[10px]">
                        {/* {item.userid} */}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-4 w-[100%] p-3">
                    <p className="text-[#A0AEC0] font-medium text-xs">
                      Amount:-
                    </p>
                    <p className="text-[#E31A1A] font-medium text-xs">
                    <span>&#8377;</span> {item.withdraw_amount}
                    </p>
                  </div>
                  <div className="flex gap-4 w-[100%] p-3 ">
                    <p className="text-[#A0AEC0] font-medium text-xs">
                     Transacted:-
                    </p>
                    <p className="text-[#fff] font-medium text-xs">
                    {item.initiated_at}
                      {/* <span className="text-[#A0AEC0] text-[10px]">
                      2 years ago
                      </span> */}
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

                  <div className="flex gap-4 w-[100%] p-3 ">
                    <p className="text-[#A0AEC0] font-medium text-xs">
                     Details:-
                    </p>
                    <p className="text-[#fff] font-medium text-xs">
                   {item.admin_response}
                     
                    </p>
                  </div>

                      {/* <div className="flex justify-end p-3">
                    
                        <button className="p-[6px] px-2 text-xs text-white rounded-[4px] bg-none border ">View All</button>

                      </div> */}
              
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default Transaction