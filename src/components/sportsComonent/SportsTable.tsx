'use client'
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
  Text,
  extendTheme,
  ChakraProvider,
  Box,
  Button,
  Checkbox,
  useToast,
  CircularProgress,
  Progress,
} from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { fetchGetRequest, sendPatchRequest } from "@/api/api";


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
    sportid: "1",
    name: "Soccer",
    icon: "Icon",
    status: "	ACTIVE",
  },
  {
    sportid: "1",
    name: "Soccer",
    icon: "Icon",
    status: "	ACTIVE",
  },

  // Add more rows as needed
  // Add more rows as needed
];

function SportsTable() {
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [sports, setSports] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [index, setIndex] = useState<any>("");
  const toast = useToast();
  const totalPages = 5; // Replace with your total number of pages

  const GetAllSports = async () => {
    setLoading(true);
    try {
      const response = await fetchGetRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/sport/get-all-sport`
      );
      setSports(response.data);
      setLoading(false);
    } catch (error:any) {
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

  const handleStatus = async (sport:any, index:any) => {
    setIndex(index);
    let status = sport.status ===true? false : true;
    setLoading(true);
    const id = sport.sport_id;
    try {
      const response = await sendPatchRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/sport/update-sport-status/${id}`
      );
      setSports(response.data);
      setLoading(false);

      const updatedData = sports.map((ele:any) => {
        if (sport.sport_id === ele.sport_id) {
          ele.status = status;
          return ele;
        } else {
          return ele;
        }
      });
      setSports(updatedData);
    } catch (error:any) {
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
    GetAllSports();
  }, []);

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
              Pages / <span className={`text-gray-600`}>Sport </span>
            </Text>
            <Text
              className={`font-bold text-[#344767] text-left text-lg sm:text-lg `}
            >
              Sport
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
          <Input width="50%" placeholder={"search"} />
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
                  SPORT ID
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
                  NAME
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
                  MARKET COUNT
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
              {sports.length > 0 &&
                sports.map((row:any, dex:any) => (
                  <Tr
                    key={dex}
                    className={` ${
                      dex % 2 === 0 ? "bg-[#ECECEC]" : "bg-[#FFFFFF]"
                    } hover:bg-[#ECECEC] `}
                  >
                    <Td
                      style={{
                        whiteSpace: "nowrap",
                        textTransform: "none",
                        borderRight: "1px solid #ccc",
                      }}
                    >
                      {row.sport_id}
                    </Td>
                    <Td
                      style={{
                        whiteSpace: "nowrap",
                        textTransform: "none",
                        borderRight: "1px solid #ccc",
                      }}
                    >
                      {row.name}
                    </Td>
                    <Td
                      style={{
                        whiteSpace: "nowrap",
                        textTransform: "none",
                        borderRight: "1px solid #ccc",
                      }}
                    >
                      {row.market_count}
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
                          color:
                            row.status === true ? "#76BF79" : "#e34b4b",
                          border: `1px solid ${
                            row.status === true ? "#76BF79" : "#e34b4b"
                          }`,
                        }}
                      >
                        {row?.status===true?"Active":"InActive"}
                      </Button>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </div>
      </Box>
    </ChakraProvider>
  );
}

export default SportsTable;
