"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Badge,
  Flex,
  extendTheme,
  ChakraProvider,
  Box,
  Button,
  Checkbox,
  Text,
  useToast,
  Progress,
} from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { fetchGetRequest, sendPatchRequest } from "@/api/api";
declare module "csstype" {
  interface Properties {
    "--chakra-colors-blue-500"?: string;
  }
}
const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
});

const theme = extendTheme({
  breakpoints,
});

const rowData = [
  {
    id: "1",
    sportname: "Cricket",
    leaguename: "ICC World Cup Qualifier",
    competitionName: "Netherlands V Oman",
  },
  {
    id: "2",
    sportname: "Cricket",
    leaguename: "ICC World Cup Qualifier",
    competitionName: "Netherlands V Oman",
  },
  {
    id: "3",
    sportname: "Cricket",
    leaguename: "ICC World Cup Qualifier",
    competitionName: "Netherlands V Oman",
  },
  {
    id: "4",
    sportname: "Cricket",
    leaguename: "ICC World Cup Qualifier",
    competitionName: "Netherlands V Oman",
  },

  // Add more rows as needed
  // Add more rows as needed
];

function MatchType() {
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [pagination, setPagination] = useState<any>({});
  const [loading, setLoading] = useState<any>(true);
  const [search, setSearch] = useState<any>();
  const [matches, setMatches] = useState<any>([]);
  const toast = useToast();
  const totalPages = pagination.totalPages; // Replace with your total number of pages

  const UpdateStatus = async (name: any, match_id: any) => {
    let payload = { name };
    try {
      const response = await sendPatchRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/match/get-all-match/update-match-status/${match_id}`,
        payload
      );

    } catch (error) {
    }
  };

  const GetAllMatches = async () => {
    setLoading(true);
    let url = `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/api/match/get-all-match?page=${currentPage}&limit=${20}`;
    if (search) {
      url += `&name=${search}`;
    }

    try {
      const response = await fetchGetRequest(url);
      setMatches(response.data);
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

  // const handleStatus = async (name:any) => {
  //   setIndex(index);
  //   let status:any= sport.status == "active" ? "inactive" : "active";
  //   setLoading(true);
  //   const id:any = sport.eventType;
  //   try {
  //     const response = await sendPatchRequest(
  //       `https://power-db-database.onrender.com/api/sport/toggle-match/${id}`
  //     );
  //     setMatches(response.data);
  //     setLoading(false);

  //     const updatedData:any = sports.map((ele:any) => {
  //       if (sport.eventType === ele.eventType) {
  //         ele.status = status;
  //         return ele;
  //       } else {
  //         return ele;
  //       }
  //     });

  //     setMatches(updatedData);
  //   } catch (error:any) {
  //     toast({
  //       title: "Update Status.",
  //       description: `${error.data.error}`,
  //       status: "error",
  //       duration: 4000,
  //       position: "top",
  //       isClosable: true,
  //     });
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    let id: any;
    id = setTimeout(() => {
      GetAllMatches();
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
              Pages / <span className={`text-gray-600`}>Match Type </span>
            </Text>
            <Text
              className={`font-bold text-[#344767] text-left text-lg sm:text-lg `}
            >
              Match Type
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
                  LEAQUE NAME
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
                  COMPETITION NAME
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
                  SELECT TYPE
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {matches.map((row: any, index: any) => (
                <Tr
                  key={index}
                  className={` ${
                    index % 2 === 0 ? "bg-[#ECECEC]" : "bg-[#FFFFFF]"
                  } hover:bg-[#ECECEC]  text-[10px] font-semibold`}
                >
                  <Td
                    style={{
                      whiteSpace: "nowrap",
                      textTransform: "none",
                      borderRight: "1px solid #ccc",
                    }}
                  >
                    {row._id}
                  </Td>
                  <Td
                    style={{
                      whiteSpace: "nowrap",
                      textTransform: "none",
                      borderRight: "1px solid #ccc",
                    }}
                  >
                    {row.sport_id == 1
                      ? "Tennis"
                      : row.sport_id === 2
                      ? "Scoccer"
                      : "Cricket"}
                  </Td>
                  <Td
                    style={{
                      whiteSpace: "nowrap",
                      textTransform: "none",
                      borderRight: "1px solid #ccc",
                    }}
                  >
                    {row.league_name}
                  </Td>
                  <Td
                    style={{
                      whiteSpace: "nowrap",
                      textTransform: "none",
                      borderRight: "1px solid #ccc",
                    }}
                  >
                    {row.match_name}
                  </Td>

                  <Td
                    style={{
                      whiteSpace: "nowrap",
                      textTransform: "none",
                      borderRight: "1px solid #ccc",
                    }}
                  >
                    <Box className="flex justify-between gap-4">
                      <Box className="flex  justify-center gap-2 items-center">
                        <Text>Match Odd</Text>{" "}
                        <Checkbox
                          size={"lg"}
                          onChange={() =>
                            UpdateStatus("match_odd", row.match_id)
                          }
                          defaultChecked={row.match_odd === "active"}
                          style={{
                            "--chakra-colors-blue-500": "#e91e63",
                            border: "1px solid #e91e63",
                          }}
                        />
                      </Box>
                      <Box className="flex  justify-center gap-2 items-center">
                        <Text>Bookmaker</Text>{" "}
                        <Checkbox
                          size={"lg"}
                          onChange={() =>
                            UpdateStatus("bookmarker", row.match_id)
                          }
                          defaultChecked={row.bookmarker == "active"}
                          style={{
                            "--chakra-colors-blue-500": "#e91e63",
                            border: "1px solid #e91e63",
                          }}
                        />
                      </Box>
                      <Box className="flex  justify-center gap-2 items-center">
                        <Text>Fancy</Text>{" "}
                        <Checkbox
                          size={"lg"}
                          // defaultChecked
                          onChange={() => UpdateStatus("fancy", row.match_id)}
                          defaultChecked={row.fancy == "active"}
                          style={{
                            "--chakra-colors-blue-500": "#e91e63",
                            border: "1px solid #e91e63",
                          }}
                        />
                      </Box>
                      <Box className="flex  justify-center gap-2 items-center">
                        <Text>Toss</Text>{" "}
                        <Checkbox
                          size={"lg"}
                          // defaultChecked
                          onChange={() =>
                            UpdateStatus("match_toss", row.match_id)
                          }
                          defaultChecked={row.match_toss == "active"}
                          style={{
                            "--chakra-colors-blue-500": "#e91e63",
                            border: "1px solid #e91e63",
                          }}
                        />
                      </Box>
                    </Box>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>
        {matches && matches.length > 0 && (
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
                style={{ backgroundColor: "#e91e63", color: "white",fontSize:'12px' }}
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

export default MatchType;
