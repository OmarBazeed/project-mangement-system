import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useUser } from "../../../../Context/AuthContext";
import {
  emailValidation,
  phoneNumberValidation,
  userNameValidation,
} from "../../../../utils/InputsValidation";
import {
  baseUrl,
  getRequestHeaders,
  handleApiError,
  loader,
} from "../../../../utils/Utils";
import { AccountSettingsInterface } from "../../../../interfaces/Auth";

export default function AccountSetting() {
  const { currentUser, getCurrentUser } = useUser();
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(
    `https://upskilling-egypt.com:3003/${currentUser?.imagePath}`
  );
  const [hidePassInInpt, setHidePassInInpt] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AccountSettingsInterface>({
    criteriaMode: "all",
  });

  const getValues = () => {
    return reset({
      userName: currentUser?.userName,
      email: currentUser?.email,
      country: currentUser?.country,
      phoneNumber: currentUser?.phoneNumber,
      confirmPassword: "",
      profileImage: {} as FileList,
    });
  };

  useEffect(() => {
    getValues();
  }, []);

  const appendToFormData = (data: AccountSettingsInterface) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("country", data.country);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("confirmPassword", data.confirmPassword);
    if (data.profileImage && data.profileImage.length > 0) {
      formData.append("profileImage", data.profileImage[0]);
    }
    return formData;
  };

  const onSubmit: SubmitHandler<AccountSettingsInterface> = async (data) => {
    setIsLoading(true);
    const registerFormData = appendToFormData(data);
    try {
      await axios.put(`${baseUrl}/Users/`, registerFormData, {
        headers: getRequestHeaders(),
      });
      toast.success("Your new settings have been successfully saved");
      getCurrentUser();
      navigate("/dashboard/profile/account-info");
    } catch (err) {
      handleApiError(err);
    }
    setIsLoading(false);
  };

  return (
    <section>
      <div className="container pb-5">
        <div className="form-body mt-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row justify-content-center">
              {/* Image input */}
              <div className="img-input">
                <div className="rounded-circle formImage mx-auto border">
                  <input
                    className="inputImg w-100"
                    type="file"
                    accept="image/*"
                    {...register("profileImage")}
                    onChange={({ target: { files } }) => {
                      if (files) {
                        setImage(URL.createObjectURL(files[0]));
                      }
                    }}
                  />
                  {image ? (
                    <div className="d-flex flex-column justify-content-center rounded-circle overflow-hidden align-items-center">
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
              {/* Column 1 */}
              <div className="col-md-6">
                {/* User name input */}
                <div className="input-container">
                  <input
                    autoComplete="off"
                    placeholder="Enter your name"
                    className={`input-field input-theme ${
                      errors.userName && "border-danger"
                    }`}
                    type="text"
                    {...register("userName", userNameValidation)}
                  />
                  <label className="input-label">User Name</label>
                  <span className="input-highlight"></span>
                </div>
                <ErrorMessage
                  errors={errors}
                  name="userName"
                  render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <p className="text-start text-danger ps-2" key={type}>
                        {message}
                      </p>
                    ))
                  }
                />
                {/* Phone input */}
                <div className="input-container">
                  <input
                    placeholder="Enter your phone"
                    className={`input-field input-theme ${
                      errors.phoneNumber && "border-danger"
                    }`}
                    type="text"
                    {...register("phoneNumber", phoneNumberValidation)}
                  />
                  <label className="input-label">Phone</label>
                  <span className="input-highlight"></span>
                </div>
                {errors.phoneNumber && (
                  <p className="text-start text-danger ps-2">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
              {/* Column 2 */}
              <div className="col-md-6">
                {/* Email input */}
                <div className="input-container">
                  <input
                    placeholder="Enter your E-mail"
                    className={`input-field input-theme ${
                      errors.email && "border-danger"
                    }`}
                    type="text"
                    {...register("email", emailValidation)}
                  />
                  <label className="input-label">E-mail</label>
                  <span className="input-highlight"></span>
                </div>
                {errors.email && (
                  <p className="text-start text-danger ps-2">
                    {errors.email.message}
                  </p>
                )}
                {/* Country input */}
                <div className="input-container">
                  <input
                    placeholder="Enter your country"
                    className={`input-field input-theme ${
                      errors.country && "border-danger"
                    }`}
                    type="text"
                    {...register("country", {
                      required: "Country is required",
                    })}
                  />
                  <label className="input-label">Country</label>
                  <span className="input-highlight"></span>
                </div>
                {errors.country && (
                  <p className="text-start text-danger ps-2">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-md-6 mx-auto">
              {/* Confirm password input */}
              <div className="group-input">
                <div className="input-container">
                  <input
                    placeholder="Confirm password"
                    className={`input-field input-theme ${
                      errors.confirmPassword && "border-danger"
                    }`}
                    type={hidePassInInpt ? "password" : "text"}
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                    })}
                  />
                  <label className="input-label">Confirm Password</label>
                  <span className="input-highlight"></span>
                </div>
                <i
                  onClick={() => setHidePassInInpt(!hidePassInInpt)}
                  className={`icon fa-regular ${
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
            {/* Submit button */}
            <button className="main-btn">
              {isLoading ? loader() : "Save"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
