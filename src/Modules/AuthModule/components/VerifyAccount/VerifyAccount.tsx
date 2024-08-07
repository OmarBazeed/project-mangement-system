import { useForm } from "react-hook-form";
import Images from "../../../ImageModule/components/Images/Images";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FormData } from "../../../../interfaces/Auth";
import { toast } from "react-toastify";
import {
  emailValidation,
  OTPValidation,
} from "../../../../utils/InputsValidation";
import { baseUrl, loader } from "../../../../utils/Utils";
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
      const response = await axios.put(`${baseUrl}/Users/verify`, data);
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
      <section className="">
        <div className="bg-verify vh-100 text-white d-flex  align-items-center  ">
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
                        <h3 className="text-main">Verify Account</h3>
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
                              {...register("email", emailValidation)}
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
                          {/* otp input */}
                          <div className="input-container">
                            <input
                              placeholder="Enter Verification"
                              className={`input-field ${
                                errors.seed && "border-danger "
                              }`}
                              type="text"
                              {...register("seed", OTPValidation)}
                            />
                            <label
                              htmlFor="input-field"
                              className={`input-label `}
                            >
                              Verification Code
                            </label>
                            <span className="input-highlight"></span>
                          </div>
                          {errors.seed && (
                            <p className="text-start text-danger ps-3">
                              {errors.seed.message}
                            </p>
                          )}

                          <div className="d-flex justify-content-between my-2">
                            <Link
                              to="/register"
                              className="text-white text-main nav-link "
                            >
                              Register now?
                            </Link>

                            <Link to="/login" className="text-white nav-link ">
                              Login Now?
                            </Link>
                          </div>
                          {/* submit button */}
                          <button className="main-btn" disabled={setSpinner}>
                            {spinner ? loader() : " Verify Now"}
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
