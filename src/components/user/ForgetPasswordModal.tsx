
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
     IconButton,
  InputGroup,
  InputRightElement,
  Button,
  Box,
  Text,
  Collapse,
  Flex,
  Spacer,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Input,
  InputLeftAddon,
  Stack,
  useDisclosure,
  } from '@chakra-ui/react'

  import React,{useState} from "react";
import cancel from "../../assetuser/authsocial/CANCLE.png";
import Image from "next/image";
  import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";
import gogole from "../../assetuser/authsocial/google.png";
import facebook from "../../assetuser/authsocial/facebook.png";
function ForgetPasswordModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [isInputVisible, setInputVisible] = useState(false);
    const [promoCode, setPromoCode] = useState("");
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
  
  
    const toggleInputVisibility = () => {
      setInputVisible(!isInputVisible);
    };
    return (
      <>
       
        <p onClick={onOpen} className="text-xs cursor-pointer font-font-medium text-[#FFF]">Forget Password ?</p>
        <Modal   size={{base:'full',lg:'3xl'}}  isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent style={{padding:'0px'}}>
           
           
            <ModalBody style={{padding:'0px',backgroundColor:'#212632'}}>
            <div className="w-[100%] bg-[#212632] rounded-[8px] flex ">
        <div className=" hidden lg:contents">
        <div className="w-[50%] h-100vh lg:w-[600px] rounded-[5px] object-cover auth-bg"></div>
          </div>
        <div className=" w-[100%] lg:w-[50%] pb-[50px]  lg:pb-0  h-[100vh] lg:h-[600px] flex flex-col gap-4 ">
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
          <div className="w-[90%] flex flex-col gap-5    mx-auto">
            <p className=" font-bold text-white text-xl ">Reset Password</p>
           
              <div className="flex flex-col  mt-2 md:mt-2 gap-1">
                <label className="font-medium text-white text-sm ">Email </label>
                <input
                  className="p-[6px] text-white h-[45px] w-[100%] border-[#D9D9D9C7] rounded-[6px] text-sm outline-none bg-[#15191F] "
                  placeholder="adarsh@47474gmail.com"
                />
              </div>
        
          
            <div className="flex flex-col gap-4">
           
             
              <div>
                <Button
                  colorScheme=""
                  className="text-[#15191F] font-medium text-sm p-3 w-[100%] bg-[#FEB90A] rounded-[10px]"
                >
                Reset Password
                </Button>
                <p className="text-sm mt-3 ml-1 font-medium text-white">
                 Already have an account!{" "}
                  <span className="text-[#FFBD16]">
                    <Link  href="/login">Sign in</Link>
                  </span>
                </p>
              </div>
          
            </div>

            
          <div>
      <div className="">
                <Flex alignItems="center" mt={4}>
                  <Divider flex="1" borderColor="gray.400" />
                  <Text mx={2} fontWeight="bold" fontSize="sm" color="gray">
                   Or Login with
                  </Text>
                  <Divider flex="1" borderColor="gray" />
                </Flex>
              </div>

              <div className="flex mt-5  justify-between text-[#D9D9D9] text-sm font-normal ">
                <div
                  className={`w-[45%] bg-[#2E3543] cursor-pointer rounded-[10px]  flex justify-center  items-center p-2`}
                >
                  <Image src={gogole} alt="" />
                </div>
                <div
                  className={`w-[45%] cursor-pointer  bg-[#2E3543]  flex justify-center rounded-[10px]  items-center p-2`}
                >
                  <Image src={facebook} alt="" />
                </div>
              </div>
      </div>
          </div>

        </div>
 
      </div>
      
            </ModalBody>
  
           
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default ForgetPasswordModal