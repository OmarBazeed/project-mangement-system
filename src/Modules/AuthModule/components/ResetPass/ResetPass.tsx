/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
// import logo from '../../../../assets/images/PMS 3.png';
<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FormData } from "../../../../interfaces/Auth";
import { useToast } from "../../../../Context/ToastContext";
import Images from "../../../ImageModule/components/Images/Images";
export default function Login() {
  // All states here on the top
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const { showSuccessToast, showErrorToast } = useToast();


=======
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormData } from "../../../../interfaces/Auth";
import { BaseUrl } from "../../../../utils/Utils";
import Images from "../../../ImageModule/components/Images/Images";
import { toast } from "react-toastify";
import {
  emailValidation,
  OTPValidation,
  passwordValidation,
} from "../../../../utils/InputsValidation";
export default function Login() {
  // All states here on the top
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
>>>>>>> 7934dd9bd6e1f15a65b8fcc5e3928dd3b7942226
  const [spinner, setSpinner] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
<<<<<<< HEAD
    getValues
=======
    getValues,
>>>>>>> 7934dd9bd6e1f15a65b8fcc5e3928dd3b7942226
  } = useForm<FormData>();
  const navigate = useNavigate();
  // test done
  // Function for password visibility
  //  void indicates that a function does not return any value
  const togglePasswordVisibility = (): void => {
    setShowPassword((prevState: boolean) => !prevState);
  };

  const toggleConfirmPasswordVisibility = (): void => {
    setShowConfirmPassword((prevState: boolean) => !prevState);
<<<<<<< HEAD
  }

  const validateConfirmPassword = (value) => {
    const newPassword = getValues('password');
    return value === newPassword || 'Passwords do not match';
=======
  };

  const validateConfirmPassword = (value: string) => {
    const newPassword = getValues("password");
    return value === newPassword || "Passwords do not match";
>>>>>>> 7934dd9bd6e1f15a65b8fcc5e3928dd3b7942226
  };

  const btnloading = () => {
    return (
      <div className="loader">
        <i>&lt;</i>
        <span>LOADING</span>
        <i>/&gt;</i>
      </div>
    );
  };

  // senD Data to Api
  const onSubmit = async (data: FormData) => {
    setSpinner(true);

    try {
<<<<<<< HEAD
      const response = await axios.post(
        "https://upskilling-egypt.com:3003/api/v1/Users/Reset",
        data
      );
      showSuccessToast("Password Reset Successfully");
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        showErrorToast(error.response.data.message);
      } else {
        // Handle other types of errors here
        showErrorToast("An error occurred.");
=======
      await axios.post(`${BaseUrl}/Users/Reset`, data);
      toast.success("Password Reset Successfully");
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        // Handle other types of errors here
        toast.error("An error occurred.");
>>>>>>> 7934dd9bd6e1f15a65b8fcc5e3928dd3b7942226
      }
    } finally {
      setSpinner(false);
    }
  };

  return (
    <>
      <section className="">
<<<<<<< HEAD
        <div className="bg-reset vh-100 text-white d-flex  align-items-center  ">
=======
        <div className="bg-reset min-vh-100 pb-3 text-white d-flex  align-items-center  ">
>>>>>>> 7934dd9bd6e1f15a65b8fcc5e3928dd3b7942226
          <div className="container  d-flex justify-content-center ">
            <div className="row  w-100">
              <div className="col-md-6 mx-auto text-center ">
                {/* register */}
                <div className="login w-100 ">
                  <img className="mb-3" src={Images.authLogo} alt="" />
                  {/* form */}
                  <div className="form  rounded-4 py-5">
                    <div className="container-auth-form pt-4  ">
                      <div className="form-title position-relative ">
                        <p>welcome to PMS</p>
<<<<<<< HEAD
                        <h3 className="text-main">Reset  Password</h3>
=======
                        <h3 className="text-main">Reset Password</h3>
>>>>>>> 7934dd9bd6e1f15a65b8fcc5e3928dd3b7942226
                      </div>
                      {/* form body */}
                      <div className="form-body mt-3">
                        {/* */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                          {/* email input */}
                          <div className="input-container">
                            <input
                              placeholder="Enter your E-mail"
                              className={`input-field ${
                                errors.email && "border-danger "
                              }`}
                              type="text"
<<<<<<< HEAD
                              {...register("email", {
                                required: "email is required",
                                pattern: {
                                  value:
                                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                  message: "email is not valid ",
                                },
                              })}
=======
                              {...register("email", emailValidation)}
>>>>>>> 7934dd9bd6e1f15a65b8fcc5e3928dd3b7942226
                            />
                            <label
                              htmlFor="input-field"
                              className={`input-label `}
                            >
                              E-mail
                            </label>
                            <span className="input-highlight"></span>
                          </div>
                          {errors.email && (
                            <p className="text-start text-danger ps-3">
                              {errors.email.message}
                            </p>
<<<<<<< HEAD
                            
=======
>>>>>>> 7934dd9bd6e1f15a65b8fcc5e3928dd3b7942226
                          )}
                          {/* password input */}
                          <div className="group-input ">
                            <div className="input-container  ">
                              <input
                                placeholder="Enter your new password"
                                className={`input-field ${
                                  errors.password && "border-danger "
                                }`}
                                type={showPassword ? "text" : "password"}
<<<<<<< HEAD
                                {...register("password", {
                                  required: "password is required ",
                                  pattern: {
                                    value:
                                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                                    message:
                                      "Password must contain at least 8 characters, including upper and lowercase letters, and numbers",
                                  },
                                })}
=======
                                {...register("password", passwordValidation)}
>>>>>>> 7934dd9bd6e1f15a65b8fcc5e3928dd3b7942226
                              />
                              <label
                                htmlFor="input-field"
                                className="input-label"
                              >
                                Password
                              </label>
                              <span className="input-highlight"></span>
                            </div>

<<<<<<< HEAD
                            

=======
>>>>>>> 7934dd9bd6e1f15a65b8fcc5e3928dd3b7942226
                            <i
                              role="button"
                              onClick={togglePasswordVisibility}
                              className={`icon fa-regular  ${
                                showPassword ? "fa-eye" : "fa-eye-slash"
                              }`}
                            ></i>
                          </div>
                          {errors.password && (
                            <p className="text-start text-danger ps-3">
                              {errors.password.message}
                            </p>
                          )}

<<<<<<< HEAD
<div className="group-input ">
=======
                          <div className="group-input ">
>>>>>>> 7934dd9bd6e1f15a65b8fcc5e3928dd3b7942226
                            <div className="input-container  ">
                              <input
                                placeholder="Confirm your new password"
                                className={`input-field ${
                                  errors.password && "border-danger "
                                }`}
                                type={showPassword ? "text" : "password"}
                                {...register("confirmPassword", {
                                  required: "confirm password is required ",
<<<<<<< HEAD
                                  validate: validateConfirmPassword
=======
                                  validate: validateConfirmPassword,
>>>>>>> 7934dd9bd6e1f15a65b8fcc5e3928dd3b7942226
                                })}
                              />
                              <label
                                htmlFor="input-field"
                                className="input-label"
                              >
                                Confirm Password
                              </label>
                              <span className="input-highlight"></span>
                            </div>

<<<<<<< HEAD
                      
=======
>>>>>>> 7934dd9bd6e1f15a65b8fcc5e3928dd3b7942226
                            <i
                              role="button"
                              onClick={toggleConfirmPasswordVisibility}
                              className={`icon fa-regular  ${
                                showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                              }`}
                            ></i>
                          </div>
                          {errors.confirmPassword && (
                            <p className="text-start text-danger ps-3">
                              {errors.confirmPassword.message}
                            </p>
                          )}

<<<<<<< HEAD
<div className="input-container">
=======
                          <div className="input-container">
>>>>>>> 7934dd9bd6e1f15a65b8fcc5e3928dd3b7942226
                            <input
                              placeholder="Enter Verification"
                              className={`input-field ${
                                errors.email && "border-danger "
                              }`}
                              type="text"
<<<<<<< HEAD
                              {...register("seed", {
                                required: "OTP required",
                                
                              })}
=======
                              {...register("seed", OTPValidation)}
>>>>>>> 7934dd9bd6e1f15a65b8fcc5e3928dd3b7942226
                            />
                            <label
                              htmlFor="input-field"
                              className={`input-label `}
                            >
                              OTP Verification
                            </label>
                            <span className="input-highlight"></span>
                          </div>
                          {errors.seed && (
                            <p className="text-start text-danger ps-3">
                              {errors.seed.message}
                            </p>
<<<<<<< HEAD
                            
                          )}

                          
                          {/* submit button */}
                          <button className="main-btn">
                            {spinner ? btnloading() : " Save"}
=======
                          )}

                          {/* submit button */}
                          <button type="submit" className="main-btn">
                            {spinner ? btnloading() : " Reset Now"}
                          </button>
                          <button
                            onClick={() => {
                              navigate("/login");
                            }}
                            className="d-block mx-auto mt-3 bg-transparent border-0 text-white "
                            type="button"
                          >
                            Back to Login?
>>>>>>> 7934dd9bd6e1f15a65b8fcc5e3928dd3b7942226
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
