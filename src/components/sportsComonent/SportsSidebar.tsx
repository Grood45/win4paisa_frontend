"use client";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { FiLogOut } from "react-icons/fi";
import { BiArrowFromRight } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";

import { BiFootball, BiCommand } from "react-icons/bi";
import { PiFlagPennantBold } from "react-icons/pi";
import { TbCricket } from "react-icons/tb";
import {
  BsFillHeartPulseFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import { BsCardChecklist } from "react-icons/bs";
import { IoShareSocialSharp } from "react-icons/io5";
import { FaPersonSnowboarding } from "react-icons/fa6";
// import { Link,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { ADMIN_LOGOUT } from "../../../redux-arch/AuthReducer/actionType";

export const SportsSideBar = () => {
  const router = useRouter();
  const [bg, setBg] = useState<any>(-1);

  const accordionData = [
    {
      id: 101,
      title: "Dashboard",
      icon: <MdDashboard fontSize={"20px"} />,
      path: "/sportsAdmin",
      subitem: [],
    },
    {
      id: 1,
      title: "Sports",
      icon: <BiFootball fontSize={"20px"} />,
      path: "/sportsAdmin/activesports",
      subitem: [],
    },
    {
      id: 2,
      title: "League",
      icon: <PiFlagPennantBold fontSize={"20px"} />,
      path: "/sportsAdmin/league",
      subitem: [],
    },
    {
      id: 3,
      title: "Competion",
      icon: <BiCommand fontSize={"20px"} />,
      path: "/sportsAdmin/competition",
      subitem: [],
    },
    {
      id: 4,
      title: "Match Type",
      icon: <TbCricket fontSize={"20px"} />,
      path: "/sportsAdmin/matchtype",
      subitem: [],
    },
    {
      id: 5,
      title: "Result Maker",
      icon: <BsFillHeartPulseFill fontSize={"20px"} />,
      subitem: [
        {
          id: 6,
          title: "Odds/Bookmaker",
          icon: <PiFlagPennantBold fontSize={"20px"} />,
          path: "/sportsAdmin/matchoddstoss",
        },
        {
          id: 7,
          title: "Toss/Fancy",
          icon: <PiFlagPennantBold fontSize={"20px"} />,
          path: "/sportsAdmin/matchtossfancy",
        },
        {
          id: 8,
          title: "Result History",
          icon: <PiFlagPennantBold fontSize={"20px"} />,
          path: "/sportsAdmin/matchtossfancyresult",
        },
      ],
    },
    // {
    //   id: 10,
    //   title: "Sports Slider",
    //   icon: <FaPersonSnowboarding fontSize={"20px"} />,
    //   path: "/sportsAdmin/sportslider",
    //   subitem: [],
    // },
    {
      id: 11,
      title: "Admin Dashboard",
      icon: <BsFillArrowLeftCircleFill fontSize={"20px"} />,
      path: "/admin/dashboard",
      subitem: [],
    },
  ];
  const dispatch = useDispatch();
  // const {sidebarOpenLeft} = useSelector((store:any) => store.commonReducer);


  // const AdminLogout = () => {
  //   dispatch({ type: ADMIN_LOGOUT });

  //   navigate("/adminlogin");
  // };

  const handelNavigate = (elm: any) => {
    router.push(elm.path);
  };

  return (
    <div className="min-h-[100vh] max-h-[90%] bg-white p-3  flex  ">
      <Box
        color="white"
        boxShadow="lg"
        rounded={"lg"}
        className={` fixed z-[100] min-h-[95vh] max-h-[95vh]  w-[50%] lg:w-[14%] bg-[#429CF0]    `}
      >
        <Box mb={4} textAlign="center">
          <Text
            className={`text-xl text-center pt-4 font-bold`}
            color={"white"}
            bg="none"
          >
            Sports Admin
          </Text>
          <div
            className={`cursor-pointer absolute  top-0 right-0 `}
            onClick={() => dispatch({ type: "change", payload: true })}
          >
            {/* {!sidebarOpenLeft && <BiArrowFromRight color="red" fontSize={"20px"} />} */}
            <BiArrowFromRight />
          </div>

          <Divider className="mt-2" />
        </Box>

        <Box
          textAlign="left"
          className="flex flex-col gap-1 overflow-y-auto h-[73vh] "
        >
          <Accordion></Accordion>
          <Accordion defaultIndex={[0]} allowMultiple>
            {accordionData.map((item: any, index: any) => (
              <AccordionItem key={item.id} rounded="md" border="none" my={1}>
                <Link href={`${item.path || "#"}`}>
                  {" "}
                  <div
                    onClick={() => setBg(item.id)}
                    className={`hover:bg-blue-300 w-[90%] m-auto ${
                      bg === item.id ? "bg-[#E5306F]" : ""
                    } rounded-lg text-[12px] ${
                      item.id === 101 ? "bg-[#E5306F]" : ""
                    }   `}
                  >
                    {" "}
                    <AccordionButton
                      className={"rounded-md"}
                      style={{ paddingTop: "10px", paddingBottom: "10px" }}
                    >
                      {" "}
                      <Box
                        flex="1"
                        textAlign="left"
                        fontWeight="200"
                        className="flex items-center gap-2 text-[11px] font-semibold "
                      >
                        {item.icon}

                        {item.title}
                      </Box>
                      {item.subitem.length > 0 && <AccordionIcon />}
                    </AccordionButton>{" "}
                  </div>
                </Link>
                {item.subitem.length > 0 && (
                  <AccordionPanel>
                    <div className="flex flex-col gap-2   ">
                      {item.subitem.map((subItem: any, subIndex: any) => (
                        <Link
                          href={subItem.path}
                          onClick={() => setBg(subItem.id)}
                          style={{ textDecoration: "none" }}
                          className={` py-3   pl-[8px] pr-[-4px]  rounded-md hover:bg-blue-300 cursor-pointer  ${
                            subItem.id === bg ? "bg-[#E12C6C]" : ""
                          }  `}
                          key={subIndex}
                          // display="block"
                        >
                          <Icon as={MdDashboard} color={item.color} />{" "}
                          <Link
                            href={`${subItem.path || "#"}`}
                            key={subItem.id}
                          >
                            {" "}
                            <span className="text-[13px]">
                              {" "}
                              {subItem.title}
                            </span>
                          </Link>
                        </Link>
                      ))}
                    </div>
                  </AccordionPanel>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
        <Button
          colorScheme=""
          bgColor={"#E01D5F"}
          // onClick={AdminLogout}
          color={"white"}
          style={{ display: "flex", justifyContent: "start" }}
          className=" w-[90%] mt-2  flex justify-start items-start text-left gap-2 m-auto p-2 rounded-lg"
        >
          <span>
            {" "}
            <FiLogOut color="white" fontSize={"20px"} />
          </span>
          <span>Logout</span>
        </Button>
      </Box>
    </div>
  );
};
