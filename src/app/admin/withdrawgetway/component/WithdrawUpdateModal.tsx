"use client";
import React, { useEffect, useRef, useState } from "react";
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
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import "react-quill/dist/quill.snow.css";
import { sendPatchRequest, sendPostRequest } from "@/api/api";
import { PromotionData } from "../../../../../utils/typescript.module";
// import dynamic from "next/dynamic";
// import "react-quill/dist/quill.snow.css";
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function WithdrawUpdateModal({ data, id }: { data: any; id: any }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [promotions, setPromotions] = useState<PromotionData[]>([]);
  const toast = useToast();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
const[imageLoading,setImageLoading]=useState(false)
  const [gateway,setGetway]=useState<any>(data?.gateway||'')
  const [bonus,setBonus]=useState<any>(data?.bonus||'')
   const [image, setImageUrl] = useState<any>(data?.image || "");
   const [currency, setCurrency] = useState<any>(data?.currency || "");
   const [instruction, setInstruction] = useState<any>(data?.instruction || "");
  const [min_limit,setMinLimit]=useState<any>(data?.min_limit||'')
  const [max_limit,setMaxLimit]=useState<any>(data?.max_limit||'')
  const [processing_time,setProcessingTime]=useState<any>(data?.processing_time||'')
  const [status,setStatus]=useState<any>(data?.status||'')
  const [type,setType]=useState<any>(data?.type||'')


  const handleGatewayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGetway(e.target.value);
  };
  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };

  const handleMinLimit = (e: any) => {
    setMinLimit(e.target.value);
  };
  const handleMaxLimit = (e: any) => {
    setMaxLimit(e.target.value);
  };
  const handleStatusChange = (e: any) => {
    setStatus(e.target.value);
  };
  const handleInstructionChange = (e: any) => {
    setInstruction(e.target.value);
  };
  const handleCurrencyChange=(e:any)=>{
    setCurrency(e.target.value)
  }
  const handleProcessingChange=(e:any)=>{
    setProcessingTime(e.target.value)
  }

  const handleBonusChange=(e:any)=>{
    setBonus(e.target.value)
  }

  const handleImageUrlChange = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const imageurl = await handleImageUpload(file);
      setImageUrl(imageurl);
    }
  };

  const handleImageUpload = async (file: File) => {
    setImageLoading(true);
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
        setImageLoading(false);
        return response.url;
      }
    } catch (error: any) {
      toast({
        title: error?.data?.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setImageLoading(false);
      return null;
    }
  };


  useEffect(() => {
    if (data) {
      setGetway(data.gateway || "");
      setType(data.type || "");
      setInstruction(data.instruction || "");
      setImageUrl(data.image || "");
      setMinLimit(data.min_limit || "");
      setMaxLimit(data.max_limit || "");
      setStatus(data.status || "");
      setBonus(data.bonus || "");
      setCurrency(data.currency || "");
      setProcessingTime(data.processing_time || "");

    }
  }, [data]);


  const handleUpdate = async () => {
    try {
      const response_date: any = {
        gateway,
        bonus,
        type,
        instruction,
        min_limit,
        max_limit,
        image,
        processing_time,
        currency,
        status
        
      };
      const response = await sendPatchRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/update-payment-method/${id}`,
        response_date
      );
      toast({
        title: `updated succesfully`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
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
    <>
     
      <button onClick={onOpen} className="text-[10px] w-[40%]  rounded-lg p-1 px-2 text-white border">
                      VIEW ALL
                    </button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "full", md: "5xl" }}
      >
        <ModalOverlay />
        <ModalContent style={{ backgroundColor: "#081C52", fontSize: "12px" }}>
          <ModalHeader textAlign={"center"} color={"white"}>
            Update Details here
          </ModalHeader>
          <ModalBody pb={4} style={{ backgroundColor: "#081C52" }}>
            <FormControl color={"white"}>
              <FormLabel>Gateway Name</FormLabel>
              <Input
                value={gateway}
                onChange={handleGatewayChange}
                placeholder="enter gateway name"
              />
            </FormControl>
            <FormControl color={"white"} mt={4}>
              <FormLabel>Status</FormLabel>
              <Input
                value={status}
                onChange={handleStatusChange}
                 type='boolean'
                placeholder="status"
              />
            </FormControl>

            <FormControl color={"white"} mt={4}>
              <FormLabel>Bonus</FormLabel>
              <Input
                value={bonus}
                onChange={handleBonusChange}
                placeholder="enter bonus"
              />
            </FormControl>
            <FormControl color={"white"} mt={4}>
              <FormLabel>Type</FormLabel>
              <Input
                value={type}
                onChange={handleTypeChange}
                placeholder="type"
              />
            </FormControl>


            <FormControl color={"white"} mt={4}>
              <FormLabel>Currency</FormLabel>
              <Input value={currency} 
                            onChange={handleCurrencyChange}
              placeholder="type" />
            </FormControl>
            <FormControl color={"white"} mt={4}>
              <FormLabel> Instruction</FormLabel>
              <Input
                value={instruction}
                onChange={handleInstructionChange}
                placeholder="enter instruction"
              />
            </FormControl>
            <FormControl color={"white"} mt={4}>
              <FormLabel>Min Limit</FormLabel>
              <Input
                value={min_limit}
                onChange={handleMinLimit}
                placeholder="enter minimum limit"
                type="number"
              />
            </FormControl>
            <FormControl color={"white"} mt={4}>
              <FormLabel>Max Limit</FormLabel>
              <Input
                value={max_limit}
                onChange={handleMaxLimit}
                placeholder="enter maximum limit"
                type="number"
              />
            </FormControl>
            <FormControl color={"white"} mt={4}>
              <FormLabel>Processibng Time</FormLabel>
              <Input
                value={processing_time}
                onChange={handleProcessingChange}
                placeholder="enter processing limit"
                type="number"
              />
            </FormControl>
            <FormControl color={"white"} mt={4}>
              <FormLabel>Image Url</FormLabel>
              <div>
                <input type="file" onChange={handleImageUrlChange} />
                {image && (
                  <div>
                    <img src={image} alt="Selected Image" />
                  </div>
                )}
              </div>
            </FormControl>
           
            

            {/* <div className="mt-8">
              <ReactQuill
                value={rules}
                onChange={handleRulesChange}
                placeholder="enter rules here"
                modules={{
                  toolbar: [
                    [{ header: "1" }, { header: "2" }, { font: [] }],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["bold", "italic", "underline"],
                    ["link", "image"],
                    ["clean"],
                  ],
                }}
                style={{ height: "200px", width: "100%", color: "white" }}
              />
            </div>
            <div className="mt-8">
              <ReactQuill
                value={tc}
                placeholder="enter terms and condition here"
                onChange={handleTcChange}
                modules={{
                  toolbar: [
                    [{ header: "1" }, { header: "2" }, { font: [] }],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["bold", "italic", "underline"],
                    ["link", "image"],
                    ["clean"],
                  ],
                }}
                style={{ height: "200px", width: "100%", color: "white" }}
              />
            </div> */}
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={handleUpdate}
              style={{ backgroundColor: "green", marginTop: "20px" }}
              color={"white"}
              mr={3}
            >
              Update
            </Button>
            <Button
              onClick={onClose}
              colorScheme=""
              style={{ backgroundColor: "red", marginTop: "20px" }}
              color={"white"}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default WithdrawUpdateModal;
