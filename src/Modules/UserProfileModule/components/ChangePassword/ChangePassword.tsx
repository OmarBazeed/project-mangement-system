import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { passwordValidation } from "../../../../utils/InputsValidation";
import {
  baseUrl,
  getRequestHeaders,
  handleApiError,
  loader,
} from "../../../../utils/Utils";
import { AccountChangePassInterface } from "../../../../interfaces/Auth";

export default function ChangePassword() {
  const navigate = useNavigate();
  // image input state

  // hide pass or show state
  const [showPassword, setShowPassword] = useState(true);
  // check loading state
  const [isLoading, setIsLoading] = useState(false);
  // function for change password input type
  const changePassInputType = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AccountChangePassInterface>({
    criteriaMode: "all",
  });

  const onSubmit: SubmitHandler<AccountChangePassInterface> = async (data) => {
    setIsLoading(true);

    try {
      const response = await axios.put(
        `${baseUrl}/Users/ChangePassword`,
        data,
        {
          headers: getRequestHeaders(),
        }
      );
      toast.success(response.data.message);
      navigate("/dashboard/profile/account-info");
      console.log(response.data.message);
    } catch (err) {
      handleApiError(err);
    }
    setIsLoading(false);
  };

  return (
    <>
      <section>
        <div className="form-body mt-3 pb-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row justify-content-center ">
              <div className="col-md-6 ">
                {/* old password input */}
                <div className="group-input ">
                  <div className="input-container  ">
                    <input
                      placeholder="Enter your current password"
                      className={`input-field input-theme ${
                        errors.oldPassword && "border-danger "
                      }`}
                      type={showPassword ? "password" : "text"}
                      {...register("oldPassword", {
                        required: "Current password is required",
                      })}
                    />
                    <label htmlFor="input-field" className="input-label">
                      Current Password
                    </label>
                    <span className="input-highlight"></span>
                  </div>
                  <button
                    type="button"
                    onClick={changePassInputType}
                    className="icon"
                  >
                    <i
                      className={`fa-regular  ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </button>
                </div>
                {errors.oldPassword && (
                  <p className="text-start text-danger ps-2">
                    {errors.oldPassword.message}
                  </p>
                )}
                {/* new password input */}
                <div className="group-input ">
                  <div className="input-container  ">
                    <input
                      placeholder="Enter your new password"
                      className={`input-field input-theme ${
                        errors.newPassword && "border-danger "
                      }`}
                      type={showPassword ? "password" : "text"}
                      {...register("newPassword", passwordValidation)}
                    />
                    <label htmlFor="input-field" className="input-label">
                      New Password
                    </label>
                    <span className="input-highlight"></span>
                  </div>
                  <button onClick={changePassInputType} className="icon">
                    <i
                      className={`fa-regular  ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </button>
                </div>
                <ErrorMessage
                  errors={errors}
                  name="newPassword"
                  render={({ messages }) => {
                    return messages
                      ? Object.entries(messages).map(([type, message]) => (
                          <p className="text-start text-danger ps-2" key={type}>
                            {message}
                          </p>
                        ))
                      : null;
                  }}
                />
                {/*  confirm new password input */}
                <div className="group-input ">
                  <div className="input-container  ">
                    <input
                      placeholder="confirm your new password"
                      className={`input-field input-theme ${
                        errors.confirmNewPassword && "border-danger "
                      }`}
                      type={showPassword ? "password" : "text"}
                      {...register("confirmNewPassword", {
                        required: "Confirm Password is required",
                        validate: (value) =>
                          value === watch("newPassword") ||
                          "Confirm Password do not match",
                      })}
                    />

                    <label htmlFor="input-field" className="input-label">
                      Confirm New Password
                    </label>
                    <span className="input-highlight"></span>
                  </div>

                  <i
                    onClick={changePassInputType}
                    className={`icon fa-regular  ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </div>
                {errors.confirmNewPassword && (
                  <p className="text-start text-danger ps-2">
                    {errors.confirmNewPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* submit button */}
            <button className="main-btn">
              {isLoading ? loader() : " Change Password"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
