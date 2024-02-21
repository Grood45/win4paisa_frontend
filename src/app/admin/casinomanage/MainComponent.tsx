"use client";
import React, { useEffect, useState } from "react";
import { GameProvider } from "../../../../utils/typescript.module";
import { fetchGetRequest, sendPatchRequest } from "@/api/api";
import { Button, CircularProgress, Progress, useToast } from "@chakra-ui/react";
import { VscUnverified } from "react-icons/vsc";
import { AiOutlineGlobal } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";

function MainComponent() {
  const [provider, setProvider] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loading1, setLoading1] = useState<boolean>(false);
  const [providerCounts, setProviderCounts] = useState<any>({});
  const [search, setSearch] = useState<string>("");
  const [index, setIndex] = useState<number>();
  const toast = useToast();
  const handleGetProvider = async () => {
    setLoading(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/casinoprovider/get-provider?`;
    try {
      if (search) {
        url += `&search=${search}`;
      }
      const response = await fetchGetRequest(url);
      setProvider(response.data);
      setProviderCounts(response.providerCounts);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      // toast({
      //   title: error?.data?.message,
      //   status: "error",
      //   duration: 2000,
      //   isClosable: true,
      // });
    }
  };
  useEffect(() => {
    let id: any;
    id = setTimeout(() => {
      handleGetProvider();
    }, 500);
    return () => clearTimeout(id);
  }, [search]);

  const handleStatus = async (id: any, index: any) => {
    setIndex(index);
    setLoading1(true);
    try {
      const response = await sendPatchRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/casinoprovider/toggle-provider/${id}`
      );
      setLoading1(false);
      const updatedData = provider.map((ele: any) => {
        if (id === ele._id) {
          ele = response.data;
          return ele;
        } else {
          return ele;
        }
      });
      setProvider(updatedData);
      handleGetProvider();
    } catch (error: any) {
      toast({
        title: "Update Status.",
        description: `${error?.data?.message}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      setLoading1(false);
    }
  };

  const data1 = [
    {
      id: 1,
      title: "All Provider",
      balance:
        !providerCounts.totalCount && loading ? (
          <CircularProgress isIndeterminate color="orange.600" size={"16px"} />
        ) : (
          providerCounts.totalCount
        ),
      profit: "+5%",
      icon: <AiOutlineGlobal fontSize={"20px"} color="white" />,
    },
    {
      id: 2,
      title: "Active Provider",
      balance:
        !providerCounts.activeCount && loading ? (
          <CircularProgress isIndeterminate color="orange.600" size={"16px"} />
        ) : (
          providerCounts.activeCount
        ),
      profit: "+50%",
      icon: <VscUnverified fontSize={"20px"} color="white" />,
    },
    {
      id: 3,
      title: "InActive Provider",
      balance:
        !providerCounts.inactiveCount && loading ? (
          <CircularProgress isIndeterminate color="orange.600" size={"16px"} />
        ) : (
          providerCounts.inactiveCount
        ),
      profit: "+10%",
      icon: <VscUnverified fontSize={"20px"} color="white" />,
    },
  ];

  return (
    <div>
      <div className="flex flex-col-reverse lg:flex-row justify-between   items-center">
        <div className=" grid grid-cols-1 lg:grid-cols-2  w-[100%]   gap-4 mt-[30px] justify-between">
          {data1.map((item) => {
            return (
              <div
                key={item.id}
                // onClick={() => setRoute(item.id)}
                className={`p-3 cursor-pointer dash-top w-[100%]  rounded-[8px] flex items-center justify-between`}
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

        <div className="flex flex-col gap-1 mt-0  justify-between items-center w-[100%]">
          <div className="input-group  w-[100%] lg:w-[70%]">
            <input
              type="email"
              className={`input text-white text-sm `}
              id="Email"
              name="text"
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
      <div className=" hidden md:contents">
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
          <p className="text-white font-semibold text-sm  pt-2 text-left">
            All Provider Details
          </p>
          <table className="w-[100%]  ">
            <tr className="text-center p-2   border-b h-[30px] border-gray-600 text-[10px] font-bold text-[#A0AEC0]">
              <th>ProviderID</th>
              <th>Provider Name</th>
              <th>Game Name</th>
              <th className="">Status</th>
            </tr>
            <tbody className=" ">
              {provider &&
                provider.map((item, dex) => {
                  return (
                    <tr
                      key={item.gpId}
                      className="text-center  h-[60px] m-auto  border-b border-gray-600 text-xs text-white"
                    >
                      <td>{item.gpId}</td>
                      <td className="">
                        <div className="flex flex-col ">
                          <p>{item.gpName}</p>
                        </div>
                      </td>
                      <td>{item.gameName}</td>

                      <td
                        style={{
                          whiteSpace: "nowrap",
                          textTransform: "none",
                          borderRight: "1px solid #ccc",
                        }}
                      >
                        <Button
                          isLoading={loading1 && index == dex}
                          onClick={() => handleStatus(item._id, dex)}
                          style={{
                            padding: "10px",
                            borderRadius: "10px",
                            width: "70px",
                            fontWeight: "bold",
                            fontSize: "12px",
                            backgroundColor: "white",
                            color: item.status === true ? "#76BF79" : "#e34b4b",
                            border: `1px solid ${
                              item.status === true ? "#76BF79" : "#e34b4b"
                            }`,
                          }}
                        >
                          {item.status === true ? "Active" : "InActive"}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;
