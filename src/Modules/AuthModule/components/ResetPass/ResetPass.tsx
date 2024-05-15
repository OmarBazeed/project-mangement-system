import { useForm } from "react-hook-form";
// import logo from '../../../../assets/images/PMS 3.png';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FormData } from "../../../../interfaces/Auth";
import { useToast } from "../../../../Context/ToastContext";
import Images from "../../../ImageModule/components/Images/Images";
import {
	emailValidation,
	passwordValidation,
} from "../../../../utils/InputsValidation";
export default function Login() {
	// All states here on the top
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const { showSuccessToast, showErrorToast } = useToast();

	const [spinner, setSpinner] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
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
	};

	const validateConfirmPassword = (value) => {
		const newPassword = getValues("password");
		return value === newPassword || "Passwords do not match";
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
				"https://upskilling-egypt.com:3003/api/v1/Users/Reset",
				data
			);
			console.log(response);
			showSuccessToast("Password Reset Successfully");
			navigate("/login");
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
				<div className="bg-reset vh-100 text-white d-flex  align-items-center  ">
					<div className="container  d-flex justify-content-center ">
						<div className="row my-5 w-100">
							<div className="col-md-6 mx-auto text-center ">
								{/* register */}
								<div className="login w-100 ">
									<img className="mb-3" src={Images.authLogo} alt="" />
									{/* form */}
									<div className="form  rounded-4 py-5">
										<div className="container-auth-form pt-4  ">
											<div className="form-title position-relative ">
												<p>welcome to PMS</p>
												<h3 className="text-main">Reset Password</h3>
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
													{/* password input */}
													<div className="group-input ">
														<div className="input-container  ">
															<input
																placeholder="Enter your new password"
																className={`input-field ${
																	errors.password && "border-danger "
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

													<div className="group-input ">
														<div className="input-container  ">
															<input
																placeholder="Confirm your new password"
																className={`input-field ${
																	errors.password && "border-danger "
																}`}
																type={showPassword ? "text" : "password"}
																{...register("confirmPassword", {
																	required: "confirm password is required ",
																	validate: validateConfirmPassword,
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

													<div className="input-container">
														<input
															placeholder="Enter Verification"
															className={`input-field ${
																errors.email && "border-danger "
															}`}
															type="text"
															{...register("code", {
																required: "OTP required",
															})}
														/>
														<label
															htmlFor="input-field"
															className={`input-label `}
														>
															OTP Verification
														</label>
														<span className="input-highlight"></span>
													</div>
													{errors.code && (
														<p className="text-start text-danger ps-3">
															{errors.code.message}
														</p>
													)}

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
