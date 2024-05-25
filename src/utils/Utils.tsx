import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export const baseUrl: string = "https://upskilling-egypt.com:3003/api/v1";

export const getRequestHeaders = () => {
  return { Authorization: `Bearer ${localStorage.getItem("token")}` };
};
export const handleApiError = (error: unknown) => {
  const errMsg =
    axios.isAxiosError(error) && error.response?.data?.message
      ? error.response.data.message
      : "An unexpected error occurred";
  toast.error(errMsg);
};

export const loader = () => {
  return <div className="custom-loader"></div>;
};

export const useLocalStorage = (
  key: string,
  initialValue: string | boolean
) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: string) => {
    try {
      setStoredValue(value);

      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
};
