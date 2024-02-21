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
import { useParams } from "next/navigation";
import { sendPatchRequest } from "@/api/api";


function SubtractBalance() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [amount, setAmount] = useState<any>(0);
  const [totalBalance, setTotalBalance] = useState(); 
const params=useParams()
const toast=useToast()
  const subtractBalance = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/substract-balance/${params.id}`; 
      const requestData = {
        amount: Number(amount), 
      };
      const response = await sendPatchRequest(url, requestData);
      setTotalBalance(response.data.amount);
      if(amount>0){
      toast({
        description: `${amount} Rs subtracted`,
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
    subtractBalance()
  },[])

  const handleSubtractBalance=()=>{
    subtractBalance()
  }

    return (
      <>
        <button
         onClick={onOpen}
                style={{
                  background:
                    " linear-gradient(90deg, #BD47E6 0%, #8E54E9 100%)",
                }}
                className="w-[100%] text-xs rounded-[5px] p-[7px]"
              >
                Subtract Balance
              </button>
       
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent style={{backgroundColor:'#061030',color:'white'}}>
            <ModalHeader className="text-center">Total Balance : {totalBalance}</ModalHeader>
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
          <Button colorScheme="" style={{backgroundColor:'green'}} mr={3} onClick={handleSubtractBalance}>
            Subtract
          </Button>
          <Button colorScheme="" style={{backgroundColor:'red'}} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default SubtractBalance