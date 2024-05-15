import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { useToast } from "../../../../Context/ToastContext";
import { FormData } from "../../../../interfaces/Auth";
import { BaseUrlContext } from "../../../../Context/BaseUrlContext";
import { emailValidation } from "../../../../utils/InputsValidation";
import Images from "../../../ImageModule/components/Images/Images";

export default function ForgetPass() {
	const baseUrl: string = useContext(BaseUrlContext);
	const [spinner, setSpinner] = useState(false);
	const { showSuccessToast, showErrorToast } = useToast();

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
		formState: { errors, isSubmitting },
	} = useForm<FormData>();
	const navigate = useNavigate();

	const onSubmit = async (data: FormData) => {
		setSpinner(true);

		try {
			const response = await axios.post(`${baseUrl}/Users/Reset/Request`, data);
			showSuccessToast(
				response.data.message ||
					"Your request is being processed, please check your Email"
			);
			console.log(response);
			navigate("/reset-password");
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
													<button className="main-btn">
														{spinner ? btnloading() : "Verify"}
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
