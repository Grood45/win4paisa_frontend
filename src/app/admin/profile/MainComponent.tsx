"use client";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import logo from "../../../asset/profile/Frame 24 1.png";
import { FcAbout } from "react-icons/fc";
import { AiOutlineGlobal, AiOutlineProject } from "react-icons/ai";
import { SiPowerpages } from "react-icons/si";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { VscUnverified } from "react-icons/vsc";
import chart1 from "../../../asset/profile/chart1.png";
import chart2 from "../../../asset/profile/chart2.png";
import bolt from "../../../asset/profile/bolt.png";
import { Switch, useToast } from "@chakra-ui/react";
import axios from "axios";
import { fetchGetRequest, sendPatchRequest, sendPostRequest } from "@/api/api";

interface ToggleControl {
  bet_supported: boolean;
  deposit_blocked: boolean;
  withdraw_blocked: boolean;
  sport_bet_suspended: boolean;
  casino_bet_suspended: boolean;
  user_resister: boolean;
  receve_mail_weekly: boolean;
}
const initialData = {
  admin_id: "",
  full_name: "",
  phone: "",
  state: "",
  country: "",
  email: "",
  password: "",
  facebook: "",
  twitter: "",
  instagram: "",
  city: "",
  amount: "",
  description: "",
  status: "",
};
const initialCredential = {
  old_password: "",
  new_password: "",
  re_password: "",
};
const MainComponent = () => {
  const [admin, setAdmin] = useState<any>(initialData);
  const toast = useToast();
  const [adminUpdateLoading, setAdminUpdateLoading] = useState<Boolean>(false);
  const [adminLoading, setAdminLoading] = useState<Boolean>(false);
  const [adminPasswordLoading, setAdminPasswordLoading] =
    useState<Boolean>(false);
  const [credential, setCredential] = useState<any>(initialCredential);
  const [toggleControl, setToggleControl] = useState<ToggleControl>({
    bet_supported: false,
    deposit_blocked: false,
    withdraw_blocked: false,
    sport_bet_suspended: false,
    casino_bet_suspended: false,
    user_resister: false,
    receve_mail_weekly: false,
  });
  const handleSetToggleControl = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name } = e.target;
    // setToggleControl((prev) => ({ ...prev, [name]: !prev[name] }));
    try {
      const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/toggle-admin-control/1`,
        {
          name,
        }
      );
      setToggleControl({
        bet_supported: data?.data?.bet_supported,
        deposit_blocked: data?.data?.deposit_blocked,
        withdraw_blocked: data?.data?.withdraw_blocked,
        sport_bet_suspended: data?.data?.sport_bet_suspended,
        casino_bet_suspended: data?.data?.casino_bet_suspended,
        user_resister: data?.data?.user_resister,
        receve_mail_weekly: data?.data?.receve_mail_weekly,
      });
    } catch (error) {}
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/get-admin-control/1`)
      .then((res) =>
        setToggleControl({
          bet_supported: res?.data?.data?.bet_supported,
          deposit_blocked: res?.data?.data?.deposit_blocked,
          withdraw_blocked: res?.data?.data?.withdraw_blocked,
          sport_bet_suspended: res?.data?.data?.sport_bet_suspended,
          casino_bet_suspended: res?.data?.data?.casino_bet_suspended,
          user_resister: res?.data?.data?.user_resister,
          receve_mail_weekly: res?.data?.data?.receve_mail_weekly,
        })
      );
  }, []);

  const data1 = [
    {
      id: 1,
      title: "Sport P&L",
      balance: "76%",

      icon: <AiOutlineGlobal fontSize={"20px"} color="white" />,
      img: "",
    },
    {
      id: 2,
      title: "Casino P&L",
      balance: "+20%",
      icon: "",
      img: chart1,
    },
    {
      id: 3,
      title: "Profit & Loss",
      icon: <VscUnverified fontSize={"20px"} color="white" />,
      balance: "16%",

      img: "",
    },
    {
      id: 4,
      title: "Total Bet",
      balance: "1345",
      icon: "",
      img: chart2,
    },
  ];

  const handleUpdateAdmin = async (e: FormEvent) => {
    e.preventDefault();
    const payload = admin;
    setAdminUpdateLoading(true);
    try {
      const response = await sendPatchRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/update-admin/${1}`,
        payload
      );
      toast({
        title: response.message,
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
      setAdminUpdateLoading(false);
    } catch (error: any) {
      toast({
        title: error.message,
        status: "error",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    }
    setAdminUpdateLoading(false);
  };

  const getAdmin = async () => {
    setAdminLoading(true);
    try {
      const response = await fetchGetRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/get-admin/${1}`
      );
      toast({
        title: response.message,
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
      setAdminLoading(false);
      setAdmin(response.data);
    } catch (error: any) {
      toast({
        title: error.message,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
    setAdminLoading(false);
  };

  useEffect(() => {
    getAdmin();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredential({ ...credential, [name]: value });
  };

  const handleUpdatePassword = async (e: FormEvent) => {
    e.preventDefault();

    const payload = credential;

    setAdminPasswordLoading(true);

    try {
      const response = await sendPatchRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/reset-password/${1}`,
        payload
      );
      toast({
        title: response.message,
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
      setCredential(initialCredential);
      setAdminPasswordLoading(false);
    } catch (error: any) {
      toast({
        title: error.response.data.message,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
    setAdminPasswordLoading(false);
  };

  const isPasswordMismatch = credential.new_password !== credential.re_password;
  return (
    <div className="mt-[40px]">
      <div className="w-[100%] flex flex-col lg:flex-row justify-between   p-2 pbg1  rounded-[20px]">
        <div className="flex items-center gap-2">
          <Image
            className="rounded-[25%] h-[70px] w-[70px]"
            src={logo}
            alt=""
          />
          <div className="flex flex-col">
            <p className="text-white text-sm font-semibold">
              {admin.full_name}
            </p>
            <p className="text-[#A0AEC0] text-xs font-normal">{admin.email}</p>
          </div>
        </div>
        <div className="flex my-4 lg:my-0 justify-center items-center gap-2">
          <button className=" flex items-center gap-1 h-[40px]  px-4 text-xs text-white font-semibold bg-[#0075FF] rounded-lg">
            <FcAbout fontSize="25px" color="white" />
            OVERVIEW
          </button>
          <button className=" flex items-center gap-1 h-[40px]  px-4 text-xs text-white font-semibold  rounded-lg">
            <SiPowerpages fontSize="20px" color="white" />
            Teams
          </button>
          <button className=" flex items-center gap-1 h-[40px]  px-4 text-xs text-white font-semibold  rounded-lg">
            <AiOutlineProject fontSize="20px" color="white" />
            Project
          </button>
        </div>
      </div>

      <div className="mt-[20px] flex flex-col lg:flex-row gap-6 lg:gap-3 w-[100%]">
        <div className="pimg2 rounded-2xl flex flex-col justify-evenly items-center w-[70%] m-auto lg:w-[50%] h-[270px]">
          <p className="text-white text-medium text-lg">Total Earning</p>
          <p className="text-white font-semibold text-2xl">$50,0000</p>
          <button className="text-[10px] rounded-lg p-1 px-2 text-white border">
            VIEW ALL
          </button>
        </div>

        <div className="pimg3 rounded-2xl  p-3 w-[100%] h-[100%] lg:h-[270px]">
          <p className="text-white mt-2 text-medium text-lg">
            Profit & Loss Information
          </p>
          <div className="mt-4 flex flex-col lg:flex-row justify-between">
            <div className=" w-[100%] lg:w-[40%] flex flex-col items-center justify-center gap-2">
              <div className="text-white">Progress chart</div>

              <Image src={bolt} alt={""} />
              <p className="text-[24px] text-white font-semibold">68%</p>
              <p className="text-center text-[12px] text-[#A0AEC0] ">
                Current load
              </p>

              <div className="mt-2">
                <p className="text-[16px] text-center text-white font-semibold">
                  2000
                </p>
                <p className="text-center text-[10px] text-[#A0AEC0] ">
                  Online user count
                </p>
              </div>
            </div>

            <div className="flex justify-between mt-4 lg:mt-0  items-center">
              <div className=" grid grid-cols-1 sm:grid-cols-2  w-[100%]   gap-4  justify-between">
                {data1.map((item) => {
                  return (
                    <div
                      style={{
                        background:
                          "linear-gradient(127deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.50) 91.2%)",
                      }}
                      key={item.id}
                      className={`p-3 cursor-pointer w-[100%]  rounded-[8px] flex items-center justify-between`}
                    >
                      <div className="flex flex-col gap-1">
                        <p className="text-[#A0AEC0] text-xs font-medium ">
                          {item.title}
                        </p>
                        <div className="flex text-white items-center text-sm font-semibold gap-4">
                          <p>{item.balance}</p>
                          <span className="text-green-700 text-xs"></span>
                        </div>
                      </div>
                      {item.icon !== "" ? (
                        <span
                          className={`rounded-[30%]  p-2  bg-[#0075FF] flex items-center justify-center `}
                        >
                          {item.icon}
                        </span>
                      ) : (
                        <Image
                          src={item.img}
                          className="h-[40px] w-[60px]"
                          alt=""
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="pimg4 p-2 pt-3  rounded-2xl w-[100%] lg:w-[70%] h-[270px]">
          <div className="flex flex-col gap-2 border-b pb-3 border-gray-500">
            <p className="text-white text-medium text-lg">Admin Information</p>

            <p className="text-[#A0AEC0] text-medium text-xs">
              Hi, I’m Mark Johnson, Decisions: If you can’t decide, the answer
              is no. If two equally difficult paths, choose the one more painful
              in the short term (pain avoidance is creating an illusion of
              equality).
            </p>
          </div>
          <div className="flex flex-col mt-4 gap-2">
            <p className="text-[#A0AEC0] text-medium text-xs">
              Full Name:{" "}
              <span className="text-white text-medium text-xs">
                {" "}
                {admin.full_name}
              </span>
            </p>
            <p className="text-[#A0AEC0] text-medium text-xs">
              Mobile:{" "}
              <span className="text-white text-medium text-xs">
                {" "}
                {admin.phone}
              </span>
            </p>
            <p className="text-[#A0AEC0] text-medium text-xs">
              Email:{" "}
              <span className="text-white text-medium text-xs">
                {" "}
                {admin.email}
              </span>
            </p>
            <p className="text-[#A0AEC0] text-medium text-xs">
              Location:{" "}
              <span className="text-white text-medium text-xs">
                {" "}
                {admin.state}
              </span>
            </p>
            <p className="text-[#A0AEC0] flex gap-2 text-medium text-xs">
              Social Media:{" "}
              <span className=" flex gap-2 text-white text-medium text-xs">
                <a href={admin.facebook}>
                  <FaFacebook cursor="pointer" color="" white />
                </a>
                <a href={admin.twitter}>
                  <FaTwitter cursor="pointer" color="" white />
                </a>

                <a href={admin.instagram}>
                  <FaInstagram cursor="pointer" color="" white />
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-[20px] flex flex-col lg:flex-row  gap-6 lg:gap-3 w-[100%]">
        <div className="pimg5  w-[100%] lg:w-[50%] p-3 pl-5 rounded-2xl h-[340px]">
          <p className="text-white mt-2 text-medium text-lg">Control</p>
          <div className="mt-5">
            <p className="text-[#A0AEC0] text-xs font-normal">Account</p>
            <div className="flex flex-col gap-2 mt-4 text-[#A0AEC0] text-xs font-normal ">
              <p className="flex items-center gap-2">
                <Switch
                  colorScheme="blue"
                  size="md"
                  isChecked={toggleControl?.bet_supported}
                  onChange={handleSetToggleControl}
                  name="bet_supported"
                />
                Bet Support
              </p>
              <p className="flex items-center gap-2">
                <Switch
                  colorScheme="blue"
                  size="md"
                  isChecked={toggleControl?.deposit_blocked}
                  onChange={handleSetToggleControl}
                  name="deposit_blocked"
                />
                Deposit Block
              </p>
              <p className="flex items-center gap-2">
                <Switch
                  colorScheme="blue"
                  size="md"
                  isChecked={toggleControl?.withdraw_blocked}
                  onChange={handleSetToggleControl}
                  name="withdraw_blocked"
                />
                Withdrawal Block
              </p>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-[#A0AEC0] text-xs font-normal">Account</p>
            <div className="flex flex-col mt-4 gap-2 text-[#A0AEC0] text-xs font-normal ">
              <p className="flex items-center gap-2">
                <Switch
                  colorScheme="blue"
                  size="md"
                  isChecked={toggleControl?.sport_bet_suspended}
                  onChange={handleSetToggleControl}
                  name="sport_bet_suspended"
                />
                All Sport bet suspended
              </p>
              <p className="flex items-center gap-2">
                <Switch
                  colorScheme="blue"
                  size="md"
                  isChecked={toggleControl?.casino_bet_suspended}
                  onChange={handleSetToggleControl}
                  name="casino_bet_suspended"
                />
                All casino bet suspended
              </p>
              <p className="flex items-center gap-2">
                <Switch
                  colorScheme="blue"
                  size="md"
                  isChecked={toggleControl?.user_resister}
                  name="user_resister"
                  onChange={handleSetToggleControl}
                />
                unverify user agent registration
              </p>
              <p className="flex items-center gap-2">
                <Switch
                  colorScheme="blue"
                  size="md"
                  isChecked={toggleControl?.receve_mail_weekly}
                  onChange={handleSetToggleControl}
                  name="receve_mail_weekly"
                />
                Receive mails weekly
              </p>
            </div>
          </div>
        </div>

        <div className="pimg6 w-[100%] p-2  px-4 pt-4  rounded-2xl h-[340px]">
          <p className="text-white text-medium text-lg">Admin Input</p>
          <form onSubmit={handleUpdateAdmin}>
            <div className="flex gap-3 mt-4 w-[100%]">
              <div className="w-[60%] flex flex-col gap-4 ">
                <div className="text-xs text-white flex flex-col gap-1">
                  <label>Name</label>
                  <input
                    placeholder="Enter your fullname"
                    name="full_name"
                    value={admin.full_name}
                    required
                    onChange={handleChange}
                    className="w-[100%]  border outline-none bg-[#05183A] rounded-xl p-[6px]"
                  />
                </div>
                <div className="text-xs text-white flex flex-col gap-1">
                  <label>Phone Number</label>
                  <input
                    name="phone"
                    value={admin.phone}
                    required
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-[100%]  border outline-none bg-[#05183A] rounded-xl p-[6px]"
                  />
                </div>
                <div className="text-xs text-white flex flex-col gap-1">
                  <label>Email</label>
                  <input
                    name="email"
                    value={admin.email}
                    required
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-[100%]  border outline-none bg-[#05183A] rounded-xl p-[6px]"
                  />
                </div>
              </div>
              <div className="w-[40%] flex flex-col gap-4">
                <div className="text-xs text-white flex flex-col gap-1">
                  <label>City</label>
                  <input
                    placeholder="Enter your city"
                    name="city"
                    required
                    value={admin.city}
                    onChange={handleChange}
                    className="w-[100%]  border outline-none bg-[#05183A] rounded-xl p-[6px]"
                  />
                </div>
                <div className="text-xs text-white flex flex-col gap-1">
                  <label>State</label>
                  <input
                    name="state"
                    value={admin.state}
                    onChange={handleChange}
                    required
                    placeholder="Enter your state"
                    className="w-[100%]  border outline-none bg-[#05183A] rounded-xl p-[6px]"
                  />
                </div>
                <div className="text-xs text-white flex flex-col gap-1">
                  <label>Country</label>
                  <input
                    name="country"
                    value={admin.country}
                    required
                    onChange={handleChange}
                    placeholder="Enter your country"
                    className="w-[100%]  border outline-none bg-[#05183A] rounded-xl p-[6px]"
                  />
                </div>
              </div>
            </div>
            <div className="w-[70%] mt-5 m-auto">
              <button
                type="submit"
                className="p-[6px] text-white text-sm font-semibold bg-[#0075FF] w-[100%] rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        <div className="pimg7 w-[100%] lg:w-[70%] p-2  px-4 pt-4 rounded-2xl h-[340px]">
          <p className="text-white text-medium text-lg">Forget Password</p>
          <form
            onSubmit={handleUpdatePassword}
            className="w-[90%] flex mt-4 flex-col gap-3 "
          >
            <div className="text-xs text-white flex flex-col gap-1">
              <label>Old Psssword</label>
              <input
                name="old_password"
                value={credential.old_password}
                onChange={handlePasswordChange}
                required
                placeholder="Enter your old password"
                className="w-[100%]  border outline-none bg-[#05183A] rounded-xl p-[6px]"
              />
            </div>
            <div className="text-xs text-white flex flex-col gap-1">
              <label>New Password</label>
              <input
                required
                name="new_password"
                value={credential.new_password}
                onChange={handlePasswordChange}
                placeholder="Enter your new password"
                className={`w-[100%] border outline-none bg-[#05183A] rounded-xl p-[6px] ${
                  isPasswordMismatch ? "border-red-500" : ""
                }`}
              />
            </div>
            <div className="text-xs text-white flex flex-col gap-1">
              <label>Renter New Password</label>
              <input
                name="re_password"
                value={credential.re_password}
                onChange={handlePasswordChange}
                required
                placeholder="Enter your new password"
                className={`w-[100%] border outline-none bg-[#05183A] rounded-xl p-[6px] ${
                  isPasswordMismatch ? "border-red-500" : ""
                }`}
              />
            </div>
            <div className="w-[70%] mt-4 m-auto">
              <button
                type="submit"
                className="p-[6px] text-white text-sm font-semibold bg-[#0075FF] w-[100%] rounded-lg"
                disabled={isPasswordMismatch}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
