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
  extendTheme,
  ChakraProvider,
  Box,
  Button,
  Flex,
  Text,
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

function CompetitionTable() {
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [pagination, setPagination] = useState<any>({});
  const [loading, setLoading] = useState<any>(true);
  const [search, setSearch] = useState<any>("");
  const [index, setIndex] = useState<any>("");
  const [matches, setMatches] = useState<any>([]);
  const [leagues, setLeagues] = useState<any>([]);
  const [updateValue,setUpdateValue]=useState<any>("")
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const totalPages: any = pagination.totalPages; // Replace with your total number of pages
  const toast = useToast();
const [activeEdit,setActiveEdit]=useState("")
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

  const handleStatus = async (match: any, match_id: any, index: any) => {
    setIndex(index);
    let status = match.status == true ? false : true;
    setLoading(true);
    try {
      const response = await sendPatchRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/match/update-match-status/${match_id}`
      );
      setLoading(false);
      const updatedData = matches.map((ele: any) => {
        if (match_id === ele.match_id) {
          ele.status = status;
          return ele;
        } else {
          return ele;
        }
      });
      setLoading(false);
      setMatches(updatedData);
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

  useEffect(() => {}, []);

  useEffect(() => {
    let id: any;
    id = setTimeout(() => {
      GetAllMatches();
    }, 700);
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

  const handleImage = async (imageurl: any, league: any,value:string) => {
    const id = league.match_id;
    try {
      const payload = {
        first_team_logo:imageurl,
      };
      const payload1 = {
        second_team_logo: imageurl,
      };
      let final=value==="0"?payload:payload1
      const response = await sendPatchRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/match/update-team-logo/${id}`,final
      );
      const updatedData = matches.map((ele: any) => {
        if (league.match_id === ele.match_id) {
          ele = response.data;
          return ele;
        } else {
          return ele;
        }
      });
      setMatches(updatedData);
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

  const handleImageUrlChange = async (event: any, row: any,value:string) => {
    const file = event.target.files[0];

    if (file) {
      const imageurl = await handleImageUpload(file);
      handleImage(imageurl, row,value);
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


  const handleUpdateId=async(id:any)=>{
    try {
      const payload={
        match_id:updateValue
      }
      const response = await sendPatchRequest(`${process.env.NEXT_PUBLIC_BASE_URL}/api/match/update-match_id/${id}`,payload);  
      GetAllMatches()
    } catch (error: any) {
      toast({
        title: "Update Status.",
        description: `${error.data.error}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
    }


  }

 

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
              Pages / <span className={`text-gray-600`}>Competition </span>
            </Text>
            <Text
              className={`font-bold text-[#344767] text-left text-lg sm:text-lg `}
            >
              Competition
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
                  MATCH ID
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
                    fontSize: "10px",
                    borderRight: "1px solid #ccc",
                    width:'100px'

                  }}
                >
                  Team A Logo
                </Th>
                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    fontSize: "10px",
                    borderRight: "1px solid #ccc",
                    width:'100px'
                  }}
                >
                  Team B Logo
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
                 Update ScoreId
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
                  STATUS
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {matches?.map((row: any, dex: any) => {
                return (
                  <Tr
                    key={row?._id}
                    className={` ${
                      dex % 2 === 0 ? "bg-[#ECECEC]" : "bg-[#FFFFFF]"
                    } hover:bg-[#ECECEC] text-[10px]  font-semibold`}
                  >
                    <Td
                      style={{
                        whiteSpace: "nowrap",
                        textTransform: "none",
                        borderRight: "1px solid #ccc",
                      }}
                    >
                      {row?.match_id}
                    </Td>
                    <Td
                      style={{
                        whiteSpace: "nowrap",
                        textTransform: "none",
                        borderRight: "1px solid #ccc",
                      }}
                    >
                      {row?.sport_id == 4
                        ? "Cricket"
                        : row?.sport_id == 1
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
                      {row?.league_name}
                    </Td>

                    <Td
                      style={{
                        // whiteSpace: "nowrap",
                        textTransform: "none",
                        borderRight: "1px solid #ccc",
                      }}
                    >
                      <div className="w-[150px]">
                        <input
                          type="file"
                          onChange={(e) => handleImageUrlChange(e, row,"0")}
                        />
                        {row?.first_team_logo !== "" && (
                          <div >
                            <img
                              src={row?.first_team_logo || ""}
                              alt=""
                              className="h-[40px] w-[40px] border-none"
                            />
                          </div>
                        )}
                      </div>
                    </Td>
                    <Td
                      style={{
                        // whiteSpace: "nowrap",
                        textTransform: "none",
                        borderRight: "1px solid #ccc",
                      }}
                    >
                      <div className="w-[150px]">
                   <input type="file"  onChange={(e)=>handleImageUrlChange(e,row,"1")} />
      {row?.second_team_logo!=="" && (
        <div>
          <img src={row?.second_team_logo||""} alt="Selected Image" className="h-[40px] w-[40px]" />
        </div>
      )}
    </div>
                    </Td>
                   
                    <Td
                      style={{
                        // whiteSpace: "nowrap",
                        textTransform: "none",
                        borderRight: "1px solid #ccc",
                      }}
                    >
                      {row?.match_name}
                    </Td>
                    <Td
                      style={{
                        // whiteSpace: "nowrap",
                        textTransform: "none",
                        borderRight: "1px solid #ccc",
                      }}
                    >
                      <div className="flex flex-col items-center gap-1">
                       {row?.ex_match_id==""?<p className="font-semibold text-xs">Unchanged</p>: <p>{row?.ex_match_id} </p>}

                       
                      {activeEdit==row?._id?<div  className="flex items-center gap-1">
                      <input value={updateValue} onChange={(e)=>setUpdateValue(e.target.value)} placeholder="update scoreid" className="border p-[2px] rounded-[4px] outline-none " />
                      <button onClick={()=>handleUpdateId(row?._id)} className="bg-green-400 text-white text-xs p-1 rounded-[4px]">Update</button>

                     </div>: <button className="bg-red-600  text-white text-[10px] px-3 rounded-[4px]" onClick={() => setActiveEdit(row?._id)}>Edit</button>}
                      </div>
                    
                    </Td>
                    <Td
                      style={{
                        // whiteSpace: "nowrap",
                        textTransform: "none",
                        borderRight: "1px solid #ccc",
                      }}
                    >
                      {row?.open_date}
                    </Td>

                    <Td
                      style={{
                        // whiteSpace: "nowrap",
                        textTransform: "none",
                        borderRight: "1px solid #ccc",
                      }}
                    >
                      <Button
                        isLoading={loading && index == dex}
                        onClick={() => handleStatus(row, row.match_id, dex)}
                        style={{
                          padding: "10px",
                          borderRadius: "10px",
                          width: "70px",
                          fontWeight: "bold",
                          fontSize: "12px",
                          backgroundColor: "white",
                          color: row?.status === true ? "#76BF79" : "#e34b4b",
                          border: `1px solid ${
                            row?.status === true ? "#76BF79" : "#e34b4b"
                          }`,
                        }}
                      >
                        {row?.status === true ? "Active" : "InActive"}
                      </Button>
                    </Td>
                  </Tr>
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

export default CompetitionTable;
