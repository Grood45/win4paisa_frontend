"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Text,
  Input,
  Badge,
  extendTheme,
  ChakraProvider,
  Box,
  Button,
  Checkbox,
  useToast,
  Progress,
} from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { fetchGetRequest, sendPatchRequest, sendPostRequest } from "@/api/api";

const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
});

const theme = extendTheme({
  breakpoints,
});

function LeagueTable() {
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [leagues, setLeagues] = useState<any>([]);
  const [pagination, setPagination] = useState<any>({});
  const [loading, setLoading] = useState<any>(true);
  const [search, setSearch] = useState<any>();
  const [index, setIndex] = useState<any>("");
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const totalPages = pagination.totalPages; // Replace with your total number of pages
  const toast = useToast();
  const GetAllLeagues = async () => {
    setLoading(true);
    let url = `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/api/league/get-all-league?page=${currentPage}&limit=${10}`;
    if (search) {
      url += `&name=${search}`;
    }
    try {
      const response = await fetchGetRequest(url);
      setLeagues(response.data);
      setPagination(response.pagination);
      setLoading(false);
    } catch (error: any) {
      toast({
        title: "Fetch Data.",
        description: `${error.data.error}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const handleStatus = async (league: any, index: any) => {
    setIndex(index);
    let status = league.status == true ? false : true;
    setLoading(true);
    const id = league.league_id;
    try {
      const response = await sendPatchRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/league/update-league-status/${id}`
      );
      setLoading(false);
      const updatedData = leagues.map((ele: any) => {
        if (league.league_id === ele.league_id) {
          ele.status = status;
          return ele;
        } else {
          return ele;
        }
      });

      setLeagues(updatedData);
    } catch (error: any) {
      toast({
        title: "Update Status.",
        description: `${error.data.error}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    let id: any;
    id = setTimeout(() => {
      GetAllLeagues();
    }, 1000);

    return () => clearTimeout(id);
  }, [currentPage, search]);

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

  const handleImage = async (imageurl: any, league: any) => {
    const id = league.league_id;
    try {
      const payload = {
        league_logo: imageurl,
      };
      const response = await sendPatchRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/league/update-league-logo/${id}`,
        payload
      );
      const updatedData = leagues.map((ele: any) => {
        if (league.league_id === ele.league_id) {
          ele = response.data;
          return ele;
        } else {
          return ele;
        }
      });

      setLeagues(updatedData);
      setLoading(false);
    } catch (error: any) {
      toast({
        title: "Update Status.",
        description: `${error.data.error}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const handleImageUrlChange = async (event: any, row: any) => {
    const file = event.target.files[0];

    if (file) {
      const imageurl = await handleImageUpload(file);
      handleImage(imageurl, row);
    }
  };

  const handleImageUpload = async (file: File) => {
    setImageLoading(true);
    const formData = new FormData();
    formData.append("post_img", file);
    try {
      const response = await sendPostRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/image-url`,
        formData
      );
      if (response.url) {
        toast({
          title: "Image uploaded successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setImageLoading(false);
        return response.url;
      }
    } catch (error: any) {
      toast({
        title: error?.data?.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setImageLoading(false);
      return null;
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Flex
          as="nav"
          justify="space-between"
          align={"center"}
          padding="1rem"
          paddingLeft="2rem"
          bg={"none"}
          color="white"
          rounded={"lg"}
        >
          <Box className="mt-5">
            <Text className={"text-gray-500 font-medium"}>
              Pages / <span className={`text-gray-600`}>Leaque </span>
            </Text>
            <Text
              className={`font-bold text-[#344767] text-left text-lg sm:text-lg `}
            >
              Leaque
            </Text>
          </Box>
        </Flex>
      </Box>
      <Box
        boxShadow="rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px"
        p={5}
        m={"4"}
        bg={"white"}
        rounded={"lg"}
        width={"100%"}
      >
        <Box className="flex justify-between mb-6">
          <Input
            width="50%"
            placeholder={"search"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Box className="flex gap-2"></Box>
        </Box>
        <div className="container overflow-scroll w-[100%]">
          {loading && (
            <Progress size="xs" isIndeterminate colorScheme="#e91e63" />
          )}
          <Table
            variant="striped"
            colorScheme="primary"
            className="table table-hover bet-table"
          >
            <Thead bg="primary" className=" bg-[#344767]">
              <Tr>
                {/* <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                    borderRight: "1px solid #ccc",
                  }}
                ></Th> */}
                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                    minWidth:'60px',
                    borderRight: "1px solid #ccc",
                  }}
                >
                  ID
                </Th>
                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                    borderRight: "1px solid #ccc",
                  }}
                >
                  SPORT NAME
                </Th>
                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                    borderRight: "1px solid #ccc",

                  }}
                >
                  LEAGUE NAME
                </Th>
                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    fontSize: "10px",

                    whiteSpace: "nowrap",

                    borderRight: "1px solid #ccc",
                  }}
                >
                  MARKET COUNT
                </Th>

                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    fontSize: "10px",
                    borderRight: "1px solid #ccc",
                  }}
                >
                  LEAGUE LOGO
                </Th>
                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                    borderRight: "1px solid #ccc",
                  }}
                >
                  COMPETITION REGION
                </Th>
                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                    borderRight: "1px solid #ccc",
                  }}
                >
                  STATUS
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {leagues.map((row: any, dex: any) => (
                <Tr
                  key={dex}
                  className={` ${
                    dex % 2 === 0 ? "bg-[#ECECEC]" : "bg-[#FFFFFF]"
                  } hover:bg-[#ECECEC] text-[12px] font-medium `}
                >
                  {/* <Td
                    style={{
                      whiteSpace: "nowrap",
                      textTransform: "none",
                      borderRight: "1px solid #ccc",
                    }}
                  >
                    <div>
                      <Checkbox
                        size={"lg"}
                        defaultChecked
                        style={{
                          "--chakra-colors-blue-500": "#e91e63",
                          border: "1px solid #e91e63",
                        }}
                      />
                    </div>
                  </Td> */}
                  <Td
                    style={{
                      // whiteSpace: "nowrap",
                      textTransform: "none",
                      borderRight: "1px solid #ccc",
                    }}
                  >
                    {row.league_id}
                  </Td>
                  <Td
                    style={{
                      // whiteSpace: "nowrap",
                      textTransform: "none",
                      borderRight: "1px solid #ccc",
                    }}
                  >
                    {row.sport_id == 4
                      ? "Cricket"
                      : row.sport_id == 1
                      ? "Scoccer"
                      : "Tennis"}
                  </Td>
                  <Td
                    style={{
                      // whiteSpace: "nowrap",
                      textTransform: "none",
                      borderRight: "1px solid #ccc",
                    }}
                  >
                    {row.name}
                  </Td>
                  <Td
                    style={{
                      textTransform: "none",
                      borderRight: "1px solid #ccc",
                      width:'80px'
                    }}
                  >
                    {row.market_count}
                  </Td>

                  <Td
                    style={{
                      // whiteSpace: "nowrap",
                      textTransform: "none",
                      borderRight: "1px solid #ccc",

                    }}
                  >
                    <div>
                      <input
                        type="file"
                        onChange={(e) => handleImageUrlChange(e, row)}
                      />
                      {row?.league_logo !== "" && (
                        <div>
                          <img
                            src={row?.league_logo || ""}
                            alt="Selected Image"
                            className="h-[40px] w-[40px]"
                          />
                        </div>
                      )}
                    </div>
                  </Td>

                  <Td
                    style={{
                      whiteSpace: "nowrap",
                      textTransform: "none",
                      borderRight: "1px solid #ccc",
                    }}
                  >
                    {row.competition_region}
                  </Td>

                  <Td
                    style={{
                      whiteSpace: "nowrap",
                      textTransform: "none",
                      borderRight: "1px solid #ccc",
                    }}
                  >
                    <Button
                      isLoading={loading && index === dex}
                      onClick={() => handleStatus(row, dex)}
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        width: "70px",
                        fontWeight: "bold",
                        fontSize: "12px",
                        backgroundColor: "white",
                        color: row.status === true ? "#76BF79" : "#e34b4b",
                        border: `1px solid ${
                          row.status === true ? "#76BF79" : "#e34b4b"
                        }`,
                      }}
                    >
                      {row.status === true ? "Active" : "InActive"}
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>

        {leagues && leagues.length > 0 && (
          <div className="text-[16px] flex m-auto justify-end gap-3 align-middle items-center p-6">
            <span className="ag-paging-row-summary-panel">
              <span>{(currentPage - 1) * 20 || 1}</span> to{" "}
              <span>{20 * currentPage}</span> of{" "}
              <span>{pagination.totalItems}</span>
            </span>
            <span className="">
              <Button
                type="button"
                className="ml-1 disabled:text-gray-400 text-[20px]"
                disabled={currentPage == 1}
                onClick={() => setCurrentPage(1)}
                style={{ backgroundColor: "#e91e63", color: "white",fontSize:'12px' }}
              >
                {"First"}
              </Button>
              <Button
                type="button"
                className="ml-1 disabled:text-gray-400 text-[20px] mr-1"
                // ref="btPrevious"
                onClick={() => handlePrevPage()}
                disabled={currentPage == 1}
                style={{ backgroundColor: "#e91e63", color: "white",fontSize:'12px' }}
              >
                {"<"}
              </Button>
              Page <span>{currentPage}</span> of{" "}
              <span>{pagination.totalPages}</span>
              <Button
                onClick={() => handleNextPage()}
                type="button"
                disabled={currentPage == pagination.totalPages}
                className="ml-1 disabled:text-gray-400 text-[20px]"
                style={{ backgroundColor: "#e91e63", color: "white",fontSize:'12px' }}
              >
                {">"}
              </Button>
              <Button
                onClick={() => setCurrentPage(pagination.totalPages)}
                type="button"
                className="ml-1 disabled:text-gray-400 text-[20px]"
                disabled={currentPage == pagination.totalPages}
                style={{ backgroundColor: "#e91e63", color: "white" ,fontSize:'12px'}}
              >
                {"Last"}
              </Button>
            </span>
          </div>
        )}
      </Box>
    </ChakraProvider>
  );
}

export default LeagueTable;
