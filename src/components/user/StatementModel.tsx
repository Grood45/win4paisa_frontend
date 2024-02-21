"use client";
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
} from "@chakra-ui/react";
import cancel from "../../assetuser/authsocial/CANCLE.png";
import userprofile from "../../assetuser/other/userprofile.png";
import transactionpng from "../../assetuser/other/transactionCoin.png";
import Image from "next/image";
import Transaction from "./subcomponent/Transaction";
import { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { BiSolidCopy } from "react-icons/bi";
import { PiInfo } from "react-icons/pi";
import bollyball from "../../assetuser/other/bollyball.png";
import card from "../../assetuser/other/card.png";
import sport from "../../assetuser/other/cap1.png";
import casinoludo from "../../assetuser/other/casinoludo.png";
import cb from "../../assetuser/other/cb.png";
import WCarousel from "./subcomponent/WalletCarousel";
import MyProfile from "./subcomponent/MyProfile";
import { fetchGetRequest } from "@/api/api";
import { Allbets } from "../../../utils/typescript.module";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState, useAppSelector } from "@/app/redux-arch/store";
import themeChange from "@/theme";
import { TbCurrencyTaka } from "react-icons/tb";
function StatementModel() {
  const [showStatement, setShowStateMent] = useState(0);
  const [showProfile, setShowProfile] = useState(0);
  const [loading1, setLoading1] = useState(false);
  const userAuth = useSelector((state: RootState) => state);
  const { user_id = "", username = "" } =
    userAuth?.combineR?.userAuth?.data?.user || {};
  const [statemendatas, setStateMentData] = useState<Allbets[]>([]);
  const [detailsBet, setDetailsBet] = useState<any>({});
  const toast = useToast();
  const getAllBets = async () => {
    setLoading1(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/bet/get-all-bet/${user_id}?status=all&username=${username}`;
    try {
      let response = await fetchGetRequest(url);
      const data = response.data;
      const receivedData: Allbets[] = response.data;
      if (receivedData) {
        setStateMentData(receivedData);
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
    getAllBets();
  }, []);

  const filterDataByCategory = (category: string) => {
    return statemendatas.filter((item) => item.event_type === category);
  };

  const sportsdata = filterDataByCategory("sport");
  const casinoData = filterDataByCategory("casino");

  const {
    isOpen,
    onOpen,
    onClose,
  }: { isOpen: boolean; onOpen: () => void; onClose: () => void } =
    useDisclosure();

  const handleCancel = () => {
    setShowStateMent(0);
    onClose();
  };

  const handleArrow = () => {
    setShowStateMent(0);
  };

  const handleStatement = (id: number, detail?: any) => {
    setShowStateMent(id);
    if (id === 5) {
      setDetailsBet(detail);
    }
  };
  const ShowUser = (id: number) => {
    setShowProfile(id);
  };

  const { showSideBar1, theme } = useAppSelector(
    (store) => store.combineR.NavStateReducer
  );

  return (
    <>
      <div
        onClick={onOpen}
        className={`p-2   flex text items-center cursor-pointer gap-4 `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
        >
          <g clip-path="url(#clip0_7_1970)">
            <path
              d="M5 2.09544H3.75C3.08696 2.09544 2.45107 2.35884 1.98223 2.82768C1.51339 3.29652 1.25 3.9324 1.25 4.59544V17.7204C1.25 18.3835 1.51339 19.0194 1.98223 19.4882C2.45107 19.9571 3.08696 20.2204 3.75 20.2204H16.25C16.913 20.2204 17.5489 19.9571 18.0178 19.4882C18.4866 19.0194 18.75 18.3835 18.75 17.7204V4.59544C18.75 3.9324 18.4866 3.29652 18.0178 2.82768C17.5489 2.35884 16.913 2.09544 16.25 2.09544H15V3.34544H16.25C16.5815 3.34544 16.8995 3.47714 17.1339 3.71156C17.3683 3.94598 17.5 4.26392 17.5 4.59544V17.7204C17.5 18.052 17.3683 18.3699 17.1339 18.6043C16.8995 18.8387 16.5815 18.9704 16.25 18.9704H3.75C3.41848 18.9704 3.10054 18.8387 2.86612 18.6043C2.6317 18.3699 2.5 18.052 2.5 17.7204V4.59544C2.5 4.26392 2.6317 3.94598 2.86612 3.71156C3.10054 3.47714 3.41848 3.34544 3.75 3.34544H5V2.09544Z"
              fill="#EAAB0F"
            />
            <path
              d="M11.875 1.47044C12.0408 1.47044 12.1997 1.53629 12.3169 1.6535C12.4342 1.77071 12.5 1.92968 12.5 2.09544V3.34544C12.5 3.5112 12.4342 3.67018 12.3169 3.78739C12.1997 3.9046 12.0408 3.97044 11.875 3.97044H8.125C7.95924 3.97044 7.80027 3.9046 7.68306 3.78739C7.56585 3.67018 7.5 3.5112 7.5 3.34544V2.09544C7.5 1.92968 7.56585 1.77071 7.68306 1.6535C7.80027 1.53629 7.95924 1.47044 8.125 1.47044H11.875ZM8.125 0.220444C7.62772 0.220444 7.15081 0.417988 6.79917 0.769619C6.44754 1.12125 6.25 1.59816 6.25 2.09544V3.34544C6.25 3.84272 6.44754 4.31964 6.79917 4.67127C7.15081 5.0229 7.62772 5.22044 8.125 5.22044H11.875C12.3723 5.22044 12.8492 5.0229 13.2008 4.67127C13.5525 4.31964 13.75 3.84272 13.75 3.34544V2.09544C13.75 1.59816 13.5525 1.12125 13.2008 0.769619C12.8492 0.417988 12.3723 0.220444 11.875 0.220444L8.125 0.220444Z"
              fill="#EAAB0F"
            />
          </g>
          <defs>
            <clipPath id="clip0_7_1970">
              <rect
                width="20"
                height="20"
                fill="white"
                transform="translate(0 0.220444)"
              />
            </clipPath>
          </defs>
        </svg>
        <p className="text-xs font-medium">Statement</p>
      </div>
      <Modal
        size={{ base: "full", md: "md" }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent className="md:rounded-[16px]  ">
          <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... md:rounded-[16px] p-[1px]">
            <ModalBody
              style={{
                backgroundColor: theme
                  ? themeChange.light.bg1
                  : themeChange.dark.bg1,
                color: theme
                  ? themeChange.light.textColor1
                  : themeChange.dark.textColor1,
              }}
              className="md:rounded-[16px]  h-[100vh] lg:h-[100%]   lg:min-h-[87vh]"
            >
              {showProfile === 0 && (
                <div>
                  {showStatement === 0 && (
                    <div>
                      <div className="flex justify-end">
                        <svg
                          onClick={onClose}
                          cursor={"pointer"}
                          width="40"
                          height="25"
                          viewBox="0 0 40 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 0H20C31.0457 0 40 8.95431 40 20V25H20C8.95431 25 0 16.0457 0 5V0Z"
                            fill="#EAAB0F"
                          />
                          <line
                            y1="-1"
                            x2="17.8443"
                            y2="-1"
                            transform="matrix(0.728288 0.685271 -0.75454 0.656254 12.1129 8.19092)"
                            stroke="black"
                            stroke-width="2"
                          />
                          <line
                            y1="-1"
                            x2="17.6965"
                            y2="-1"
                            transform="matrix(0.67785 -0.7352 0.80052 0.599306 14.2448 20.0854)"
                            stroke="black"
                            stroke-width="2"
                          />
                        </svg>
                      </div>
                      <div className="w-[90%] relative m-auto">
                        <div className="absolute cursor-pointer left-2 ">
                          <Image
                            className="h-[40px] w-[40px]"
                            onClick={() => ShowUser(1)}
                            src={userprofile}
                            alt="user"
                          />
                        </div>

                        <div className="flex flex-col gap-5 justify-center items-center">
                          <p className="text-lg  font-medium">Statement</p>

                          <WCarousel />
                        </div>

                        <div className="mt-4">
                          <p className="text-md ">Quick Actions</p>

                          <div className="mt-2 justify-between flex w-[100%] gap-4 ">
                            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... w-[100%] rounded-[10px] p-[1px]">
                              <div
                                onClick={() => handleStatement(1)}
                                style={{
                                  boxShadow:
                                    "1px 5px 24px 8px rgba(110, 117, 136, 0.07",
                                }}
                                className={`flex w-[100%] cursor-pointer h-[100%] flex-col justify-center items-center ${
                                  theme
                                    ? `bg-[${themeChange.light.bg2}]`
                                    : `bg-[${themeChange.dark.bg3}]`
                                } shadow-2xl rounded-[10px]  p-3`}
                              >
                                <Image
                                  src={sport}
                                  className="w-[60px] h-[60px]"
                                  alt=""
                                />
                                <p className="text-xs  -mt-1">Sport</p>
                              </div>
                            </div>

                            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... w-[100%] rounded-[10px] p-[1px]">
                              <div
                                onClick={() => handleStatement(2)}
                                style={{
                                  boxShadow:
                                    "1px 5px 24px 8px rgba(110, 117, 136, 0.07",
                                }}
                                className={`flex w-[100%] cursor-pointer flex-col justify-center h-[100%]  items-center ${
                                  theme
                                    ? `bg-[${themeChange.light.bg2}]`
                                    : `bg-[${themeChange.dark.bg3}]`
                                } shadow-2xl rounded-[10px]  p-3`}
                              >
                                <div className="p-1 rounded-[8px] bg-purple-900">
                                  <Image
                                    src={casinoludo}
                                    className="w-[30px] h-[30px]"
                                    alt=""
                                  />
                                </div>

                                <p className="text-xs mt-2 ">Casino</p>
                              </div>
                            </div>

                            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... w-[100%] rounded-[10px] p-[1px]">
                              <div
                                onClick={() => handleStatement(3)}
                                style={{
                                  boxShadow:
                                    "1px 5px 24px 8px rgba(110, 117, 136, 0.07",
                                }}
                                className={`flex w-[100%] cursor-pointer flex-col justify-center h-[100%] items-center ${
                                  theme
                                    ? `bg-[${themeChange.light.bg2}]`
                                    : `bg-[${themeChange.dark.bg3}]`
                                } shadow-2xl rounded-[10px]  p-3`}
                              >
                                <div className="p-1 rounded-[8px] bg-gray-800">
                                  <Image
                                    src={cb}
                                    className="w-[30px] h-[30px]"
                                    alt=""
                                  />
                                </div>
                                <p className="text-xs mt-2 ">Current Bet</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6">
                          <div className="flex justify-between">
                            <p className="text-sm ">Your Bet</p>
                            <p
                              onClick={() => handleStatement(4)}
                              className="text-sm cursor-pointer "
                            >
                              View All
                            </p>
                          </div>

                          <div className="flex   pb-[50px] mt-2  flex-col gap-2">
                            {statemendatas.slice(0, 3).map((item) => {
                              return (
                                <div
                                  onClick={() => handleStatement(5, item)}
                                  key={item._id}
                                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...  w-[100%] rounded-[10px] p-[1px]"
                                >
                                  <div
                                    style={{
                                      boxShadow:
                                        "1px 5px 40px 8px rgba(110, 117, 136, 0.07)",
                                    }}
                                    className="flex justify-between  bg-gray-700  cursor-pointer items-center rounded-[10px] w-[100%] p-2"
                                  >
                                    <div className="flex gap-4 items-center">
                                      <Image
                                        src={
                                          item.event_type !== "casino"
                                            ? bollyball
                                            : card
                                        }
                                        alt=""
                                      />
                                      <div className="flex flex-col gap-[2px]">
                                        <p className="text-xs ">
                                          {item.match_name}
                                        </p>
                                        <p className="text-[10px] ">
                                          {item.event_name}
                                        </p>
                                        <p className="text-[10px] ">
                                          {item.placed_at}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex text-center flex-col gap-1">
                                      <p
                                        className={`text-sm  ${
                                          item.result == "lose"
                                            ? "text-[#FF0202]"
                                            : item.result == "win"
                                            ? "text-[#0FBF00]"
                                            : "text-[#EAAB0F]"
                                        }  font-medium`}
                                      >
                                        {(item.stake).toFixed(2)}
                                        <span className="text-[10px] font-light">
                                          {/* BDT */}
                                        </span>
                                      </p>
                                      <p
                                        className={`text-xs   ${
                                          item.result == "lose"
                                            ? "text-[#FF0202]"
                                            : item.result == "win"
                                            ? "text-[#0FBF00]"
                                            : "text-[#EAAB0F]"
                                        }`}
                                      >
                                        {item.result == ""
                                          ? "pending"
                                          : item.result}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {showStatement === 1 && (
                    <div className="h-[90vh] overflow-scroll">
                      <div>
                        <div className="flex  justify-end">
                          <svg
                            onClick={handleCancel}
                            cursor={"pointer"}
                            width="40"
                            height="25"
                            viewBox="0 0 40 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 0H20C31.0457 0 40 8.95431 40 20V25H20C8.95431 25 0 16.0457 0 5V0Z"
                              fill="#EAAB0F"
                            />
                            <line
                              y1="-1"
                              x2="17.8443"
                              y2="-1"
                              transform="matrix(0.728288 0.685271 -0.75454 0.656254 12.1129 8.19092)"
                              stroke="black"
                              stroke-width="2"
                            />
                            <line
                              y1="-1"
                              x2="17.6965"
                              y2="-1"
                              transform="matrix(0.67785 -0.7352 0.80052 0.599306 14.2448 20.0854)"
                              stroke="black"
                              stroke-width="2"
                            />
                          </svg>
                        </div>
                        <div className="w-[90%] relative m-auto">
                          <div
                            onClick={handleArrow}
                            className="absolute   cursor-pointer left-2 "
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="43"
                              height="42"
                              viewBox="0 0 48 47"
                              fill="none"
                            >
                              <rect
                                x="0.386719"
                                width="47"
                                height="47"
                                rx="23.5"
                                fill="#A4A9AE"
                                fill-opacity="0.25"
                              />
                              <path
                                d="M27.3867 16L19.3867 24L27.3867 31.5"
                                stroke="#A4A9AE"
                                stroke-width="1.9"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="flex flex-col gap-5 w-[88%]  m-auto ">
                          <p className="text-lg  text-center font-semibold">
                            Sport
                          </p>

                          <div className="flex   pb-[50px] mt-4  flex-col gap-2">
                            <div className="flex justify-between">
                              <p className="text-sm ">Your Bet</p>
                              <p className="text-sm cursor-pointer ">
                                View All
                              </p>
                            </div>

                            <div className="overflow-scroll  h-[100vh]">
                              {sportsdata.map((item) => {
                                return (
                                  <div
                                  onClick={() => handleStatement(5, item)}
                                    key={item._id}
                                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...  w-[100%] mt-1 rounded-[10px] p-[1px]"
                                  >
                                    <div
                                      style={{
                                        boxShadow:
                                          "1px 5px 40px 8px rgba(110, 117, 136, 0.07)",
                                      }}
                                      className="flex justify-between  bg-gray-700  cursor-pointer items-center rounded-[10px] w-[100%] p-2"
                                    >
                                      <div className="flex gap-4 items-center">
                                        <Image src={bollyball} alt="" />
                                        <div className="flex flex-col gap-[2px]">
                                          <p className="text-xs ">
                                            {item.match_name}
                                          </p>
                                          <p className="text-[10px] ">
                                            {item.event_name}
                                          </p>
                                          <p className="text-[10px] text-[#A4A9AE]">
                                            {item.placed_at}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex text-center flex-col gap-1">
                                        <p
                                          className={`text-sm  ${
                                            item.status === "pending"
                                              ? "text-[#FF0202]"
                                              : "text-[#0FBF00]"
                                          }  font-medium`}
                                        >
                                          {(item.stake).toFixed(2)}
                                          <span className="text-[10px] font-light">
                                            {/* BDT */}
                                          </span>
                                        </p>
                                        <p className="text-xs  text-[#EAAB0F]">
                                          {item.status}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {showStatement === 2 && (
                    <div className="h-[90vh] overflow-scroll">
                      <div>
                        <div className="flex justify-end">
                          <svg
                            onClick={handleCancel}
                            cursor={"pointer"}
                            width="40"
                            height="25"
                            viewBox="0 0 40 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 0H20C31.0457 0 40 8.95431 40 20V25H20C8.95431 25 0 16.0457 0 5V0Z"
                              fill="#EAAB0F"
                            />
                            <line
                              y1="-1"
                              x2="17.8443"
                              y2="-1"
                              transform="matrix(0.728288 0.685271 -0.75454 0.656254 12.1129 8.19092)"
                              stroke="black"
                              stroke-width="2"
                            />
                            <line
                              y1="-1"
                              x2="17.6965"
                              y2="-1"
                              transform="matrix(0.67785 -0.7352 0.80052 0.599306 14.2448 20.0854)"
                              stroke="black"
                              stroke-width="2"
                            />
                          </svg>
                        </div>
                        <div className="w-[90%] relative m-auto">
                          <div
                            onClick={handleArrow}
                            className="absolute   cursor-pointer left-2 "
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="43"
                              height="42"
                              viewBox="0 0 48 47"
                              fill="none"
                            >
                              <rect
                                x="0.386719"
                                width="47"
                                height="47"
                                rx="23.5"
                                fill="#A4A9AE"
                                fill-opacity="0.25"
                              />
                              <path
                                d="M27.3867 16L19.3867 24L27.3867 31.5"
                                stroke="#A4A9AE"
                                stroke-width="1.9"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="flex flex-col gap-5 w-[88%]  m-auto ">
                          <p className="text-lg  text-center font-semibold">
                            Casino
                          </p>
                          <div className="flex   pb-[50px] mt-4  flex-col gap-2">
                            <div className="flex justify-between">
                              <p className="text-sm ">Your Bet</p>
                              <p className="text-sm cursor-pointer ">
                                View All
                              </p>
                            </div>
                            {casinoData.map((item) => {
                              return (
                                <div
                                onClick={() => handleStatement(5, item)}
                                  key={item._id}
                                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...  w-[100%] rounded-[10px] p-[1px]"
                                >
                                  <div
                                    style={{
                                      boxShadow:
                                        "1px 5px 40px 8px rgba(110, 117, 136, 0.07)",
                                    }}
                                    className="flex justify-between  bg-gray-700  cursor-pointer items-center rounded-[10px] w-[100%] p-2"
                                  >
                                    <div className="flex gap-4 items-center">
                                      <Image src={card} alt="" />
                                      <div className="flex flex-col gap-[2px]">
                                        <p className="text-xs ">
                                          {item.match_name}
                                        </p>
                                        <p className="text-[10px] ">
                                          {item.event_name}
                                        </p>
                                        <p className="text-[10px] text-[#A4A9AE]">
                                          {item.placed_at}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex text-center flex-col gap-1">
                                      <p
                                        className={`text-sm  ${
                                          item.result == "lose"
                                            ? "text-[#FF0202]"
                                            : item.result == "win"
                                            ? "text-[#0FBF00]"
                                            : "text-[#EAAB0F]"
                                        }  font-medium`}
                                      >
                                        {item.stake}
                                        <span className="text-[10px] font-light">
                                          {/* BDT */}
                                        </span>
                                      </p>
                                      <p
                                        className={`text-xs  ${
                                          item.result == "lose"
                                            ? "text-[#FF0202]"
                                            : item.result == "win"
                                            ? "text-[#0FBF00]"
                                            : "text-[#EAAB0F]"
                                        }`}
                                      >
                                        {item.result == ""
                                          ? "pending"
                                          : item.result}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {showStatement === 3 && (
                    <div className="h-[90vh] overflow-scroll">
                      <div>
                        <div className="flex justify-end">
                          <svg
                            onClick={handleCancel}
                            cursor={"pointer"}
                            width="40"
                            height="25"
                            viewBox="0 0 40 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 0H20C31.0457 0 40 8.95431 40 20V25H20C8.95431 25 0 16.0457 0 5V0Z"
                              fill="#EAAB0F"
                            />
                            <line
                              y1="-1"
                              x2="17.8443"
                              y2="-1"
                              transform="matrix(0.728288 0.685271 -0.75454 0.656254 12.1129 8.19092)"
                              stroke="black"
                              stroke-width="2"
                            />
                            <line
                              y1="-1"
                              x2="17.6965"
                              y2="-1"
                              transform="matrix(0.67785 -0.7352 0.80052 0.599306 14.2448 20.0854)"
                              stroke="black"
                              stroke-width="2"
                            />
                          </svg>
                        </div>
                        <div className="w-[90%] relative m-auto">
                          <div
                            onClick={handleArrow}
                            className="absolute   cursor-pointer left-2 "
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="43"
                              height="42"
                              viewBox="0 0 48 47"
                              fill="none"
                            >
                              <rect
                                x="0.386719"
                                width="47"
                                height="47"
                                rx="23.5"
                                fill="#A4A9AE"
                                fill-opacity="0.25"
                              />
                              <path
                                d="M27.3867 16L19.3867 24L27.3867 31.5"
                                stroke="#A4A9AE"
                                stroke-width="1.9"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="flex flex-col gap-5 w-[88%]  m-auto ">
                          <p className="text-lg  text-center font-semibold">
                            Current Bet
                          </p>
                          <div className="flex   pb-[50px] mt-4  flex-col gap-2">
                            <div className="flex justify-between">
                              <p className="text-sm ">Your Bet</p>
                              <p className="text-sm cursor-pointer ">
                                View All
                              </p>
                            </div>
                            <div className="overflow-scroll   h-[100vh]">
                              {statemendatas.map((item) => {
                                return (
                                  <div
                                  onClick={() => handleStatement(5, item)}
                                    key={item._id}
                                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...  w-[100%] mt-1 rounded-[10px] p-[1px]"
                                  >
                                    <div
                                      style={{
                                        boxShadow:
                                          "1px 5px 40px 8px rgba(110, 117, 136, 0.07)",
                                      }}
                                      className="flex justify-between m  bg-gray-700  cursor-pointer items-center rounded-[10px] w-[100%] p-2"
                                    >
                                      <div className="flex gap-4 items-center">
                                        <Image
                                          src={
                                            item.event_type !== "casino"
                                              ? bollyball
                                              : card
                                          }
                                          alt=""
                                        />
                                        <div className="flex flex-col gap-[2px]">
                                          <p className="text-xs ">
                                            {item.match_name}
                                          </p>
                                          <p className="text-[10px] ">
                                            {item.event_name}
                                          </p>
                                          <p className="text-[10px] text-[#A4A9AE]">
                                            {item.placed_at}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex text-center flex-col gap-1">
                                        <p
                                          className={`text-sm  ${
                                            item.result == "lose"
                                              ? "text-[#FF0202]"
                                              : item.result == "win"
                                              ? "text-[#0FBF00]"
                                              : "text-[#EAAB0F]"
                                          }  font-medium`}
                                        >
                                          {(item.stake).toFixed(2)}
                                          <span className="text-[10px] font-light">
                                            {/* BDT */}
                                          </span>
                                        </p>
                                        <p
                                          className={`text-xs  ${
                                            item.result == "lose"
                                              ? "text-[#FF0202]"
                                              : item.result == "win"
                                              ? "text-[#0FBF00]"
                                              : "text-[#EAAB0F]"
                                          }`}
                                        >
                                          {item.result == ""
                                            ? "pending"
                                            : item.result}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {showStatement === 4 && (
                    <div className=" h-[90vh]">
                      <div>
                        <div className="flex justify-end">
                          <svg
                            onClick={handleCancel}
                            cursor={"pointer"}
                            width="40"
                            height="25"
                            viewBox="0 0 40 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 0H20C31.0457 0 40 8.95431 40 20V25H20C8.95431 25 0 16.0457 0 5V0Z"
                              fill="#EAAB0F"
                            />
                            <line
                              y1="-1"
                              x2="17.8443"
                              y2="-1"
                              transform="matrix(0.728288 0.685271 -0.75454 0.656254 12.1129 8.19092)"
                              stroke="black"
                              stroke-width="2"
                            />
                            <line
                              y1="-1"
                              x2="17.6965"
                              y2="-1"
                              transform="matrix(0.67785 -0.7352 0.80052 0.599306 14.2448 20.0854)"
                              stroke="black"
                              stroke-width="2"
                            />
                          </svg>
                        </div>
                        <div className="w-[90%] relative m-auto">
                          <div
                            onClick={handleArrow}
                            className="absolute   cursor-pointer left-2 "
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="43"
                              height="42"
                              viewBox="0 0 48 47"
                              fill="none"
                            >
                              <rect
                                x="0.386719"
                                width="47"
                                height="47"
                                rx="23.5"
                                fill="#A4A9AE"
                                fill-opacity="0.25"
                              />
                              <path
                                d="M27.3867 16L19.3867 24L27.3867 31.5"
                                stroke="#A4A9AE"
                                stroke-width="1.9"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="flex flex-col gap-5 w-[88%]  m-auto ">
                          <p className="text-lg  text-center font-semibold">
                            Your Bets
                          </p>

                          <div className="flex   pb-[50px] mt-4  flex-col gap-2">
                            <div className="flex justify-between">
                              <p className="text-sm ">Your Bet</p>
                              <p className="text-sm cursor-pointer ">
                                View All
                              </p>
                            </div>
                            <div className="overflow-scroll  flex flex-col gap-2 h-[80vh] lg:h-[70vh]">
                              {statemendatas.map((item) => {
                                return (
                                  <div
                                  onClick={() => handleStatement(5, item)}
                                    key={item._id}
                                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...  w-[100%] rounded-[10px] p-[1px]"
                                  >
                                    <div
                                      style={{
                                        boxShadow:
                                          "1px 5px 40px 8px rgba(110, 117, 136, 0.07)",
                                      }}
                                      className="flex justify-between  bg-gray-700  cursor-pointer items-center rounded-[10px] w-[100%] p-2"
                                    >
                                      <div className="flex gap-4 items-center">
                                        <Image
                                          src={
                                            item.event_type !== "casino"
                                              ? bollyball
                                              : card
                                          }
                                          alt=""
                                        />
                                        <div className="flex flex-col gap-[2px]">
                                          <p className="text-xs ">
                                            {item.match_name}
                                          </p>
                                          <p className="text-[10px] ">
                                            {item.event_name}
                                          </p>
                                          <p className="text-[10px] text-[#A4A9AE]">
                                            {item.placed_at}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex text-center flex-col gap-1">
                                        <p
                                          className={`text-sm  ${
                                            item.result == "lose"
                                              ? "text-[#FF0202]"
                                              : item.result == "win"
                                              ? "text-[#0FBF00]"
                                              : "text-[#EAAB0F]"
                                          }  font-medium`}
                                        >
                                          {(item.stake).toFixed(2)}
                                          <span className="text-[10px] font-light">
                                            {/* BDT */}
                                          </span>
                                        </p>
                                        <p
                                          className={`text-xs  ${
                                            item.result == "lose"
                                              ? "text-[#FF0202]"
                                              : item.result == "win"
                                              ? "text-[#0FBF00]"
                                              : "text-[#EAAB0F]"
                                          }`}
                                        >
                                          {item.result == ""
                                            ? "pending"
                                            : item.result}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {showStatement === 5 && (
                    <div className="h-[90vh]  w-[100%] p-0 overflow-scroll">
                      <div>
                        <div className="flex justify-end">
                          <svg
                            onClick={handleCancel}
                            cursor={"pointer"}
                            width="40"
                            height="25"
                            viewBox="0 0 40 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 0H20C31.0457 0 40 8.95431 40 20V25H20C8.95431 25 0 16.0457 0 5V0Z"
                              fill="#EAAB0F"
                            />
                            <line
                              y1="-1"
                              x2="17.8443"
                              y2="-1"
                              transform="matrix(0.728288 0.685271 -0.75454 0.656254 12.1129 8.19092)"
                              stroke="black"
                              stroke-width="2"
                            />
                            <line
                              y1="-1"
                              x2="17.6965"
                              y2="-1"
                              transform="matrix(0.67785 -0.7352 0.80052 0.599306 14.2448 20.0854)"
                              stroke="black"
                              stroke-width="2"
                            />
                          </svg>
                        </div>
                        <div className="w-[100%] relative m-auto">
                          <div
                            onClick={handleArrow}
                            className="absolute   cursor-pointer left-2 "
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="43"
                              height="42"
                              viewBox="0 0 48 47"
                              fill="none"
                            >
                              <rect
                                x="0.386719"
                                width="47"
                                height="47"
                                rx="23.5"
                                fill="#A4A9AE"
                                fill-opacity="0.25"
                              />
                              <path
                                d="M27.3867 16L19.3867 24L27.3867 31.5"
                                stroke="#A4A9AE"
                                stroke-width="1.9"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="flex flex-col gap-5 w-[98%]  m-auto ">
                          <p className="text-lg  text-center font-semibold">
                            Bet Details
                          </p>
                          <div className="flex   pb-[50px] mt-4  flex-col gap-2">
                            <div className="flex flex-col justify-center items-center gap-2">
                              <span className="h-[20px] w-[20px] rounded-[50%] flex items-center justify-center bg-yellow-400">
                                <TbCurrencyTaka color="white" fontSize="15px" />
                              </span>
                            <p
                                className={`text-[16px] ${
                                  detailsBet?.result === "win"
                                    ? "text-green-400"
                                    : detailsBet?.result === "lose"
                                    ? "text-red-400"
                                    : "text-orange-400"
                                }`}
                              >
                                
                                {detailsBet?.result == "win"
                                  ? "+"
                                  : detailsBet?.result == "lose"
                                  ? "-"
                                  : ""}{" "}
                                  { detailsBet?.result === "win"?
                                detailsBet?.bet_category == "fancy"
                                  ? (detailsBet?.stake * 2).toFixed(2)
                                  : detailsBet?.bet_category == "odds" &&
                                    detailsBet?.bet_type == "back"
                                  ? (detailsBet?.stake * detailsBet?.rate -
                                    detailsBet?.stake).toFixed(2)
                                  : (detailsBet?.stake).toFixed(2):(detailsBet?.stake).toFixed(2)}

                                  <span className="text-white text-sm">INR</span>
                              </p>
                            </div>
                            <div className="flex flex-col mt-5 gap-3">
                              <div className="rounded-[2px] p-2 bg-[#15191E] flex item-center justify-center">
                                <p className="font-semibold text-lg text-center text-[#fff]">
                                  {detailsBet?.bet_category}
                                </p>
                              </div>
                              <div className="flex flex-col p-4 rounded-[2px] bg-[#15191E]  gap-3">
                                <div className="flex justify-between w-[100%] items-center">
                                  <p className="text-sm font-semibold">
                                    Status
                                  </p>
                                  <p
                                    className={` font-semibold text-sm ${
                                      detailsBet?.result == ""
                                        ? "text-orange-400"
                                        : detailsBet?.result == "win"
                                        ? "text-green-400"
                                        : "text-red-400"
                                    } `}
                                  >
                                    {detailsBet?.result === ""
                                      ? "pending"
                                      : detailsBet?.result}
                                  </p>
                                </div>
                                <div className="flex justify-between w-[100%] items-center">
                                  <p className="text-sm font-medium">
                                    BetCategory
                                  </p>
                                  <p
                                    className={` font-semibold text-sm  text-purple-400`}
                                  >
                                    {detailsBet?.bet_category}
                                  </p>
                                </div>
                                <div className="flex justify-between w-[100%] items-center">
                                  <p className="text-sm font-medium">
                                    Match Bet
                                  </p>
                                  <p
                                    className={` font-semibold text-sm  text-blue-400`}
                                  >
                                    {detailsBet?.event_name}
                                  </p>
                                </div>
                                <div className="flex justify-between w-[100%] items-center">
                                  <p className="text-sm font-medium">ODD</p>
                                  <p
                                    className={` font-semibold text-sm  text-green-400`}
                                  >
                                    {detailsBet?.rate}
                                  </p>
                                </div>
                                <div className="flex justify-between w-[100%] items-center">
                                  <p className="text-sm font-medium">Stake</p>
                                  <p
                                    className={` font-semibold text-sm  text-purple-400`}
                                  >
                                    {detailsBet?.stake}
                                  </p>
                                </div>
                                <div className="flex justify-between w-[100%] items-center">
                                  <p className="text-sm font-medium">
                                   {detailsBet?.result=="win"?"Win Amount":detailsBet?.result=="lose"?"Lose Amount":detailsBet?.result=="refund"?'Refund Amount':'Pending Amount'}
                                  </p>
                                  <p
                                    className={`text-[16px] ${
                                      detailsBet?.result === "win"
                                        ? "text-green-400"
                                        : detailsBet?.result === "lose"
                                        ? "text-red-400"
                                        : "text-orange-400"
                                    }`}
                                  >
                                    {detailsBet?.result == "win"
                                      ? "+"
                                      : detailsBet?.result == "lose"
                                      ? "-"
                                      : ""}{" "}
                                    { detailsBet?.result === "win"?
                                detailsBet?.bet_category == "fancy"
                                  ? (detailsBet?.stake * 2).toFixed(2)
                                  : detailsBet?.bet_category == "odds" &&
                                    detailsBet?.bet_type == "back"
                                  ? (detailsBet?.stake * detailsBet?.rate -
                                    detailsBet?.stake).toFixed(2)
                                  : (detailsBet?.stake).toFixed(2):(detailsBet?.stake).toFixed(2)} <span className="text-white text-sm">
                                      INR
                                    </span>
                                  </p>
                                </div>
                                <div className="flex justify-between w-[100%] items-center">
                                  <p className="text-sm font-medium">BetType</p>
                                  {detailsBet?.bet_category=="fancy"?
                                  detailsBet?.bet_category=="fancy" && detailsBet?.bet_type=="lay"?
                                 <button
                                 className={`py-[2px] text-xs px-2 ${
                                   detailsBet?.bet_type === "back"
                                     ? "bg-[#FF6A8A]"
                                     : "bg-[#0096FE]"
                                 }  rounded-[5px]`}
                               >No</button>:<button
                               className={`py-[2px] text-xs px-2 ${
                                 detailsBet?.bet_type === "back"
                                   ? "bg-[#FF6A8A]"
                                   : "bg-[#0096FE]"
                               }  rounded-[5px]`}
                             >Yes</button>:<button
                             className={`py-[2px] text-xs px-2 ${
                               detailsBet?.bet_type === "back"
                                 ? "bg-[#FF6A8A]"
                                 : "bg-[#0096FE]"
                             }  rounded-[5px]`}
                           >
                             {detailsBet?.bet_type}
                           </button>}

                                </div>
                                <div className="flex justify-between w-[100%] items-center">
                                  <p className="text-sm font-medium">
                                    Team/Question
                                  </p>
                                  <p className="text-[#fef08a]">
                                    {detailsBet?.runner_name.slice(0, 30)}{" "}
                                    {detailsBet?.runner_name.length > 30 &&
                                      "..."}
                                    {detailsBet?.Question}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="rounded-[2px] p-2 bg-[#15191E] py-2  ">
                              <p className="font-medium text-center text-[14px]">
                                Other Details
                              </p>
                              <div className="flex px-3  justify-between mt-2 w-[100%] items-center">
                                <p className="text-sm font-medium">
                                  League Name
                                </p>
                                <p className="font-medium text-xs ">
                                  {detailsBet?.league_name}
                                </p>
                              </div>
                              <div className="flex px-3 mt-2 justify-between w-[100%] items-center">
                                <p className="text-sm font-medium">
                                  Match Name
                                </p>
                                <p className="font-medium text-xs">
                                  {detailsBet?.match_name}
                                </p>
                              </div>
                              <div className="flex px-3 mt-2 justify-between w-[100%] items-center">
                                <p className="text-sm font-medium">Date</p>
                                <p className="font-medium text-xs">
                                  {detailsBet?.placed_at.split(" ")[0]}
                                </p>
                              </div>
                              <div className="flex px-3 mt-2 justify-between w-[100%] items-center">
                                <p className="text-sm font-medium">Time</p>
                                <p className="font-medium text-xs">
                                  {detailsBet?.placed_at.split(" ")[1]}
                                  {detailsBet?.placed_at.split(" ")[2]}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {showProfile === 1 && (
                <div>
                  <div className="flex  justify-end">
                    <svg
                      onClick={handleCancel}
                      cursor={"pointer"}
                      width="40"
                      height="25"
                      viewBox="0 0 40 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 0H20C31.0457 0 40 8.95431 40 20V25H20C8.95431 25 0 16.0457 0 5V0Z"
                        fill="#EAAB0F"
                      />
                      <line
                        y1="-1"
                        x2="17.8443"
                        y2="-1"
                        transform="matrix(0.728288 0.685271 -0.75454 0.656254 12.1129 8.19092)"
                        stroke="black"
                        stroke-width="2"
                      />
                      <line
                        y1="-1"
                        x2="17.6965"
                        y2="-1"
                        transform="matrix(0.67785 -0.7352 0.80052 0.599306 14.2448 20.0854)"
                        stroke="black"
                        stroke-width="2"
                      />
                    </svg>
                  </div>
                  <MyProfile
                    setShowProfile={setShowProfile}
                    onClose={onClose}
                  />
                </div>
              )}
            </ModalBody>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

export default StatementModel;
