"use client";

import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Text,
  Th,
  Flex,
  Input,
  Td,
  Select,
  Progress,
  useToast,
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Badge,
} from "@chakra-ui/react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { fetchGetRequest, sendPatchRequest } from "@/api/api";

const RusultMakerTossAndFancy = () => {
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [pagination, setPagination] = useState<any>({});
  const [betType, setBetType] = useState<any>("");
  const [betCategory, setBetCategory] = useState<any>("toss");

  const [result, setResult] = useState<any>("");
  const [matchIds, setMatchIds] = useState<any>("");
  const [search, setSearch] = useState<any>("");
  const [search2, setSearch2] = useState<any>("");

  const [bets, setBets] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [resultLoading, setResultLoading] = useState<boolean>(false);
  const [selectedMatches, setSelectedMatches] = useState<any>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const totalPages = pagination.totalPages; // Replace with your total number of pages
  const toast = useToast();
  const handleSelect = (e: any, _id: any) => {
    const value = e.target.checked;

    // Check if the checkbox is checked or unchecked
    if (value) {
      // If checked, add the _id to the selectedMatches array
      setSelectedMatches((prev: any) => [...prev, _id]);
    } else {
      // If unchecked, remove the _id from the selectedMatches array
      setSelectedMatches((prev: any) => prev.filter((id: any) => id !== _id));
    }
  };
  const handleSelectAll = () => {
    // Check if all checkboxes are currently selected
    const allSelected = selectedMatches.length === bets.length;

    if (allSelected) {
      // Deselect all checkboxes
      setSelectedMatches([]);
    } else {
      // Select all checkboxes by creating an array of all _ids
      const allMatchIds = bets.map((row: any) => row._id);
      setSelectedMatches(allMatchIds);
    }
  };

  const GetAllBets = async () => {
    setLoading(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/bet/get-all-bet-for-result?&page=${currentPage}&limit=20&status=pending`;
    if (search) {
      url += `&name=${search}`;
    }
    if(betCategory){
      url+=`&bet_category=${betCategory}`
    }
    if (betType) {
      url += `&bet_type=${betType}`;
    }
    if (search2) {
      url += `&question=${search2}`;
    }
    try {
      const response = await fetchGetRequest(url);
      setBets(response.data);
      setPagination(response.pagination);
      setLoading(false);
    } catch (error: any) {
      toast({
        title: "Fetch Data.",
        description: `${error?.data?.error || error?.message}`,
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
      GetAllBets();
    }, 1000);

    return () => clearTimeout(id);
  }, [currentPage, betType, search, search2,betCategory]);

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
  const handleResult = (_id: any, res: any) => {
    if (_id) {
      setSelectedMatches((prev: any) => [_id]);
    }

    setResult(res);
    onOpen();
  };

  const handleConfirmResult = async () => {
    setResultLoading(true);
    let payload = { user_ids: selectedMatches, answer: result };
    try {
      let response = await sendPatchRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/result/update-fancy-toss-result`,
        payload
      );
      toast({
        description: response.message,
        status: "success",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      setResultLoading(false);
      setSelectedMatches([]);
      GetAllBets();
      onClose();
    } catch (error: any) {
      toast({
        title: "Update Status.",
        description: `${error.data.error}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      setResultLoading(false);
    }
  };

  return (
    <>
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
              Toss/Fancy
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
        <Box className="flex  justify-between mb-6">
          <Box className="flex gap-2">
            <Input
              width="20%"
              placeholder={"search by match name"}
              className="w-[200px] text-sm p-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Input
              width="20%"
              placeholder={"search by  question"}
              className="w-[200px] text-sm p-2"
              value={search2}
              onChange={(e) => setSearch2(e.target.value)}
            />
          </Box>

          {selectedMatches.length > 0 && (
            <Box className="flex gap-2">
              <button
                onClick={() => handleResult("", "win")}
                disabled={selectedMatches.length == 0}
                className="px-2 rounded-lg w-[70px] text-white font-semibold text-[12px] bg-[#4CAF50] "
              >
                WIN
              </button>
              <button
                onClick={() => handleResult("", "lose")}
                disabled={selectedMatches.length == 0}
                className="px-2 rounded-lg w-[70px] text-white font-semibold text-[12px] bg-[#F44335] "
              >
                LOSS
              </button>
              <button
                onClick={() => handleResult("", "refund")}
                disabled={selectedMatches.length == 0}
                className="px-2 rounded-lg w-[90px] text-white font-semibold text-[12px] bg-[#FB8C00] "
              >
                REFUND
              </button>
            </Box>
          )}

          <Box className="flex gap-2 mr-[100px]">
            <Select value={betType} onChange={(e) => setBetType(e.target.value)}>
              <option value={""}>Select Filter</option>
              <option value={"back"}>Yes</option>
              <option value={"lay"}>No</option>
            </Select>

            <Select
              value={betCategory}
              onChange={(e) => setBetCategory(e.target.value)}
            >
              <option value={""}>Select Filter</option>
              <option value={"toss"}>Toss</option>
              <option value={"fancy"}>Fancy</option>
            </Select>
          </Box>
        </Box>
      </Box>

      <div className="container overflow-scroll w-[98%] m-auto">
        {loading && (
          <Progress size="xs" isIndeterminate colorScheme="#e91e63" />
        )}

        <Table
          variant="striped"
          colorScheme="primary"
          className="table table-hover bet-table"
        >
          <Thead bg="primary" className=" bg-[#E91E63]">
            <Tr>
              <Td>
                <Checkbox
                  size={"lg"}
                  style={{
                    "--chakra-colors-blue-500": "blue-500",
                    // border: "1px solid green",
                  }}
                  isChecked={selectedMatches.length === bets.length}
                  onChange={handleSelectAll}
                />
              </Td>
              <Th
                scope="col"
                color="white"
                style={{
                  textTransform: "none",
                  fontWeight: "600",
                  whiteSpace: "nowrap",
                  fontSize: "10px",
                }}
              >
                DATE
              </Th>
              <Th
                scope="col"
                color="white"
                style={{
                  textTransform: "none",
                  fontWeight: "600",
                  whiteSpace: "nowrap",
                  fontSize: "10px",
                }}
              >
                USER
              </Th>
              {/* {betType=="fancy"&&<Th
                scope="col"
                color="white"
                style={{
                  textTransform: "none",
                  fontWeight: "600",
                  whiteSpace: "nowrap",
                  fontSize: "10px",
                }}
              >
                SPORT
              </Th>} */}
              <Th
                scope="col"
                color="white"
                style={{
                  textTransform: "none",
                  fontWeight: "600",
                  whiteSpace: "nowrap",
                  fontSize: "10px",
                }}
              >
                LEAGUE
              </Th>
              <Th
                scope="col"
                color="white"
                style={{
                  textTransform: "none",
                  fontWeight: "600",
                  whiteSpace: "nowrap",
                  fontSize: "10px",
                }}
              >
                MATCH
              </Th>
              {betCategory == "fancy" && (
                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                  }}
                >
                  Questions
                </Th>
              )}
              {betCategory == "toss" && (
                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                  }}
                >
                  Team Name
                </Th>
              )}
              <Th
                scope="col"
                color="white"
                style={{
                  textTransform: "none",
                  fontWeight: "600",
                  whiteSpace: "nowrap",
                  fontSize: "10px",
                }}
              >
                Rate, Yes/No
              </Th>
              <Th
                scope="col"
                color="white"
                style={{
                  textTransform: "none",
                  fontWeight: "600",
                  whiteSpace: "nowrap",
                  fontSize: "10px",
                }}
              >
                INVAST AMOUNT
              </Th>
              <Th
                scope="col"
                color="white"
                style={{
                  textTransform: "none",
                  fontWeight: "600",
                  whiteSpace: "nowrap",
                  fontSize: "10px",
                }}
              >
                WIN AMOUNT
              </Th>
              <Th
                scope="col"
                color="white"
                style={{
                  textTransform: "none",
                  fontWeight: "600",
                  whiteSpace: "nowrap",
                  fontSize: "10px",
                }}
              >
                LOSS AMOUNT
              </Th>
              <Th
                scope="col"
                color="white"
                style={{
                  textTransform: "none",
                  fontWeight: "600",
                  whiteSpace: "nowrap",
                  fontSize: "10px",
                }}
              >
                BET TYPE
              </Th>

              <Th
                scope="col"
                color="white"
                style={{
                  textTransform: "none",
                  fontWeight: "600",
                  whiteSpace: "nowrap",
                  fontSize: "10px",
                }}
              >
                BET CATEGORY
              </Th>
              <Th
                scope="col"
                color="white"
                style={{
                  textTransform: "none",
                  fontWeight: "600",
                  whiteSpace: "nowrap",
                  fontSize: "10px",
                }}
              >
                RESULT
              </Th>
              <Th
                scope="col"
                color="white"
                style={{
                  textTransform: "none",
                  fontWeight: "600",
                  whiteSpace: "nowrap",
                  fontSize: "10px",
                }}
              >
                STATELMENT
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {!loading &&
              bets?.length &&
              bets.map((row: any, index: any) => (
                <Tr
                  key={index}
                  className={` ${
                    row.bet_type === "lay" ? "bg-[#E99CAD]" : "bg-[#6AADDC]"
                  } text-[12px] font-semibold`}
                >
                  <Td
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
                        onChange={(e) => handleSelect(e, row._id)}
                        isChecked={selectedMatches.includes(row._id)}
                        disabled={row.status !== "pending"}
                      />
                    </div>
                  </Td>
                  <Td>{row.match_date.split(" ")[0]}</Td>
                  <Td style={{ whiteSpace: "nowrap", textTransform: "none" }}>
                    {row.username}
                  </Td>
                  {/* <Td style={{ whiteSpace: "nowrap", textTransform: "none" }}>
                    {row.sport}
                  </Td> */}
                  <Td style={{ whiteSpace: "nowrap", textTransform: "none" }}>
                    {row.league_name}
                  </Td>
                  <Td style={{ whiteSpace: "nowrap", textTransform: "none" }}>
                    {row.match_name}
                  </Td>
                  {betCategory == "fancy" && (
                    <Td style={{ whiteSpace: "nowrap", textTransform: "none" }}>
                      {row.question}
                    </Td>
                  )}
                  {betCategory == "toss" && (
                    <Td style={{ whiteSpace: "nowrap", textTransform: "none" }}>
                      {row.runner_name}
                    </Td>
                  )}
                  <Td style={{ whiteSpace: "nowrap", textTransform: "none" }}>
                    Rate:{" "}
                    <button className="text-[md] text-center cursor-pointer bg-orange-500 rounded-md p-1 w-[70px] text-white ">
                      {" "}
                      {row.rate}
                    </button>
                  </Td>

                  <Td style={{ whiteSpace: "nowrap", textTransform: "none" }}>
                    {row.stake}
                  </Td>
                  <Td style={{ whiteSpace: "nowrap", textTransform: "none" }}>
                  {row?.bet_category==="fancy"?row.stake:(row.rate*row.stake-row.stake).toFixed(2)} 

                  </Td>
                  <Td style={{ whiteSpace: "nowrap", textTransform: "none" }}>
                    {row.stake}
                  </Td>
                  <Td style={{ whiteSpace: "nowrap", textTransform: "none" }}>
                    {/* {row.bet_type} */}
                    {row?.bet_category=="fancy"?row.bet_type=="lay"?<Badge colorScheme="red">No</Badge>:<Badge colorScheme="green">Yes</Badge>:row.bet_type}
                  </Td>
                  <Td style={{ whiteSpace: "nowrap", textTransform: "none" }}>
                    {row.bet_category}
                  </Td>
                  <Td style={{ whiteSpace: "nowrap", textTransform: "none" }}>
                    <Badge
                      style={{
                        color: row.status == "pending" ? "#ED8936" : "#48BB78",
                      }}
                    >
                                           {row.status==="declaired"?<Badge colorScheme={row.result==="win"?"green":row.result==="lose"?"red":'orange'}>{row.result}</Badge>:<Badge>{row.status}</Badge>}

                    </Badge>
                  </Td>
                  <Td style={{ whiteSpace: "nowrap", textTransform: "none" }}>
                    {row.status == "pending" ? (
                      <Box className="flex gap-2">
                        <button
                          onClick={() => handleResult(row._id, "win")}
                          className="p-[6px] rounded-lg w-[70px] text-[#4CAF50] border border-[#4CAF50] font-bold text-[12px] bg-[white] "
                        >
                          WIN
                        </button>
                        <button
                          onClick={() => handleResult(row._id, "lose")}
                          className="p-[6px] rounded-lg w-[70px] text-[#F44335] border border-[#F44335] font-bold text-[12px] bg-[white] "
                        >
                          LOSS
                        </button>
                        <button
                          onClick={() => handleResult(row._id, "refund")}
                          className="p-2 rounded-lg w-[90px] text-[#FB8C00] border border-[#FB8C00] font-bold text-[12px] bg-[white] "
                        >
                          REFUND
                        </button>
                      </Box>
                    ) : (
                      <Badge
                        fontWeight={"bold"}
                        margin={"auto"}
                        color="white"
                        colorScheme="green"
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
              ))}
          </Tbody>
        </Table>
      </div>
      {bets && bets.length > 0 && (
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
      <ConfirmModal
        handleConfirmResult={handleConfirmResult}
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        resultLoading={resultLoading}
      />
    </>
  );
};

export default RusultMakerTossAndFancy;

function ConfirmModal({
  handleConfirmResult,
  onOpen,
  isOpen,
  onClose,
  resultLoading,
}: {
  handleConfirmResult: any;
  onOpen: any;
  isOpen: any;
  onClose: any;
  resultLoading: boolean;
}) {
  const cancelRef = React.useRef<any>();

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Result Declaire?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want declaire the result ?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              isLoading={resultLoading}
              ref={cancelRef}
              onClick={handleConfirmResult}
            >
              Confirm
            </Button>
            <Button
              colorScheme="red"
              className="bg-red-800"
              ml={3}
              onClick={onClose}
            >
              Cancel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
