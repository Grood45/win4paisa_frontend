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
  Input,
  useToast,
  CircularProgress,
} from "@chakra-ui/react";
import cancel from "../../assetuser/authsocial/CANCLE.png";
import userprofile from "../../assetuser/other/userprofile.png";
import transactionpng from "../../assetuser/other/transactionCoin.png";
import Image from "next/image";
import Transaction from "./subcomponent/Transaction";
import { ChangeEvent, useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";

import { BiSolidCopy } from "react-icons/bi";
import { PiInfo } from "react-icons/pi";
import changep from "../../assetuser/other/changep.png";
import changen from "../../assetuser/other/changen.png";
import changee from "../../assetuser/other/changee.png";
import homekyc from "../../assetuser/other/homekyc.png";
import verify from "../../assetuser/other/verify.png";
import MyProfile from "./subcomponent/MyProfile";
import { RootState, useAppSelector } from "@/app/redux-arch/store";
import themeChange from "@/theme";
import { useSelector } from "react-redux";
import { sendPatchRequest } from "@/api/api";
interface FormData {
  phone: string;
  email: string;
  account: string;
  ifscCode: string;
  bankName: string;
  bankHolder: string;
}

function GlobalSettingModel() {
  const [details, setDetails] = useState(0);
  const [sendotp, setOtp] = useState(false);
  const [sendotpEmail, setEmail] = useState(false);
  const [showProfile, setShowProfile] = useState(0);
  const [loading1, setLoading1] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    phone: "",
    email: "",
    account: "",
    ifscCode: "",
    bankName: "",
    bankHolder: "",
  });
  const userAuth = useSelector((state: RootState) => state);
  const {
    isOpen,
    onOpen,
    onClose,
  }: { isOpen: boolean; onOpen: () => void; onClose: () => void } =
    useDisclosure();
  const toast = useToast();
  const handleClose = () => {
    setDetails(0);
    onClose();
  };

  const handleDetails = (id: number) => {
    setDetails(id);
  };

  const handleVerfiy = () => {};

  const handleOtp = () => {
    setOtp(true);
  };

  const handleVerfiyEmail = () => {};
  const handleOtpEmail = () => {
    setEmail(true);
  };

  const ShowUser = (id: number) => {
    setShowProfile(id);
  };
  const handleCancel = () => {
    setShowProfile(0);

    onClose();
  };

  const { showSideBar1, theme } = useAppSelector(
    (store) => store.combineR.NavStateReducer
  );
  const {
    first_name = "",
    last_name = "",
    user_id = "",
    email = "",
    account_number = "",
    phone = "",
    bank_name = "",
    bank_holder = "",
    ifsc_code = "",
  } = userAuth?.combineR?.userAuth?.data?.user || {};

  useEffect(() => {
    setFormData({
      ...formData,
      account: account_number,
      ifscCode: ifsc_code,
      bankName: bank_name,
      bankHolder: bank_holder,
    });
  }, [userAuth]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveKyc = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents the default form submission behavior
    const { bankHolder, bankName, account, ifscCode } = formData;
    const payload = {
      account_number: account,
      bank_name: bankName,
      bank_holder: bankHolder,
      ifsc_code: ifscCode,
    };
    setLoading1(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/update-single-user/${user_id}`;
    try {
      let response = await sendPatchRequest(url, payload);
      const data = response.data;
      toast({
        description: response.message,
        status: "success",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      setLoading1(false);
    } catch (error: any) {
      toast({
        description: error.message,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      setLoading1(false);
    }
  };


  const [prev_pass,setPrevPass]=useState('')
const [new_pass,setNewPass]=useState('')
const [confirm_new_pass,setConfirmNewPass]=useState('')
const [changePasswordLoading,setChangePasswordLoading]=useState(false)


  const handleUpdatePassword = async (e:any) => {
    e.preventDefault()
    if (new_pass === confirm_new_pass) {
      const payload = {
        prev_pass,
        new_pass

      };

      setChangePasswordLoading(true);
      try {
        const response = await sendPatchRequest(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/user-change-password/${user_id}`,
          payload
        );
        toast({
          title: response.message,
          status: "success",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
        // setCredential(initialCredential);
        setChangePasswordLoading(false);
      } catch (error: any) {
        toast({
          title: error?.response?.data?.message,
          status: "error",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
      }
      setChangePasswordLoading(false);
    }
     else {
      toast({
        title: "Confirm password are not match with new password",
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
  };







  return (
    <>
      <div
        onClick={onOpen}
        className="p-2 flex items-center cursor-pointer gap-4 "
      >
       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
  <g clip-path="url(#clip0_7_1975)">
    <path d="M0 10.2204C0 7.56828 1.05357 5.02474 2.92893 3.14938C4.8043 1.27401 7.34784 0.220444 10 0.220444C12.6522 0.220444 15.1957 1.27401 17.0711 3.14938C18.9464 5.02474 20 7.56828 20 10.2204C20 12.8726 18.9464 15.4161 17.0711 17.2915C15.1957 19.1669 12.6522 20.2204 10 20.2204C7.34784 20.2204 4.8043 19.1669 2.92893 17.2915C1.05357 15.4161 0 12.8726 0 10.2204ZM9.375 1.56669C8.5375 1.82169 7.70625 2.59169 7.01625 3.88544C6.78892 4.31556 6.59339 4.76176 6.43125 5.22044H9.375V1.56669ZM5.1125 5.22044C5.32084 4.55647 5.58859 3.91261 5.9125 3.29669C6.12863 2.88801 6.37824 2.49793 6.65875 2.13044C5.11 2.77273 3.77751 3.84497 2.81875 5.22044H5.1125ZM4.385 9.59544C4.4225 8.49919 4.5575 7.44794 4.775 6.47044H2.0925C1.6264 7.45176 1.34827 8.51171 1.2725 9.59544H4.385ZM6.05875 6.47044C5.81289 7.4952 5.67134 8.54219 5.63625 9.59544H9.375V6.47044H6.05875ZM10.625 6.47044V9.59544H14.3625C14.3279 8.54223 14.1867 7.49523 13.9412 6.47044H10.625ZM5.6375 10.8454C5.67218 11.8987 5.81331 12.9456 6.05875 13.9704H9.375V10.8454H5.6375ZM10.625 10.8454V13.9704H13.9412C14.175 13.0142 14.3238 11.9604 14.3638 10.8454H10.625ZM6.43125 15.2204C6.60375 15.7029 6.8 16.1504 7.01625 16.5554C7.70625 17.8492 8.53875 18.6179 9.375 18.8742V15.2204H6.43125ZM6.65875 18.3104C6.37822 17.943 6.12861 17.5529 5.9125 17.1442C5.5886 16.5283 5.32085 15.8844 5.1125 15.2204H2.81875C3.77746 16.596 5.10997 17.6682 6.65875 18.3104ZM4.775 13.9704C4.54896 12.943 4.4184 11.8969 4.385 10.8454H1.2725C1.35 11.9579 1.63625 13.0117 2.0925 13.9704H4.775ZM13.3413 18.3104C14.89 17.6682 16.2225 16.596 17.1812 15.2204H14.8875C14.6791 15.8844 14.4114 16.5283 14.0875 17.1442C13.8714 17.5529 13.6218 17.943 13.3413 18.3104ZM10.625 15.2204V18.8742C11.4625 18.6192 12.2937 17.8492 12.9838 16.5554C13.2 16.1504 13.3962 15.7029 13.5687 15.2204H10.625ZM15.225 13.9704H17.9075C18.3638 13.0117 18.65 11.9579 18.7275 10.8454H15.615C15.5816 11.8969 15.4511 12.943 15.225 13.9704ZM18.7275 9.59544C18.6517 8.51171 18.3736 7.45177 17.9075 6.47044H15.225C15.4425 7.44794 15.5775 8.49919 15.615 9.59544H18.7275ZM14.0875 3.29669C14.3963 3.87669 14.665 4.52169 14.8875 5.22044H17.1812C16.2225 3.84492 14.89 2.77267 13.3413 2.13044C13.6138 2.48544 13.8638 2.87794 14.0875 3.29669ZM13.5687 5.22044C13.4066 4.76175 13.2111 4.31556 12.9838 3.88544C12.2937 2.59169 11.4625 1.82294 10.625 1.56669V5.22044H13.5687Z" fill="#EAAB0F"/>
  </g>
  <defs>
    <clipPath id="clip0_7_1975">
      <rect width="20" height="20" fill="white" transform="translate(0 0.220444)"/>
    </clipPath>
  </defs>
</svg>
        <p className="text-xs  font-medium">Global Setting</p>
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
          <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... md:rounded-[16px] p-[1px]">

          <ModalBody  style={{
            backgroundColor: theme
              ? themeChange.light.bg1
              : themeChange.dark.bg1,
            color: theme
              ? themeChange.light.textColor1
              : themeChange.dark.textColor1,
          }} className="md:rounded-[16px]  h-[100vh] lg:h-[100%]   lg:min-h-[87vh]">
            {showProfile == 0 && (
              <div>
                <div className="flex justify-end">
                  <svg
                    onClick={handleClose}
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
                    onClick={() => handleDetails(0)}
                    className="absolute  cursor-pointer left-2 "
                  >
                    <Image
                      className="h-[40px] w-[40px]"
                      src={userprofile}
                      onClick={() => ShowUser(1)}
                      alt="user"
                    />
                  </div>

                  <div className="flex flex-col gap-5 justify-center items-center">
                    <p className="text-lg  font-medium">Global Setting</p>
                  </div>

                  <div className="mt-10">
                    <p className="text-md ">Quick Actions</p>

                    <div className="mt-2 justify-between overflow-scroll w-[100wh] flex p-2  gap-4 ">
                    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... rounded-[10px] p-[1px]" >
                    <div
                        onClick={() => handleDetails(1)}
                        style={{
                          boxShadow:
                            "1px 5px 24px 8px rgba(110, 117, 136, 0.07",
                        }}
                        className={`flex  cursor-pointer h-[100%] flex-col gap-1 items-center ${
                          theme
                            ? `bg-[${themeChange.light.bg2}]`
                            : `bg-[${themeChange.dark.bg3}]`
                        } shadow-2xl rounded-[10px]  p-3`}
                      >
                        <div
                          className={`p-[10px] w-[100px]  flex items-center justify-center bg-gray-500 shadow-2xl rounded-[6px]`}
                        >
                          <Image
                            src={homekyc}
                            className="h-[50px] w-[50px] "
                            alt=""
                          />
                        </div>
                        <p className="text-sm  mt-1">KYC</p>
                      </div>
                    </div>
                     
                    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... rounded-[10px] p-[1px]" >
                      <div
                        onClick={() => handleDetails(2)}
                        style={{
                          boxShadow:
                            "1px 5px 24px 8px rgba(110, 117, 136, 0.07",
                        }}
                        className={`flex  cursor-pointer h-[100%] flex-col items-center gap-2 ${
                          theme
                            ? `bg-[${themeChange.light.bg2}]`
                            : `bg-[${themeChange.dark.bg3}]`
                        } shadow-2xl rounded-[10px]  p-3`}
                      >
                        <div className="p-[10px] w-[100px]  flex items-center justify-center bg-[#464B55] rounded-[6px]">
                          <Image
                            src={changep}
                            className="h-[50px] w-[50px] "
                            alt=""
                          />
                        </div>
                        <p className="text-xs text-center  ">Change Password</p>
                      </div>
                      </div>

                      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... rounded-[10px] p-[1px]" >
                      <div
                        onClick={() => handleDetails(3)}
                        style={{
                          boxShadow:
                            "1px 5px 24px 8px rgba(110, 117, 136, 0.07",
                        }}
                        className={`flex cursor-pointer h-[100%] flex-col gap-1 items-center ${
                          theme
                            ? `bg-[${themeChange.light.bg2}]`
                            : `bg-[${themeChange.dark.bg3}]`
                        } shadow-2xl rounded-[10px]  p-3`}
                      >
                        <div className="p-[10px] w-[100px]  flex items-center justify-center   bg-[#384361] rounded-[6px]">
                          <Image
                            src={changep}
                            className="h-[50px] w-[50px] "
                            alt=""
                          />
                        </div>
                        <p className="text-xs text-center ">Change PhoneNo</p>
                      </div>
                      </div>

                      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... rounded-[10px] p-[1px]" >
                      <div
                        onClick={() => handleDetails(4)}
                        style={{
                          boxShadow:
                            "1px 5px 24px 8px rgba(110, 117, 136, 0.07",
                        }}
                        className={`flex cursor-pointer h-[100%] flex-col gap-1 items-center ${
                          theme
                            ? `bg-[${themeChange.light.bg2}]`
                            : `bg-[${themeChange.dark.bg3}]`
                        } shadow-2xl rounded-[10px]  p-3`}
                      >
                        <div className="p-[10px] w-[100px]  flex items-center justify-center  bg-[#464B55] rounded-[6px]">
                          <Image
                            src={changee}
                            className="h-[50px] w-[50px] "
                            alt=""
                          />
                        </div>
                        <p className="text-xs text-center ">Change Email</p>
                      </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    {details === 0 && (
                      <div className="flex sm:min-h-[370px]  flex-col gap-3">
                        <p className="text-sm font-medium">Your Info</p>
                        <div className="flex flex-col gap-[6px]">
                        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... rounded-[10px] p-[1px]" >
                          <div
                            style={{
                              boxShadow:
                                "1px 5px 40px 8px rgba(110, 117, 136, 0.07)",
                            }}
                            className={`flex rounded-[10px] justify-between items-center p-3 ${
                              theme
                                ? `bg-[${themeChange.light.bg2}]`
                                : `bg-[${themeChange.dark.bg1}]`
                            } `}
                          >
                            <div className="flex items-center gap-2">
                              <Image
                                src={changen}
                                className="w-[40px] h-[40px]"
                                alt=""
                              />
                              <div className="flex flex-col gap-1">
                                <p className="text-sm font-medium ">
                                  Phone number
                                </p>
                                <p className="text-sm font-medium text-[#A4A9AE]">
                                  {phone}
                                </p>
                              </div>
                            </div>

                           
                            {!phone ? (
                              <p className="text-red-600 text-semibold">
                                Pending...
                              </p>
                            ): <Image src={verify} alt="" />}
                          </div>
                          </div>
                          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... rounded-[10px] p-[1px]" >
                          <div
                            style={{
                              boxShadow:
                                "1px 5px 40px 8px rgba(110, 117, 136, 0.07)",
                            }}
                            className={`flex rounded-[10px] justify-between items-center p-3 ${
                              theme
                                ? `bg-[${themeChange.light.bg2}]`
                                : `bg-[${themeChange.dark.bg1}]`
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Image
                                src={changee}
                                className="w-[40px] h-[40px]"
                                alt=""
                              />
                              <div className="flex flex-col gap-1">
                                <p className="text-sm font-medium ">
                                  Your Email
                                </p>
                                <p className="text-sm font-medium text-[#A4A9AE]">
                                  {email}
                                </p>
                              </div>
                            </div>
                            {!email ? (
                              <p className="text-red-600 text-semibold">
                                Pending...
                              </p>
                            ): <Image src={verify} alt="" />}

                            {!account_number && bank_name && (
                              <p className="text-red-600 text-semibold">
                                Pending...
                              </p>
                            )}
                          </div>
                          </div>
                          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... rounded-[10px] mb-4 lg:mb-14 p-[1px]" >
                          <div
                            style={{
                              boxShadow:
                                "1px 5px 40px 8px rgba(110, 117, 136, 0.07)",
                            }}
                            className={`flex rounded-[10px]  justify-between items-center p-3 ${
                              theme
                                ? `bg-[${themeChange.light.bg2}]`
                                : `bg-[${themeChange.dark.bg1}]`
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Image
                                src={homekyc}
                                className="w-[40px] h-[40px]"
                                alt=""
                              />
                              <div className="flex flex-col gap-1">
                                <p className="text-sm font-medium ">
                                  {bank_name}
                                </p>
                                <p className="text-sm font-medium text-[#A4A9AE]">
                                  {account_number}
                                </p>
                              </div>
                            </div>
                            <div>
                            {!account_number ? (
                              <p className="text-red-600 text-semibold">
                                Pending...
                              </p>
                            ): <Image src={verify} alt="" />}
                            </div>
                          </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {details === 1 && (
                      <form
                        onSubmit={handleSaveKyc}
                        className="flex sm:min-h-[370px] flex-col gap-3"
                      >
                        <p className="text-sm font-medium">Complete Your KYC</p>
                        <div className="flex flex-col  mb-4 lg:mb-10 gap-5">
                          <Input
                            className="rounded-[8px] text-sm"
                            placeholder="Enter holder name"
                            name="bankHolder"
                            required
                            value={formData.bankHolder}
                            onChange={handleInputChange}
                          />
                          <Input
                            className="rounded-[8px] text-sm"
                            placeholder="Enter bank name"
                            name="bankName"
                            required
                            value={formData.bankName}
                            onChange={handleInputChange}
                          />
                          <Input
                            className="rounded-[8px] text-sm"
                            placeholder="Enter your bank account number"
                            name="account"
                            value={formData.account}
                            required
                            onChange={handleInputChange}
                          />
                          <Input
                            className="rounded-[8px] text-sm"
                            placeholder="Enter IFSC code"
                            name="ifscCode"
                            required
                            value={formData.ifscCode}
                            onChange={handleInputChange}
                          />

                          <button
                            type="submit"
                            className="p-2 px-5 mb-1 w-[70%] mx-auto bg-[#EAAB0F] rounded-[6px] text-sm"
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    )}

                    {details === 2 && (
                      <form onSubmit={handleUpdatePassword} >
                      <div className="flex flex-col sm:min-h-[370px] gap-3">
                        <p className="text-sm font-medium">
                          Generate New Password
                        </p>
                        <div className="flex flex-col  mb-4 lg:mb-10 gap-5">
                          <Input
                            className="rounded-[8px] outline-none text-sm"
                            onChange={(e)=>setPrevPass(e.target.value)}
                            value={prev_pass}
                            placeholder="Enter old password"
                          />
                          <Input
                            className="rounded-[8px] text-sm"
                            placeholder="Enter new password"
                            value={new_pass}
                            onChange={(e)=>setNewPass(e.target.value)}

                          />
                          <Input
                            className="rounded-[8px] text-sm"
                            placeholder="Confirm password"
                            onChange={(e)=>setConfirmNewPass(e.target.value)}
                            value={confirm_new_pass}

                          />
                          <button type="submit" className="p-3 px-5 w-[70%] mx-auto bg-[#EAAB0F] rounded-[6px] text-sm">
                          {changePasswordLoading ? (
                    <CircularProgress
                      isIndeterminate
                      color="orange.600"
                      size={"16px"}
                    />
                  ) : (
                    "Submit"
                  )}
                          </button>
                        </div>
                      </div>
                      </form>
                    )}

                    {details === 3 && (
                      <div className="flex sm:min-h-[370px] flex-col gap-3">
                        <p className="text-sm font-medium">
                          Change Phone Number
                        </p>
                        <div className="flex flex-col  mb-4 lg:mb-10 gap-5">
                          <Input
                            className="rounded-[8px] text-sm"
                            placeholder="Enter new phone number"
                          />
                          {sendotp ? (
                            <div className="flex justify-center item-center gap-2">
                              <Input
                                className="rounded-[8px] w-[40%]  text-sm"
                                placeholder="enter otp here"
                              />
                              <button
                                className="p-2 px-5  bg-green-500 rounded-[6px] text-sm"
                                onClick={handleVerfiy}
                              >
                                Verify
                              </button>
                            </div>
                          ) : (
                            ""
                          )}

                          <button
                            onClick={handleOtp}
                            className="p-2 px-5 w-[70%] mx-auto bg-[#EAAB0F] rounded-[6px] text-sm"
                          >
                            Send Otp
                          </button>
                        </div>
                      </div>
                    )}

                    {details === 4 && (
                      <div className="flex sm:min-h-[370px] flex-col gap-3">
                        <p className="text-sm font-medium">
                          Change Email Number
                        </p>
                        <div className="flex flex-col  mb-4 lg:mb-10 gap-5">
                          <Input
                            className="rounded-[8px] text-sm"
                            placeholder="Enter new email"
                          />
                          {sendotpEmail ? (
                            <div className="flex justify-center item-center gap-2">
                              <Input
                                className="rounded-[8px] w-[40%]  text-sm"
                                placeholder="enter otp here"
                              />
                              <button
                                className="p-2 px-5  bg-green-500 rounded-[6px] text-sm"
                                onClick={handleVerfiyEmail}
                              >
                                Verify
                           
                              </button>
                            </div>
                          ) : (
                            ""
                          )}

                          <button
                            onClick={handleOtpEmail}
                            className="p-2 px-5 w-[70%] mx-auto bg-[#EAAB0F] rounded-[6px] text-sm"
                          >
                            Send Otp
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
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
                <MyProfile setShowProfile={setShowProfile} onClose={onClose} />
              </div>
            )}
          </ModalBody>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

export default GlobalSettingModel;
