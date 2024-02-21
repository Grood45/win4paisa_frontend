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
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Select,
  ModalFooter,
  ModalBody,
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
function ResultMaker() {
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [pagination, setPagination] = useState<any>({});
  const [loading, setLoading] = useState<any>(true);
  const [search, setSearch] = useState<any>();
  const [matches, setMatches] = useState<any>([]);
  const [matchesIds, setMatchesIds] = useState<any>([]);
  const toast = useToast();
  const [selectedMatches, setSelectedMatches] = useState<any>([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [openResultModal, setOpenResultModal] = useState<any>(false);
  const [resultTeam, setResultTeam] = useState<any>("");
  const [resultMatchId, setResultMatchId] = useState<any>("");
  const [requestResultType, setRequestResultType] = useState<any>("");
  const [sportType,setSportType]=useState("")
  const totalPages = pagination.totalPages; // Replace with your total number of pages
  const UpdateStatus: any = async (name: any, match_id: any) => {
    let payload = { name };
    try {
      const response = await sendPatchRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/sport/toggle-match/${match_id}`,
        payload
      );
    } catch (error) {}
  };

  const GetAllMatches = async () => {
    setLoading(true);
    let url = `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/api/match/get-all-match?page=${currentPage}&limit=${20}&event_name=${sportType}`;
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
        description: `${error?.data?.error}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const hanldeCricket=()=>{
    setSportType("cricket")
      }
      const handleSoccer=()=>{
        setSportType("soccer")
        
      }
      const hanldeTennis=()=>{
        setSportType("tennis")
        
      }
  // const handleStatus = async (name:any) => {
  //   setIndex(index);
  //   let status = sport.status == "active" ? "inactive" : "active";
  //   setLoading(true);
  //   const id = sport.eventType;
  //   try {
  //     const response = await sendPatchRequest(
  //       `https://power-db-database.onrender.com/api/sport/toggle-match/${id}`
  //     );
  //     setMatches(response.data);
  //     setLoading(false);

  //     const updatedData = sports.map((ele) => {
  //       if (sport.eventType === ele.eventType) {
  //         ele.status = status;
  //         return ele;
  //       } else {
  //         return ele;
  //       }
  //     });

  //     setMatches(updatedData);
  //   } catch (error) {
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
  }, [currentPage, search,sportType]);

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

  const handleSelect = (e: any, match_id: any) => {
    const value = e.target.checked;

    // Check if the checkbox is checked or unchecked
    if (value) {
      // If checked, add the match_id to the selectedMatches array
      setSelectedMatches((prev: any) => [...prev, match_id]);
    } else {
      // If unchecked, remove the match_id from the selectedMatches array
      setSelectedMatches((prev: any) =>
        prev.filter((id: any) => id !== match_id)
      );
    }
  };
  const handleSelectAll = () => {
    // Check if all checkboxes are currently selected
    const allSelected = selectedMatches.length === matches.length;

    if (allSelected) {
      // Deselect all checkboxes
      setSelectedMatches([]);
    } else {
      // Select all checkboxes by creating an array of all match_ids
      const allMatchIds = matches.map((row: any) => row.match_id);
      setSelectedMatches(allMatchIds);
    }
  };

  const handleWinner = (team: any, type: any, match_id: any) => {
    setResultTeam(team);
    setResultMatchId(match_id);
    setRequestResultType(type);
    setOpenResultModal(true);
    // alert(type);
  };

  const handleWinnerDeclaire = async () => {
    if (!selectedTeam) {
      toast({
        description: `Please select team.`,
        status: "warning",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      return;
    }
    let runners = resultTeam.split("v" || "vs");
    let runner1 = runners[0].trim();
    let runner2 = runners[1].trim();
    const payload = {
      team: selectedTeam.trim(),
      runner1,
      runner2,
      type: requestResultType,
    };
    try {
      const response = await sendPatchRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/result/update-result/${resultMatchId}`,
        payload
      );
      // setMatches(response.data);
      setLoading(false);
      toast({
        title: "Update results.",
        description: `${response?.message}`,
        status: "success",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      setOpenResultModal(false);
      GetAllMatches();
      // setMatches(updatedData);
    } catch (error: any) {
      toast({
        title: "Update results.",
        description: `${error?.data?.error}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      setLoading(false);
    }
  };

  // const GetAllMatchesIds = async () => {
  //   setLoading(true);

  //   let url = `https://power-db-database.onrender.com/api/sport/get-distinct-matchid`;

  //   try {
  //     const response = await fetchGetRequest(url);
  //     setMatchesIds(response.data);
  //   } catch (error: any) {
  //     toast({
  //       title: "Fetch Data.",
  //       description: `${error.data.error}`,
  //       status: "error",
  //       duration: 4000,
  //       position: "top",
  //       isClosable: true,
  //     });

  //   }
  // };

  // useEffect(() => {
  //   GetAllMatchesIds();
  // }, []);


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
              Pages / <span className={`text-gray-600`}>Result Maker </span>
            </Text>
            <Text
              className={`font-bold text-[#344767] text-left text-lg sm:text-lg `}
            >
              Result Maker
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
            className="w-[400px] p-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
           <Box className="flex gap-6">
            <Button colorScheme="gray" style={{backgroundColor:'red'}} onClick={hanldeCricket} color={"white"} >Cricket</Button>
           <Button style={{backgroundColor:'green'}} color={"white"} onClick={handleSoccer}>Soccer</Button>
           <Button  style={{backgroundColor:'purple'}} color={"white"} onClick={hanldeTennis} >Tennis</Button>

            </Box>
          {/* <Box className="flex gap-2">
            <button className="px-2 rounded-lg w-[70px] text-white font-semibold text-[12px] bg-[#4CAF50] ">
              WIN
            </button>
            <button className="px-2 rounded-lg w-[70px] text-white font-semibold text-[12px] bg-[#F44335] ">
              LOSS
            </button>
            <button className="px-2 rounded-lg w-[90px] text-white font-semibold text-[12px] bg-[#FB8C00] ">
              REFUND
            </button>
          </Box> */}
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
                >
                  <div className="flex gap-6">
                    <Checkbox
                      size={"lg"}
                      style={{
                        "--chakra-colors-blue-500": "#e91e63",
                        border: "1px solid #e91e63",
                      }}
                      isChecked={selectedMatches.length === matches.length}
                      onChange={handleSelectAll}
                    />
                     {loading && (
            <Progress size="xs" isIndeterminate colorScheme="#e91e63" />
          )}
                  </div>
                </Th> */}
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
                  LEAGUE NAME
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
                  OPEN DATE
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
                  STATELMENT
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {matches.length > 0 &&
                matches.map((row: any, index: any) => {
                  let team = row.match_name.split("v" || "vs");
                  return (
                    <>
                      <Tr
                        key={index}
                        className={` ${
                          index % 2 === 0 ? "bg-[#ECECEC]" : "bg-[#FFFFFF]"
                        } hover:bg-[#ECECEC] text-[10px] font-semibold `}
                      >
                        {/* <Td
                        style={{
                          whiteSpace: "nowrap",
                          textTransform: "none",
                          borderRight: "1px solid #ccc",
                        }}
                      >
                        <div className="flex gap-6">
                          <Checkbox
                            size={"lg"}
                            // defaultChecked
                            style={{
                              "--chakra-colors-blue-500": "#e91e63",
                              border: "1px solid #e91e63",
                            }}
                            onChange={(e) => handleSelect(e, row.match_id)}
                            isChecked={selectedMatches.includes(row.match_id)}
                          />
                        </div>
                      </Td> */}
                        <Td
                          style={{
                            whiteSpace: "nowrap",
                            textTransform: "none",
                            borderRight: "1px solid #ccc",
                          }}
                        >
                          {row.match_id}
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
                          {row.open_date}
                        </Td>
                        <Td
                          style={{
                            whiteSpace: "nowrap",
                            textTransform: "none",
                            borderRight: "1px solid #ccc",
                          }}
                        >
                          {row.result !== "declaired" ? (
                            <Box className="flex gap-2">
                              <button
                                className="p-[6px] rounded-lg w-[70px] text-[#4CAF50] border border-[#4CAF50] font-bold text-[12px] bg-[white] "
                                onClick={() =>
                                  handleWinner(
                                    row.match_name,
                                    "win",
                                    row.match_id
                                  )
                                }
                              >
                                WIN
                              </button>
                              <button
                                className="p-[6px] rounded-lg w-[70px] text-[#F44335] border border-[#F44335] font-bold text-[12px] bg-[white] "
                                onClick={() =>
                                  handleWinner(row.name, "loose", row.match_id)
                                }
                              >
                                DRAW
                              </button>
                              <button
                                className="p-2 curser-pointer rounded-lg w-[90px] text-[#FB8C00] border border-[#FB8C00] font-bold text-[12px] bg-[white] "
                                onClick={() =>
                                  handleWinner(
                                    row.match_name,
                                    "refund",
                                    row.match_id
                                  )
                                }
                              >
                                REFUND
                              </button>
                            </Box>
                          ) : (
                            <Badge
                              fontWeight={"bold"}
                              margin={"auto"}
                              color="white"
                              colorScheme="red"
                              bg={"green"}
                              width={"72px"}
                              alignItems={"center"}
                              textAlign={"center"}
                              display={"flex"}
                            >
                              DECLAIRED
                            </Badge>
                          )}
                        </Td>
                      </Tr>
                    </>
                  );
                })}
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
                style={{
                  backgroundColor: "#e91e63",
                  color: "white",
                  fontSize: "12px",
                }}
              >
                {"First"}
              </Button>
              <Button
                type="button"
                className="ml-1 disabled:text-gray-400 text-[20px] mr-1"
                // ref="btPrevious"
                onClick={() => handlePrevPage()}
                disabled={currentPage == 1}
                style={{
                  backgroundColor: "#e91e63",
                  color: "white",
                  fontSize: "12px",
                }}
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
                style={{
                  backgroundColor: "#e91e63",
                  color: "white",
                  fontSize: "12px",
                }}
              >
                {">"}
              </Button>
              <Button
                onClick={() => setCurrentPage(pagination.totalPages)}
                type="button"
                className="ml-1 disabled:text-gray-400 text-[20px]"
                disabled={currentPage == pagination.totalPages}
                style={{
                  backgroundColor: "#e91e63",
                  color: "white",
                  fontSize: "12px",
                }}
              >
                {"Last"}
              </Button>
            </span>
          </div>
        )}
      </Box>

      <Modal isOpen={openResultModal} onClose={() => setOpenResultModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Team</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select
              placeholder="Select Team"
              onChange={(e) => setSelectedTeam(e.target.value)}
              value={selectedTeam}
            >
              <option value={resultTeam.split("v")[0]}>
                {resultTeam.split("v")[0]}
              </option>
              <option value={resultTeam.split("v")[1]}>
                {resultTeam.split("v")[1]}
              </option>
              <option value={resultTeam.split("v")[1]}>The Draw</option>
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button className="bg-blue" mr={3} onClick={handleWinnerDeclaire}>
              Save
            </Button>
            <Button onClick={() => setOpenResultModal(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}
export default ResultMaker;
