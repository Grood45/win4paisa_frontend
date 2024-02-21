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
import { AiFillBell } from "react-icons/ai";
function NotificationModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading1, setLoading1] = useState<boolean>(false);
  const [notification, setNotification] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>();

  const toast = useToast();
  const params = useParams();

  // fetch data of odds, bbokmaker, fancy, toss

  const socket = socketIOClient(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  useEffect(() => {
    // User listens for the event emitted by the backend
    socket.on("userNotification", (data, user_id) => {
      if(user_id=="U123456")
      {
      }
      else if(!user_id){


      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const getAllNotification = async () => {
    setLoading1(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/notification/get-all-notification?type=admin&admin_id=admin1`;
    try {
      let response = await fetchGetRequest(url);
      const data = response.data;
      const receivedData: Notification[] = response.data;
      if (receivedData) {
        setNotification(receivedData);
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
    getAllNotification();
  }, []);

  return (
    <>
     

      <span  onClick={onOpen} >
              <AiFillBell cursor="pointer" fontSize="20px" color="#A0AEC0" />
            </span>

      <Modal
        size={{ base: "full", md: "md" }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent
          className="h-[100%] overflow-scroll sm:h-[600px]"
          style={{ backgroundColor: "#06265E", color: "white" }}
        >
          <div className="flex  justify-end">
           
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
          <ModalHeader textAlign={"center"}>Notification</ModalHeader>
          <ModalBody style={{ padding: "4px" }}>
            <div className="p-4 space-y-4">
              {notification
              &&notification.map((notification, index) => (
                <div
                  key={index}
                  className="bg-[#060D29] shadow-md p-4 rounded-lg"
                >
                  <div className="flex justify-between">
                    <div>
                      <h2 className="text-lg font-bold">
                        {notification?.username}
                      </h2>
                      <p className="text-yellow-600 text-xs">
                        {notification?.user_id}
                      </p>
                    </div>
                    <div>
                      <h2 className="text-[15px] text-blue-400 text-right font-bold">
                        {notification?.category}
                      </h2>
                      <p
                        className={` ${
                          notification.title === "Refund Processed"
                            ? "text-red-400"
                            : "text-green-400"
                        } text-xs`}
                      >
                        {notification?.title}
                      </p>
                      <p
                        className={` ${
                          notification?.title === "Refund Processed"
                            ? "text-red-400"
                            : "text-green-400 "
                        } text-right text-xs`}
                      >
                        +{notification?.amount}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-200 mt-2">
                      {notification?.description}
                    </p>
                  </div>
                  <div>
                    <p className="text-right text-[10px] mt-3 text-gray-200 font-bold">
                      {notification?.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NotificationModal;
