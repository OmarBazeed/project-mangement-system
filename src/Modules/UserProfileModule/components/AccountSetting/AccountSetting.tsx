import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useUser } from "../../../../Context/AuthContext";
import {
  emailValidation,
  phoneNumberValidation,
  userNameValidation,
} from "../../../../utils/InputsValidation";
import { baseUrl, getRequestHeaders, loader } from "../../../../utils/Utils";

export default function AccountSetting() {
  const { currentUser, getCurrentUser, saveAdminData } = useUser();
  console.log(currentUser);
  // instance from use navigate
  const navigate = useNavigate();
  // image input state
  const [image, setImage] = useState(
    `https://upskilling-egypt.com:3003/${currentUser?.imagePath}`
  );
  // hide pass or show state
  let [hidePassInInpt, setHidePassInInpt] = useState(true);
  // check loading state
  const [isLoading, setIsLoading] = useState(false);
  // function for change password input type
  const changePassInputType = () => {
    setHidePassInInpt((hidePassInInpt = !hidePassInInpt ? true : false));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    criteriaMode: "all",
  });

  const getValues = () => {
    return reset({
      userName: currentUser?.userName,
      email: currentUser?.email,
      country: currentUser?.country,
      phoneNumber: currentUser?.phoneNumber,
      profileImage: image,
    });
  };
  useEffect(() => {
    getValues();
  }, []);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const registerFormData = appendToFormData(data);
    try {
      const response = await axios.put(`${baseUrl}/Users/`, registerFormData, {
        headers: getRequestHeaders(),
      });
      toast.success("Your new settings have been successfully saved");
      getCurrentUser();
      navigate("/dashboard/profile/account-info");
      console.log(response.data.message);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    setIsLoading(false);
  };
  const appendToFormData = (data: any) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("country", data.country);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("profileImage", data.profileImage[0]);
    return formData;
  };
  return (
    <>
      <section>
        <div className=" container pb-5">
          <div className="form-body mt-3">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row justify-content-center ">
                {/* image input */}
                <div className="img-input">
                  <div className="rounded-circle formImage mx-auto border">
                    <input
                      className={`inputImg w-100`}
                      type="file"
                      accept="image/*"
                      placeholder="Recipe Price"
                      {...register("profileImage")}
                      onChange={({ target: { files } }) => {
                        if (files) {
                          setImage(URL.createObjectURL(files[0]));
                        }
                      }}
                    />
                    {image ? (
                      <div className="d-flex flex-column justify-content-center  rounded-circle  overflow-hidden  align-items-center">
                        <img src={image} width={120} height={120} alt="" />
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
                      className={`input-field input-theme  ${
                        errors.userName && "border-danger"
                      } `}
                      type="text"
                      {...register("userName", userNameValidation)}
                    />
                    <label
                      htmlFor="input-field input-theme"
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
                        ? Object.entries(messages).map(([type, message]) => (
                            <p
                              className="text-start text-danger ps-2"
                              key={type}
                            >
                              {message}
                            </p>
                          ))
                        : null;
                    }}
                  />

                  {/* phone input */}
                  <div className="input-container">
                    <input
                      placeholder="Enter your phone"
                      className={`input-field input-theme ${
                        errors.phoneNumber && "border-danger"
                      }`}
                      type="text"
                      {...register("phoneNumber", phoneNumberValidation)}
                    />
                    <label
                      htmlFor="input-field input-theme"
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
                </div>

                {/* col 2 */}
                <div className="col-md-6 ">
                  {/* email input */}
                  <div className="input-container">
                    <input
                      placeholder="Enter your E-mail"
                      className={`input-field input-theme ${
                        errors.email && "border-danger "
                      }`}
                      type="text"
                      {...register("email", emailValidation)}
                    />
                    <label
                      htmlFor="input-field input-theme"
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
                  {/* country input */}
                  <div className="input-container">
                    <input
                      placeholder="Enter your country"
                      className={`input-field input-theme  ${
                        errors.country && "border-danger "
                      }`}
                      type="text"
                      {...register("country", {
                        required: "Country is required",
                      })}
                    />
                    <label
                      htmlFor="input-field input-theme"
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
              </div>
              <div className="col-md-6 mx-auto ">
                {/*  confirm password input */}
                <div className="group-input ">
                  <div className="input-container  ">
                    <input
                      placeholder="confirm password"
                      className={`input-field input-theme ${
                        errors.confirmPassword && "border-danger "
                      }`}
                      type={hidePassInInpt ? "password" : "text"}
                      {...register("confirmPassword", {
                        required: "Confirm Password is required",
                      })}
                    />

                    <label htmlFor="input-field" className="input-label">
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
              {/* submit button */}
              <button className="main-btn">
                {isLoading ? loader() : " Save"}
              </button>
            </form>
            {/*  */}
          </div>
        </div>
      </section>
    </>
  );
}
