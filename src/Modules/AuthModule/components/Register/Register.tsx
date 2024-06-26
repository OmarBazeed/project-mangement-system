import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Images from "../../../ImageModule/components/Images/Images";

import { RegisterFormData } from "../../../../interfaces/Auth";
import {
  emailValidation,
  passwordValidation,
  phoneNumberValidation,
  userNameValidation,
} from "../../../../utils/InputsValidation";
import { baseUrl, handleApiError, loader } from "../../../../utils/Utils";

export default function Register() {
  // instance from use navigate
  const navigate = useNavigate();
  // image input state
  const [image, setImage] = useState(null);
  // hide pass or show state
  const [hidePassInInpt, setHidePassInInpt] = useState(true);
  // check loading state
  const [isLoading, setIsLoading] = useState(false);
  // function for change password input type
  const changePassInputType = () => {
    setHidePassInInpt((prev) => !prev);
  };

  const [subBtnClicked, setSubBtnClicked] = useState(false);
  const toastOption = {
    onClose: () => setSubBtnClicked(false),
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    criteriaMode: "all",
  });
  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    setIsLoading(true);
    const registerFormData = appendToFormData(data);
    try {
      const response = await axios.post(
        `${baseUrl}/Users/Register`,
        registerFormData
      );
      toast.success(response.data.message);
      navigate("/verifyaccount");
    } catch (err) {
      handleApiError(err, toastOption);
    }
    setIsLoading(false);
  };
  const appendToFormData = (data: RegisterFormData) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("country", data.country);
    formData.append("password", data.password);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("confirmPassword", data.confirmPassword);
    if (data.profileImage && data.profileImage[0]) {
      formData.append("profileImage", data.profileImage[0]);
    }
    return formData;
  };
  return (
    <>
      <section className="">
        <div className="bg-reg min-vh-100 pb-5 text-white d-flex  align-items-center  ">
          <div className="container  d-flex justify-content-center ">
            <div className="row  w-100">
              <div className="col-md-12 mx-auto text-center ">
                {/* register */}
                <div className="register w-100 ">
                  <img src={Images.authLogo} alt="" />
                  {/* form */}
                  <div className="form  rounded-4 py-3">
                    <div className="container-auth-form py-4">
                      <div className="form-title position-relative ">
                        <p>welcome to PMS</p>
                        <h3 className="text-main">Create New Account</h3>
                      </div>
                      {/* form body */}
                      <div className="form-body mt-3">
                        {/* */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="row justify-content-center ">
                            {/* image input */}
                            <div className="img-input">
                              <div className="rounded-circle formImage mx-auto ">
                                <input
                                  className={`inputImg w-100`}
                                  type="file"
                                  accept="image/*"
                                  placeholder="Recipe Price"
                                  {...register("profileImage")}
                                  onChange={({ target: { files } }) => {
                                    if (files && files[0]) {
                                      setImage(URL.createObjectURL(files[0]));
                                    }
                                  }}
                                />
                                {image ? (
                                  <div className="d-flex flex-column justify-content-center  rounded-circle  overflow-hidden  align-items-center">
                                    <img
                                      src={image}
                                      width={120}
                                      height={120}
                                      alt=""
                                    />
                                  </div>
                                ) : (
                                  <div className="d-flex flex-column justify-content-center align-items-center text-success">
                                    <i className="fa fa-camera text-main fa-2x"></i>
                                  </div>
                                )}
                                <span className="text-dark">
                                  {image ? (
                                    <i
                                      onClick={() => {
                                        setImage(null);
                                      }}
                                      className="fa-solid fa-trash-can"
                                    ></i>
                                  ) : (
                                    ""
                                  )}
                                </span>
                              </div>
                            </div>
                            {/* col 1 */}
                            <div className="col-md-6 ">
                              {/* user name input */}
                              <div className="input-container">
                                <input
                                  autoComplete="off"
                                  placeholder="Enter your name"
                                  className={`input-field ${
                                    errors.userName && "border-danger"
                                  } `}
                                  type="text"
                                  {...register("userName", userNameValidation)}
                                />
                                <label
                                  htmlFor="input-field"
                                  className="input-label"
                                >
                                  User Name
                                </label>
                                <span className="input-highlight"></span>
                              </div>
                              <ErrorMessage
                                errors={errors}
                                name="userName"
                                render={({ messages }) => {
                                  return messages
                                    ? Object.entries(messages).map(
                                        ([type, message]) => (
                                          <p
                                            className="text-start text-danger ps-2"
                                            key={type}
                                          >
                                            {message}
                                          </p>
                                        )
                                      )
                                    : null;
                                }}
                              />

                              {/* phone input */}
                              <div className="input-container">
                                <input
                                  placeholder="Enter your phone"
                                  className={`input-field ${
                                    errors.phoneNumber && "border-danger"
                                  }`}
                                  type="text"
                                  {...register(
                                    "phoneNumber",
                                    phoneNumberValidation
                                  )}
                                />
                                <label
                                  htmlFor="input-field"
                                  className="input-label"
                                >
                                  Phone
                                </label>
                                <span className="input-highlight"></span>
                              </div>
                              {errors.phoneNumber && (
                                <p className="text-start text-danger ps-2">
                                  {errors.phoneNumber.message}
                                </p>
                              )}
                              {/* country input */}
                              <div className="input-container">
                                <input
                                  placeholder="Enter your country"
                                  className={`input-field  ${
                                    errors.country && "border-danger "
                                  }`}
                                  type="text"
                                  {...register("country", {
                                    required: "Country is required",
                                  })}
                                />
                                <label
                                  htmlFor="input-field"
                                  className="input-label"
                                >
                                  Country
                                </label>
                                <span className="input-highlight"></span>
                              </div>
                              {errors.country && (
                                <p className="text-start text-danger ps-2">
                                  {errors.country.message}
                                </p>
                              )}
                            </div>

                            {/* col 2 */}
                            <div className="col-md-6 ">
                              {/* email input */}
                              <div className="input-container">
                                <input
                                  placeholder="Enter your E-mail"
                                  className={`input-field ${
                                    errors.email && "border-danger "
                                  }`}
                                  type="text"
                                  {...register("email", emailValidation)}
                                />
                                <label
                                  htmlFor="input-field"
                                  className="input-label"
                                >
                                  E-mail
                                </label>
                                <span className="input-highlight"></span>
                              </div>
                              {errors.email && (
                                <p className="text-start text-danger ps-2">
                                  {errors.email.message}
                                </p>
                              )}

                              {/* password input */}
                              <div className="group-input ">
                                <div className="input-container  ">
                                  <input
                                    placeholder="Enter your password"
                                    className={`input-field ${
                                      errors.password && "border-danger "
                                    }`}
                                    type={hidePassInInpt ? "password" : "text"}
                                    {...register(
                                      "password",
                                      passwordValidation
                                    )}
                                  />
                                  <label
                                    htmlFor="input-field"
                                    className="input-label"
                                  >
                                    Password
                                  </label>
                                  <span className="input-highlight"></span>
                                </div>
                                <button
                                  onClick={changePassInputType}
                                  className="icon"
                                >
                                  <i
                                    className={`fa-regular  ${
                                      hidePassInInpt ? "fa-eye-slash" : "fa-eye"
                                    }`}
                                  ></i>
                                </button>
                              </div>
                              <ErrorMessage
                                errors={errors}
                                name="password"
                                render={({ messages }) => {
                                  return messages
                                    ? Object.entries(messages).map(
                                        ([type, message]) => (
                                          <p
                                            className="text-start text-danger ps-2"
                                            key={type}
                                          >
                                            {message}
                                          </p>
                                        )
                                      )
                                    : null;
                                }}
                              />
                              {/*  confirm password input */}
                              <div className="group-input ">
                                <div className="input-container  ">
                                  <input
                                    placeholder="confirm your password"
                                    className={`input-field ${
                                      errors.confirmPassword && "border-danger "
                                    }`}
                                    type={hidePassInInpt ? "password" : "text"}
                                    {...register("confirmPassword", {
                                      required: "Confirm Password is required",
                                      validate: (value) =>
                                        value === watch("password") ||
                                        "Confirm Password do not match",
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

                                <i
                                  onClick={changePassInputType}
                                  className={`icon fa-regular  ${
                                    hidePassInInpt ? "fa-eye-slash" : "fa-eye"
                                  }`}
                                ></i>
                              </div>
                              {errors.confirmPassword && (
                                <p className="text-start text-danger ps-2">
                                  {errors.confirmPassword.message}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="d-flex justify-content-between my-2">
                            <Link
                              to="/login"
                              className="text-white text-main nav-link "
                            >
                              Login Now?
                            </Link>

                            <Link
                              to="/verifyaccount"
                              className="text-white nav-link "
                            >
                              Have a Code?
                            </Link>
                          </div>
                          {/* submit button */}
                          <button className="main-btn" disabled={subBtnClicked}>
                            {isLoading ? loader() : " Register Now"}
                          </button>
                        </form>
                        {/*  */}
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
