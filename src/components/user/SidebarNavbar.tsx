"use client";
import { AppDispatch, useAppSelector } from "@/app/redux-arch/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { CgCardSpades } from "react-icons/cg";
import { BiCricketBall, BiSearch } from "react-icons/bi";
import { BsBrightnessHigh, BsFillBagFill } from "react-icons/bs";
import { SlPeople } from "react-icons/sl";
import { MdDarkMode, MdSupport } from "react-icons/md";
import { manageSideBar_Fn } from "@/app/redux-arch/fetures/nav-slice";
import themeChange from "@/theme";
import { FcSupport } from "react-icons/fc";
import Link from "next/link";
const SidebarNavbar = ({
  identity,
  value,
}: {
  identity: number;
  value: number;
}) => {
  const [active, setActive] = useState(value);
  const router = useRouter();
  const [themeToogle, setthemeToogle] = useState(false);
  const [icnrease, setIncreas] = useState(false);
  const sidebardata = [
    {
      id: 1,
      title: "Home",
      img: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="43"
          height="29"
          viewBox="0 0 43 29"
          fill="none"
        >
          <path
            d="M20.0794 2.40392C20.8619 1.61429 22.1381 1.61429 22.9206 2.40392L36.7426 16.352C37.9937 17.6146 37.0994 19.7598 35.322 19.7598H7.67803C5.9006 19.7598 5.0063 17.6146 6.25741 16.352L20.0794 2.40392Z"
            fill="white"
          />
          <path
            d="M11.0972 15.7073H31.9036V26.9704C31.9036 28.075 31.0082 28.9704 29.9036 28.9704H13.0972C11.9926 28.9704 11.0972 28.075 11.0972 26.9704V15.7073Z"
            fill="white"
          />
          <rect
            x="19.4199"
            y="23.0757"
            width="4.16129"
            height="5.89473"
            fill="#212632"
          />
        </svg>
      ),
      route: "/home",
    },
    {
      id: 2,
      title: "Casino",
      img: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="28"
          viewBox="0 0 32 28"
          fill="none"
        >
          <rect
            width="16.0328"
            height="20.7719"
            rx="1"
            transform="matrix(0.972523 0.232807 -0.220656 0.975352 15.7559 0)"
            fill="white"
          />
          <rect
            x="0.375934"
            y="0.604079"
            width="15.0328"
            height="19.7719"
            rx="0.5"
            transform="matrix(0.972523 0.232807 -0.220656 0.975352 15.8995 -0.0726303)"
            stroke="#444444"
            stroke-opacity="0.68"
          />
          <path
            d="M19.4518 11.3306L22.6217 7.87264L23.0427 12.7831L20.0254 15.9431L19.4518 11.3306Z"
            fill="#0B0D0E"
          />
          <rect
            width="16.0511"
            height="20.7493"
            rx="1"
            transform="matrix(0.950957 -0.309323 0.293834 0.955856 0.913086 8.16669)"
            fill="white"
          />
          <rect
            x="0.622396"
            y="0.323267"
            width="15.0511"
            height="19.7493"
            rx="0.5"
            transform="matrix(0.950957 -0.309323 0.293834 0.955856 0.848623 8.37348)"
            stroke="#444444"
            stroke-opacity="0.68"
          />
          <path
            d="M9.70667 15.9768L10.7201 11.3396L13.5158 15.3434L12.4859 19.6442L9.70667 15.9768Z"
            fill="#0B0D0E"
          />
        </svg>
      ),
      route: "/casino",
    },
    {
      id: 3,
      title: "Sport",
      img: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
        >
          <g clip-path="url(#clip0_5_1889)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14 0C6.272 0 0 6.272 0 14C0 21.728 6.272 28 14 28C21.714 28 28 21.728 28 14C28 6.272 21.714 0 14 0ZM23.247 6.454C24.9705 8.55273 25.9245 11.1777 25.9508 13.8933C25.5553 13.818 21.6073 13.013 17.6295 13.5135C17.5385 13.3175 17.4615 13.104 17.3705 12.8923C17.1272 12.3147 16.8542 11.7232 16.5813 11.1597C20.9843 9.3695 22.9897 6.78825 23.2487 6.45225L23.247 6.454ZM14 2.065C17.0362 2.065 19.8153 3.2025 21.9275 5.0715C21.714 5.376 19.9062 7.78925 15.6555 9.3835C13.6955 5.7855 11.5255 2.8385 11.1912 2.3835C12.1119 2.16852 13.0546 2.06164 14 2.065ZM8.91275 3.1885C10.5152 5.40933 11.9955 7.71574 13.3472 10.0975C7.7595 11.585 2.8245 11.5553 2.2925 11.5553C2.67725 9.74527 3.4749 8.04863 4.62324 6.59764C5.77158 5.14666 7.23958 3.97879 8.91275 3.1885ZM2.03525 14.0175V13.65C2.5515 13.6675 8.35275 13.7428 14.3202 11.9508C14.6685 12.6175 14.987 13.3018 15.2915 13.9843L14.819 14.1208C8.6555 16.1105 5.376 21.546 5.10125 22.0028C3.12694 19.811 2.03464 16.9656 2.03525 14.0157V14.0175ZM14 25.9648C11.3427 25.9689 8.76083 25.0816 6.6675 23.4447C6.8775 23.0037 9.30825 18.3278 16.0492 15.974C16.0807 15.9583 16.0947 15.9583 16.1263 15.9443C17.2627 18.8779 18.1165 21.9133 18.676 25.0093C17.199 25.6439 15.6076 25.9691 14 25.9648ZM20.6675 23.9155C20.545 23.1858 19.9062 19.6945 18.3435 15.3965C22.0938 14.805 25.3732 15.7763 25.7827 15.9128C25.5277 17.5274 24.9414 19.0718 24.0609 20.4491C23.1803 21.8263 22.0243 23.0065 20.6658 23.9155H20.6675Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_5_1889">
              <rect width="28" height="28" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      route: "/sports",
    },
    {
      id: 4,
      title: "Promotion",
      img: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="29"
          viewBox="0 0 28 29"
          fill="none"
        >
          <path
            d="M25.7899 14.5801V22.9816C25.7899 26.0762 23.152 28.5826 19.8951 28.5826H8.10567C4.84883 28.5826 2.21094 26.0762 2.21094 22.9816V14.5801C2.21094 13.81 2.8741 13.1798 3.68462 13.1798H6.58778C7.39831 13.1798 8.06146 13.81 8.06146 14.5801V18.9769C8.06146 20.0131 8.66567 20.9653 9.62357 21.4554C10.0509 21.6794 10.5225 21.7914 11.0088 21.7914C11.5688 21.7914 12.1288 21.6374 12.6151 21.3293L14.0151 20.4612L15.312 21.2873C16.2109 21.8614 17.3604 21.9314 18.3183 21.4413C19.2909 20.9513 19.8951 20.0131 19.8951 18.9629V14.5801C19.8951 13.81 20.5583 13.1798 21.3688 13.1798H24.3162C25.1267 13.1798 25.7899 13.81 25.7899 14.5801Z"
            fill="white"
          />
          <path
            d="M28 7.57852V8.97878C28 10.5191 27.2189 11.7793 25.0526 11.7793H2.94737C0.692632 11.7793 0 10.5191 0 8.97878V7.57852C0 6.03824 0.692632 4.77802 2.94737 4.77802H25.0526C27.2189 4.77802 28 6.03824 28 7.57852Z"
            fill="white"
          />
          <path
            d="M13.4666 4.7799H5.33185C4.8308 4.26181 4.84553 3.46367 5.37606 2.95957L7.46869 0.971212C8.01395 0.453118 8.9129 0.453118 9.45817 0.971212L13.4666 4.7799Z"
            fill="white"
          />
          <path
            d="M22.6533 4.7799H14.5186L18.527 0.971212C19.0722 0.453118 19.9712 0.453118 20.5165 0.971212L22.6091 2.95957C23.1396 3.46367 23.1543 4.26181 22.6533 4.7799Z"
            fill="white"
          />
          <path
            d="M16.9048 13.1798C17.7153 13.1798 18.3785 13.81 18.3785 14.5801V18.9629C18.3785 20.0831 17.0669 20.7552 16.0943 20.1251L14.768 19.285C14.2816 18.9769 13.648 18.9769 13.1469 19.285L11.7616 20.1531C10.789 20.7692 9.49219 20.0971 9.49219 18.9909V14.5801C9.49219 13.81 10.1553 13.1798 10.9659 13.1798H16.9048Z"
            fill="white"
          />
        </svg>
      ),
      route: "/promotion",
    },
    {
      id: 5,
      title: "Refer & Earn",
      img: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="29"
          viewBox="0 0 28 29"
          fill="none"
        >
          <path
            d="M9.83658 0.45549C6.17555 0.45549 3.19922 3.43765 3.19922 7.10584C3.19922 10.704 6.00787 13.6162 9.6689 13.7422C9.78069 13.7282 9.89248 13.7282 9.97632 13.7422H10.0462H10.0741C13.6513 13.6162 16.46 10.704 16.4739 7.10584C16.4739 3.43765 13.4976 0.45549 9.83658 0.45549Z"
            fill="white"
          />
          <path
            d="M16.9357 17.4649C13.0371 14.8608 6.67928 14.8608 2.75276 17.4649C0.978138 18.655 0 20.2651 0 21.9872C0 23.7092 0.978138 25.3053 2.73879 26.4814C4.69506 27.7975 7.26617 28.4555 9.83727 28.4555C12.4083 28.4555 14.9794 27.7975 16.9357 26.4814C18.6963 25.2913 19.6745 23.6952 19.6745 21.9592C19.6605 20.2371 18.6963 18.641 16.9357 17.4649Z"
            fill="white"
          />
          <path
            d="M25.1905 7.92949C25.4141 10.6456 23.4857 13.0257 20.8168 13.3477C20.8028 13.3477 20.8028 13.3477 20.7889 13.3477H20.7469C20.6631 13.3477 20.5793 13.3477 20.5094 13.3757C19.154 13.4457 17.9103 13.0117 16.9741 12.2136C18.4134 10.9256 19.2378 8.99354 19.0701 6.89343C18.9723 5.75937 18.5811 4.72331 17.9942 3.84127C18.5252 3.57525 19.14 3.40724 19.7688 3.35124C22.5076 3.11323 24.9529 5.15734 25.1905 7.92949Z"
            fill="white"
          />
          <path
            d="M27.9849 20.883C27.8731 22.2411 27.0067 23.4171 25.5535 24.2152C24.1562 24.9852 22.3955 25.3493 20.6488 25.3072C21.6549 24.3972 22.2418 23.2631 22.3536 22.0591C22.4933 20.323 21.6689 18.6569 20.02 17.3268C19.0838 16.5848 17.9939 15.9968 16.8062 15.5627C19.8943 14.6667 23.7789 15.2687 26.1683 17.2008C27.4539 18.2369 28.1106 19.5389 27.9849 20.883Z"
            fill="white"
          />
        </svg>
      ),
      route: "refer&earn",
    },
    
    // {
    //   id: 7,
    //   title: "Support",
    //   img: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" viewBox="0 0 28 29" fill="none">
    //   <g clip-path="url(#clip0_5_1891)">
    //     <path d="M14 2.51544C11.6794 2.51544 9.45376 3.43731 7.81282 5.07826C6.17187 6.7192 5.25 8.9448 5.25 11.2654V13.0154H7C7.46413 13.0154 7.90925 13.1998 8.23744 13.528C8.56563 13.8562 8.75 14.3013 8.75 14.7654V20.0154C8.75 20.4796 8.56563 20.9247 8.23744 21.2529C7.90925 21.5811 7.46413 21.7654 7 21.7654H5.25C4.78587 21.7654 4.34075 21.5811 4.01256 21.2529C3.68437 20.9247 3.5 20.4796 3.5 20.0154V11.2654C3.5 9.88656 3.77159 8.52118 4.29926 7.24727C4.82694 5.97335 5.60036 4.81584 6.57538 3.84082C7.55039 2.86581 8.70791 2.09238 9.98182 1.56471C11.2557 1.03703 12.6211 0.765442 14 0.765442C15.3789 0.765442 16.7443 1.03703 18.0182 1.56471C19.2921 2.09238 20.4496 2.86581 21.4246 3.84082C22.3996 4.81584 23.1731 5.97335 23.7007 7.24727C24.2284 8.52118 24.5 9.88656 24.5 11.2654V21.7654C24.5 22.9258 24.0391 24.0386 23.2186 24.859C22.3981 25.6795 21.2853 26.1404 20.125 26.1404H16.3905C16.2369 26.4065 16.016 26.6274 15.75 26.781C15.4839 26.9346 15.1822 27.0154 14.875 27.0154H13.125C12.6609 27.0154 12.2158 26.8311 11.8876 26.5029C11.5594 26.1747 11.375 25.7296 11.375 25.2654C11.375 24.8013 11.5594 24.3562 11.8876 24.028C12.2158 23.6998 12.6609 23.5154 13.125 23.5154H14.875C15.1822 23.5154 15.4839 23.5963 15.75 23.7499C16.016 23.9035 16.2369 24.1244 16.3905 24.3904H20.125C20.8212 24.3904 21.4889 24.1139 21.9812 23.6216C22.4734 23.1293 22.75 22.4616 22.75 21.7654H21C20.5359 21.7654 20.0908 21.5811 19.7626 21.2529C19.4344 20.9247 19.25 20.4796 19.25 20.0154V14.7654C19.25 14.3013 19.4344 13.8562 19.7626 13.528C20.0908 13.1998 20.5359 13.0154 21 13.0154H22.75V11.2654C22.75 10.1164 22.5237 8.97856 22.0839 7.91696C21.6442 6.85536 20.9997 5.89077 20.1872 5.07826C19.3747 4.26574 18.4101 3.62122 17.3485 3.1815C16.2869 2.74177 15.1491 2.51544 14 2.51544Z" fill="white"/>
    //   </g>
    //   <defs>
    //     <clipPath id="clip0_5_1891">
    //       <rect width="28" height="28" fill="white" transform="translate(0 0.765442)"/>
    //     </clipPath>
    //   </defs>
    // </svg>,
    //   route: "",
    // },
    // {
    //   id: 8,
    //   title: themeToogle ? "Dark Mode" : "Light Mode",
    //   img: themeToogle ? (
    //     <MdDarkMode fontSize="25px" color="black" />
    //   ) : (
    //     <BsBrightnessHigh fontSize="25px" />
    //   ),
    //   route: "",
    // },
  ];

  // MdDarkMode
  const dispatch = useDispatch<AppDispatch>();
  const { showSideBar1, theme } = useAppSelector(
    (store) => store.combineR.NavStateReducer
  );
  const handleNavigate = (id: number, route: any) => {
    setActive(id);
    setIncreas(true);
    router.push(route);
    if (id === 8) {
      setthemeToogle(!themeToogle);
      dispatch(manageSideBar_Fn({ type: "theme" }));
    }
  };

  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("sports")) {
      setActive(3);
    } else if (pathname.includes("casino")) {
      setActive(2);
    }
  }, [pathname]);

  // const whatsappLink = 'https://wa.me/message/FM3QZSPGT4K6P1';
  return (
    <div className="sticky top-[85px] bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... pb-[1px] px-[1px] lg:bg-none rounded-br-[10px]  ">
      <div
        className={`   ${
          showSideBar1 && identity === 2
            ? `p-4 ${
                theme
                  ? `bg-[${themeChange.light.bg1}]`
                  : `bg-[${themeChange.dark.bg1}]`
              }  shadow-2xl  rounded-br-[10px]`
            : ""
        } text-white  flex flex-col`}
      >
        <div className="  flex flex-col gap-3">
          {sidebardata.map((item) => {
            return (
              <span
                key={item.id}
                className=" lg:bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... p-[1px] rounded-[12px]"
              >
                {" "}
                <button
                  style={{
                    background:
                      active === item.id
                        ? "linear-gradient(270deg, #B48200 0%, #675C3F 33.6%)"
                        : theme
                        ? "gray"
                        : themeChange.dark.bg1,
                  }}
                  onClick={() => handleNavigate(item.id, item.route)}
                  className={`w-[100%]  ${
                    showSideBar1 && identity === 1
                      ? " flex items-center p-3 gap-1  rounded-[12px] "
                      : " flex  flex-col items-center p-1 gap-0 lg:p-3 rounded-[6px] lg:gap-1 lg:rounded-[12px]"
                  }  text-white  ${theme ? "text-black" : "text-white"}  `}
                >
                  {item.img}{" "}
                  <span
                    className={`text-[10px] sm:text-xs     ${
                      showSideBar1 && identity === 1
                        ? "contents "
                        : "contents lg:hidden  "
                    }  `}
                  >
                    {item.title}
                  </span>
                </button>
              </span>
            );
          })}

          <span className=" lg:bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... p-[1px] rounded-[12px]">
            {" "}

            <Link href={""} target="_blank" rel="noopener noreferrer">
            <button
              
              className={`w-[100%]  ${
                showSideBar1 && identity === 1
                  ? " flex items-center p-3 gap-1  rounded-[12px] "
                  : " flex  flex-col items-center p-1 gap-0 lg:p-3 rounded-[6px] lg:gap-1 lg:rounded-[12px]"
              }  text-white  ${theme ? "text-black" : "text-white"}  bg-[#212632] `}
            >
              <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="38px" height="39px" clip-rule="evenodd"><path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"/><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"/><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"/><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"/><path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd"/></svg>
              <span
                className={`text-[10px] sm:text-xs     ${
                  showSideBar1 && identity === 1
                    ? "contents "
                    : "contents lg:hidden  "
                }  `}
              >
                Whatsapp
              </span>
            </button>
            </Link>
          </span>
          <span className=" lg:bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... p-[1px] rounded-[12px]">
            {" "}

            <Link href={""} target="_blank" rel="noopener noreferrer">
            <button
              
              className={`w-[100%]  ${
                showSideBar1 && identity === 1
                  ? " flex items-center p-3 gap-1  rounded-[12px] "
                  : " flex  flex-col items-center p-1 gap-0 lg:p-3 rounded-[6px] lg:gap-1 lg:rounded-[12px]"
              }  text-white  ${theme ? "text-black" : "text-white"}  bg-[#212632] `}
            >
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="38px" height="39px" ><linearGradient id="Ld6sqrtcxMyckEl6xeDdMa" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2aa4f4"/><stop offset="1" stop-color="#007ad9"/></linearGradient><path fill="url(#Ld6sqrtcxMyckEl6xeDdMa)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"/><path fill="#fff" d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"/></svg>
              <span
                className={`text-[10px] sm:text-xs     ${
                  showSideBar1 && identity === 1
                    ? "contents "
                    : "contents lg:hidden  "
                }  `}
              >
                Facebook
              </span>
            </button>
            </Link>
          </span>
          <span className=" lg:bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... p-[1px] rounded-[12px]">
            {" "}

            <Link href={""} target="_blank" rel="noopener noreferrer">
            <button
              
              className={`w-[100%]  ${
                showSideBar1 && identity === 1
                  ? " flex items-center p-3 gap-1  rounded-[12px] "
                  : " flex  flex-col items-center p-1 gap-0 lg:p-3 rounded-[6px] lg:gap-1 lg:rounded-[12px]"
              }  text-white  ${theme ? "text-black" : "text-white"}  bg-[#212632] `}
            >
<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="38px" height="39px"><radialGradient id="yOrnnhliCrdS2gy~4tD8ma" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fd5"/><stop offset=".328" stop-color="#ff543f"/><stop offset=".348" stop-color="#fc5245"/><stop offset=".504" stop-color="#e64771"/><stop offset=".643" stop-color="#d53e91"/><stop offset=".761" stop-color="#cc39a4"/><stop offset=".841" stop-color="#c837ab"/></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8ma)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"/><radialGradient id="yOrnnhliCrdS2gy~4tD8mb" cx="11.786" cy="5.54" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4168c9"/><stop offset=".999" stop-color="#4168c9" stop-opacity="0"/></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8mb)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"/><path fill="#fff" d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"/><circle cx="31.5" cy="16.5" r="1.5" fill="#fff"/><path fill="#fff" d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"/></svg>
              <span
                className={`text-[10px] sm:text-xs     ${
                  showSideBar1 && identity === 1
                    ? "contents "
                    : "contents lg:hidden  "
                }  `}
              >
                Instagram
              </span>
            </button>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SidebarNavbar;
