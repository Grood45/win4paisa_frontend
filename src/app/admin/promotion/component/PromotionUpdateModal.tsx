
'use client'
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
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

function PromotionUpdateModal({ invidualReadMore,id }: { invidualReadMore: any,id:any }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [promotions, setPromotions] = useState<PromotionData[]>([]);
const toast=useToast()
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [title, setTitle] = useState<string>(invidualReadMore?.title || "");
  const [description, setDescription] = useState<string>(
    invidualReadMore?.description || ""
  );
  const [type, setType] = useState<string>(
    invidualReadMore?.type || ""
  );
  const [full_name,setFullName]=useState<any>((invidualReadMore?.full_name || ""))
  const [image_url, setImageUrl] = useState<string>(
    invidualReadMore?.image_url || ""
  );
  const [imageLoading,setImageLoading]=useState(false)
  const [open_date,setOpenDate]=useState<any>(invidualReadMore?.open_date || "")
  const [end_date,setEndDate]=useState<any>(invidualReadMore?.end_date || "")

  const [rules, setRules] = useState<string>(invidualReadMore?.rules || "")
  const [tc, setTc] = useState<string>(invidualReadMore?.tc || "")


  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
const handleType=(e: React.ChangeEvent<HTMLInputElement>)=>{
  setType(e.target.value)
}

const handleOpenDate=(e:any)=>{
  setOpenDate(e.target.value)

}
const handleEndDate=(e:any)=>{
  setEndDate(e.target.value)

}
const handleFuleName=(e:any)=>{
  setFullName(e.target.value)

}
  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };

 
  const handleImageUrlChange =async (event:any) => {
    const file = event.target.files[0];

    if (file) {
    const imageurl=await handleImageUpload(file)
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

  const handleRulesChange = (value: string) => {
    setRules(value);
  };


  const handleTcChange = (value: string) => {
    setTc(value);
  };

  useEffect(() => {
    if (invidualReadMore) {
      setTitle(invidualReadMore.title || "");
      setType(invidualReadMore.type || "");
      setRules(invidualReadMore.rules ||'')
      setTc(invidualReadMore.tc ||'')

      setDescription(invidualReadMore.description || "");
      setImageUrl(invidualReadMore.image_url || "");
      setOpenDate(invidualReadMore.open_date || "");
      setEndDate(invidualReadMore.end_date || "");
      setFullName(invidualReadMore.full_name || "");


    }
  }, [invidualReadMore]);


  const handleUpdate = async () => {
    try {
      const response_date:any={
    title,
    full_name,
    type,
    description,
    open_date,
    end_date,
  image_url,
  rules,tc
      }
      const response = await sendPatchRequest(`${process.env.NEXT_PUBLIC_BASE_URL}/api/promotion/update-promotion/${id}`,response_date);
      toast({
        title:`updated succesfully`,
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
      <button
        onClick={onOpen}
        className="flex items-center  p-2 rounded-[8px] text-xs font-semibold text-white bg-[#0046BB]"
      >
        <FaEdit color="white" fontSize="15px" />
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
              <FormLabel>Title</FormLabel>
              <Input
               
               
                value={title}
                onChange={handleTitleChange}
                placeholder="Title"
              />
            </FormControl>
  
            <FormControl color={"white"} mt={4}>
              <FormLabel>Full Name</FormLabel>
              <Input
                value={full_name}
                onChange={handleFuleName}
                placeholder="full Name"
              />
            </FormControl>
           
            <FormControl color={"white"} mt={4}>
              <FormLabel>Type</FormLabel>
              <Input
                value={type}
                onChange={handleType}
                placeholder="type"
              />
            </FormControl>
            <FormControl color={"white"} mt={4}>
              <FormLabel> Description</FormLabel>
              <Input
                value={description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                placeholder="Description"
              />
            </FormControl>
            <FormControl color={"white"} mt={4}>
              <FormLabel>Open Date</FormLabel>
              <Input
                value={open_date}
                onChange={handleOpenDate}
                placeholder="open_date"
                type='date'
              />
            </FormControl>
            <FormControl color={"white"} mt={4}>
              <FormLabel>End Date</FormLabel>
              <Input
                value={end_date}
                onChange={handleEndDate}
                placeholder="End_date"
                type='date'
              />
            </FormControl>

          
            <FormControl color={"white"} mt={4}>
              <FormLabel>Image Url</FormLabel>
              <div>
      <input type="file" onChange={handleImageUrlChange} />
      {image_url && (
        <div>
          <img src={image_url} alt="Selected Image" />
        </div>
      )}
    </div>
            </FormControl>

            <div className="mt-8">
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
            </div>
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

export default PromotionUpdateModal;
