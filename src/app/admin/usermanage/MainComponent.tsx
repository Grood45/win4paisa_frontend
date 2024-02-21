"use client";

import SixCard from "@/components/admin/SixCard";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../../../asset/logo.png";
import "./usermanage.css";
import { TbCoin } from "react-icons/tb";
import { SlScreenDesktop } from "react-icons/sl";
import { AiOutlineGlobal } from "react-icons/ai";
import { BiSolidWalletAlt } from "react-icons/bi";
import { VscUnverified } from "react-icons/vsc";
import Link from "next/link";
import coin from "../../../asset/rupees.png";
import { BsSearch } from "react-icons/bs";
import { Button, CircularProgress, Progress, useToast } from "@chakra-ui/react";
import { fetchGetRequest } from "../../../api/api";
import { UserInterface } from "../../../../utils/typescript.module";
import { getTimeAgo } from "../../../../utils/getTimeInDetail";

const MainComponent = () => {
  const [allData, setAllData] = useState<UserInterface[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [usersCount, setUsersCount] = useState({
    totalEmailVerifiedUsers: 0,
    totalSmsUnverifiedUsers: 0,
    activeUsers: 0,
    bannedUsers: 0,
    totalVerifiedUsers: 0,
    withBalanceUsers: 0,
    totalUsers: 0,
  });
  const [pagination, setPagination] = useState<any>({});
  const totalPages = pagination.totalPages; // Replace with your total number of pages

  const [userCategory, setUserCategory] = useState<string>("total_user");
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const toast = useToast();

  const getAlldashboardDetails = async () => {
    setLoading(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/get-all-user?page=${currentPage}&limit=20`;
    if (search) {
      url += `&search=${search}`;
    }
    if (userCategory) {
      url += `&user_category=${userCategory}`;
    }

    try {
      let response = await fetchGetRequest(url);
      const data = response.data;
      const receivedData: UserInterface[] = response.data;
      setAllData(receivedData);
      setUsersCount(response.usersCount);
      setPagination(response.pagination);
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

 
const handlePrevPage = () => {

  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};

const handleNextPage = () => {
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  }
};

  useEffect(() => {
    let id: any;
    id = setTimeout(() => {
      getAlldashboardDetails();
    }, 700);

    return () => clearTimeout(id);
  }, [currentPage, search, userCategory]);

  const data1 = [
    {
      id: 1,
      title: "Total User",
      name: "total_user",
      value:
      loading?  <CircularProgress isIndeterminate color='orange.600'  size={"16px"} />:usersCount?.totalUsers,
      profit: "+53%",
      icon: <BiSolidWalletAlt fontSize={"20px"} color="white" />,
    },
    {
      id: 2,
      title: "Total Verified User",
      name: "total_verified",
      value:
      loading?  <CircularProgress isIndeterminate color='orange.600' size={"16px"}  />: usersCount?.totalVerifiedUsers,
          
       
      icon: <AiOutlineGlobal fontSize={"20px"} color="white" />,
    },
    {
      id: 3,
      title: "Total Email Unverified User",
      name: "email_unverified",
      value:
      loading?  <CircularProgress isIndeterminate color='orange.600'  size={"16px"}  />: usersCount?.totalEmailVerifiedUsers ,
      profit: "",
      icon: <VscUnverified fontSize={"20px"} color="white" />,
    },
    {
      id: 4,
      title: "Total Sms Unverified User",
      name: "sms_unverified",
      value:
        loading?  <CircularProgress  isIndeterminate color='orange.600' size={"16px"} />:usersCount?.totalSmsUnverifiedUsers,
      profit: "+5%",
      icon: <VscUnverified fontSize={"20px"} color="white" />,
    },
  ];
  const data2 = [
    {
      id: 1,
      title: "Active User",
      name: "active_user",
      value: loading ? <CircularProgress isIndeterminate color='orange.600'  size={"16px"}  /> : usersCount?.activeUsers,
      profit: "+53%",
      icon: <BiSolidWalletAlt fontSize={"20px"} color="white" />,
    },
    {
      id: 2,
      title: "Banned User",
      name: "blocked_user",
      value: loading ? <CircularProgress isIndeterminate color='orange.600'  size={"16px"} /> : usersCount?.bannedUsers,

      profit: "+5%",
      icon: <AiOutlineGlobal fontSize={"20px"} color="white" />,
    },
    {
      id: 3,
      title: "With Balance User",
      name: "with_balance",
      value: loading ? <CircularProgress isIndeterminate color='orange.600'  size={"16px"}  /> : usersCount?.withBalanceUsers,
      profit: "",
      icon: <VscUnverified fontSize={"20px"} color="white" />,
    },
  ];

  const handleFilter = (name: string) => {
    setUserCategory(name);
  };

  return (
    <div className=" ">
      <div className="mt-[30px] ">
        <SixCard handleFilter={handleFilter} data1={data1} />
      </div>
      <div className="mt-[10px] w-[100%]  flex flex-col lg:flex-row gap-3 justify-between">
        <SixCard handleFilter={handleFilter} data1={data2} />
        <div className="input-group justify-end mt-6 lg:mt-0  w-[80%] lg:w-1/3">
          <input
            type="email"
            className={`input text-white text-sm `}
            id="Email"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search here..........."
          />
          <button className={`button--submit flex items-center text-white`}>
            <BsSearch color="white" fontSize="20px" />
          </button>
        </div>
      </div>
      {/* table hide */}
     
      <div className="hidden md:contents">
        <div
          style={{
            background:
              "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
          }}
          className="h-[100%]   rounded-[6px] md:rounded-[16px] p-3 w-[100%] mt-8"
        >
          {loading && (
            <Progress size="xs" isIndeterminate colorScheme="#e91e63" />
          )}
          <p className="text-white font-bold text-sm">All user details</p>
          <div className="table-container  overflow-auto">
            <table className="w-[100%]">
              <tr className="text-center border-b p-2 h-[30px] border-gray-600 text-[10px] font-bold text-[#A0AEC0]">
                <th className="text-left min-w-[100px]">Username/Fullname</th>
                <th className="min-w-[100px]">Email-Phone</th>
                {/* <th className="min-w-[100px]">Country-State</th> */}
                <th className="min-w-[100px]">Junied At</th>
                <th className="min-w-[100px]">Balance</th>
                <th className="min-w-[100px]">Exp Limit</th>

                <th className="text-center min-w-[80px]">Status</th>
                <th className="min-w-[60px]">Stake</th>
                <th className="text-right min-w-[50px]">Action</th>
              </tr>
              {allData?.map((item) => {
                return (
                  <tr
                    key={item.user_id}
                    className="text-center h-[60px] border-b border-gray-600 text-xs text-white"
                  >
                    <td className="flex justify-start  gap-3">
                      <div className="">
                        <Image
                          src={logo}
                          alt="logo"
                          className="h-[40px rounded-[50%] border border-[#A0AEC0] mt-3 w-[40px]"
                        />
                      </div>
                      <div className="flex mt-auto  text-left gap-[2px] flex-col ">
                        <p>
                          {item.username}({item.first_name}
                          {item.last_name})
                        </p>
                        <p className="text-xs  text-[#A0AEC0] ">
                          {item.user_id}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col text-center gap-[2px] ">
                        <p>{item.phone}</p>
                        <p className="text-xs  text-[#A0AEC0] ">{item.email}</p>
                      </div>
                    </td>
                    {/* <td>
                      <div className="flex flex-col text-center gap-[2px] ">
                        <p>{item?.country}</p>
                        <p className="text-xs  text-[#A0AEC0] ">{item.state}</p>
                      </div>
                    </td> */}
                    <td>
                      <div className="flex flex-col text-center gap-[2px] ">
                        <p>{item.joined_at}</p>
                        <p className="text-xs  text-[#A0AEC0] ">
                          {getTimeAgo(item.joined_at)}
                        </p>
                      </div>
                    </td>
                    <td className="">
                      <div className="flex justify-center items-center gap-2">
                        <Image
                          src={coin}
                          alt=""
                          className="h-[15px] w-[15px]"
                        />
                        <p>{item.amount.toFixed(2)}</p>
                      </div>
                    </td>
                    <td className="font-bold">
                    <div className="flex justify-center items-center gap-2">
                        <Image
                          src={coin}
                          alt=""
                          className="h-[15px] w-[15px]"
                        />
                        <p>1L</p>
                      </div>
                    </td>

                    <td className="text-center">
                      <button
                        className={`p-[6px] rounded-[8px] px-3  ${
                          item.is_online == true ? "bg-[#01B574]" : "border"
                        } text-white`}
                      >
                        {item.is_online ? "online" : "offline"}
                      </button>
                    </td>
                    <td>
                      <p>{item.exposure_limit.toFixed(2)}</p>
                    </td>

                    <td>
                      <div className=" flex justify-end">
                        <Link
                          key={item.user_id}
                          href={`/admin/usermanage/${item.user_id}`}
                        >
                          <SlScreenDesktop color="white" fontSize="20px" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </div>

      {/* card show instead of table    */}

      <div className=" contents md:hidden pb-4 ">
        <p className="text-white font-bold text-md mt-8">All user details</p>
        <div className="flex flex-col gap-4 mt-2">
          {allData?.map((item: any) => {
            return (
              <div
                key={item.id}
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
                  <button className="text-[#fff] h-[20px] px-2 p-1 rounded-lg bg-green-600 font-medium text-[10px]">
                    Online
                  </button>
                </div>
                <div className="flex  justify-start gap-4">
                  <Image
                    src={logo}
                    alt="logo"
                    className="h-[50px] rounded-[50%] border border-[#A0AEC0]  w-[50px]"
                  />
                  <div className="flex gap-[2px] flex-col ">
                    <p className="text-white">
                      {item.username}({item.fullname})
                    </p>
                    <p className="text-xs  text-[#A0AEC0] ">{item.cardid}</p>
                  </div>
                </div>

                <div className="flex flex-col  ">
                  <div className="flex gap-3 w-[100%] p-3 ">
                    <p className="text-[#A0AEC0] font-medium text-xs">
                      Email-Phone :-
                    </p>
                    <p className="text-[#fff] font-medium text-xs">
                      {item.phone}{" "}
                      <span className="text-[#A0AEC0] text-[10px]">
                        {item.email}
                      </span>
                    </p>
                  </div>
                  {/* <div className="flex gap-4 w-[100%] p-3">
                    <p className="text-[#A0AEC0] font-medium text-xs">
                      Country-State :-
                    </p>
                    <p className="text-[#fff] font-medium text-xs">
                      {item.country}{" "}
                      <span className="text-[#A0AEC0] text-[10px]">
                        {item.state}
                      </span>
                    </p>
                  </div> */}
                  <div className="flex gap-4 w-[100%] p-3 ">
                    <p className="text-[#A0AEC0] font-medium text-xs">
                      Jointed At:-
                    </p>
                    
                    <p className="text-[#fff] font-medium text-xs">
                      {item.joined_at}{" "}
                      <span className="text-[#A0AEC0] text-[10px]">
                      {getTimeAgo(item.joined_at)}
                      </span>
                    </p>
                  </div>

                  <div className="flex gap-4 w-[100%] p-3">
                    <p className="text-[#A0AEC0] font-medium text-xs">
                      Balance:-
                    </p>
                    <div className="flex justify-center items-center gap-2">
                      <Image src={coin} alt="" className="h-[15px] w-[15px]" />
                      <p className="text-white text-xs"> {item.amount.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 w-[100%] p-3 ">
                    <p className="text-[#A0AEC0] font-medium text-xs">
                      stake:-
                    </p>
                    <p className="text-[#fff] font-medium text-xs">
                    <p>{item.exposure_limit.toFixed(2)}</p>
                    </p>
                  </div>

                  <div className="flex justify-end p-3">
                    <Link key={item.id} href={`/admin/usermanage/${item.id}`}>
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
      {allData && allData.length > 0 && (
        <div className="text-[16px] text-white text-sm font-semibold flex m-auto mb-4 mr-5 justify-end gap-3 align-middle items-center mt-2">
      
            <button
              type="button"
              className="ml-1 px-2 py-[4px] cursor-pointer rounded-[5px] text-[20px]"
              // ref="btPrevious"
              onClick={() => handlePrevPage()}
              disabled={currentPage == 1}
              style={{ backgroundColor: "#e91e63", color: "white",fontSize:'12px' }}
            >
              {"<"}
            </button>
            Page <span>{currentPage}</span> of{" "}
            <span>{pagination.totalPages}</span>
            <button
              onClick={() => handleNextPage()}
              type="button"
              disabled={currentPage == pagination.totalPages}
              className="ml-1 px-2 py-[4px] cursor-pointer rounded-[5px] text-[20px]"
              style={{ backgroundColor: "#e91e63", color: "white", fontSize:'12px' }}
            >
              {">"}
            </button>
          
        </div>
      )}
    </div>
  );
};

export default MainComponent;
