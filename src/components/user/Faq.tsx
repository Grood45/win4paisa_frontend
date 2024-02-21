"use client";
import { useEffect, useState } from "react";
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
import { LogoAndFav } from "../../../utils/typescript.module";
import { fetchGetRequest } from "@/api/api";
import { useAppSelector } from "@/app/redux-arch/store";
import themeChange from "@/theme";
function Faq() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [logoAndFav, setLogoAndFav] = useState<LogoAndFav>();
  const toast = useToast();
  const handleGetLogoAndFav = async () => {
    try {
      const response = await fetchGetRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/logofav/get-logo-fav/6532c132ed5efb8183a66703`
      );
      setLogoAndFav(response.data);
    } catch (error: any) {
      toast({
        title: error?.data?.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    handleGetLogoAndFav();
  }, []);

  const { showSideBar1, theme } = useAppSelector(
    (store) => store.combineR.NavStateReducer
  );
  return (
    <>
      <div
        onClick={onOpen}
        className="p-2 flex items-center cursor-pointer gap-4 "
      >
        <FcFaq fontSize="25px" />
        <p className="text-xs  font-medium">FAQ</p>
      </div>

      <Modal
        size={{ base: "full", md: "md" }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent
    className="md:rounded-[16px]"
        
        >
           <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... md:rounded-[16px] p-[1px]">
         
          <div className="flex  absolute right-1 top-1 justify-end">
          
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
        

          
          <ModalBody   style={{
            backgroundColor: theme
              ? themeChange.light.bg1
              : themeChange.dark.bg1,
            color: theme
              ? themeChange.light.textColor1
              : themeChange.dark.textColor1,
          }}  className="md:rounded-[16px] pt-4  h-[100vh] lg:h-[100%]   lg:min-h-[87vh]">
            <p className="text-center font-semibold text-lg mt-4">Frequently Asked Question</p>
            <div className='   h-[100vh] sm:h-[75vh] mt-5 overflow-scroll'>
            <Accordion allowToggle>
              {logoAndFav &&
                logoAndFav?.fnq.map((item, index) => {
                  return (
                    <AccordionItem key={index} className="border-none mt-10">
                      <h2>
                        <AccordionButton
                          style={{
                            backgroundColor:theme?themeChange.light.bg1:themeChange.dark.bg2 ,
                            marginTop: "20px",
                            borderRadius: "10px",
                            boxShadow:"rgba(0, 0, 0, 0.16) 0px 1px 4px"
                          }}
                        >
                          <Box as="span" flex="1" textAlign="left">
                            {item.question}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel
                        style={{
                          borderBottom: "3px solid red",
                          borderRadius: "10px",
                        }}
                        pb={4}
                      >
                        {item.answer}
                      </AccordionPanel>
                    </AccordionItem>
                  );
                })}
            </Accordion>
            </div>
         
          </ModalBody>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Faq;
