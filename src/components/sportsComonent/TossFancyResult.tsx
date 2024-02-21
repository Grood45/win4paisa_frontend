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

const TossFancyResult = () => {
    const [currentPage, setCurrentPage] = useState<any>(1);
    const [pagination, setPagination] = useState<any>({});
    const [betType, setBetType] = useState<any>("toss");
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

const GetAllBets = async () => {
    setLoading(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/bet/get-all-bet-for-result?bet_category=${betType}&page=${currentPage}&limit=20&status=declaired`;
    if (search) {
      url += `&name=${search}`;
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

const handleAll=()=>{
    setBetType("")

}

const handleToss=()=>{
    setBetType("toss")
    
}


const handleFancy=()=>{
    setBetType("fancy")
}


const handleOdds=()=>{
    
}

useEffect(() => {
    let id: any;
    id = setTimeout(() => {
      GetAllBets();
    }, 1000);
    return () => clearTimeout(id);
}, [currentPage, betType, search,search2]);

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
              Toss/Fancy Results
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
            <Box className="flex gap-6">
            <Button colorScheme="gray" style={{backgroundColor:'red'}} color={"white"} onClick={handleAll}>All</Button>
           <Button style={{backgroundColor:'green'}} color={"white"} onClick={handleToss}>Toss</Button>
           <Button  style={{backgroundColor:'purple'}} color={"white"} onClick={handleFancy}>Fancy</Button>

            </Box>

           <Input
            width="20%"
            placeholder={"search...."}
            className="w-[200px] text-sm p-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
         
        </Box>
      </Box>

      <div className="container p-2 overflow-scroll w-[99%] m-auto">
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
             {betType=="fancy"&& <Th
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
              </Th>}
              {betType=="toss"&&<Th
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
              </Th>}
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
                  } hover:bg-[#E99CAD] text-[12px] font-semibold`}
                >
               
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
                 {betType=="fancy"&& <Td style={{ whiteSpace: "nowrap", textTransform: "none" }}>
                    {row.question}
                  </Td>}
                  {betType=="toss"&& <Td style={{ whiteSpace: "nowrap", textTransform: "none" }}>
                    {row.runner_name}
                  </Td>}
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
                    <Badge className={`${row.result=="win"?"text-black":row.result=="lose"?"text-red-400":'text-orange-400'}`}>{row.result}</Badge>
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
              style={{ backgroundColor: "#e91e63", color: "white", fontSize:'12px' }}
            >
              {">"}
            </Button>
            <Button
              onClick={() => setCurrentPage(pagination.totalPages)}
              type="button"
              className="ml-1 disabled:text-gray-400 text-[20px]"
              disabled={currentPage == pagination.totalPages}
              style={{ backgroundColor: "#e91e63", color: "white", fontSize:'12px'}}
            >
              {"Last"}
            </Button>
          </span>
        </div>
      )}
   
    </>
  );
};

export default TossFancyResult;

