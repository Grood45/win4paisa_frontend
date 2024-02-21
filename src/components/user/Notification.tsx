"use client";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import { FcFaq } from "react-icons/fc";
import cancel from "../../assetuser/authsocial/CANCLE.png";
import { SlBell } from "react-icons/sl";
import { fetchGetRequest } from "@/api/api";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Notification } from "../../../utils/typescript.module";
import socketIOClient from "socket.io-client";
import { RootState, useAppSelector } from "@/app/redux-arch/store";
import themeChange from "@/theme";
import { useSelector } from "react-redux";
function Notification() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading1, setLoading1] = useState<boolean>(false);
  const [notification, setNotification] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>();
  const userAuth = useSelector((state: RootState) => state);
  const { user_id, amount = 0 } =
    userAuth?.combineR?.userAuth?.data?.user || {};
  const toast = useToast();
  const params = useParams();

  // fetch data of odds, bbokmaker, fancy, toss

  const socket = socketIOClient(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  useEffect(() => {
    // User listens for the event emitted by the backend
    socket.on("userNotification", (data, id) => {
      if (id == user_id) {
      } else if (!user_id) {
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const { showSideBar1, theme } = useAppSelector(
    (store) => store.combineR.NavStateReducer
  );

  const getAllNotification = async () => {
    setLoading1(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/notification/get-all-notification?user_id=${user_id}&type=${"user"}`;
    try {
      let response = await fetchGetRequest(url);
      const data = response.data;
      const receivedData: Notification[] = response.data;
      if (receivedData) {
        setNotification(receivedData);
      }
      setLoading1(false);
    } catch (error: any) {
      // toast({
      //   description: `${error?.data?.message}`,
      //   status: "error",
      //   duration: 4000,
      //   position: "top",
      //   isClosable: true,
      // });
    }
  };

  useEffect(() => {
    getAllNotification();
  }, []);

  return (
    <div>
       <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... p-[1px] rounded-[50%] ">
      <div
        onClick={onOpen}
        className={`h-[25px] w-[25px] cursor-pointer lg:h-[40px] lg:w-[40px] relative rounded-[50%] flex items-center justify-center shadow-2xl ${
          theme ? "border" : ""
        } ${
          theme
            ? `bg-[${themeChange.light.bg1}]`
            : `bg-[${themeChange.dark.bg1}]`
        }`}
      >
        <SlBell color="gray" className="text-[15px] lg:text-[20px]" />
        <span className="absolute bottom-[-2px] right-[-5px] p-1  w-[13px] h-[13px] lg:w-[16px] lg:h-[16px] flex items-center justify-center text-center text-black text-[8px] md:text-xs rounded-[50%] bg-[#F3AF07]">
          1
        </span>
      </div>
      </div>
      <Modal
        size={{ base: "full", md: "md" }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent
          className="md:rounded-[16px] "
         
        >
          <div className="flex absolute right-1 top-1 justify-end">
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
          {/* <ModalHeader textAlign={"center"}>Notification</ModalHeader> */}
          <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... md:rounded-[16px] p-[1px]">
          <ModalBody
           style={{
            padding:"4px",
            overflow:"scroll",
            backgroundColor: theme
              ? themeChange.light.bg1
              : themeChange.dark.bg1,
            color: theme
              ? themeChange.light.textColor1
              : themeChange.dark.textColor1,
          }}
          className="md:rounded-[16px]  h-[100vh] lg:h-[100%]   lg:min-h-[87vh]"
          >
                      <p className="text-center font-semibold text-lg mt-4">Notification</p>


            <div className="p-4 space-y-4">
              {notification && notification.length>0&&
                notification.map((item, index) => (
                 <div    key={index} className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... p-[1px] rounded-lg">
                  <div
                 
                    className={`${
                      theme ? `bg-gray-200` : `bg-gray-700`
                    } shadow-md p-4 rounded-lg`}
                  >
                    <div className="flex justify-between">
                      <div>
                        <h2 className="text-lg font-bold">
                          {item?.username}
                        </h2>
                        <p className="text-yellow-600 text-xs">
                          {item?.user_id}
                        </p>
                      </div>
                      <div>
                        <h2 className="text-[15px] text-blue-400 text-right font-bold">
                          {item?.category}
                        </h2>
                        <p
                          className={` ${
                            item.title === "Refund Processed"
                              ? "text-red-400"
                              : "text-green-400"
                          } text-xs`}
                        >
                          {item?.title}
                        </p>
                        <p
                          className={` ${
                            item?.title === "Refund Processed"
                              ? "text-red-400"
                              : "text-green-400 "
                          } text-right text-xs`}
                        >
                          +{item?.amount}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p
                        className={`text-sm ${
                          theme
                            ? `text-[${themeChange.light.textColor1}]`
                            : `text-[${themeChange.dark.textColor1}]`
                        } mt-2`}
                      >
                        {item?.description}
                      </p>
                    </div>
                    <div>
                      <p className="text-right text-[10px] mt-3 text-black font-bold">
                        {item?.timestamp}
                      </p>
                    </div>
                    
                    

                  </div>
                  </div>
             
                ))}
            </div>
          </ModalBody>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Notification;
