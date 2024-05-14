import { useForm } from "react-hook-form";
import logo from "../../../../assets/images/PMS 3.png";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { useToast } from "../../../../Context/ToastContext";
import { FormData } from "../../../../interfaces/Auth";
import { BaseUrlContext } from "../../../../Context/BaseUrlContext";

export default function ForgetPass() {
	const baseUrl: string = useContext(BaseUrlContext);
	const [spinner, setSpinner] = useState(false);
	const { showSuccessToast, showErrorToast } = useToast();

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
			<div className="Auth-container vh-100 gx-0">
				<div className="logo col-md-5 text-center">
					<img src={logo} alt="logo" className="mb-3" />
				</div>

				<div className="login-container col-md-5 col-sm-10 rounded-4 px-5 py-5">
					<p className="text-white m-0">Welcome to PMS</p>
					<h3 className="color-text mb-4 forget-pass">Forget Password</h3>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="form-group">
							<label className="color-text" htmlFor="exampleFormControlInput1">
								Email
							</label>
							<input
								id="exampleFormControlInput1"
								type="email"
								className="form-control m-1 px-2"
								{...register("email", {
									required: "Email Is Required",
									pattern: {
										value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
										message: "Email is not valid ",
									},
								})}
								placeholder="Enter Your Email"
							/>
							<div className="border_bottom"></div>
						</div>
						{errors.email && (
							<div className="alert alert-danger p-2 m-0 ">
								{errors.email.message}
							</div>
						)}

						<button
							disabled={isSubmitting}
							type="submit"
							className="w-100 btn color-button rounded-5 mt-5"
						>
							{spinner && isSubmitting ? (
								<div className="spinner-border" role="status"></div>
							) : (
								"Verify"
							)}
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
