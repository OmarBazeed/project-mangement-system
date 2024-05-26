import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../../../../Context/AuthContext";
import { FormData } from "../../../../interfaces/Auth";
import {
  emailValidation,
  passwordValidation,
} from "../../../../utils/InputsValidation";
import { baseUrl, handleApiError, loader } from "../../../../utils/Utils";
import Images from "../../../ImageModule/components/Images/Images";

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { saveAdminData, adminData } = useUser();
  const [spinner, setSpinner] = useState<boolean>(false);
  const [subBtnClicked, setSubBtnClicked] = useState(false);

  const toastOption = {
    onClose: () => setSubBtnClicked(false),
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();

  const togglePasswordVisibility = (): void => {
    setShowPassword((prevState: boolean) => !prevState);
  };

  const onSubmit = async (data: FormData) => {
    setSpinner(true);
    setSubBtnClicked(true);
    try {
      const response = await axios.post(`${baseUrl}/Users/Login`, data);
      toast.success(response.data.message || "Login successfully", toastOption);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
      saveAdminData && saveAdminData();
    } catch (error) {
      handleApiError(error, toastOption);
    } finally {
      setSpinner(false);
    }
  };

  useEffect(() => {
    if (adminData && localStorage.getItem("token")) {
      navigate("/dashboard", { replace: true });
    }
  }, [adminData, navigate]);

  return (
    <>
      <section className="">
        <div className="bg-login vh-100 text-white d-flex align-items-center">
          <div className="container d-flex justify-content-center">
            <div className="row w-100">
              <div className="col-md-6 mx-auto text-center">
                <div className="login w-100">
                  <img className="mb-3" src={Images.authLogo} alt="" />
                  <div className="form rounded-4 py-5">
                    <div className="container-auth-form pt-4">
                      <div className="form-title position-relative">
                        <p>welcome to PMS</p>
                        <h3 className="text-main">Login</h3>
                      </div>
                      <div className="form-body mt-3">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="input-container">
                            <input
                              placeholder="Enter your E-mail"
                              className={`input-field ${
                                errors.email && "border-danger"
                              }`}
                              type="text"
                              {...register("email", emailValidation)}
                            />
                            <label
                              htmlFor="input-field"
                              className={`input-label`}
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
                          <div className="group-input">
                            <div className="input-container">
                              <input
                                placeholder="Enter your password"
                                className={`input-field ${
                                  errors.password && "border-danger"
                                }`}
                                type={showPassword ? "text" : "password"}
                                {...register("password", passwordValidation)}
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
                              className={`icon fa-regular ${
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
                              className="text-white text-main nav-link"
                            >
                              Register now ?
                            </Link>
                            <Link
                              to="/forget-pass"
                              className="text-white nav-link"
                            >
                              Forget Password ?
                            </Link>
                          </div>
                          <button className="main-btn" disabled={subBtnClicked}>
                            {spinner ? loader() : " Login"}
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
