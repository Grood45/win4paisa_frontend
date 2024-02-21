"use client";
import { RootState, useAppSelector } from "@/app/redux-arch/store";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  useToast,
  Accordion,
} from "@chakra-ui/react";
import { BetSlip, BetSlipGroup } from "../../../utils/typescript.module";
import { useEffect, useState } from "react";
import { fetchGetRequest } from "@/api/api";
import themeChange from "@/theme";
import empyty from "../../assetuser/navbar/sports-betting-vector-concept-metaphor-2C879D7.jpg";
import { GiQueenCrown } from "react-icons/gi";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import Image from "next/image";
import { useSelector } from "react-redux";
function BetSlipModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [betslipdata, setBetslipData] = useState<BetSlip[]>([]);
  const [totalBet, setTotalBet] = useState("");
  const [loading1, setLoading1] = useState<boolean>(false);
  const userAuth = useSelector((state: RootState) => state);
  const {
    username = "",
    user_id = "",
    exposure_limit,
    amount = 0,
    max_limit = 10000,
    min_limit = 100,
  } = userAuth?.combineR?.userAuth?.data?.user || {};
  const toast = useToast();

  const getAllBetData = async () => {
    if (!user_id) {
      setBetslipData([]);
      return;
    }
    setLoading1(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/bet/get-all-bet/${user_id}?status=pending&limit=1000`;
    try {
      let response = await fetchGetRequest(url);
      const data = response.data;
      const receivedData: BetSlip[] = response.data;
      if (response) {
        setTotalBet(response.pagination.totalbet);
      }
      if (receivedData) {
        setBetslipData(receivedData);
      }
      setLoading1(false);
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
    getAllBetData();
  }, [user_id]);

  const betslipGroupsByMatch: BetSlipGroup[] = betslipdata.reduce(
    (acc: BetSlipGroup[], item, index) => {
      // Check if the match ID is the same as the previous item
      const isSameMatch =
        index > 0 && item.match_id === betslipdata[index - 1].match_id;

      if (isSameMatch) {
        // If the match ID is the same, increment the match count
        acc[acc.length - 1].matchCount += 1;
        acc[acc.length - 1].items.push(item);
      } else {
        // If the match ID is different, create a new group
        acc.push({
          match_id: item.match_id,
          matchCount: 1,
          items: [item],
        });
      }
      return acc; // Make sure to return the accumulator at the end of each iteration
    },
    []
  );

  const { showSideBar2, showSideBar1, theme } = useAppSelector(
    (store) => store.combineR.NavStateReducer
  );
  return (
    <>
      <div
        onClick={onOpen}
        className={`flex   justify-center items-center flex-col gap-1`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="31"
          height="31"
          viewBox="0 0 31 31"
          fill="none"
        >
          <path
            d="M25.9904 13.7692H22.6443C22.4135 14.6346 22.0097 15.3846 21.4327 16.0769H25.7597V19.5385H4.99043V16.0769H8.45197V13.7692H4.75966C3.60582 13.7692 2.68274 14.6923 2.68274 15.8461V21.2692V23.5769V27.0385C2.68274 28.0192 3.43274 28.7692 4.41351 28.7692H26.3366C27.3174 28.7692 28.0674 28.0192 28.0674 27.0385V23.5769V21.2692V15.8461C28.0674 14.6923 27.1443 13.7692 25.9904 13.7692Z"
            fill={"white"}
          />
          <path
            d="M20.5673 6.21154C20.5673 3.96154 18.6058 2.23077 16.4135 2.23077H11.625C11.1635 2.23077 10.7596 2.63462 10.7596 3.09616V8V10.3077V15.2115C10.7596 15.6731 11.1635 16.0769 11.625 16.0769H16.5289C18.7789 16.0769 20.5673 14.2308 20.5096 11.9808C20.5096 10.8846 20.0481 9.90385 19.2981 9.21154C20.1058 8.40385 20.5673 7.36539 20.5673 6.21154ZM13.0673 4.53847H16.5289C17.452 4.53847 18.2596 5.28847 18.2596 6.26924C18.2596 7.19231 17.5096 8 16.5289 8H16.3558H13.0673V4.53847ZM18.2596 12.0385C18.2596 12.9615 17.5096 13.7692 16.5289 13.7692H13.0673V10.3077H16.5289C17.5096 10.3077 18.2596 11.0577 18.2596 12.0385Z"
            fill={"white"}
          />
        </svg>

        <p className="text-sm font-medium">My Bet</p>
      </div>
      <Modal size={"sm"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent style={{ borderRadius: "16px" }}>
          {/* <ModalCloseButton className='' color={"white"} /> */}
          <ModalBody style={{ padding: "0px" }}>
            <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... p-[1px] rounded-2xl sticky top-[85px]">
              <div
                // style={{ border: "0.5px solid #444" }}

                className={`${
                  theme
                    ? `text-[${themeChange.light.textColor1}]`
                    : `text-[${themeChange.dark.textColor1}]`
                }  ${
                  theme
                    ? `bg-[${themeChange.light.bg1}]`
                    : `bg-[${themeChange.dark.bg1}]`
                } overflow-scroll  h-[70vh] shadow-2xl min-h-[400px] rounded-[17px]  flex flex-col w-[100%] `}
              >
                <div className="sticky top-0">
                  <div
                    className={`flex  sticky top-0 z-1 pt-8 ${
                      theme
                        ? `bg-[${themeChange.light.bg1}]`
                        : `bg-[${themeChange.dark.bg1}]`
                    }  pb-3 w-[100%] justify-center items-center relative gap-0`}
                  >
                    <GiQueenCrown
                      className="absolute top-5 -ml-[80px] "
                      color="#F3AF06"
                    />

                    <p className="text-sm  flex gap-4 text-center font-normal">
                      Bet Slip
                      <span
                        className={`w-[20px] text-gray-700 font-bold flex items-center text-[9px] justify-center text-center  h-[20px] rounded-[50%] bg-[#F3AF06]`}
                      >
                        {totalBet}
                      </span>
                    </p>
                  </div>
                  <div className="bg-gradient-to-r h-[1px]  from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... p-[1px] rounded-2xl"></div>
                </div>
                {betslipdata?.length > 0 ? (
                  <Accordion
                    defaultIndex={[0]}
                    style={{
                      width: "90%",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginBottom: "50px",
                    }}
                    allowMultiple
                  >
                    {betslipGroupsByMatch.map((group, groupIndex) => (
                      <AccordionItem
                        key={group.match_id}
                        style={{
                          borderTop: "none",
                          marginTop: "20px",
                          borderBottom: "none",
                        }}
                      >
                        <h2>
                          <AccordionButton
                            style={{
                              background:
                                "linear-gradient(92deg, #FABC38 0%, #D59A27 100%",
                            }}
                            className="rounded-[10px]"
                          >
                            <Box
                              as="span"
                              flex="1"
                              style={{
                                fontSize: "14px",
                                display: "flex",
                                gap: "5px",
                                justifyContent: "space-between",
                              }}
                              textAlign="left"
                            >
                              <Box className="text-xs font-bold text-[#212632]  flex items-center justify-start w-[80%]">
                                {group.items[0].match_name}
                              </Box>
                              <span className="w-[30px] mr-2 flex items-center text-yellow-500 font-bold  justify-center text-center h-[30px] rounded-[50%] bg-blue-900">
                                {group.matchCount}
                              </span>
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>

                        <AccordionPanel
                          className="rounded-[10px] text-[12px]"
                          style={{ borderBottom: "3px solid purple" }}
                          pb={4}
                        >
                          <Box className="w-[100%] flex flex-col gap-3  py-2">
                            {group.items.map((item, itemIndex) => (
                              <div
                                className="flex flex-col gap-[6px] font-semibold text-xs"
                                key={item._id}
                              >
                                <div className="flex justify-between ">
                                  <p className="text-gray-300 font-bold">
                                    Bet category
                                  </p>
                                  <p className="text-[#d8b4fe] font-bold">
                                    {item.bet_category}
                                  </p>
                                </div>
                                <div className="flex justify-between">
                                  <p className="text-gray-300 font-bold">
                                    Match Bet
                                  </p>
                                  <p className="text-[#3b82f6]">
                                    {item.event_name}
                                  </p>
                                </div>
                                <div className="flex justify-between">
                                  <p className="text-gray-300 font-bold">Odd</p>
                                  <p className="text-[#5eead4]">{item.rate}</p>
                                </div>
                                <div className="flex justify-between">
                                  <p className="text-gray-300 font-bold">
                                    Stack
                                  </p>
                                  <p className="text-[#fef08a]">{item.stake}</p>
                                </div>
                                <div className="flex justify-between">
                                  <p className="text-gray-300 font-bold">
                                    Team / Question
                                  </p>
                                  <p className="text-[#fef08a]">
                                    {item?.runner_name.slice(0, 30)}{" "}
                                    {item?.runner_name.length > 30 && "..."}
                                  </p>
                                </div>
                                <div className="flex justify-between">
                                  <p className="text-gray-300 font-bold">
                                    Bet Type
                                  </p>
                                  <button
                                    className={`py-[2px] text-xs px-2 ${
                                      item.bet_type === "back"
                                        ? "bg-[#FF6A8A]"
                                        : "bg-[#0096FE]"
                                    }  rounded-[5px]`}
                                  >
                                    {item.bet_type}
                                  </button>
                                </div>

                                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... h-[1px] my-1"></div>
                              </div>
                            ))}
                          </Box>
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="text-sm  flex flex-col mt-20 items-center justify-center text-center">
                    <Image src={empyty} className="w-[30%]" alt="" />
                    <p>No Data Yet</p>
                  </div>
                )}
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BetSlipModal;
