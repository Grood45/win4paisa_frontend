"use client";
import React, { useState } from "react";
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
import "react-quill/dist/quill.snow.css";
import { BiSolidBookAdd } from "react-icons/bi";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { sendPostRequest } from "@/api/api";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
function AddModel() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [add, setAdd] = useState({});
  const [title, setTitle] = useState<string>("");
  const [full_name, setFullName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [open_date, setOpenDate] = useState<string>("");
  const [end_date, setEndDate] = useState<string>("");
  const [image_url, setImageUrl] = useState<string>("");
  const [rules, setRules] = useState<string>("");
  const [tc, setTc] = useState<string>("");

  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const toast = useToast();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleOpenDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpenDate(e.target.value);
  };
  const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
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
const handleTypeChange=(e:any)=>{
setType(e.target.value)
}


  const handleAdd = async () => {
    try {
      const response_data = {
        admin_id:'1',
        title,
        full_name,
        type,
        description,
        open_date,
        end_date,
        image_url,rules,tc
       
      };
     
      const response = await sendPostRequest(`${process.env.NEXT_PUBLIC_BASE_URL}/api/promotion/create-promotion`,response_data);
     
      if(response.success){
        toast({
          title:`added succesfully`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setTitle("");
      setFullName("");
      setType("");
      setDescription("");
      setOpenDate("");
      setEndDate("");
      setImageUrl('');
      setRules('');
      setTc('')
      }
      
  
      onClose();
    } catch (error: any) {
      toast({
        title:error?.data?.message,
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
        className={`text-sm  p-2  rounded-[5px] flex items-center gap-2 text-white border  `}
      >
        <BiSolidBookAdd color="white" fontSize="20px" /> Add
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
            Add New Offers
          </ModalHeader>
          <ModalBody pb={4} style={{ backgroundColor: "#081C52" }}>
            <FormControl color={"white"}>
              <FormLabel>Title</FormLabel>
              <Input
                ref={initialRef}
                value={title}
                onChange={handleTitleChange}
                placeholder="Title"
              />
            </FormControl>

            <FormControl color={"white"} mt={4}>
              <FormLabel>Full Name</FormLabel>
              <Input
                value={full_name}
                onChange={handleFullName}
                placeholder="Full Name"
              />
            </FormControl>
            <FormControl color={"white"} mt={4}>
              <FormLabel> Type</FormLabel>
              <Input
                value={type}
                onChange={handleTypeChange}
                placeholder="type"
              />
            </FormControl>
            <FormControl color={"white"} mt={4}>
              <FormLabel> Description</FormLabel>
              <Input
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Description"
              />
            </FormControl>
            <FormControl color={"white"} mt={4}>
              <FormLabel>Open Date</FormLabel>
              <Input
                value={open_date}
                onChange={handleOpenDate}
                type="date"
                color={"white"}
                placeholder="open_date"
              />
            </FormControl>
            <FormControl color={"white"} mt={4}>
              <FormLabel>End Date</FormLabel>
              <Input
                value={end_date}
                onChange={handleEndDate}
                type="date"
                color={"white"}
                placeholder="end_date"
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
              onClick={handleAdd}
              style={{ backgroundColor: "green", marginTop: "20px" }}
              color={"white"}
              mr={3}
            >
              Add
            </Button>
            <Button
              onClick={onClose}
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

export default AddModel;
