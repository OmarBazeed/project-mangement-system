import axios from "axios";
import { toast } from "react-toastify";

export const baseUrl: string = "https://upskilling-egypt.com:3003/api/v1";

export const requestHeaders = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
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
