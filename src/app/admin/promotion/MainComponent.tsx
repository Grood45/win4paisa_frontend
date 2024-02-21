"use client";

import { AppDispatch, useAppSelector } from "@/app/redux-arch/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { fetchGetRequest, sendDeleteRequest, sendPostRequest } from "@/api/api";
import { PromotionData } from "../../../../utils/typescript.module";
import PromotionUpdateModal from "./component/PromotionUpdateModal";
import DeleteModel from "./component/DeleteModel";
import socketIOClient from "socket.io-client";
import AddModel from "./component/AddModel";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { RiDeleteBin5Fill } from "react-icons/ri";

const MainComponent = () => {
  const [promotions, setPromotions] = useState<PromotionData[]>([]);
  const [query, setQuery] = useState("all");
  const [invidualReadMore, setInvidualReadMore] = useState<PromotionData[]>();
  const [rulesTerm, setRulesTerm] = useState(1);
  const [DeleteId, setDeleteId] = useState<string>("");
  const [UpdateId, setUpdateId] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const fetchPromotions = async () => {
    try {
      const data = await fetchGetRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/promotion/get-all-promotion?type=${query}`
      );
      setPromotions(data.data);
     
    } catch (error) {
    }
  };
  useEffect(() => {
    fetchPromotions();
  }, [query]);

  const handleReadMore = (data: any) => {
    if (data) {
      setInvidualReadMore(data);
    }
  };

  const handleRulesTerms = (id: number) => {
    setRulesTerm(id);
  };

  const socket = socketIOClient(`${process.env.NEXT_PUBLIC_BASE_URL}`);

  const handleSendNotification = (data: any, user_id: string) => {
    let payload = JSON.stringify({ name: "suvam" });
    socket.emit("adminEvent", payload);
  };

  const handleDeleteId = (id: string) => {
    setDeleteId(id);
    onOpen();
  };

  const handleUpdateId = (id: string) => {
    setUpdateId(id);
  };

  const handleDelete = async () => {
    try {
      const response = await sendDeleteRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/promotion/delete-promotion/${DeleteId}`
      );
      // setLogoAndFav(response.data);

      const uodatedPromotion = promotions.filter(
        (ele: PromotionData) => ele._id !== DeleteId
      );
      setPromotions(uodatedPromotion);
      onClose();
    } catch (error: any) {
      toast({
        title: error?.data?.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="w-[100%] ">
      <div className="flex flex-col gap-10 w-[100%] mb-[80px]  lg:w-[95%] m-auto ">
        <div className="bg-[#050D28] r  w-[100%] p-3 lg:p-6  rounded-[16px]">
          <div className="flex w-[90%]  sm:w-[50%] text-white justify-center m-auto gap-4">
            <button
              onClick={() => setQuery("all")}
              className={`text-sm p-2 w-[90px] ${
                query === "all" ? "bg-[#0046BB]" : ""
              } rounded-[5px] border border-[#0046BB] `}
            >
              All
            </button>
            <button
              onClick={() => setQuery("sports")}
              className={`text-sm p-2 ${
                query === "sports" ? "bg-[#0046BB]" : ""
              }  w-[90px] border rounded-[5px] border-[#0046BB] `}
            >
              Sports
            </button>
            {/* <button onClick={() => handleSendNotification("", "123")}>
              send notification
            </button> */}
            <button
              onClick={() => setQuery("casino")}
              className={`text-sm ${
                query === "casino" ? "bg-[#0046BB]" : ""
              } p-2 w-[90px] rounded-[5px] border border-[#0046BB] `}
            >
              Casino
            </button>
          </div>

          <div className=" flex justify-end  mt-4 lg:mt-0 items-end">
            <AddModel />
          </div>
          <div className="mt-4 grid grid-cols-1 w-[100%] sm:grid-cols-2 gap-2">
            {promotions.length > 0 &&
              promotions.map((item) => {
                return (
                  <div
                    key={item._id}
                    className="p-3 rounded-[8px] cursor-pointer hover:border hover:border-[#0046BB] relative flex flex-col gap-4  bg-[#051B42]"
                  >
                    <img
                      className="rounded-[12px] h-[200px] w-[100%] "
                      src={item.image_url}
                      alt=""
                    />
                    <div className="absolute   pt-4 pl-6">
                      <p className="text-2xl font-semibold text-[#FFF]">
                        {item.title}
                      </p>
                      <p className="text-sm mt-1 font-semibold text-[#FFF]">
                        {item.full_name}
                      </p>
                    </div>
                    <div className="w-[100%]  flex justify-between">
                      <div className="flex flex-col gap-1">
                        <p className="text-[#FFF] text-sm">
                          {item.description}
                        </p>
                        <p className="text-xs text-gray-400">
                          {item.timestamp}
                        </p>
                      </div>
                      <div className="flex  items-center gap-2">
                        <div onClick={() => handleReadMore(item)} className="">
                          <PromotionUpdateModal
                            invidualReadMore={invidualReadMore}
                            id={item._id}
                          />
                        </div>

                        <div>
                          <button
                            onClick={() => handleDeleteId(item._id)}
                            className="flex items-center  p-2 rounded-[8px] text-xs font-semibold text-white bg-[#0046BB]"
                          >
                            <RiDeleteBin5Fill color="white" fontSize="15px" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            <DeleteModel
              onOpen={onOpen}
              onClose={onClose}
              isOpen={isOpen}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
