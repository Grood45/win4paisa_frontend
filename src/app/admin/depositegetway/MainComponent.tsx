"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import "../usermanage/usermanage.css";

import { BsSearch } from "react-icons/bs";
import img1 from "../../../asset/payment/img1.png";
import img2 from "../../../asset/payment/img2.png";
import img3 from "../../../asset/payment/img3.png";
import img4 from "../../../asset/payment/img4.png";
import img5 from "../../../asset/payment/img5.png";
import pimg from "../../../asset/profile/Frame 24 1.png";

import { RxCross2 } from "react-icons/rx";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import BankDetails from "./component/BankDetails";
import { CircularProgress, Switch, useToast } from "@chakra-ui/react";
import {
  fetchGetRequest,
  sendDeleteRequest,
  sendPatchRequest,
  sendPostRequest,
} from "@/api/api";
import UserDetails from "./component/UserDetails";
import DepositUpdateModel from "./component/DepositUpdateModel";

const initialFormData = {
  gateway: "",
  currency: "",
  processing_time: "",
  image: "",
  max_limit: 0,
  min_limit: 0,
  instruction: "",
  admin_details: [],
  user_details: [],
  bonus: 0,
  type: "deposit",
};
const initialField = {
  name: "",
  type: "",
  required: "",
};

const MainComponent = () => {
  const [show, setShowWithdral] = useState(false);
  const [gateways, setGateways] = useState([{ fieldName: "", fieldValue: "" }]);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [formData, setFormData] = useState<any>(initialFormData);
  const [formFields, setFormFields] = useState<any>([initialField]);
  const [paymentData, setPaymentData] = useState<any>([]);
  const [statusLoading, setStatusLoading] = useState<Boolean>(true);
  const toast = useToast();
  const [loading, setLoading] = useState<Boolean>();
  const [addLoading, setAddLoading] = useState<Boolean>(false);
  const [updateLoading, setUpdateLoading] = useState<Boolean>(false);

  const handleGetway = () => {
    setShowWithdral(true);
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    handleImageUpload(file);
  };

  const handleFormChange = (e: any) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // handle status update here

  const handleUpdateStatus = async (id: string) => {
    setStatusLoading(true);
    try {
      const response = await sendPatchRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/update_payment_method_status/${id}`
      );
      let updated_data = paymentData.map((ele: any) => {
        if (ele._id == id) {
          ele = response.data;
          return ele;
        } else {
          return ele;
        }
      });
      setPaymentData(updated_data);
      toast({
        title: response.message,
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
      setStatusLoading(false);
    } catch (error: any) {
      toast({
        title: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    setStatusLoading(false);
  };

  const deletePaymentGateway = async (id: string) => {
    try {
      const response = await sendDeleteRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/delete-payment-method/${id}`
      );
      let updated_data = paymentData.filter((ele: any) => ele._id !== id);
      setPaymentData(updated_data);
      toast({
        title: response.message,
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: error.message,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
  };

  const getPaymentGateway = async () => {
    try {
      const response = await fetchGetRequest(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/get-payment-method?type=deposit`
      );
      setPaymentData(response.data);
    } catch (error: any) {
      toast({
        title: error.message,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
  };

  // image upload
  const handleImageUpload = async (file: string) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("post_img", file);
    try {
      const response = await sendPostRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/image-url`,
        formData
      );
      if (response.url) {
        toast({
          title: "Image uploaded successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setSelectedImage(response.url);
      }
    } catch (error: any) {
      toast({
        title: "Error uploading image",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleSubmitGateway = async () => {
    const payload = {
      ...formData,
      admin_details: gateways,
      user_details: formFields,
      image: selectedImage,
      type: "deposit",
    };
    setAddLoading(true);
    try {
      const response = await sendPostRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/add-method`,
        payload
      );

      toast({
        title: response.message,
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
      setAddLoading(false);
      setFormData(initialFormData);
    } catch (error: any) {
      toast({
        title: error?.data?.message,
        status: "error",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
      setAddLoading(false);
    }
  };

  useEffect(() => {
    getPaymentGateway();
  }, []);

  return (
    <div className=" mt-8">
      {!show ? (
        <div>
          <div className="flex flex-col lg:flex-row justify-between w-[100%] lg:w-[90%] m-auto items-center">
            <div className=" flex items-center m-auto w-[100%] md:w-[80%]   gap-4 mt-[30px] justify-center lg:justify-start">
              <button
                onClick={handleGetway}
                style={{
                  background: "rgba(0, 0, 0, 0.25)",
                  border: "1px solid #FFF",
                }}
                className="text-white  w-[50%]  flex gap-3 text-xs items-center bg-[#003C9D] rounded-[10px] pl-3 py-4"
              >
                <span>
                  <AiOutlinePlus color="white" />
                </span>{" "}
                Add new Getway
              </button>
            </div>

            <div className="flex flex-col-reverse gap-3   justify-between items-center w-[100%]">
              <div className="input-group mt-7 flex justify-end w-[100%] md:w-[70%]">
                <input
                  type="email"
                  className={`input text-white text-sm `}
                  id="Email"
                  name="Email"
                  placeholder="Search the keyword..........."
                />
                <button
                  className={`button--submit flex items-center text-white`}
                >
                  <BsSearch color="white" fontSize="20px" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center w-[100%] m-auto gap-5 sm:gap-10 mt-5 sm:mt-16">
            {paymentData.map((item: any) => {
              return (
                <div
                  key={item.id}
                  className="depbg1 p-3 flex flex-col justify-between h-[230px] w-[100%] rounded-2xl"
                >
                  <div className="flex justify-between w-[100%]">
                    <div className="flex  gap-3 items-center">
                      <img
                        src={item.image}
                        className="w-[50px] h-[50px] rounded-[50%]"
                        alt={"logo"}
                        width={50}
                        height={50}
                      />
                      <div>
                        <p className="text-white text-sm font-bold ">
                          {item.gateway}
                        </p>
                        <p className="text-green-500 text-sm font-bold ">
                          + {item.bonus}
                        </p>
                      </div>
                    </div>
                    <div onClick={() => deletePaymentGateway(item._id)}>
                      <RxCross2
                        cursor="pointer"
                        color="white"
                        fontSize="25px"
                      />
                    </div>
                  </div>
                  <div className="flex justify-around">
                    <p className="text-white text-sm font-bold flex gap-2 ">
                      {" "}
                      <Switch
                        colorScheme="blue"
                        size="md"
                        defaultChecked={item.status}
                        onChange={() => handleUpdateStatus(item._id)}
                      />{" "}
                      Status
                    </p>
                    <button
                      className={`text-white text-xs rounded-md ${
                        !item.status ? "bg-red-500" : "bg-green-500"
                      }  p-[4px] px-2`}
                    >
                      {item.status ? "Enabled" : "Disabled"}
                    </button>
                  </div>
                  <div className="w-[100%] flex justify-center items-center">
                  <DepositUpdateModel data={item} id={item._id}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          {/* first layer */}
          <div className="w-[85%] m-auto gap-4 flex flex-col md:flex-row justify-between">
            <div
              style={{
                background:
                  "linear-gradient(to bottom, rgba(6, 11, 40, 0.94), rgba(10, 14, 35, 0.49))",
              }}
              className="w-[55%] sm:w-[35%] m-auto md:w-[20%] flex relative items-center justify-center rounded-[20px] h-[190px]"
            >
              {selectedImage ? (
                <img
                  src={selectedImage}
                  className="w-[110px] rounded-[50%] h-[110px]"
                  alt="Selected"
                />
              ) : loading ? (
                <CircularProgress
                  isIndeterminate
                  value={30}
                  color="orange.400"
                  thickness="12px"
                />
              ) : (
                <img
                  src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
                  className="w-[140px]"
                />
              )}
              <label htmlFor="file-upload" className="cursor-pointer">
                <span
                  className={`rounded-[30%] p-2 absolute right-[30px] bottom-[50px] bg-[#0075FF] flex items-center justify-center`}
                >
                  <MdEdit color="white" fontSize="20px" />
                </span>
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>
            <div
              style={{
                background:
                  "linear-gradient(127deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)",
              }}
              className="w-[85%] flex m-auto justify-between items-center p-4 rounded-[20px] h-[100%] md:h-[190px]"
            >
              <div className="w-[100%] flex px-2 flex-col md:flex-row   gap-3 justify-between ">
                <div className="text-xs w-[100%] md:w-[60%] text-white flex flex-col gap-2">
                  <label>Getway Name</label>
                  <input
                    style={{
                      background:
                        "linear-gradient(117deg, rgba(255, 255, 255, 0.00) -3.91%, rgba(255, 255, 255, 0.04) 75.27%)",
                    }}
                    name="gateway"
                    value={formData.gateway}
                    onChange={(e) => handleFormChange(e)}
                    placeholder="Enter Getway Name"
                    className="w-[100%] text-xs  border border-[#fff] outline-none rounded-[20px] p-2"
                  />
                </div>
                <div className="text-xs  w-[100%] md:w-[40%] text-white flex flex-col gap-2">
                  <label>Currency</label>
                  <input
                    style={{
                      background:
                        "linear-gradient(117deg, rgba(255, 255, 255, 0.00) -3.91%, rgba(255, 255, 255, 0.04) 75.27%)",
                    }}
                    name="currency"
                    value={formData.currency_name}
                    onChange={(e) => handleFormChange(e)}
                    placeholder="Enter Currency"
                    className="w-[100%] text-xs   border outline-none  rounded-[20px] p-2"
                  />
                </div>
                <div className="text-xs  w-[100%] md:w-[40%] text-white flex flex-col gap-2">
                  <label>Processing Time</label>
                  <input
                    style={{
                      background:
                        "linear-gradient(117deg, rgba(255, 255, 255, 0.00) -3.91%, rgba(255, 255, 255, 0.04) 75.27%)",
                    }}
                    name="processing_time"
                    value={formData.processing_time}
                    onChange={(e) => handleFormChange(e)}
                    placeholder="Enter Processing Time"
                    className="w-[100%] text-xs border outline-none  rounded-[20px] p-2"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* secondlayer */}

          <BankDetails gateways={gateways} setGateways={setGateways} />

          {/* thirdlayer */}

          <UserDetails formFields={formFields} setFormFields={setFormFields} />

          {/* fourthlayer */}
          <div className="w-[85%] mt-5 m-auto gap-4 flex flex-col md:flex-row justify-between">
            <div
              style={{
                background:
                  "linear-gradient(to bottom, rgba(6, 11, 40, 0.94), rgba(10, 14, 35, 0.49))",
              }}
              className="w-[100%%] md:w-[85%] rounded-[20px] h-[280px]"
            >
              <div className="w-[100%] flex flex-col pl-3 mt-5 px-2   gap-3 justify-between ">
                <p className="text-white text-sm font-bold ">
                  Deposit Instruction
                </p>
                <textarea
                  style={{
                    background:
                      "linear-gradient(117deg, rgba(255, 255, 255, 0.00) -3.91%, rgba(255, 255, 255, 0.04) 75.27%)",
                  }}
                  value={formData?.instruction}
                  onChange={(e) => handleFormChange(e)}
                  name="instruction"
                  placeholder="Instruction"
                  className="min-h-[170px] outline-none p-4 text-white rounded-[20px] border boder-[#FFF] bg-[none] "
                ></textarea>
              </div>
            </div>

            <div
              style={{
                background:
                  "linear-gradient(127deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)",
              }}
              className="w-[100%] md:w-[60%] rounded-[20px] h-[280px]"
            >
              <div className="w-[100%] flex flex-col pl-3 mt-5 px-2   gap-3 justify-between ">
                <p className="text-white text-sm font-bold ">Deposit Range</p>
                <div className="text-xs w-[90%] text-white flex flex-col gap-2">
                  <label>Min Limit</label>
                  <input
                    style={{
                      background:
                        "linear-gradient(117deg, rgba(255, 255, 255, 0.00) -3.91%, rgba(255, 255, 255, 0.04) 75.27%)",
                    }}
                    placeholder="Enter Min"
                    name="min_limit"
                    value={formData.min_limit}
                    onChange={(e) => handleFormChange(e)}
                    className="w-[100%] text-xs  border border-[#fff] outline-none rounded-[20px] p-2"
                  />
                </div>
                <div className="text-xs w-[90%] text-white flex flex-col gap-2">
                  <label>Max Limit</label>
                  <input
                    style={{
                      background:
                        "linear-gradient(117deg, rgba(255, 255, 255, 0.00) -3.91%, rgba(255, 255, 255, 0.04) 75.27%)",
                    }}
                    name="max_limit"
                    value={formData.max_limit}
                    onChange={(e) => handleFormChange(e)}
                    placeholder="Enter Max"
                    className="w-[100%] text-xs   border outline-none  rounded-[20px] p-2"
                  />
                </div>
                <div className="text-xs w-[90%] text-white flex flex-col gap-2">
                  <label>Bonus</label>
                  <input
                    style={{
                      background:
                        "linear-gradient(117deg, rgba(255, 255, 255, 0.00) -3.91%, rgba(255, 255, 255, 0.04) 75.27%)",
                    }}
                    name="bonus"
                    value={formData.bonus}
                    onChange={(e) => handleFormChange(e)}
                    placeholder="Enter Bonus"
                    className="w-[100%] text-xs   border outline-none  rounded-[20px] p-2"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* button */}
          <div className="w-[85%]  mt-6 m-auto">
            <button
              style={{
                background:
                  "linear-gradient(180deg, rgba(184, 207, 44, 0.20) 89.06%, rgba(160, 215, 71, 0.00) 100%), linear-gradient(180deg, rgba(229, 186, 30, 0.20) 0%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(90deg, #0A307E 0%, #7D2EF9 44.27%)",
              }}
              onClick={() => handleSubmitGateway()}
              className="p-3 text-white text-xs font-semibold w-[100%] rounded-[5px]"
            >
              {!addLoading ? (
                "Save Changes"
              ) : (
                <div className="flex justify-center items-center">
                  <div className="w-5 h-5 border-4 border-blue-500 rounded-full animate-spin"></div>
                </div>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainComponent;
