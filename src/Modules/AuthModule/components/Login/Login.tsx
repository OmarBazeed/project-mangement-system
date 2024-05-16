/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
// import logo from '../../../../assets/images/PMS 3.png';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FormData } from "../../../../interfaces/Auth";
import { useUser } from "../../../../Context/AuthContext";
import { useToast } from "../../../../Context/ToastContext";
import Images from "../../../ImageModule/components/Images/Images";
export default function Login() {
  // All states here on the top
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { showSuccessToast, showErrorToast } = useToast();

  const { saveAdminData, adminData } = useUser();
  // console.log(adminData);
  const [spinner, setSpinner] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();
  // test done
  // Function for password visibility
  //  void indicates that a function does not return any value
  const togglePasswordVisibility = (): void => {
    setShowPassword((prevState: boolean) => !prevState);
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
      const response = await axios.post(
        "https://upskilling-egypt.com:3003/api/v1/Users/Login",
        data
      );
      localStorage.setItem("adminToken", response?.data?.token);
      showSuccessToast("Login successfully");
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
      saveAdminData && saveAdminData(); // Call saveAdminData only if it exists
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        showErrorToast(error.response.data.message);
      } else {
        // Handle other types of errors here
        showErrorToast("An error occurred.");
      }
    } finally {
      setSpinner(false);
    }
  };

  return (
    <>
      <section className="">
        <div className="bg-login vh-100 text-white d-flex  align-items-center  ">
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
                        <h3 className="text-main">Login</h3>
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
                              {...register("email", {
                                required: "email is required",
                                pattern: {
                                  value:
                                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                  message: "email is not valid ",
                                },
                              })}
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
                          )}
                          {/* password input */}
                          <div className="group-input ">
                            <div className="input-container  ">
                              <input
                                placeholder="Enter your password"
                                className={`input-field ${
                                  errors.password && "border-danger "
                                }`}
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                  required: "password is required ",
                                  pattern: {
                                    value:
                                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                                    message:
                                      "Password must contain at least 8 characters, including upper and lowercase letters, and numbers",
                                  },
                                })}
                              />
                              <label
                                htmlFor="input-field"
                                className="input-label"
                              >
                                Password
                              </label>
                              <span className="input-highlight"></span>
                            </div>

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
                          <div className="d-flex justify-content-between my-2">
                            <Link
                              to="/register"
                              className="text-white text-main nav-link "
                            >
                              Register now ?
                            </Link>

                            <Link
                              to="/forget-pass"
                              className="text-white nav-link "
                            >
                              Forget Password ?
                            </Link>
                          </div>
                          {/* submit button */}
                          <button className="main-btn">
                            {spinner ? btnloading() : " Save"}
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
