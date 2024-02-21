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
  useToast,
} from "@chakra-ui/react";
import { sendPatchRequest } from "@/api/api"; // Import your sendPatchRequest function
import { useParams } from "next/navigation";

function AddBalance() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [amount, setAmount] = useState<any>(0);
  const [totalBalance, setTotalBalance] = useState(); 
const params=useParams()
const toast=useToast()
  const addBalance = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/add-balance/${params.id}`; 
      const requestData = {
        amount: Number(amount), 
      };
      const response = await sendPatchRequest(url, requestData);
      setTotalBalance(response.data.amount);
      if(amount>0){
      toast({
        description: `${amount} Rs added`,
        status: "success",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
    }
      setAmount(0);
      onClose();
    } catch (error) {
    }
  };
  useEffect(()=>{
addBalance()
  },[])

  const handleAddBalance=()=>{
    addBalance()
  }

  return (
    <>
      <button
        onClick={onOpen}
        style={{
          background:
            "linear-gradient(90deg, #67E647 0%, #8E54E9 100%",
        }}
        className="w-[100%] text-xs rounded-[5px] p-[7px]"
      >
        Add Balance
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent style={{ backgroundColor: "#061030", color: "white" }}>
          <ModalHeader className="text-center">Total Balance: {totalBalance}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Enter Amount</FormLabel>
              <Input
                type="number"
                placeholder="Enter the amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              style={{ backgroundColor: "green" }}
              onClick={handleAddBalance}
            >
              Add
            </Button>
            <Button
              colorScheme="red"
              style={{ backgroundColor: "red",marginLeft:'10px' }}
              onClick={onClose}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddBalance;
