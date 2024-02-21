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
  Radio,
} from "@chakra-ui/react";

import { HiPlus } from "react-icons/hi";

import Withdrawal from "./subcomponent/Withdrawal";
import Deposit from "./subcomponent/Deposit";
import Transaction from "./subcomponent/Transaction";
import cancel from "../../assetuser/authsocial/CANCLE.png";
import themeChange from "@/theme";
import Image from "next/image";
import { RootState, useAppSelector } from "@/app/redux-arch/store";
import { useSelector } from "react-redux";
function PamentModel({ heading, code }: { heading: string; code: string }) {
  const userAuth = useSelector((state: RootState) => state);

  const {
    username = "",
    max_limit = 0,
     user_id="",
    min_limit = 0,
  } = userAuth?.combineR?.userAuth?.data?.user || {};

  const {
    isOpen,
    onOpen,
    onClose,
  }: { isOpen: boolean; onOpen: () => void; onClose: () => void } =
    useDisclosure();

  const handleCancel = () => {
    onClose();
  };

  const { showSideBar1, theme } = useAppSelector(
    (store) => store.combineR.NavStateReducer
  );

  return (
    <>
      <div
        onClick={onOpen}
        className="p-2 flex items-center cursor-pointer gap-4 "
      >
        {/* for withdrawal model */}
        {code === "0" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
          >
            <path
              d="M17.9088 3.31768L14.2938 11.7327H10.6788C10.0788 11.7327 9.49383 11.7777 8.92383 11.8977L10.4238 8.29768L10.4838 8.16268L10.5738 7.92268C10.6188 7.81768 10.6488 7.72768 10.6938 7.65268C12.4338 3.61768 14.3838 2.35768 17.9088 3.31768Z"
              fill="white"
            />
            <path
              d="M28.0966 12.1343L28.0666 12.1193C27.1666 11.8643 26.2516 11.7293 25.3216 11.7293H15.9316L19.3066 3.8843L19.3516 3.7793C19.5616 3.8543 19.7866 3.9593 20.0116 4.0343L23.3266 5.4293C25.1716 6.1943 26.4616 6.9893 27.2566 7.9493C27.3916 8.1293 27.5116 8.2943 27.6316 8.4893C27.7666 8.6993 27.8716 8.9093 27.9316 9.1343C27.9916 9.2693 28.0366 9.3893 28.0666 9.5243C28.2916 10.2893 28.3066 11.1593 28.0966 12.1343Z"
              fill="white"
            />
            <path
              d="M27.4325 14.2805C26.7575 14.0855 26.0525 13.9805 25.3175 13.9805H10.6774C9.65742 13.9805 8.69742 14.1755 7.79742 14.5655C5.18742 15.6905 3.35742 18.2855 3.35742 21.3005V24.2255C3.35742 24.5855 3.38742 24.9305 3.43242 25.2905C3.76242 30.0605 6.31242 32.6105 11.0824 32.9255C11.4274 32.9705 11.7724 33.0005 12.1474 33.0005H23.8475C29.3975 33.0005 32.3225 30.3605 32.6075 25.1105C32.6225 24.8255 32.6375 24.5255 32.6375 24.2255V21.3005C32.6375 17.9855 30.4325 15.1955 27.4325 14.2805ZM21.7475 24.2855H19.1225V27.0005C19.1225 27.6155 18.6125 28.1255 17.9975 28.1255C17.3825 28.1255 16.8725 27.6155 16.8725 27.0005V24.2855H14.2474C13.6324 24.2855 13.1224 23.7905 13.1224 23.1605C13.1224 22.5455 13.6324 22.0355 14.2474 22.0355H16.8725V19.5005C16.8725 18.8855 17.3825 18.3755 17.9975 18.3755C18.6125 18.3755 19.1225 18.8855 19.1225 19.5005V22.0355H21.7475C22.3625 22.0355 22.8725 22.5455 22.8725 23.1605C22.8725 23.7905 22.3625 24.2855 21.7475 24.2855Z"
              fill="white"
            />
          </svg>
        )}

        {code === "1" && (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
        <g clip-path="url(#clip0_7_1961)">
          <path d="M6.875 2.72044C5.71468 2.72044 4.60188 3.18138 3.78141 4.00185C2.96094 4.82232 2.5 5.93512 2.5 7.09544V13.3454C2.5 14.5058 2.96094 15.6186 3.78141 16.439C4.60188 17.2595 5.71468 17.7204 6.875 17.7204H13.125C14.2853 17.7204 15.3981 17.2595 16.2186 16.439C17.0391 15.6186 17.5 14.5058 17.5 13.3454V10.2204C17.5 10.0547 17.5658 9.89571 17.6831 9.7785C17.8003 9.66129 17.9592 9.59544 18.125 9.59544C18.2908 9.59544 18.4497 9.66129 18.5669 9.7785C18.6842 9.89571 18.75 10.0547 18.75 10.2204V13.3454C18.75 14.8373 18.1574 16.268 17.1025 17.3229C16.0476 18.3778 14.6168 18.9704 13.125 18.9704H6.875C5.38316 18.9704 3.95242 18.3778 2.89752 17.3229C1.84263 16.268 1.25 14.8373 1.25 13.3454V7.09544C1.25 5.6036 1.84263 4.17286 2.89752 3.11797C3.95242 2.06308 5.38316 1.47044 6.875 1.47044H10C10.1658 1.47044 10.3247 1.53629 10.4419 1.6535C10.5592 1.77071 10.625 1.92968 10.625 2.09544C10.625 2.2612 10.5592 2.42018 10.4419 2.53739C10.3247 2.6546 10.1658 2.72044 10 2.72044H6.875Z" fill="#EAAB0F"/>
          <path d="M20 3.97044C20 4.96501 19.6049 5.91883 18.9017 6.62209C18.1984 7.32536 17.2446 7.72044 16.25 7.72044C15.2554 7.72044 14.3016 7.32536 13.5983 6.62209C12.8951 5.91883 12.5 4.96501 12.5 3.97044C12.5 2.97588 12.8951 2.02205 13.5983 1.31879C14.3016 0.615532 15.2554 0.220444 16.25 0.220444C17.2446 0.220444 18.1984 0.615532 18.9017 1.31879C19.6049 2.02205 20 2.97588 20 3.97044Z" fill="#EAAB0F"/>
        </g>
        <defs>
          <clipPath id="clip0_7_1961">
            <rect width="20" height="20" fill="white" transform="translate(0 0.220444)"/>
          </clipPath>
        </defs>
      </svg>
        )}

        {/* for transaction model */}
        {code === "2" && (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
        <g clip-path="url(#clip0_7_1966)">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1.25014 14.5954C1.25014 14.7612 1.31599 14.9202 1.4332 15.0374C1.55041 15.1546 1.70938 15.2204 1.87514 15.2204H16.6164L12.6826 19.1529C12.5653 19.2703 12.4994 19.4295 12.4994 19.5954C12.4994 19.7614 12.5653 19.9206 12.6826 20.0379C12.8 20.1553 12.9592 20.2212 13.1251 20.2212C13.2911 20.2212 13.4503 20.1553 13.5676 20.0379L18.5676 15.0379C18.6258 14.9799 18.672 14.9109 18.7035 14.835C18.735 14.7591 18.7513 14.6777 18.7513 14.5954C18.7513 14.5132 18.735 14.4318 18.7035 14.3559C18.672 14.28 18.6258 14.211 18.5676 14.1529L13.5676 9.15294C13.4503 9.03559 13.2911 8.96965 13.1251 8.96965C12.9592 8.96965 12.8 9.03559 12.6826 9.15294C12.5653 9.2703 12.4994 9.42947 12.4994 9.59544C12.4994 9.76141 12.5653 9.92059 12.6826 10.0379L16.6164 13.9704H1.87514C1.70938 13.9704 1.55041 14.0363 1.4332 14.1535C1.31599 14.2707 1.25014 14.4297 1.25014 14.5954ZM18.7501 5.84544C18.7501 6.0112 18.6843 6.17018 18.5671 6.28739C18.4499 6.4046 18.2909 6.47044 18.1251 6.47044H3.38389L7.31764 10.4029C7.37575 10.4611 7.42185 10.53 7.45329 10.606C7.48474 10.6819 7.50093 10.7633 7.50093 10.8454C7.50093 10.9276 7.48474 11.009 7.45329 11.0849C7.42185 11.1608 7.37575 11.2298 7.31764 11.2879C7.25953 11.3461 7.19054 11.3921 7.11462 11.4236C7.0387 11.455 6.95732 11.4712 6.87514 11.4712C6.79296 11.4712 6.71159 11.455 6.63566 11.4236C6.55974 11.3921 6.49075 11.3461 6.43264 11.2879L1.43264 6.28794C1.37444 6.22989 1.32826 6.16092 1.29675 6.08499C1.26524 6.00905 1.24902 5.92765 1.24902 5.84544C1.24902 5.76323 1.26524 5.68183 1.29675 5.6059C1.32826 5.52997 1.37444 5.461 1.43264 5.40294L6.43264 0.402944C6.55 0.285585 6.70917 0.219654 6.87514 0.219654C7.04111 0.219654 7.20028 0.285585 7.31764 0.402944C7.435 0.520302 7.50093 0.679474 7.50093 0.845444C7.50093 1.01141 7.435 1.17059 7.31764 1.28794L3.38389 5.22044H18.1251C18.2909 5.22044 18.4499 5.28629 18.5671 5.4035C18.6843 5.52071 18.7501 5.67968 18.7501 5.84544Z" fill="#EAAB0F"/>
        </g>
        <defs>
          <clipPath id="clip0_7_1966">
            <rect width="20" height="20" fill="white" transform="translate(0 0.220444)"/>
          </clipPath>
        </defs>
      </svg>
        )}

        {code === "1" || code === "2" ? (
          <p className="text-xs onClick={onOpen} font-medium">{heading}</p>
        ) : (
          ""
        )}
      </div>

      {/* for deposit model */}
      {code === "3" && (
        <div
          onClick={onOpen}
          style={{
            boxShadow: "4px 8px 4px 0px rgba(255, 255, 255, 0.50) inset",
          }}
          className="p-2 lg:p-3  absolute right-[-15px] cursor-pointer  rounded-[50%] bg-[#F3AF07] "
        >
          <HiPlus />
        </div>
      )}

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
            {/* for withdrawal model */}

            {code === "1" && <Withdrawal onClose={onClose} />}
            {code === "0"  && <Withdrawal onClose={onClose} />}

            {/* for transaction model */}
            {code === "2" && (
              <div>
                <div className="flex   justify-end">
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
                <Transaction onClose={onClose} />{" "}
              </div>
            )}
            {/* for deposite model */}
            {code === "3" && <Deposit onClose={onClose} />}
          </ModalBody>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PamentModel;
