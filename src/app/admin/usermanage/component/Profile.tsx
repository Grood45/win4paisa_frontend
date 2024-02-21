"use client";
import Image from "next/image";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from "react";
import logo from "../../../../asset/profile/Frame 24 1.png";
import { AiOutlinePlus } from "react-icons/ai";
import { CircularProgress, Progress, useToast } from "@chakra-ui/react";
import { fetchGetRequest, sendPatchRequest } from "@/api/api";
import { useParams } from "next/navigation";

interface UserInterface {
  _id: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  user_id: string;
  email: string;
  state: string;
  phone: string;
  city: string;
  country: string;
  bank_name: string;
  bank_holder: string;
  account_number: string;
  ifsc_code: string;
  joined_at: string;
  updated_at: string;
  status: boolean;
  bet_supported: boolean;
  is_blocked: boolean;
  is_online: boolean;
  last_seen: string;
  profile_picture: string;
  referral_code: string;
  amount: number;
  exposure_limit: number;
  max_limit: number;
  min_limit: number;
  sms_verified: boolean;
  kyc_verified: boolean;
}

interface Props {
  userData: UserInterface;
  // Define other props if needed
}

const Profile: React.FC<Props> = ({ userData }) => {
  const [data, setData] = useState<UserInterface>();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserInterface>({
    _id: "",
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    user_id: "",
    email: "",
    state: "",
    phone: "",
    city: "",
    country: "",
    bank_name: "",
    bank_holder: "",
    account_number: "",
    ifsc_code: "",
    joined_at: "",
    updated_at: "",
    status: true,
    bet_supported: true,
    is_blocked: true,
    is_online: true,
    last_seen: "",
    profile_picture: "",
    referral_code: "",
    amount: 0,
    exposure_limit: 0,
    max_limit: 0,
    min_limit: 0,
    sms_verified: true,
    kyc_verified: true,
  });
  const param = useParams();
  const toast = useToast();

  const handleUpdate = async () => {
    setLoading(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/update-single-user/${param.id}`

    try {
      let response = await sendPatchRequest(url, formData);
      const data = response.data;
      setData(data);
      setLoading(false);
      toast({
        description: `${response.message}`,
        status: "success",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        description: `${error.message}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setFormData(userData);
  }, [param.id]);

  return (
    <div className="flex gap-4">
      <div className="flex flex-col w-[100%] gap-6">
        {/* wallet */}

        {/* <div
         style={{
            background:
              "linear-gradient(180deg, rgba(184, 207, 44, 0.20) 89.06%, rgba(160, 215, 71, 0.00) 100%), linear-gradient(180deg, rgba(229, 186, 30, 0.20) 0%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(90deg, #0A307E 0%, #7D2EF9 44.27%)",
            boxShadow: "18px 20px 12px 0px rgba(0, 0, 0, 0.25)",
          }}
         className=" balance w-[20%] h-[130px] rounded-md ">
            <div className="flex flex-col items-center balance gap-4 p-3 w-[100%]   ">
            <p className="text-white text-sm font-semibold">Wallet</p>
            <p className="text-white text-lg font-semibold">$ 3243</p>
            </div>
           
        </div> */}

        {/* basic info */}

        <div
          style={{
            background:
              "linear-gradient(127deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.50) 91.2%)",
            boxShadow: "18px 20px 12px 0px rgba(0, 0, 0, 0.25)",
          }}
          className="w-[100%] flex flex-col  justify-between m-auto mt-5  p-5 rounded-[20px] "
        >
          <p className="text-white text-sm  font-bold ">Basic Info</p>

          <div className="w-[100%]  grid grid-cols-2   mt-4   gap-3 justify-between ">
            <div className="text-xs w-[90%] text-white flex flex-col gap-2">
              <label>First Name</label>
              <input
                value={formData?.first_name}
                name="first_name"
                onChange={handleChange}
                style={{
                  background:
                    "linear-gradient(127deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.50) 91.2%)",
                  boxShadow: "18px 20px 12px 0px rgba(0, 0, 0, 0.25)",
                }}
                placeholder="First Name"
                className="w-[100%] text-xs border border-[#4A4F63]  outline-none rounded-[10px] p-2"
              />
            </div>
            <div className="text-xs  sm:w-[90%] text-white flex flex-col gap-1">
              <label>Last Name</label>
              <input
                name="last_name"
                value={formData?.last_name}
                onChange={handleChange}
                style={{
                  background:
                    "linear-gradient(127deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.50) 91.2%)",
                  boxShadow: "18px 20px 12px 0px rgba(0, 0, 0, 0.25)",
                }}
                placeholder="Last Name"
                className="w-[100%] text-xs   border  border-[#4A4F63]  outline-none  rounded-[10px] p-2"
              />
            </div>
            <div className="text-xs w-[90%] text-white flex flex-col gap-1">
              <label>Email</label>
              <input
                name="email"
                value={formData?.email}
                onChange={handleChange}
                style={{
                  background:
                    "linear-gradient(127deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.50) 91.2%)",
                  boxShadow: "18px 20px 12px 0px rgba(0, 0, 0, 0.25)",
                }}
                placeholder="Email"
                className="w-[100%] text-xs   border  border-[#4A4F63]  outline-none  rounded-[10px] p-2"
              />
            </div>
            <div className="text-xs w-[90%] text-white flex flex-col gap-1">
              <label>Phone</label>
              <input
                value={formData.phone}
                name="phone"
                onChange={handleChange}
                style={{
                  background:
                    "linear-gradient(127deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.50) 91.2%)",
                  boxShadow: "18px 20px 12px 0px rgba(0, 0, 0, 0.25)",
                }}
                placeholder="Phone Number"
                className="w-[100%] text-xs   border  border-[#4A4F63]  outline-none  rounded-[10px] p-2"
              />
            </div>
          </div>

          <div className=" flex gap-6 w-[100%] mt-4  m-auto">
            <div className="text-xs w-[40%] text-white flex flex-col gap-1">
              <label>City</label>
              <input
                name="city"
                value={formData?.city}
                onChange={handleChange}
                style={{
                  background:
                    "linear-gradient(127deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.50) 91.2%)",
                  boxShadow: "18px 20px 12px 0px rgba(0, 0, 0, 0.25)",
                }}
                placeholder="City"
                className="w-[100%] text-xs border border-[#4A4F63]  outline-none rounded-[10px] p-2"
              />
            </div>

            <div className="text-xs w-[20%] text-white flex flex-col gap-1">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                style={{
                  background:
                    "linear-gradient(127deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.50) 91.2%)",
                  boxShadow: "18px 20px 12px 0px rgba(0, 0, 0, 0.25)",
                }}
                placeholder="State"
                className="w-[100%] text-xs border border-[#4A4F63]  outline-none rounded-[10px] p-2"
              />
            </div>

            <div className="text-xs w-[20%] text-white flex flex-col gap-1">
              <label>Country</label>
              <input
                name="country"
                value={formData?.country}
                onChange={handleChange}
                style={{
                  background:
                    "linear-gradient(127deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.50) 91.2%)",
                  boxShadow: "18px 20px 12px 0px rgba(0, 0, 0, 0.25)",
                }}
                placeholder="Country"
                className="w-[100%] text-xs border border-[#4A4F63]  outline-none rounded-[10px] p-2"
              />
            </div>
          </div>
        </div>

        {/* Bank Details */}
        <div
          style={{
            background:
              "linear-gradient(127deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.50) 91.2%)",
            boxShadow: "12px 14px 12px 0px rgba(0, 0, 0, 0.25)",
          }}
          className="w-[100%] flex flex-col justify-between m-auto mt-3  p-5 rounded-[20px] "
        >
          <p className="text-white text-sm  font-bold ">Bank Details</p>

          <div className="w-[100%]  grid grid-cols-2   mt-4  pb-8  gap-3 justify-between ">
            <div className="text-xs w-[90%] text-white flex flex-col gap-2">
              <label>Bank Name</label>
              <input
                name="bank_name"
                value={formData?.bank_name}
                onChange={handleChange}
                style={{
                  background:
                    "linear-gradient(127deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.50) 91.2%)",
                  boxShadow: "18px 20px 12px 0px rgba(0, 0, 0, 0.25)",
                }}
                placeholder="Bank Name"
                className="w-[100%] text-xs border border-[#4A4F63]  outline-none rounded-[10px] p-2"
              />
            </div>
            <div className="text-xs w-[90%] text-white flex flex-col gap-1">
              <label>Bank Holder</label>
              <input
                name="bank_holder"
                value={formData?.bank_holder}
                onChange={handleChange}
                style={{
                  background:
                    "linear-gradient(127deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.50) 91.2%)",
                  boxShadow: "18px 20px 12px 0px rgba(0, 0, 0, 0.25)",
                }}
                placeholder="Bank Holder"
                className="w-[100%] text-xs   border  border-[#4A4F63]  outline-none  rounded-[10px] p-2"
              />
            </div>
            <div className="text-xs w-[90%] text-white flex flex-col gap-1">
              <label>Account Number</label>
              <input
                name="account_number"
                value={formData?.account_number}
                onChange={handleChange}
                style={{
                  background:
                    "linear-gradient(127deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.50) 91.2%)",
                  boxShadow: "18px 20px 12px 0px rgba(0, 0, 0, 0.25)",
                }}
                placeholder="Account Number"
                className="w-[100%] text-xs   border  border-[#4A4F63]  outline-none  rounded-[10px] p-2"
              />
            </div>
            <div className="text-xs w-[50%] text-white flex flex-col gap-1">
              <label>IFSC Code</label>
              <input
                value={formData?.ifsc_code}
                onChange={handleChange}
                style={{
                  background:
                    "linear-gradient(127deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.50) 91.2%)",
                  boxShadow: "18px 20px 12px 0px rgba(0, 0, 0, 0.25)",
                }}
                placeholder="IFSC Code"
                className="w-[100%] text-xs   border  border-[#4A4F63]  outline-none  rounded-[10px] p-2"
              />
            </div>
          </div>
        </div>


        {/* User withdraw Limit */}


        <div
          style={{
            background:
              "linear-gradient(127deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.50) 91.2%)",
            boxShadow: "12px 14px 12px 0px rgba(0, 0, 0, 0.25)",
          }}
          className="w-[100%] flex flex-col justify-between m-auto mt-3  p-5 rounded-[20px] "
        >
          <p className="text-white text-sm  font-bold ">Withdraw limit</p>

          <div className="w-[100%]  grid grid-cols-2   mt-4  pb-8  gap-3 justify-between ">
            <div className="text-xs w-[90%] text-white flex flex-col gap-2">
              <label>Min Limit</label>
              <input
                name="min_limit"
                value={formData?.min_limit}
                onChange={handleChange}
                style={{
                  background:
                    "linear-gradient(127deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.50) 91.2%)",
                  boxShadow: "18px 20px 12px 0px rgba(0, 0, 0, 0.25)",
                }}
                placeholder="Bank Name"
                className="w-[100%] text-xs border border-[#4A4F63]  outline-none rounded-[10px] p-2"
              />
            </div>
            <div className="text-xs w-[90%] text-white flex flex-col gap-1">
              <label>Max Limit</label>
              <input
                name="max_limit"
                value={formData?.max_limit}
                onChange={handleChange}
                style={{
                  background:
                    "linear-gradient(127deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.50) 91.2%)",
                  boxShadow: "18px 20px 12px 0px rgba(0, 0, 0, 0.25)",
                }}
                placeholder="Bank Holder"
                className="w-[100%] text-xs   border  border-[#4A4F63]  outline-none  rounded-[10px] p-2"
              />
            </div>
           
          </div>
        </div>


        {/* button */}
        <div className="w-[100%]  m-auto">
          <button
            onClick={handleUpdate}
            disabled={loading}
            style={{
              background:
                "linear-gradient(180deg, rgba(184, 207, 44, 0.20) 89.06%, rgba(160, 215, 71, 0.00) 100%), linear-gradient(180deg, rgba(229, 186, 30, 0.20) 0%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(90deg, #0A307E 0%, #7D2EF9 44.27%)",
            }}
            className="p-3 text-white text-xs font-semibold w-[100%] rounded-[5px]"
          >
            {loading ? <CircularProgress size={"15px"} /> : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;




// const socket = io('${process.env.NEXT_PUBLIC_BASE_URL}');

// const sendNotification = () => {
//   socket.emit('sendNotification', { message: notificationMessage });
//   setNotificationMessage(''); // Clear the input field after sending the notification
// };

// useEffect(() => {
//   // Listen for 'adminNotification' event
//   socket.on('adminNotification', (data) => {
//     // Update notifications in the state when a new notification is received
//     setNotifications([...notifications, data.message]);
//   });

//   // Clean up event listener on component unmount
//   return () => {
//     socket.disconnect();
//   };
// }, []);