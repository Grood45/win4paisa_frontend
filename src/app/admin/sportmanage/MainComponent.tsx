"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../../../asset/logo.png";
import "../usermanage/usermanage.css";
import { TbCoin } from "react-icons/tb";
import { SlScreenDesktop } from "react-icons/sl";
import { BiSolidWalletAlt } from "react-icons/bi";
import { AiOutlineGlobal } from "react-icons/ai";
import { VscUnverified } from "react-icons/vsc";
import { BsSearch } from "react-icons/bs";
import { fetchGetRequest, sendPatchRequest } from "@/api/api";
import { CircularProgress, Progress, useToast } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { Event } from "../../../../utils/typescript.module";
const MainComponent = () => {
  const [route, setRoute] = useState(1);
  const [allSport, setAllSport] = useState<Event[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [index, setIndex] = useState<number>();
  const [statusLoading, setStatusLoading] = useState<boolean>(false);

  const toast = useToast();
  const params = useParams();

  const getAllBetDetails = async () => {
    setLoading(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/sport/get-all-sport?search=${search}`;
    try {
      let response = await fetchGetRequest(url);
      const data = response.data;
      const receivedData: Event[] = response.data;
      if (receivedData) {
        setAllSport(receivedData);
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
    let id: any;
    id = setTimeout(() => {
      getAllBetDetails();
    }, 700);

    return () => clearTimeout(id);
  }, [search]);
  const data1 = [
    {
      id: 1,
      title: "Manage Sport",
      balance: 10,
      profit: "+5%",
      icon: <AiOutlineGlobal fontSize={"20px"} color="white" />,
    },
    // {
    //   id: 2,
    //   title: "Manage League",
    //   balance: 10,
    //   profit: "",
    //   icon: <VscUnverified fontSize={"20px"} color="white" />,
    // },
  ];

  const handleStatus = async (
    sport: Event,
    sport_id: string,
    index: number
  ) => {
    setIndex(index);
    setStatusLoading(true);
    try {
      const response = await sendPatchRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/sport/update-sport-status/${sport_id}`
      );

      if (allSport) {
        const updatedData = allSport.map((ele: Event) => {
          if (sport_id === ele.sport_id) {
            ele.status = sport.status == true ? false : true;
            return ele;
          } else {
            return ele;
          }
        });
        setAllSport(updatedData);
      }
      setStatusLoading(false);
    } catch (error: any) {
      toast({
        title: "Update Status.",
        description: `${error.message}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      setLoading(false);

      setStatusLoading(false);
    }
  };



  



  // const handleFilter = (name: string) => {
  //   setMatchType(name);
  // };

  return (
    <div className=" ">
      {/* two-card */}
      <div className="flex flex-col-reverse lg:flex-row justify-between  items-center">
        <div className=" grid  grid-col-1 lg:grid-cols-2  w-[100%]   gap-4 mt-[30px] ">
          {data1.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => setRoute(item.id)}
                className={`p-3 cursor-pointer dash-top w-[100%]   rounded-[20px] flex items-center justify-between`}
              >
                <div className="flex flex-col gap-1">
                  <p className="text-[#A0AEC0] text-xs font-medium ">
                    {item.title}
                  </p>
                  <div className="flex text-white items-center text-sm font-semibold gap-4">
                    <p>{item.balance}</p>
                    <span className="text-green-700 text-xs">
                      {item.profit}
                    </span>
                  </div>
                </div>
                <span
                  className={`rounded-[30%]  p-2  bg-[#0075FF] flex items-center justify-center `}
                >
                  {item.icon}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-3   justify-between items-center w-[100%]">
          <div className="input-group mt-7  w-[100%] lg:w-[70%]">
            <input
              type="email"
              className={`input text-white text-sm `}
              id="Email"
              name="Email"
              placeholder="Search the keyword..........."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className={`button--submit flex items-center text-white`}>
              <BsSearch color="white" fontSize="20px" />
            </button>
          </div>
        </div>
      </div>

      {/* table */}
      {route === 1 && (
        <div
          style={{
            background:
              "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
          }}
          className="h-[100%] rounded-[16px] p-3  w-[100%]  mt-8 "
        >
          {loading && (
            <Progress size="xs" isIndeterminate colorScheme="#e91e63" />
          )}
          <p className="text-white font-semibold text-sm  pt-3 text-left">
            All Sports
          </p>
          <table className="w-[100%] mt-2  ">
            <tr className="text-center p-2   border-b h-[30px] border-gray-600 text-[10px] font-bold text-[#A0AEC0]">
              <th className="text-left">S.Number</th>
              <th>Event Type</th>
          
              <th>Sport Name</th>
              <th className="text-center">Status</th>
            </tr>
            {allSport &&
              allSport.map((item, dex) => {
                return (
                  <tr
                    key={item.sport_id}
                    className="text-center  h-[60px] m-auto  border-b border-gray-600 text-[10px] sm:text-xs text-white"
                  >
                    <td className="text-left">{dex + 1}</td>
                    <td>{item.sport_id}</td>
                  
                    <td>{item.sport_id=="1"?"Soccer":item.sport_id=="2"?"Tennis":"Cricket"}</td>
                    <td>
                      <div className="flex justify-center">
                        <button
                          className={`p-[6px]  rounded-md w-[70px]  ${
                            item.status == true
                              ? "bg-[#01B574]"
                              : "bg-[#E31A1A]"
                          } text-white`}
                          // onClick={() => handleStatus(item, item.sport_id, dex)}
                        >
                          {index === dex && statusLoading ? (
                            <CircularProgress isIndeterminate color='orange.600' size={"16px"}  />
                          ) : (
                            item.status==true?"Active":"InActive"
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      )}

      {route === 2 && (
        <div
          style={{
            background:
              "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
          }}
          className="h-[100%] rounded-[16px] p-3  w-[100%]  mt-8 "
        >
          <p className="text-white font-semibold text-sm  pt-3 text-left">
            All Leagues
          </p>
          <table className="w-[100%] mt-2">
            <tr className="text-center p-2   border-b h-[30px] border-gray-600 text-[10px] font-bold text-[#A0AEC0]">
              <th className="text-left">S.Number</th>
              <th>Event Name</th>
              <th>Market Count</th>
              <th className="text-right">Status</th>
            </tr>
            {allSport &&
              allSport.map((item, dex) => {
                return (
                  <tr
                    key={item.sport_id}
                    className="text-center  h-[60px] m-auto  border-b border-gray-600 text-[10px] sm:text-xs text-white"
                  >
                    <td className="text-left">{dex + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.market_count}</td>

                    <td>
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleStatus(item, item.sport_id, dex)}
                          className={`p-[6px] rounded-md w-[70px]  ${
                            item.status == true
                              ? "bg-[#01B574]"
                              : "bg-[#E31A1A]"
                          } text-white`}
                        >
                          {index === dex && statusLoading ? (
                            <CircularProgress size={"16px"} />
                          ) : (
                            item.status
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      )}
    </div>
  );
};

export default MainComponent;



