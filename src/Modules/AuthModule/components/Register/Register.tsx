import { useContext, useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Images from "../../../ImageModule/components/Images/Images";
import { BaseUrlContext } from "../../../../Context/BaseUrlContext";

export default function Register() {
	const baseUrl: string = useContext(BaseUrlContext);
	// instance from use navigate
	const navigate = useNavigate();
	// image input state
	const [image, setImage] = useState(null);
	// hide pass or show state
	let [hidePassInInpt, setHidePassInInpt] = useState(true);
	// check loading state
	const [isLoading, setIsLoading] = useState(false);
	// function for change password input type
	const changePassInputType = () => {
		setHidePassInInpt((hidePassInInpt = !hidePassInInpt ? true : false));
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

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		criteriaMode: "all",
	});
	const onSubmit = async (data: any) => {
		setIsLoading(true);
		const registerFormData = appendToFormData(data);
		try {
			const response = await axios.post(
				`${baseUrl}/Users/Register`,
				registerFormData
			);
			toast.success(response.data.message);
			navigate("/verify-account");
			console.log(response.data.message);
		} catch (err) {
			console.log(err);
			toast.error(err.response.data.message);
		}
		setIsLoading(false);
	};
	const appendToFormData = (data: any) => {
		const formData = new FormData();
		formData.append("userName", data.userName);
		formData.append("country", data.country);
		formData.append("password", data.password);
		formData.append("email", data.email);
		formData.append("phoneNumber", data.phoneNumber);
		formData.append("confirmPassword", data.confirmPassword);
		formData.append("profileImage", data.profileImage);
		return formData;
	};
	return (
		<>
			<section className="">
				<div className="bg-reg vh-100 text-white d-flex align-items-center  ">
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
																	// {...register("profileImage", {
																	//   // required: "Image is required",
																	// })}
																	onChange={({ target: { files } }) => {
																		if (files) {
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
																	{...register("userName", {
																		required: "User Name is Required",
																		pattern: {
																			value: /[A-Za-z]{4,7}[\d]{1}/gm,
																			message:
																				"The user name must contain characters and end with numbers without spaces.",
																		},
																		maxLength: {
																			value: 8,
																			message:
																				"The user name may not be greater than 8 characters.",
																		},
																		minLength: {
																			value: 4,
																			message:
																				"The user name must be at least 4 characters.",
																		},
																	})}
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
																	{...register("phoneNumber", {
																		required: "Phone number is required",
																		pattern: {
																			value: /^[\d]{1,18}$/gm,
																			message: "Phone digits only",
																		},
																	})}
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
																	{...register("email", {
																		required: "Email is Required",
																	})}
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
																		{...register("password", {
																			required: "Password is required",
																			pattern: {
																				value:
																					/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* )/,
																				message:
																					"Password must contain at least one digit, lowercase letter, uppercase letter, special character",
																			},
																			minLength: {
																				value: 8,
																				message:
																					"Minimum length should be 8 characters",
																			},
																			maxLength: {
																				value: 16,
																				message: "Maximum length exceeded 16",
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
													{/* submit button */}
													<button className="main-btn">
														{isLoading ? btnloading() : " Save"}
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

// ${errors.recipeImage && "border-danger " }
