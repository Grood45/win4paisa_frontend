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

import { HiPhoneArrowUpRight } from "react-icons/hi2";
import { logoutAsync } from "@/app/redux-arch/adminauth/auth.slice";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
function LoginModal({ ID }: { ID: any }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [showForget, setShowForget] = useState(true);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
const [loadingSendEmail,setLoadinSend]=useState(false)
const [loadingSubmitOtp,setLoadingSubmitOtp]=useState(false)
const [loadingUpdatePassword,setLoadinUpdatePassword]=useState(false)


  const toast = useToast();

  const [displayName, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setEmailOrUsername] = useState("");
  const [phoneNumber, setNumber] = useState<string>();
  const [showotp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [resetPassword,setShowResetPassword]=useState(false)
  const [newPassword,setNewPassword]=useState("")
   

  const [otp,setOtp]=useState<any>("")
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      let payload:any = {
        username: username,
        password: password,
        otpless_token:"tokenstfggyjtrytfgh6r6fttfyt46dytiytyghbyuijhiy7",
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
    setPassword("");
    onClose();
  } else {
    toast({
      title: ans.payload.message,
      status: "error",
      duration: 2000,
      position: "top",
      isClosable: true,
    });
  }
  setLoading(false);
    } catch (err: any) {
      toast({
        description: `${err?.message}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

 


  const handleLogout = async () => {

    dispatch(removeUserDataAsync());
  };

 

  // const handleUser = async (userData: any, type: any) => {
  //   let payload = {
  //     username: displayName,
  //     email: userData?.email,
  //     first_name: userData?.displayName.split(" ")[0],
  //     last_name: userData?.displayName.split(" ")[1],
  //     phone: userData?.phoneNumber || phoneNumber,
  //     otpless_token: userData?.accessToken,
  //     password: password,
  //     img_url: userData.photoURL,
  //     uid: userData.uid,
  //     type: type,
  //   };
  //   let response = await dispatch(loginAsync(payload));
  //   if (response.payload.data && response.payload.success) {
  //     toast({
  //       description: response.payload.message || "Successful",
  //       status: "success",
  //       position: "top",
  //       duration: 4000,
  //       isClosable: true,
  //     });
  //     // router.push(response.payload.redirect);
  //   }
  //   return;
  // };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = async (e: any) => {
    e.preventDefault()
   try{
    setLoadinSend(true)
const payload={
  email:email
}
     let response =await sendPostRequest(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/send-reset-otp`,payload)
    toast({
      title: response?.message,
      status: "success",
      duration: 2000,
      position: "top",
      isClosable: true,
    });
  setShowOtp(true)
  setLoadinSend(false)
   }
   catch(err:any){
  setLoadinSend(false)

    toast({
      title: err?.data.message,
      status: "error",
      duration: 2000,
      position: "top",
      isClosable: true,
    });
   }
    

  };

  const handleSubmitOtp=async()=>{
    try{
      setLoadingSubmitOtp(true)
  const payload={
    userEnteredOTP:otp,
    email:email,
    newPassword:newPassword,
  }
       let response =await sendPostRequest(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/verify-otp-and-reset`,payload)
      toast({
        title: "Otp Verified",
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
      setShowResetPassword(true)
      setLoadingSubmitOtp(false)
     }
     catch(err:any){
      setLoadingSubmitOtp(false)
  
      toast({
        title: err?.data.message,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
     }
      
  }

  const handleUpdatePassword=async()=>{
   
    try{
      setLoadinUpdatePassword(true)
  const payload={
    userEnteredOTP:otp,
    email:email,
    newPassword:newPassword
  }
       let response =await sendPostRequest(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/verify-otp-and-reset`,payload)
      toast({
        title: "Password  Update Successfully",
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
      setShowResetPassword(false)
    setShowOtp(false)
    setShowForget(true)
    setLoadinUpdatePassword(false)
     }
     catch(err:any){
      setLoadinUpdatePassword(false)
  
      toast({
        title: err?.data.message,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
     }

  }
  return (
    <>
      {ID === 1 && (
        <button
          className="px-1 w-[100px] md:w-[100px] justify-end text-white  p-[6px] font-bold bg-[#DCA029] text-xs md:text-[14px] rounded-[6px]"
          onClick={onOpen}
        >
          Login
        </button>
      )}

      {ID === 2 && (
        <p onClick={() => handleLogout()} className="text-xs  font-medium">
          Logout
        </p>
      )}

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
                  setShowForget(true);
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
                {/* Form Container */}

                {showForget ? (
                  <div className=" p-8 rounded w-[100%]">
                    {/* Username and Password Form */}
                    <form onSubmit={handleLogin}>
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
                          onChange={(e) => setEmailOrUsername(e.target.value)}
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
                      <div className="flex justify-between">
                        <p className="text-xs text-white text-right">
                          <span
                            onClick={() => setShowForget(false)}
                            className="text-blue-600 cursor-pointer underline font-semibold"
                          >
                            Forget Passoword
                          </span>{" "}
                        </p>
                        {/* <p className="text-xs text-white text-right">
                          Not account ?{" "}
                          <span
                            className="text-blue-600 cursor-pointer underline font-semibold"
                          >
                            Signup
                          </span>{" "}
                        </p> */}
                      </div>

                      {/* Login Button */}
                      <button
                        type="submit"
                        className="w-full  mt-5 text-white p-2 text-sm font-semibold bg-[#DCA029] rounded-lg"
                      >
                        {loading ? <Spinner color='red.500' /> : "Login"}
                      </button>
                    </form>

                    {/* Additional Instructions */}
                    <div className="flex justify-between mt-2 m-auto p-1 gap-3 w-[100%]">
                      <div className="w-[100%]">
                        {/* <button
                          onClick={googleAuth}
                          className=" border w-[100%] font-semibold text-white duration-500 ease-in-out hover:bg-gray-800  rounded-lg p-1 px-3 flex justify-center items-center gap-2"
                        >
                          <FcGoogle fontSize="22px" />
                          Google
                        </button> */}
                      </div>

                      {/* <div className="w-[100%]">
                        <button className=" border w-[100%] bg-slate-100 duration-500 ease-in-out hover:bg-gray-300 font-semibold rounded-lg p-1 px-3 flex justify-center items-center gap-2">
                          <RiFacebookCircleFill color="blue" fontSize="25px" />
                          Facebook
                        </button> */}
                      {/* </div> */}
                    </div>
                  </div>
                ) : (
                  <div className=" p-8 rounded w-[100%]">
                    {/* Username and Password Form */}
                   {!showotp?
                   <form onSubmit={handleForgotPassword}>
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
                          id="email"
                          name="email"
                          className=" p-[5px] w-full text-sm font-medium  outline-none rounded-sm "
                          placeholder="Enter your register email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />

                      </div>
                      <button
                        type="submit"
                        className="w-full  mt-1 text-white p-2 text-sm font-semibold bg-[#DCA029] rounded-lg"
                      >
                        {loadingSendEmail ?<Spinner color='red.500' /> : "Send Reset Email"}
                      </button>
                    </form>

                    :
                    <>
                    {!resetPassword?
                    <div>
                    
                      <div className="mb-4 flex items-center rounded-[4px]   pl-3   bg-white border">
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
                          id="otp"
                          name="otp"
                          className=" p-[5px] w-full text-sm font-medium  outline-none rounded-sm "
                          placeholder="Enter your otp"
                          required
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                        />

                      </div>
                      <button
                        onClick={handleSubmitOtp}
                        className="w-full  mt-1 text-white p-2 text-sm font-semibold bg-[#DCA029] rounded-lg"
                      >
                        {loadingSubmitOtp ?<Spinner color='red.500' /> : "Verify"}
                      </button>
                    </div>:
                    <div>
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
                          id="newpassword"
                          name="newpassword"
                          className=" p-[5px] w-full text-sm font-medium  outline-none rounded-sm "
                          placeholder="Enter your new password"
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />

                      </div>
                      <button
                        onClick={handleUpdatePassword}
                        className="w-full  mt-1 text-white p-2 text-sm font-semibold bg-[#DCA029] rounded-lg"
                      >
                        {loadingUpdatePassword ? <Spinner color='red.500' />  : "Update"}
                      </button>
                    </div>
                    
                  }
                    </>
                    
                    }

                    {/* Additional Instructions */}
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

export default LoginModal;
