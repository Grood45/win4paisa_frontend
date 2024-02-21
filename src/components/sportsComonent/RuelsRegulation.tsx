
'use client'

import { fetchGetRequest, sendPatchRequest } from "@/api/api";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";


const RulesRegulation = () => {
  // Define state variable for the form fields
  const [formData, setFormData] = useState<any>({
    stake_limit_min: "",
    stake_limit_max: "",
    max_profit: "",
    rules: "",
    fancy_stake_limit_min: "",
    fancy_stake_limit_max: "",
    fancy_max_profit: "",
    fancy_rules: "",
  });
  const toast = useToast();
  const GetData = async () => {
    try {
      const response = await fetchGetRequest(
        `https://power-db-database.onrender.com/api/sport/get-rules`
      );
      let data = response.data[0];
      setFormData(data);
    } catch (error) {
      toast({
        title: "Fetch data.",
        description: "Something went wrong.",
        status: "error",
        position: "top",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  // Handle changes in the form fields
  const handleFormChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const id = formData._id;
    try {
      const response = await sendPatchRequest(
        `https://power-db-database.onrender.com/api/sport/update-rules/${id}`,
        formData
      );
      let data = response.data[0];
      toast({
        title: "Update data.",
        description: `${response.message}`,
        status: "success",
        position: "top",
        duration: 4000,
        isClosable: true,
      });
    } catch (error:any) {
      toast({
        title: "Update data.",
        description: `${error.response.data.error}`,
        status: "error",
        position: "top",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Box>
        <Flex
          as="nav"
          justify="space-between"
          align="center"
          padding="1rem"
          paddingLeft="2rem"
          bg="none"
          color="white"
          rounded="lg"
        >
          <Box className="mt-5">
            <Text className="text-gray-500 font-medium">
              Pages / <span className="text-gray-600">Rule and Limit Bet </span>
            </Text>
            <Text className="font-bold text-[#344767] text-left text-lg sm:text-lg ">
              Rule and Limit Bet
            </Text>
          </Box>
        </Flex>
      </Box>
      <Box
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
        className="rounded-xl p-5 gap-6 w-[96%] m-auto"
      >
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: 10 }}>
          <Flex
            direction="column"
            align="flex-start" // Align vertically to the start
            className=" w-[100%] flex gap-2"
          >
            <Text className="font-bold mb-4 text-[#344780] text-xl text-center flex m-auto">
              RULE AND LIMIT BET
            </Text>
            <FormControl mb={4} isRequired>
              <FormLabel style={{ fontWeight: "400", fontSize: "13px" }}>
                Stake Limit Min
              </FormLabel>
              <Input
                type="number"
                name="stake_limit_min"
                value={formData.stake_limit_min}
                onChange={handleFormChange}
                placeholder="Stake Limit Min"
                required
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel style={{ fontWeight: "400", fontSize: "13px" }}>
                Stake Limit Max
              </FormLabel>
              <Input
                type="number"
                name="stake_limit_max"
                value={formData.stake_limit_max}
                onChange={handleFormChange}
                placeholder="Stake Limit Max"
                required
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel style={{ fontWeight: "400", fontSize: "13px" }}>
                Max Profit
              </FormLabel>
              <Input
                type="number"
                name="max_profit"
                value={formData.max_profit}
                onChange={handleFormChange}
                placeholder="Max Profit"
                required
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel style={{ fontWeight: "400", fontSize: "13px" }}>
                Rules
              </FormLabel>
              <Textarea
                name="rules"
                value={formData.rules}
                onChange={handleFormChange}
                placeholder="Bookmaker Rule"
                required
              />
            </FormControl>
            <Button
              type="submit"
              marginTop={"10px"}
              colorScheme=""
              bgColor={"#E91E63"}
              width={"25%"}
            >
              Save
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};

export default RulesRegulation;
