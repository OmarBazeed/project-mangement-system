import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FormData } from "../../../../interfaces/Auth";
import Images from "../../../ImageModule/components/Images/Images";
import { baseUrl, loader, loading } from "../../../../utils/Utils";
import { toast } from "react-toastify";
import { emailValidation } from "../../../../utils/InputsValidation";

export default function ForgetPass() {
  const [spinner, setSpinner] = useState(false);
  const [subBtnCilcked, setSubBtnCilcked] = useState(false);
  const toastOption = {
    onClose: () => setSubBtnCilcked(false),
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    setSpinner(true);
    setSubBtnCilcked(true);
    try {
      const response = await axios.post(`${baseUrl}/Users/Reset/Request`, data);
      toast.success(
        response.data.message ||
          "Your request is being processed, please check your Email",
        toastOption
      );
      navigate("/reset-password");
    } catch (error) {
      toast.error(
        error?.response?.data.message || "An Error occurred",
        toastOption
      );
    } finally {
      setSpinner(false);
    }
  };

  return (
    <>
      <section className="">
        <div className="bg-forget vh-100 text-white d-flex  align-items-center  ">
          <div className="container d-flex justify-content-center ">
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
                        <h3 className="text-main">Forget Password</h3>
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

                          {/* submit button */}
                          <button
                            type="submit"
                            className="main-btn"
                            disabled={subBtnCilcked}
                          >
                            {spinner ? loader() : "Go Now"}
                          </button>
                          <button
                            onClick={() => {
                              navigate("/login");
                            }}
                            className="d-block mx-auto mt-3 bg-transparent border-0 text-white "
                            type="button"
                          >
                            Back to Login?
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
