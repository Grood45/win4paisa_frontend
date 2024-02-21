"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button, useToast, CircularProgress } from "@chakra-ui/react";
import { fetchGetRequest, sendDeleteRequest, sendPatchRequest, sendPostRequest } from "@/api/api";
import { MdEdit } from "react-icons/md";
import AddFaq from "@/components/admin/AddFaq";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const Maincomponent = () => {
  const [selectedLogoImage, setSelectedLogoImage] = useState<string | null>(
    null
  );
  const [selectedFaviconImage, setSelectedFaviconImage] = useState<
    string | null
  >(null);
  const [tc, setTc] = useState<string>("");
  const [sliderdata, setSliderData] = useState([]);
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const [marque, setMarque] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<String>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [faq, setFaq] = useState([{ question: "", answer: "" }]);
  const toast = useToast();
  const handleImageChange1 = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedIndex("0");
      let url = await handleImageUpload(file);
      setSelectedLogoImage(url);
    }
  };
  const handleImageChange2 = async (event: any) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedIndex("1");
      let url = await handleImageUpload(file);
      setSelectedFaviconImage(url);
    }
  };

  const handleImageUpload = async (file: File) => {
    setLoading(true);
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
        setLoading(false);
        setSelectedIndex("");
        return response.url;
      }
    } catch (error: any) {
      toast({
        title: error.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
      setSelectedIndex("");
      return null;
    }
  };

  const getLogoAndFav = async () => {
    try {
      const response = await fetchGetRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/logofav/get-logo-fav/6532c132ed5efb8183a66703`
      );
      if(response.data){
      setMarque(response.data.marque);
      setSelectedFaviconImage(response.data.fav_icon);
      setSelectedLogoImage(response.data.logo);
      setFaq(response.data.fnq);
      setTc(response.data.tc);
      }
    } catch (error: any) {
      console.error("Error uploading image:", error?.message);
      toast({
        title: error.message,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
  };

  const updateLogoAndFav = async () => {
    const payload = {
      marque,
      logo: selectedLogoImage,
      fav_icon: selectedFaviconImage,
      fnq: faq,
      tc: tc,
    };
    try {
      const response = await sendPatchRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/logofav/update-logo-fav/6532c132ed5efb8183a66703`,
        payload
      );
      toast({
        title: response.message,
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    } catch (error: any) {
      console.error("Error uploading image:", error.message);
      toast({
        title: error.message,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getLogoAndFav();
  }, []);


  const handleRulesChange = (value: string) => {
    setTc(value);
  };

  const SliderFn = async () => {
    try {
      const response = await fetchGetRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/gameslider/get-slider/6551e31439cda85a6c606fef`
      );
      setSliderData(response.data);
    } catch (error: any) {
      console.error("Error uploading image:", error.message);
      toast({
        title: error.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    SliderFn();
  }, []);



  const fileInputRef = useRef<any>();



  const handleAddImage = async (imageurl: any) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    try {
      
      const payload={
       image:imageurl
      }
      const response = await sendPostRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/gameslider/add-slider/6551e31439cda85a6c606fef`,payload
      );
     setSliderData(response.data)
      setLoading(false);
    } catch (error: any) {
      toast({
        title: "Update Status.",
        description: `${error.data.error}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const handleImageUrlChange = async (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const imageurl = await handleImageUpload1(file);
      handleAddImage(imageurl);
    }
  };

  const handleImageUpload1 = async (file: File) => {
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
        title: error.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setImageLoading(false);
      return null;
    }
  };

  const handleDeleteImage = async (image:any,index: any) => {
    try {
      let updated_data = sliderdata.filter((ele: any,i) => i !== index);
      const payload={images:updated_data}
      const response = await sendPatchRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/gameslider/update-slider/6551e31439cda85a6c606fef`,payload
      );
      setSliderData(updated_data);
      toast({
        title: response.message,
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    } catch (error: any) {
      console.error("Error uploading image:", error.message);
      toast({
        title: error.message,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
  };
  return (
    <div className="p-6">
      <div className="flex flex-col mt-6 items-center space-y-4">
        <div className="bg-[#051B41] rounded-[12px] w-[100%] py-5">

        <div className="flex   justify-evenly gap-6 w-[100%]">
          {loading && selectedIndex == "0" ? (
            <div className="h-[200px]  w-[200px]">
              <CircularProgress
                isIndeterminate
                value={30}
                color="blue.400"
                thickness="12px"
              />
            </div>
          ) : (
            <div className="flex  border mb-2 gap-6">
              <img
                src={
                  selectedLogoImage ||
                  "https://i.ibb.co/v42FxLp/Pngtree-colorful-loading-icon-5326551.png"
                }
                alt={`Selected Logo Image `}
                className="h-[200px] w-[200px]"
              />
            </div>
          )}

          {loading && selectedIndex == "1" ? (
            <div className="h-[200px] w-[200px]">
              <CircularProgress
                isIndeterminate
                value={30}
                color="blue.400"
                thickness="12px"
              />
            </div>
          ) : (
            <div className="flex border mb-2 gap-6">
              <img
                src={
                  selectedFaviconImage ||
                  "https://i.ibb.co/v42FxLp/Pngtree-colorful-loading-icon-5326551.png"
                }
                alt={`Selected Favicon Image `}
                className="h-[200px] w-[200px]"
              />
            </div>
          )}
        </div>
        <div className="flex gap-6 justify-evenly w-[100%] ">
          <div className="w-[20%]">
            <label htmlFor="file-upload" className="cursor-pointer">
              <span
                className={`rounded-[3%] p-2  text-white bg-[#0075FF] flex items-center justify-center`}
              >
                Upload Logo
              </span>
            </label>
            <input
              id="file-upload"
              type="file"
              style={{ display: "none" }}
              onChange={handleImageChange1}
              disabled={loading ? true : false}
            />
          </div>

          <div className="w-[20%]">
            <label htmlFor="file-upload1" className="cursor-pointer">
              <span
                className={`rounded-[3%] p-2 text-white bg-[#0075FF] flex items-center justify-center`}
              >
                Upload FavIcon
              </span>
            </label>
            <input
              id="file-upload1"
              type="file"
              style={{ display: "none" }}
              onChange={handleImageChange2}
              disabled={loading ? true : false}
            />
          </div>
        </div>
        </div>
     

  
        <div className="h-[100%] bg-[#051B41] rounded-xl p-4 w-[100%]">
          <h1 className="text-white text-center mt-5 font-bold text-xl">
            Add Marquee{" "}
          </h1>

          <textarea
            onChange={(e) => setMarque(e.target.value)}
            value={marque}
            className="w-[100%] outline-none  mt-1 bg-[#0075FF] text-white placeholder:text-white  p-2 rounded-[12px] hover:border-none"
            placeholder="Enter Marque..."
          />
        </div>

        <div className={`mt-5 w-[100%] bg-[#051B41] rounded-xl p-4 `}>
          <h1 className="text-white text-center mt-10 font-bold text-xl">
            {" "}
            FAQ{" "}
          </h1>
          <AddFaq faq={faq} setFaq={setFaq} />
        </div>

     

        <div className="mt-12 bg-[#051B41] rounded-xl p-4 h-[400px]  w-[100%]">
          <p className=" text-bold text-center my-5 text-white text-lg ">
            {" "}
            Terms And Condition Writes here
          </p>
          <ReactQuill
            value={tc}
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

        <Button
          style={{
            backgroundColor: "green",
            marginTop: "65px",
            color: "white",
          }}
          className="w-[100%] rounded-lg"
          onClick={updateLogoAndFav}
        >
          Save Change
        </Button>
   <div className="max-w-3xl  mx-auto my-8">
          <div className={`w-[100%] flex items-center mt-20 justify-between`}>
            <h2 className="text-2xl text-white font-semibold  ">
              Slider Images
            </h2>

            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleAddImage}
            >
              Add Image
            </button>
            <input
              ref={fileInputRef}
              style={{ display: "none" }}
              type="file"
              onChange={(e) => handleImageUrlChange(e)}
            />
          </div>

          <div className="flex flex-col mt-3 gap-4">
            {sliderdata?.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Slider ${index + 1}`}
                  className="w-full  h-48 object-cover rounded-2xl"
                />
                <div
                  className="absolute top-2 right-2 cursor-pointer opacity-0 group-hover:opacity-100"
                  onClick={() => handleDeleteImage(image,index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 text-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default Maincomponent;
