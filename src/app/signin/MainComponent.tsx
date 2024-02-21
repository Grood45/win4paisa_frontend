"use client";
import React, { FormEvent, useEffect, useState } from "react";
import "../admin/admin.css";

import { useDispatch } from "react-redux";
import { loginAsync } from "../redux-arch/adminauth/auth.slice";
import { ThunkDispatch } from "redux-thunk";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
const MainComponent: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const toast = useToast();
  const router = useRouter();
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const ans = await dispatch(loginAsync({ email, password }));
      if (ans.payload.success) {
        toast({
          title: ans.payload.message,
          status: "success",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
        router.push("/admin/dashboard");
      } else if (!ans.payload.success && ans.payload.status === "401") {
        toast({
          title: ans.payload.message,
          status: "warning",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
      } else {
        toast({
          title: ans.payload.message,
          status: "error",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Login Error: ", error);
      toast({
        title: "An error occurred during login.",
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    
    <div className="w-[100%]  flex  min-h-[100vh]">
      {/* Left side of the page */}
      <div className="lg:contents hidden">
        <div className="w-[50%]   flex justify-center items-center sign-bg">
          {/* <div>
            <h2 className="block text-center text-xl font-bold text-[10px] text-[#FFF]">
              Welcome!
            </h2>
            <p className="block text-center text-lg mb-4 font-medium text-[10px] text-[#FFF]">
              Bajivai 
            </p>
          </div> */}
        </div>
      </div>
      {/* Right side of the page */}

      <div className="w-[100%] adminsign  lg:w-[50%] flex flex-col items-center justify-center">
        {/* Your right side content */}
        <div>
          <h2 className="block text-center text-xl font-bold text-[10px] text-[#FFF]">
            Welcome!
          </h2>
          <p className="block text-center text-lg mb-4 font-medium text-[10px] text-[#FFF]">
            WinPride
          </p>
        </div>
        <form
          onSubmit={handleLogin}
          className="p-8 admin-form rounded-[20px]  shadow-lg w-80 sm:w-96 border border-gray-300"
        >
          <div className="mt-5 flex flex-col gap-1">
            <label className="block font-medium text-[10px] text-[#FFF]">
              Email
            </label>
            <input
              style={{
                background:
                  "linear-gradient(124deg, rgba(255, 255, 255, 0.00) -22.38%, rgba(255, 255, 255, 0.04) 70.38%)",
              }}
              type="email"
              className="w-full border border-[#FFF] p-3 rounded-[20px] text-xs text-gray-300 outline-none"
              placeholder="Your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-5 flex flex-col gap-1">
            <label className="block font-medium text-[10px] text-[#FFF]">
              Password
            </label>
            <input
              style={{
                background:
                  "linear-gradient(124deg, rgba(255, 255, 255, 0.00) -22.38%, rgba(255, 255, 255, 0.04) 70.38%)",
              }}
              type="password"
              className="w-full border border-[#FFF] p-3 rounded-[20px] text-xs text-gray-300 outline-none"
              placeholder="Your password"
              value={password}
              required
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#0075FF] mt-10 mb-6 text-white p-2 rounded-[12px] w-full hover:bg-blue-600 focus:outline-none"
          >
            {loading ? "....." : "Login"}
          </button>
        </form>
        <div className="mt-2">
          <p className="block text-center mt-6 font-medium text-[12px] text-[#A0AEC0]">
            @ 2021, Made with ❤️ by Simmmple & Creative Tim for a better web
          </p>
          <div className="flex gap-2 text-center justify-center mt-1 font-medium text-[12px] text-[#A0AEC0]">
            <p className="cursor-pointer">Market Place</p>
            <p className="cursor-pointer">Blog</p>
            <p className="cursor-pointer">License</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
