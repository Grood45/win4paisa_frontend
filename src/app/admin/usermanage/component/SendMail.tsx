'use client'
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { sendPostRequest } from "@/api/api";

function SendMail() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("")
  const toast=useToast()
const params=useParams()
  const handleTitleChange = (e:any) => {
    setTitle(e.target.value);
  };

  const handleMessageChange = (e:any) => {
    setMessage(e.target.value);
  };


  const sendMessage = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/send-mail/${params.id}`; 
      const requestData:any = {
        subject: title,
        message: message,
      };
      const response = await sendPostRequest(url, requestData);
      toast({
        description: `message send successfully`,
        status: "success",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      onClose();  
    } 
    catch (error) {
    }
  };


 

  const handleSubmit=()=>{
    sendMessage()
  }

  return (
    <>
      <button
        onClick={onOpen}
        style={{
          background: "linear-gradient(90deg, #8D47E6 0%, #8E54E9 100%)",
        }}
        className="w-[100%] text-xs rounded-[5px] p-[7px]"
      >
        Send Mail
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent style={{ backgroundColor: "#061030", color: "white" }}>
          <ModalHeader className="text-center">Send Message</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={handleTitleChange}
              />
              <Textarea
                marginTop="10"
                placeholder="Write something here...."
                value={message}
                onChange={handleMessageChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" onClick={handleSubmit}>
              Send
            </Button>
            <Button colorScheme="red" marginLeft={'4px'} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SendMail;
