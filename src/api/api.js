import axios from "axios";
// import { getLocalData } from "./getLocalData";

// Function to send a POST request
// const localData=getLocalData("admintoken")

////test

export const sendPostRequest = async (url, data) => {
  try {
    const response = await axios.post(url, data, {
      //   headers: {
      //     "Content-Type": "application/json",
      //     access_token:
      //      localData?.acces_token||"",
      //     verify_token:
      //       localData?.verify_token||""
      //   },
    });
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

// Function to fetch a GET request
export const fetchGetRequest = async (url) => {
  try {
    const response = await axios.get(url, {
      //   headers: {
      //     access_token:
      //     localData?.acces_token||"",
      //    verify_token:
      //      localData?.verify_token||""
      //   },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to send a PUT request
export const sendPatchRequest = async (url, data) => {
  try {
    const response = await axios.patch(url, data, {
      //   headers: {
      //     access_token:
      //     localData?.acces_token||"",
      //    verify_token:
      //      localData?.verify_token||""
      //   },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to send a DELETE request
export const sendDeleteRequest = async (url) => {
  try {
    const response = await axios.delete(url, {
      //   headers: {
      //     "Content-Type": "application/json",
      //     access_token:
      //     localData?.acces_token||"",
      //    verify_token:
      //      localData?.verify_token||""
      //   },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
