import { useForm } from "react-hook-form";
import Images from "../../../ImageModule/components/Images/Images";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FormData } from "../../../../interfaces/Auth";
import { toast } from "react-toastify";
import {
  emailValidation,
  OTPValidation,
} from "../../../../utils/InputsValidation";
import { BaseUrl } from "../../../../utils/Utils";
export default function VerifyAccount() {
  const [spinner, setSpinner] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    setSpinner(true);

    try {
      const response = await axios.put(`${BaseUrl}/Users/verify`, data);
      toast.success(response.data.message || "Account verified successfully");
      console.log(response);
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        // Handle other types of errors here
        toast.error("An error occurred.");
      }
    } finally {
      setSpinner(false);
    }
  };

  return (
    <>
      <div className="Auth-container vh-100 row align-items-center justify-content-center overflow-auto gx-0 flex-nowrap ">
        <div className="logo  col-md-5 text-center">
          <img src={Images.logo} alt="logo" className="mb-3" />
        </div>

        <div className="login-container col-md-5 col-sm-10 rounded-4 px-5 py-5">
          <p className="text-white m-0">Welcome to PMS</p>
          <h3 className="color-text mb-4 verify-account">Verify Account</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="color-text" htmlFor="exampleFormControlInput1">
                Email
              </label>
              <input
                id="exampleFormControlInput1"
                type="email"
                className="form-control m-1 px-2"
                {...register("email", emailValidation)}
                placeholder="Enter Your Email"
              />
              <div className="border_bottom"></div>
            </div>
            {errors.email && (
              <div className="alert alert-danger p-2 m-0 ">
                {errors.email.message}
              </div>
            )}

            <div className="form-group">
              <label className="color-text" htmlFor="exampleFormControlInput1">
                OTP Verification
              </label>
              <input
                id="exampleFormControlInput1"
                type="text"
                className="form-control m-1 px-2"
                {...register("seed", OTPValidation)}
                placeholder="Enter Verification"
              />
              <div className="border_bottom"></div>
            </div>
            {errors.seed && (
              <div className="alert alert-danger p-2 m-0 ">
                {errors.seed.message}
              </div>
            )}

            <button
              type="submit"
              className="w-100 btn color-button rounded-5 mt-5"
            >
              {spinner ? (
                <div className="spinner-border" role="status"></div>
              ) : (
                "Verify"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
