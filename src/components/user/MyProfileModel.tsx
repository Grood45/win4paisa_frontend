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
} from "@chakra-ui/react";
import Image from "next/image";
import cancel from "../../assetuser/authsocial/CANCLE.png";

import MyProfile from "./subcomponent/MyProfile";
import { useAppSelector } from "@/app/redux-arch/store";
import themeChange from "@/theme";
function MyProfileModel() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCanecl = () => {
    onClose();
  };

  const { showSideBar1, theme } = useAppSelector(
    (store) => store.combineR.NavStateReducer
  );

  return (
    <>
      <div
        onClick={onOpen}
        className={` ${
          theme
            ? `bg-[${themeChange.light.bg1}]`
            : `bg-[${themeChange.dark.bg1}]`
        } 
        ${
          theme
            ? `text-[${themeChange.light.textColor1}]`
            : `text-[${themeChange.dark.textColor1}]`
        } 
        p-2 flex items-center cursor-pointer gap-4 `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
        >
          <g clip-path="url(#clip0_7_1952)">
            <path
              d="M13.75 7.72044C13.75 8.71501 13.3549 9.66883 12.6517 10.3721C11.9484 11.0754 10.9946 11.4704 10 11.4704C9.00544 11.4704 8.05161 11.0754 7.34835 10.3721C6.64509 9.66883 6.25 8.71501 6.25 7.72044C6.25 6.72588 6.64509 5.77205 7.34835 5.06879C8.05161 4.36553 9.00544 3.97044 10 3.97044C10.9946 3.97044 11.9484 4.36553 12.6517 5.06879C13.3549 5.77205 13.75 6.72588 13.75 7.72044Z"
              fill="#EAAB0F"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 10.2204C0 7.56828 1.05357 5.02474 2.92893 3.14938C4.8043 1.27401 7.34784 0.220444 10 0.220444C12.6522 0.220444 15.1957 1.27401 17.0711 3.14938C18.9464 5.02474 20 7.56828 20 10.2204C20 12.8726 18.9464 15.4161 17.0711 17.2915C15.1957 19.1669 12.6522 20.2204 10 20.2204C7.34784 20.2204 4.8043 19.1669 2.92893 17.2915C1.05357 15.4161 0 12.8726 0 10.2204ZM10 1.47044C8.35222 1.47053 6.73796 1.9359 5.343 2.81298C3.94805 3.69006 2.8291 4.94321 2.11496 6.42819C1.40081 7.91316 1.12048 9.56962 1.30625 11.2069C1.49201 12.8442 2.13632 14.3957 3.165 15.6829C4.0525 14.2529 6.00625 12.7204 10 12.7204C13.9937 12.7204 15.9463 14.2517 16.835 15.6829C17.8637 14.3957 18.508 12.8442 18.6938 11.2069C18.8795 9.56962 18.5992 7.91316 17.885 6.42819C17.1709 4.94321 16.052 3.69006 14.657 2.81298C13.262 1.9359 11.6478 1.47053 10 1.47044Z"
              fill="#EAAB0F"
            />
          </g>
          <defs>
            <clipPath id="clip0_7_1952">
              <rect
                width="20"
                height="20"
                fill="white"
                transform="translate(0 0.220444)"
              />
            </clipPath>
          </defs>
        </svg>
        <p className={`text-xs  font-medium `}>Profile</p>
      </div>

      <Modal
        size={{ base: "full", md: "md" }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent className="md:rounded-[16px] ">
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
              className="md:rounded-[16px] h-[100vh] lg:h-[100%]   lg:min-h-[87vh]"
            >
              <div>
                <div className="flex justify-end">
                  <svg
                    onClick={handleCanecl}
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
                <MyProfile onClose={onClose} />
              </div>
            </ModalBody>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MyProfileModel;
