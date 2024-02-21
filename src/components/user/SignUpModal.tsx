import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import {
  fetchUserDataAsync,
  loginAsync,
  removeUserDataAsync,
} from "@/app/redux-arch/userauth/auth.slice";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { fetchGetRequest, sendPostRequest } from "@/api/api";
import { FormEvent, useEffect, useState } from "react";
import { LogoAndFav } from "../../../utils/typescript.module";
import Image from "next/image";
import { useRouter } from "next/navigation";
import loginimg from "../../assetuser/win.jpg";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookCircleFill, RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { auth } from "../../app/firebase";

import { HiPhoneArrowUpRight } from "react-icons/hi2";
import { logoutAsync } from "@/app/redux-arch/adminauth/auth.slice";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
function SignUpModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
const router=useRouter()
  const toast = useToast();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setNumber] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let payload = {
              username: username,
              email: email,
              first_name:"",
              last_name:"",
              phone:phoneNumber || "",
              otpless_token:"tokenstfggyjtrytfgh6r6fttfyt46dytiytyghbyuijhiy7",
              password: password,
              type:"register"
            };
      let ans = await dispatch(loginAsync(payload));

        if (ans.payload.success) {
          toast({
            title: ans.payload.message,
            status: "success",
            duration: 2000,
            position: "top",
            isClosable: true,
          });

          setUsername("");
          setNumber("");
          setEmail("");
          setPassword("");
          onClose();
    
        } else {
          toast({
            title:  ans.payload.message,
            status: "error",
            duration: 2000,
            position: "top",
            isClosable: true,
          });
        }
        setLoading(false);

      }  
    catch (err: any) {
          setLoading(false);
          toast({
            description: `${err?.message}`,
            status: "error",
            duration: 4000,
            position: "top",
            isClosable: true,
          });
        }
  };

 
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <button
        className="px-1 w-[100px] md:w-[100px] justify-end text-white p-[6px] font-bold bg-blue-500 text-xs md:text-[14px] rounded-[6px]"
        onClick={onOpen}
      >
        Register
      </button>

      <Modal
        size={{ base: "full", md: "sm" }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent
          className="p-0"
          style={{
            padding: "0px",
            paddingLeft: "0px",
            paddingRight: "0px",
            borderRadius: "10px",
          }}
        >
          <ModalBody
            style={{ padding: "0px", borderRadius: "10px" }}
            className=" bg-gray-900"
          >
            <div className="flex flex-col relative min-h-[600px]  ">
              
            <span className="flex items-center absolute top-2 right-2  bg-[#DCA029] rounded-[50%] justify-center w-[35px] h-[35px]">
             <RxCross2
                fontSize="20px"
                onClick={() => {
                  onClose();
                }}
                className="text-white cursor-pointer  "
              />
              </span> 

              <Image
                src={loginimg}
                alt=""
                className=" h-[330px] md:h-[270px]  w-[100%]  md:rounded-t-[10px]"
              />

              <div className="flex flex-col z-50 -mt-5  items-center bg-gray-900 md:rounded-lg rounded-tl-[20px] rounded-tr-[20px]  justify-center ">
                <div className=" p-8 rounded w-[100%]">
                  <form onSubmit={handleSignup}>
                    <div className="flex items-start  -mt-5 justify-center">
                      <span className="p-1 w-[40px] h-[3px] bg-white rounded-md "></span>
                    </div>
                    <div className="mb-4 flex mt-10 items-center rounded-[4px]   pl-3   bg-white border">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                      >
                        <path
                          d="M7.77798 0.285715C5.07338 0.285715 2.88086 2.03318 2.88086 4.18878C2.88086 6.34438 5.07338 8.09188 7.77798 8.09188C10.4825 8.09188 12.6751 6.34438 12.6751 4.18878C12.6751 2.03318 10.4825 0.285715 7.77798 0.285715Z"
                          fill="#ABABAB"
                        />
                        <path
                          d="M10.6678 9.82827C8.75323 9.5847 6.80234 9.5847 4.88783 9.82827L4.68261 9.85434C1.98497 10.1975 0 12.052 0 14.2293C0 15.4044 1.19529 16.3571 2.66976 16.3571H12.8858C14.3602 16.3571 15.5556 15.4044 15.5556 14.2293C15.5556 12.052 13.5706 10.1975 10.873 9.85434L10.6678 9.82827Z"
                          fill="#ABABAB"
                        />
                      </svg>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        className=" p-[5px] w-full text-sm font-medium  outline-none rounded-sm "
                        placeholder="Enter your username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="mb-4 flex mt-4 items-center rounded-[4px]  pl-3   bg-white border">
                      <MdEmail fontSize="20px" color="gray" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className=" p-[5px] w-full text-sm font-medium  outline-none rounded-sm "
                        placeholder="Enter your email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-4 flex mt-4 items-center rounded-[4px] pl-3 bg-white border">
                      <RiLockPasswordFill fontSize="20px" color="gray" />
                      <input
                        type={showPassword ? "text" : "password"} // Show/hide password based on showPassword state
                        id="password"
                        name="password"
                        className="p-[5px] w-full text-sm font-medium outline-none rounded-sm"
                        placeholder="Enter your password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {/* Button to toggle password visibility */}
                      <button
                        type="button"
                        className="focus:outline-none w-[30px] -ml-6 "
                        onClick={handleTogglePassword}
                      >
                        {showPassword ? (
                          <IoEyeOutline fontSize="20px" color="black" />
                        ) : (
                          <IoEyeOffOutline fontSize="20px" color="black" />
                        )}
                      </button>
                    </div>
                    <div className="mb-4 flex items-center mt-5 w-[100%] rounded-[4px]  pl-3   bg-white border">
                      <HiPhoneArrowUpRight fontSize="20px" color="gray" />
                      <input
                        type="number"
                        id="number"
                        name="number"
                        className="outline-none  p-[5px] w-full text-sm font-medium  rounded-sm "
                        placeholder="Enter your number"
                        value={phoneNumber}
                        required
                        autoComplete="current-password"
                        onChange={(e) => setNumber(e.target.value)}
                      />
                    </div>
                    {/* Login Button */}
                    <button
                      type="submit"
                      className="w-full  mt-3 text-white p-2 text-sm font-semibold bg-[#DCA029] rounded-lg"
                    >
                      {loading ? <Spinner color='red.500' /> : "SignUp"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SignUpModal;
