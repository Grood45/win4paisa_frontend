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
import Deposit from "./subcomponent/Deposit";
import Withdrawal from "./subcomponent/Withdrawal";
import bluecard from "../../assetuser/other/bluecard.png";
import Carousel from "./Carousel";
import WCarousel from "./subcomponent/WalletCarousel";
import MyProfileModel from "./MyProfileModel";
import MyProfile from "./subcomponent/MyProfile";
import { fetchGetRequest } from "@/api/api";
import { AllTransaction } from "../../../utils/typescript.module";
import { RootState, useAppSelector } from "@/app/redux-arch/store";
import themeChange from "@/theme";
import { AiOutlineTransaction } from "react-icons/ai";
import { TbCoin } from "react-icons/tb";
import { useSelector } from "react-redux";
function WalletModel() {
  const [showTransaction, setShowtransaction] = useState(1);
  const [showPayment, setShowPayment] = useState<number>(0);
  const [showProfile, setShowProfile] = useState(0);
  const {
    isOpen,
    onOpen,
    onClose,
  }: { isOpen: boolean; onOpen: () => void; onClose: () => void } =
    useDisclosure();

  const [loading1, setLoading1] = useState(false);
  const [transactiondata, setTransactionData] = useState<AllTransaction[]>([]);
  const [transactionDetails, setTransactionDetails] =
    useState<AllTransaction>();
  const toast = useToast();
  const userAuth = useSelector((state: RootState) => state);
  const {
    username = "",
    max_limit = 0,
    min_limit = 0,
    user_id = "",
  } = userAuth?.combineR?.userAuth?.data?.user || {};
  const getAllTransaction = async () => {
    setLoading1(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction/get-all-transaction/${user_id}`;
    try {
      let response = await fetchGetRequest(url);
      const data = response.data;
      const receivedData: AllTransaction[] = response.data;
      if (receivedData) {
        setTransactionData(receivedData);
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
    getAllTransaction();
  }, []);

  const TransactionDetails = (id: number, data?: AllTransaction) => {
    setShowtransaction(id);
    if (data) {
      setTransactionDetails(data);
    }
  };
  const handleCancel = () => {
    setShowtransaction(1);
    setShowProfile(0);

    onClose();
    setShowPayment(0);
  };

  const HandlePayment = (id: number) => {
    setShowPayment(id);
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
        className={`p-2 flex items-center cursor-pointer gap-4 `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
        >
          <g clip-path="url(#clip0_7_1957)">
            <path
              d="M15.17 0.627944C15.4463 0.558823 15.7348 0.553566 16.0134 0.612573C16.2921 0.67158 16.5536 0.793298 16.7782 0.968488C17.0028 1.14368 17.1845 1.36774 17.3096 1.62365C17.4347 1.87956 17.4998 2.16061 17.5 2.44544V3.97044H18.125C18.6223 3.97044 19.0992 4.16799 19.4508 4.51962C19.8025 4.87125 20 5.34816 20 5.84544V17.0954C20 17.5927 19.8025 18.0696 19.4508 18.4213C19.0992 18.7729 18.6223 18.9704 18.125 18.9704H1.875C1.37772 18.9704 0.900806 18.7729 0.549175 18.4213C0.197544 18.0696 1.22615e-07 17.5927 1.22615e-07 17.0954V5.84544C-0.000174326 5.36276 0.185803 4.89861 0.519222 4.54959C0.852641 4.20057 1.30781 3.99358 1.79 3.97169L15.17 0.627944ZM6.9525 3.97044H16.25V2.44544C16.2498 2.35061 16.228 2.25708 16.1863 2.17191C16.1446 2.08675 16.084 2.0122 16.0092 1.95391C15.9344 1.89561 15.8473 1.8551 15.7546 1.83544C15.6618 1.81578 15.5658 1.81749 15.4737 1.84044L6.9525 3.97044ZM1.875 5.22044C1.70924 5.22044 1.55027 5.28629 1.43306 5.4035C1.31585 5.52071 1.25 5.67968 1.25 5.84544V17.0954C1.25 17.2612 1.31585 17.4202 1.43306 17.5374C1.55027 17.6546 1.70924 17.7204 1.875 17.7204H18.125C18.2908 17.7204 18.4497 17.6546 18.5669 17.5374C18.6842 17.4202 18.75 17.2612 18.75 17.0954V5.84544C18.75 5.67968 18.6842 5.52071 18.5669 5.4035C18.4497 5.28629 18.2908 5.22044 18.125 5.22044H1.875Z"
              fill="#FBC133"
            />
          </g>
          <defs>
            <clipPath id="clip0_7_1957">
              <rect
                width="20"
                height="20"
                fill="white"
                transform="translate(0 0.220444)"
              />
            </clipPath>
          </defs>
        </svg>
        <p className={`text-xs    font-medium`}>Wallet</p>
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
              className="md:rounded-[16px]  h-[100vh] lg:h-[100%]   lg:min-h-[87vh]"
            >
              {showProfile === 0 && (
                <div>
                  {showPayment === 0 && (
                    <div>
                      {showTransaction === 1 && (
                        <div>
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
                          <div className="w-[90%] relative m-auto">
                            <div className="absolute cursor-pointer left-2 ">
                              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... p-[1px] rounded-[50%] flex items-center justify-center">
                                <Image
                                  className="h-[40px] w-[40px]"
                                  src={userprofile}
                                  alt="user"
                                  onClick={() => ShowUser(1)}
                                />
                              </div>
                            </div>

                            <div className="flex flex-col gap-5 justify-center items-center">
                              <p className="text-lg font-medium">Wallet</p>

                              <WCarousel />
                            </div>

                            <div className="mt-10">
                              <p className="text-md ">Quick Actions</p>

                              <div className="mt-2 justify-between flex w-[100%] gap-4 ">
                                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... w-[100%] rounded-[8px] p-[1px]">
                                  <div
                                    onClick={() => HandlePayment(1)}
                                    style={{
                                      boxShadow:
                                        "1px 5px 24px 8px rgba(110, 117, 136, 0.07",
                                    }}
                                    className={`flex w-[100%] shadow-2xl  cursor-pointer flex-col justify-center items-center ${
                                      theme
                                        ? `text-[${themeChange.light.textColor1}]`
                                        : `text-[${themeChange.dark.textColor1}]`
                                    }  ${
                                      theme
                                        ? `bg-[${themeChange.light.bg2}]`
                                        : `bg-[${themeChange.dark.bg1}]`
                                    } rounded-[10px]  p-3`}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="58"
                                      height="57"
                                      viewBox="0 0 58 57"
                                      fill="none"
                                    >
                                      <g
                                        opacity="0.15"
                                        filter="url(#filter0_d_12_1027)"
                                      >
                                        <rect
                                          x="10.5918"
                                          y="6.52783"
                                          width="34.471"
                                          height="34.471"
                                          rx="5"
                                          fill="#13C999"
                                        />
                                      </g>
                                      <path
                                        d="M22.4717 20.3433V28.7186C22.4717 30.706 23.5767 31.1724 24.929 29.7596C25.0573 29.6081 25.2231 29.4876 25.4122 29.4085C25.6014 29.3294 25.8083 29.294 26.0154 29.3052C26.2225 29.3165 26.4235 29.3742 26.6015 29.4733C26.7794 29.5724 26.9289 29.7101 27.0373 29.8745L27.8079 30.8817C27.9211 31.0627 28.0834 31.2129 28.2786 31.3173C28.4738 31.4217 28.6951 31.4766 28.9202 31.4766C29.1454 31.4766 29.3667 31.4217 29.5619 31.3173C29.757 31.2129 29.9193 31.0627 30.0326 30.8817L30.8032 29.8813C30.9133 29.7168 31.0642 29.5792 31.2433 29.4802C31.4225 29.3812 31.6246 29.3237 31.8326 29.3124C32.0406 29.3011 32.2486 29.3365 32.4388 29.4155C32.6291 29.4945 32.7962 29.6148 32.9261 29.7664C34.2783 31.1792 35.3834 30.7127 35.3834 28.7254V20.3433C35.3834 17.3487 34.6564 16.5983 31.7919 16.5983H20.6178"
                                        stroke="#13C999"
                                        stroke-width="1.2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <path
                                        d="M20.9306 16.5713C19.7019 16.5713 19.3966 17.3216 19.3966 20.3162V22.3441C19.347 22.7884 19.4855 23.2331 19.7828 23.584C20.08 23.9348 20.5126 24.1642 20.9888 24.2233H22.4428V20.3432C22.4719 17.3216 22.1665 16.5713 20.9306 16.5713Z"
                                        stroke="#13C999"
                                        stroke-width="1.2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <path
                                        d="M27.1612 25.075C27.2256 25.3176 27.3747 25.5335 27.5852 25.6889C27.7957 25.8443 28.0557 25.9303 28.3245 25.9335H29.6912C29.9773 25.9264 30.2487 25.8144 30.4462 25.6219C30.6437 25.4294 30.7513 25.172 30.7454 24.906C30.7769 24.6878 30.7199 24.4666 30.5855 24.2854C30.4511 24.1041 30.2489 23.976 30.0184 23.9258L27.8374 23.2499C27.6077 23.1984 27.4065 23.0699 27.2723 22.889C27.1382 22.7082 27.0805 22.4876 27.1104 22.2697C27.1045 22.0019 27.2128 21.7428 27.4117 21.5491C27.6106 21.3553 27.8838 21.2425 28.1718 21.2355H29.5386C29.807 21.2398 30.0664 21.3262 30.2766 21.4814C30.4869 21.6366 30.6363 21.8519 30.7018 22.0939"
                                        stroke="#13C999"
                                        stroke-width="1.2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <path
                                        d="M28.9287 20.5392V26.623"
                                        stroke="#13C999"
                                        stroke-width="1.2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <defs>
                                        <filter
                                          id="filter0_d_12_1027"
                                          x="0.591797"
                                          y="0.527832"
                                          width="56.471"
                                          height="56.471"
                                          filterUnits="userSpaceOnUse"
                                          color-interpolation-filters="sRGB"
                                        >
                                          <feFlood
                                            flood-opacity="0"
                                            result="BackgroundImageFix"
                                          />
                                          <feColorMatrix
                                            in="SourceAlpha"
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                            result="hardAlpha"
                                          />
                                          <feMorphology
                                            radius="2"
                                            operator="dilate"
                                            in="SourceAlpha"
                                            result="effect1_dropShadow_12_1027"
                                          />
                                          <feOffset dx="1" dy="5" />
                                          <feGaussianBlur stdDeviation="4.5" />
                                          <feComposite
                                            in2="hardAlpha"
                                            operator="out"
                                          />
                                          <feColorMatrix
                                            type="matrix"
                                            values="0 0 0 0 0.431373 0 0 0 0 0.458824 0 0 0 0 0.533333 0 0 0 0.11 0"
                                          />
                                          <feBlend
                                            mode="normal"
                                            in2="BackgroundImageFix"
                                            result="effect1_dropShadow_12_1027"
                                          />
                                          <feBlend
                                            mode="normal"
                                            in="SourceGraphic"
                                            in2="effect1_dropShadow_12_1027"
                                            result="shape"
                                          />
                                        </filter>
                                      </defs>
                                    </svg>
                                    <p className="text-xs  -mt-2">Deposit</p>
                                  </div>
                                </div>
                                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... w-[100%] rounded-[8px] p-[1px]">
                                  <div
                                    onClick={() => HandlePayment(2)}
                                    style={{
                                      boxShadow:
                                        "1px 5px 24px 8px rgba(110, 117, 136, 0.07",
                                    }}
                                    className={`flex shadow-2xl w-[100%] cursor-pointer flex-col justify-center items-center ${
                                      theme
                                        ? `text-[${themeChange.light.textColor1}]`
                                        : `text-[${themeChange.dark.textColor1}]`
                                    }  ${
                                      theme
                                        ? `bg-[${themeChange.light.bg2}]`
                                        : `bg-[${themeChange.dark.bg1}]`
                                    } rounded-[10px]  p-3`}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="58"
                                      height="57"
                                      viewBox="0 0 58 57"
                                      fill="none"
                                    >
                                      <g
                                        opacity="0.15"
                                        filter="url(#filter0_d_12_989)"
                                      >
                                        <rect
                                          x="10.5898"
                                          y="6.52783"
                                          width="34.471"
                                          height="34.471"
                                          rx="5"
                                          fill="#456EFE"
                                        />
                                      </g>
                                      <path
                                        d="M35.0857 20.2955V27.8606C35.0857 30.1301 33.8653 31.6431 31.0177 31.6431H24.5087C21.6611 31.6431 20.4407 30.1301 20.4407 27.8606V20.2955C20.4407 18.026 21.6611 16.513 24.5087 16.513H31.0177C33.8653 16.513 35.0857 18.026 35.0857 20.2955Z"
                                        stroke="#456EFE"
                                        stroke-width="1.2"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <path
                                        d="M30.6103 16.513V22.4591C30.6103 22.792 30.1872 22.9584 29.9269 22.739L28.0393 21.1201C27.8848 20.984 27.6406 20.984 27.486 21.1201L25.5985 22.739C25.3381 22.9584 24.915 22.792 24.915 22.4591V16.513H30.6103Z"
                                        stroke="#456EFE"
                                        stroke-width="1.2"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <path
                                        d="M28.7795 25.591H32.2373"
                                        stroke="#456EFE"
                                        stroke-width="1.2"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <path
                                        d="M25.3234 28.6171H32.2391"
                                        stroke="#456EFE"
                                        stroke-width="1.2"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <defs>
                                        <filter
                                          id="filter0_d_12_989"
                                          x="0.589844"
                                          y="0.527832"
                                          width="56.4711"
                                          height="56.471"
                                          filterUnits="userSpaceOnUse"
                                          color-interpolation-filters="sRGB"
                                        >
                                          <feFlood
                                            flood-opacity="0"
                                            result="BackgroundImageFix"
                                          />
                                          <feColorMatrix
                                            in="SourceAlpha"
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                            result="hardAlpha"
                                          />
                                          <feMorphology
                                            radius="2"
                                            operator="dilate"
                                            in="SourceAlpha"
                                            result="effect1_dropShadow_12_989"
                                          />
                                          <feOffset dx="1" dy="5" />
                                          <feGaussianBlur stdDeviation="4.5" />
                                          <feComposite
                                            in2="hardAlpha"
                                            operator="out"
                                          />
                                          <feColorMatrix
                                            type="matrix"
                                            values="0 0 0 0 0.431373 0 0 0 0 0.458824 0 0 0 0 0.533333 0 0 0 0.11 0"
                                          />
                                          <feBlend
                                            mode="normal"
                                            in2="BackgroundImageFix"
                                            result="effect1_dropShadow_12_989"
                                          />
                                          <feBlend
                                            mode="normal"
                                            in="SourceGraphic"
                                            in2="effect1_dropShadow_12_989"
                                            result="shape"
                                          />
                                        </filter>
                                      </defs>
                                    </svg>
                                    <p className="text-xs -mt-2 ">WithDraw</p>
                                  </div>
                                </div>
                                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... w-[100%] rounded-[8px] p-[1px]">
                                  <div
                                    onClick={() => HandlePayment(3)}
                                    style={{
                                      boxShadow:
                                        "1px 5px 24px 8px rgba(110, 117, 136, 0.07",
                                    }}
                                    className={`flex w-[100%] shadow-2xl  cursor-pointer flex-col justify-center items-center ${
                                      theme
                                        ? `text-[${themeChange.light.textColor1}]`
                                        : `text-[${themeChange.dark.textColor1}]`
                                    }  ${
                                      theme
                                        ? `bg-[${themeChange.light.bg2}]`
                                        : `bg-[${themeChange.dark.bg1}]`
                                    } rounded-[10px]  p-3`}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="58"
                                      height="57"
                                      viewBox="0 0 58 57"
                                      fill="none"
                                    >
                                      <g
                                        opacity="0.15"
                                        filter="url(#filter0_d_12_989)"
                                      >
                                        <rect
                                          x="10.5898"
                                          y="6.52783"
                                          width="34.471"
                                          height="34.471"
                                          rx="5"
                                          fill="#456EFE"
                                        />
                                      </g>
                                      <path
                                        d="M35.0857 20.2955V27.8606C35.0857 30.1301 33.8653 31.6431 31.0177 31.6431H24.5087C21.6611 31.6431 20.4407 30.1301 20.4407 27.8606V20.2955C20.4407 18.026 21.6611 16.513 24.5087 16.513H31.0177C33.8653 16.513 35.0857 18.026 35.0857 20.2955Z"
                                        stroke="#456EFE"
                                        stroke-width="1.2"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <path
                                        d="M30.6103 16.513V22.4591C30.6103 22.792 30.1872 22.9584 29.9269 22.739L28.0393 21.1201C27.8848 20.984 27.6406 20.984 27.486 21.1201L25.5985 22.739C25.3381 22.9584 24.915 22.792 24.915 22.4591V16.513H30.6103Z"
                                        stroke="#456EFE"
                                        stroke-width="1.2"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <path
                                        d="M28.7795 25.591H32.2373"
                                        stroke="#456EFE"
                                        stroke-width="1.2"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <path
                                        d="M25.3234 28.6171H32.2391"
                                        stroke="#456EFE"
                                        stroke-width="1.2"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <defs>
                                        <filter
                                          id="filter0_d_12_989"
                                          x="0.589844"
                                          y="0.527832"
                                          width="56.4711"
                                          height="56.471"
                                          filterUnits="userSpaceOnUse"
                                          color-interpolation-filters="sRGB"
                                        >
                                          <feFlood
                                            flood-opacity="0"
                                            result="BackgroundImageFix"
                                          />
                                          <feColorMatrix
                                            in="SourceAlpha"
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                            result="hardAlpha"
                                          />
                                          <feMorphology
                                            radius="2"
                                            operator="dilate"
                                            in="SourceAlpha"
                                            result="effect1_dropShadow_12_989"
                                          />
                                          <feOffset dx="1" dy="5" />
                                          <feGaussianBlur stdDeviation="4.5" />
                                          <feComposite
                                            in2="hardAlpha"
                                            operator="out"
                                          />
                                          <feColorMatrix
                                            type="matrix"
                                            values="0 0 0 0 0.431373 0 0 0 0 0.458824 0 0 0 0 0.533333 0 0 0 0.11 0"
                                          />
                                          <feBlend
                                            mode="normal"
                                            in2="BackgroundImageFix"
                                            result="effect1_dropShadow_12_989"
                                          />
                                          <feBlend
                                            mode="normal"
                                            in="SourceGraphic"
                                            in2="effect1_dropShadow_12_989"
                                            result="shape"
                                          />
                                        </filter>
                                      </defs>
                                    </svg>
                                    <p className="text-xs -mt-2 ">
                                      Transaction
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-6">
                              <div className="flex justify-between">
                                <p className="text-sm ">Recent Transaction</p>
                                <p
                                  onClick={() => TransactionDetails(3)}
                                  className="text-sm cursor-pointer "
                                >
                                  View All
                                </p>
                              </div>

                              <div className="flex   pb-[50px] mt-2  flex-col gap-2">
                                {/* {transactionData.slice(0, 3).map((item) => {
                        return (
                          <div
                            onClick={() => TransactionDetails(2)}
                            style={{
                              boxShadow:
                                "1px 5px 40px 8px rgba(110, 117, 136, 0.07)",
                            }}
                            key={item.id}
                            className="flex justify-between cursor-pointer items-center rounded-[10px] w-[100%] p-2"
                          >
                            <div className="flex gap-2 items-center">
                              <Image src={transactionpng} alt="" />
                              
                              <div className="flex flex-col gap-1">
                                <p className="text-sm ">
                                  {item.title}
                                </p>
                                <p className="text-xs ">
                                  {item.date}
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
                                {item.value}
                                <span className="text-[10px] font-light">
                                 INR
                                </span>
                              </p>
                              <p className="text-xs  text-[#EAAB0F]">
                                {item.status}
                              </p>
                            </div>
                          </div>
                        );
                      })} */}
                                {transactiondata.slice(0, 2).map((item) => {
                                  return (
                                    <div
                                      key={item._id}
                                      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... p-[1px] w-[100%] rounded-[10px] "
                                    >
                                      <div
                                        style={{
                                          boxShadow:
                                            "1px 5px 40px 8px rgba(110, 117, 136, 0.07)",
                                        }}
                                        onClick={() =>
                                          TransactionDetails(2, item)
                                        }
                                        className={`flex justify-between cursor-pointer  ${
                                          theme
                                            ? `bg-[${themeChange.light.bg2}]`
                                            : `bg-[${themeChange.dark.bg1}]`
                                        } items-center rounded-[10px] w-[100%] p-2`}
                                      >
                                        <div className="flex gap-2 items-center">
                                          <TbCoin
                                            color="#F3AF06"
                                            fontSize="40px"
                                          />

                                          <div className="flex flex-col gap-1">
                                            <p className="text-sm ">
                                              {item.method}
                                            </p>
                                            <p className="text-xs ">
                                              {item.initiated_at}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="flex text-center flex-col gap-1">
                                          <p
                                            className={`text-sm  ${
                                              item.status === "pending"
                                                ? "text-orange-600":item.status==="reject"?"text-red-600"
                                                : "text-[#0FBF00]"
                                            }  font-medium`}
                                          >
                                            {item.type === "withdraw"
                                              ? "-"
                                              : "+"}{" "}
                                            {item.deposit_amount ||
                                              item.withdraw_amount}{" "}
                                            <span className="text-[10px] font-light">
                                            INR
                                            </span>
                                          </p>
                                          <p
                                            className={`text-xs ${
                                              item.status === "pending"
                                              ? "text-orange-600":item.status==="reject"?"text-red-600"
                                              : "text-[#0FBF00]"
                                            } `}
                                          >
                                            {item.type} :{" "}
                                            <span>{item.status}</span>
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

                      {showTransaction === 2 && (
                        <div className=" ">
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
                              onClick={() => TransactionDetails(1)}
                              className="absolute cursor-pointer left-2 "
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
                            <p className="text-lg text-center font-semibold">
                              Transaction Details
                            </p>
                            <div>
                              <p
                                className={`mt-6  ${
                                  transactionDetails?.status === "pending"
                                    ? "text-orange-600":transactionDetails?.status==="reject"?"text-red-600"
                                    : "text-green-600"
                                } text-center font-semibold text-xs`}
                              >
                                {transactionDetails?.type}
                              </p>
                              <p
                                className={`text-sm mt-1 text-center ${
                                  transactionDetails?.status === "pending"
                                  ? "text-orange-600":transactionDetails?.status==="reject"?"text-red-600"
                                  : "text-green-600"
                                }  `}
                              >
                                {transactionDetails?.deposit_amount ||
                                  transactionDetails?.withdraw_amount}{" "}
                                <span className="">INR</span>
                              </p>
                            </div>
                            <div className="bg-[#1D2025] pl-5 flex items-center gap-3 w-[100%] p-2 rounded-[4px]">
                              <PiInfo color="white" />
                              <p className="text-[10px]  font-light ">
                                deposit amount admin information
                              </p>
                            </div>

                            <div className="flex flex-col gap-2">
                              <p className="text-sm font-medium">
                                Marchend bank detail
                              </p>
                              <div className="bg-[#1D2025] p-3 pb-10 flex flex-col gap-[14px] rounded-[4px]">
                                <div className="flex justify-between w-[100%]">
                                  <p className=" text-sm font-medium">Status</p>
                                  <p className=" text-sm flex items-center gap-4">
                                    <span>
                                      <GoDotFill
                                        color={
                                          transactionDetails?.status ===
                                          "pending"
                                            ? "orange":transactionDetails?.status==="reject"?"red"
                                            : "green"
                                        }
                                        fontSize="20px"
                                      />
                                    </span>
                                    {transactionDetails?.status}
                                  </p>
                                </div>
                                <div className="flex justify-between w-[100%]">
                                  <p className="text-white text-sm font-medium">
                                    TrxID
                                  </p>
                                  <p className="text-white text-sm flex items-center gap-4">
                                    {transactionDetails?.transaction_id}
                                    <span>
                                      <BiSolidCopy
                                        color="white"
                                        fontSize="20px"
                                      />
                                    </span>
                                  </p>
                                </div>
                                <div className="flex justify-between w-[100%]">
                                  <p className="text-white text-sm font-medium">
                                    Time
                                  </p>
                                  <p className="text-white text-sm flex items-center gap-4">
                                    {transactionDetails?.initiated_at}
                                  </p>
                                </div>
                                <div className="flex justify-between w-[100%]">
                                  <p className="text-white text-sm font-medium">
                                    UTR Number
                                  </p>
                                  <p className="text-white text-sm flex items-center gap-4">
                                    {transactionDetails?.transaction_id}
                                    <span>
                                      <BiSolidCopy
                                        color="white"
                                        fontSize="20px"
                                      />
                                    </span>
                                  </p>
                                </div>
                              </div>

                              <div className="bg-[#1D2025] p-3 mb-8  py-5 flex flex-col gap-[14px] rounded-[4px]">
                                <p className="text-sm text-center text-white">
                                  Marchend bank detail
                                </p>
                                <div className="flex justify-between w-[100%]">
                                  <p className="text-white text-sm font-medium">
                                    Gatway Name
                                  </p>
                                  <p className="text-white text-sm flex items-center gap-4">
                                    {transactionDetails?.method}
                                    <span>
                                      <BiSolidCopy
                                        color="white"
                                        fontSize="20px"
                                      />
                                    </span>
                                  </p>
                                </div>
                                <div className="flex justify-between w-[100%]">
                                  <p className="text-white text-sm font-medium">
                                    Paytem Number
                                  </p>
                                  <p className="text-white text-sm flex items-center gap-4">
                                    798256xxxx7
                                    <span>
                                      <BiSolidCopy
                                        color="white"
                                        fontSize="20px"
                                      />
                                    </span>
                                  </p>
                                </div>
                                <div className="flex justify-between w-[100%]">
                                  <p className="text-white text-sm font-medium">
                                    Paytem UPI
                                  </p>
                                  <p className="text-white text-sm flex items-center gap-4">
                                    798256xxxx7@upi
                                    <span>
                                      <BiSolidCopy
                                        color="white"
                                        fontSize="20px"
                                      />
                                    </span>
                                  </p>
                                </div>
                                <div className="flex justify-between w-[100%]">
                                  <p className="text-white text-sm font-medium">
                                    UPI Number
                                  </p>
                                  <p className="text-white text-sm flex items-center gap-4">
                                    798256xxxx7
                                    <span>
                                      <BiSolidCopy
                                        color="white"
                                        fontSize="20px"
                                      />
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {showTransaction === 3 && (
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
                          <Transaction
                            setShowtransaction={setShowtransaction}
                            setShowProfile={setShowProfile}
                            setShowPayment={setShowPayment}
                            onClose={onClose}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {showPayment === 1 && (
                    <div>
                      <Deposit
                        setShowPayment={setShowPayment}
                        onClose={onClose}
                      />
                    </div>
                  )}
                  {showPayment === 2 && (
                    <div>
                      <Withdrawal
                        setShowPayment={setShowPayment}
                        onClose={onClose}
                      />
                    </div>
                  )}
                  {showPayment === 3 && (
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
                      <Transaction
                        setShowPayment={setShowPayment}
                        onClose={onClose}
                      />
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

export default WalletModel;
