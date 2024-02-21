"use client";

import { fetchGetRequest, sendPatchRequest, sendPostRequest } from "@/api/api";
import {
  Button,
  CircularProgress,
  Input,
  Select,
  Switch,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Rules } from "../../../../utils/typescript.module";

const MainComponent = () => {
  const [country, setCountry] = useState("");
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [rules, setRules] = useState<Rules>({
    _id: "652a38fb2a2e359a326f3cd3",
    title: "",
    agree_policy: true,
    bet_max: 1000,
    bet_min: 10,
    color: "#FF5733",
    currency: "",
    currency_symbol: "$",
    email_notification: true,
    email_verification: true,
    force_secure_password: true,
    force_ssl: true,
    max_profit: 5000,
    min_profit: 0, // Replace with an appropriate value
    sms_notification: false,
    sms_verification: false,
    strong_password: true,
    timezone: "India",
    user_registration: true,
    user_resistration: false, // Typo in the property name, assuming you meant 'user_registration'
    withdraw_max: 2000,
    withdraw_min: 50,
    bet_timing: 4000,
  });

  const fetchGeneralSetting = async () => {
    try {
      const data = await fetchGetRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/rules/get-rules/652a38fb2a2e359a326f3cd3`
      );

      setRules(data.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchGeneralSetting();
  }, []);

  const handleUpdateRule = async () => {
    setLoading(true);
    const payload = { ...rules, counntry: country };
    try {
      const response = await sendPatchRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/rules/update-rules/652a38fb2a2e359a326f3cd3`,
        payload
      );
      let data = response.data;
      setRules(data);
      setLoading(false);
      toast({
        title: response.message,
        status: "success",
        position: "top",
        duration: 4000,
        isClosable: true,
      });
    } catch (error: any) {
      setLoading(false);
      toast({
        title: error.message,
        status: "error",
        position: "top",
        duration: 4000,
        isClosable: true,
      });
    }
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setRules({ ...rules, [name]: value });
  };
  const handleCountry = (e: any) => {
    setCountry(e.target.value);
  };

  const [selectedColor, setSelectedColor] = useState("#003FA7");
  const handleColorChange = (e: any) => {
    setSelectedColor(e.target.value);
  };
  const handleSwitch = (e: any) => {
    const { name, checked } = e.target;
    setRules({ ...rules, [name]: checked });
  };

  return (
    <div className="p-4">
      <p className="font-semibold text-white text-lg">General Setting</p>
      <div className=" rounded-[8px] px-5 py-6 bg-[#0F1535] mt-4 w-[100%]  ">
        <div className="grid  sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex w-[100%] flex-col gap-2">
            <p className="text-gray-400 text-xs text-semibold">Site Title</p>
            <Input
              style={{ outline: "none", border: "2px solid #003FA7" }}
              placeholder="Baji Live"
              name="title"
              value={rules?.title}
              onChange={handleChange}
              className="outline-none text-white text-sm"
            />
          </div>
          <div className="flex w-[100%] flex-col gap-2">
            <p className="text-gray-400 text-xs text-semibold">Currency</p>
            <Input
              style={{ outline: "none", border: "2px solid #003FA7" }}
              placeholder="currency"
              name="currency"
              value={rules?.currency}
              onChange={handleChange}
              className="outline-none text-white text-sm"
            />
          </div>
          <div className="flex w-[100%] flex-col gap-2">
            <p className="text-gray-400 text-xs text-semibold">
              Currency Symbol
            </p>
            <Input
              style={{ outline: "none", border: "2px solid #003FA7" }}
              placeholder="currency symbol"
              name="currency_symbol"
              value={rules?.currency_symbol}
              onChange={handleChange}
              className="outline-none text-white text-sm"
            />
          </div>
          <div className="flex w-[100%] flex-col gap-2">
            <p className="text-gray-400 text-xs text-semibold">Timezone</p>
            <Select
              style={{ border: "2px solid #003FA7" }}
              onChange={handleCountry}
              color={"white"}
              placeholder="Select a time zone"
              value={rules?.timezone}
            >
              <option value="Asia/Dhaka">Asia/Dhaka</option>

              <option value="Asia/Dubai">Asia/Dubai</option>
              <option value="Asia/Colombo">Asia/Colombo</option>
              {/* Add more options here if needed */}
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 mt-6 gap-4">
          <div className="flex w-[100%] flex-col gap-2">
            <p className="text-gray-400 text-xs text-semibold">
              Site Base Color
            </p>
            <div className="outline-none border-2 flex items-center rounded-md border-[#003FA7]  text-sm">
              <input
                type="color"
                value={rules?.color}
                onChange={handleColorChange}
                className="w-[80px]"
              />

              <span className="text-white pl-3  p-[7px]">{selectedColor}</span>
            </div>
          </div>
          <div className="flex w-[100%] flex-col gap-2">
            <p className="text-gray-400 text-xs text-semibold">
              Bet Minimum Limit
            </p>
            <Input
              style={{ outline: "none", border: "2px solid #003FA7" }}
              placeholder="Bet Minimum Limit"
              name="bet_min"
              type="number"
              value={rules?.bet_min}
              onChange={handleChange}
              className="outline-none text-white text-sm"
            />
          </div>
          <div className="flex w-[100%] flex-col gap-2">
            <p className="text-gray-400 text-xs text-semibold">
              Bet Maximum Limit
            </p>
            <Input
              style={{ outline: "none", border: "2px solid #003FA7" }}
              placeholder="Bet Maximum Limit"
              name="bet_max"
              value={rules?.bet_max}
              onChange={handleChange}
              type="number"
              className="outline-none text-white text-sm"
            />
          </div>
          <div className="flex w-[100%] flex-col gap-2">
            <p className="text-gray-400 text-xs text-semibold">Bet Timing</p>
            <Input
              style={{ outline: "none", border: "2px solid #003FA7" }}
              placeholder="Bet Maximum Limit"
              value={rules?.bet_timing}
              name="bet_timing"
              onChange={handleChange}
              type="number"
              className="outline-none text-white text-sm"
            />
          </div>
        </div>

        <div className="flex grid-cols-1 md:grid-cols-2 mt-6 gap-4">
          <div className="flex w-[100%] flex-col gap-2">
            <p className="text-gray-400 text-xs text-semibold">
              Withdraw Minimum Limit
            </p>
            <Input
              style={{ outline: "none", border: "2px solid #003FA7" }}
              placeholder="Withdraw Minimum Limit"
              value={rules?.withdraw_min}
              type="number"
              className="outline-none text-white text-sm"
            />
          </div>
          <div className="flex w-[100%] flex-col gap-2">
            <p className="text-gray-400 text-xs text-semibold">
              Withdraw Maximum Limit
            </p>
            <Input
              style={{ outline: "none", border: "2px solid #003FA7" }}
              placeholder="Withdraw Maximum Limit"
              type="number"
              value={rules?.withdraw_max}
              onChange={handleChange}
              name="withdraw_max"
              className="outline-none text-white text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-6 gap-4">
          <div className="flex w-[100%] flex-col gap-2">
            <p className="text-gray-400 text-xs text-semibold">
              Force Secure Password
            </p>
            <Switch
              isChecked={rules?.force_secure_password === true ? true : false}
              colorScheme="blue"
              name="force_secure_password"
              onChange={handleSwitch}
              size="lg"
            />
          </div>
          <div className="flex w-[100%] flex-col gap-2">
            <p className="text-gray-400 text-xs text-semibold">Agree policy</p>
            <Switch
              isChecked={rules?.agree_policy === true ? true : false}
              colorScheme="blue"
              name="agree_policy"
              onChange={handleSwitch}
              size="lg"
            />
          </div>
          <div className="flex w-[100%] flex-col gap-2">
            <p className="text-gray-400 text-xs text-semibold">
              User Registration
            </p>
            <Switch
              isChecked={rules?.user_registration === true ? true : false}
              colorScheme="blue"
              name="user_registration"
              onChange={handleSwitch}
              size="lg"
            />
          </div>
          <div className="flex w-[100%] flex-col gap-2">
            <p className="text-gray-400 text-xs text-semibold">Force SSL</p>
            <Switch
              isChecked={rules?.force_ssl === true ? true : false}
              colorScheme="blue"
              name="force_ssl"
              onChange={handleSwitch}
              size="lg"
            />
          </div>
          <div className="flex w-[100%] flex-col gap-2">
            <p className="text-gray-400 text-xs text-semibold">
              Email Verification
            </p>
            <Switch
              isChecked={rules?.email_verification === true ? true : false}
              colorScheme="blue"
              name="email_notification"
              onChange={handleSwitch}
              size="lg"
            />
          </div>
          <div className="flex w-[100%] flex-col gap-2">
            <p className="text-gray-400 text-xs text-semibold">
              Email Notification
            </p>
            <Switch
              isChecked={rules?.email_notification === true ? true : false}
              colorScheme="blue"
              name="email_notification"
              onChange={handleSwitch}
              size="lg"
            />
          </div>
          <div className="flex w-[100%] flex-col gap-2">
            <p className="text-gray-400 text-xs text-semibold">
              SMS Verification
            </p>
            <Switch
              isChecked={rules?.sms_notification === true ? true : false}
              colorScheme="blue"
              name="sms_notification"
              onChange={handleSwitch}
              size="lg"
            />
          </div>
          <div className="flex w-[100%] flex-col gap-2">
            <p className="text-gray-400 text-xs text-semibold">
              SMS Notification
            </p>
            <Switch
              isChecked={rules?.sms_verification === true ? true : false}
              colorScheme="blue"
              name="sms_verification"
              onChange={handleSwitch}
              size="lg"
            />
          </div>
          <div className="flex w-[100%] flex-col gap-2">
            <p className="text-gray-400 text-xs text-semibold">
              Strong Password
            </p>
            <Switch
              isChecked={rules?.strong_password === true ? true : false}
              colorScheme="blue"
              name="strong_password"
              onChange={handleSwitch}
              size="lg"
            />
          </div>
        </div>

        <Button
          onClick={handleUpdateRule}
          style={{
            backgroundColor: "#003FA7",
            marginTop: "15px",
            color: "white",
          }}
          className="w-[100%] rounded-lg"
        >
          {loading ? (
            <CircularProgress isIndeterminate color="blue.300" />
          ) : (
            "Save Change"
          )}
        </Button>
      </div>
    </div>
  );
};

export default MainComponent;
