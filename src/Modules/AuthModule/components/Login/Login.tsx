/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import logo from "../../../../assets/images/PMS 3.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FormData } from "../../../../interfaces/Auth";
import { useUser } from "../../../../Context/AuthContext";
import { useToast } from "../../../../Context/ToastContext";
export default function Login() {
	// All states here on the top
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const { showSuccessToast, showErrorToast } = useToast();

	const { saveAdminData, adminData } = useUser();
	console.log(adminData);
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
		<div className="Auth-container vh-100 row align-items-center justify-content-center overflow-auto gx-0 flex-nowrap ">
			<div className="logo  col-md-5 text-center">
				<img src={logo} alt="logo" className="mb-3" />
			</div>

			<div className="login-container  col-md-5 col-sm-10 rounded-4 px-5 py-5">
				<p className="text-white">Welcome to PMS</p>
				<h3 className="color-text mb-3">Login</h3>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="form-group">
						<label className="color-text" htmlFor="exampleFormControlInput1">
							Email
						</label>
						<input
							id="exampleFormControlInput1"
							type="email"
							className="form-control"
							{...register("email", {
								required: "email is required",
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
									message: "email is not valid ",
								},
							})}
							placeholder="email"
						/>
						<div className="border_bottom"></div>
					</div>
					{errors.email && (
						<div className="alert alert-danger ">{errors.email.message}</div>
					)}
					<div className="form-group for-visibilty-password-container">
						<label className="color-text" htmlFor="exampleFormControlInput2">
							password
						</label>
						<input
							id="exampleFormControlInput2"
							type={showPassword ? "text" : "password"}
							className="form-control"
							placeholder="password"
							{...register("password", {
								required: "password is required ",
								pattern: {
									value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
									message:
										"Password must contain at least 8 characters, including upper and lowercase letters, and numbers",
								},
							})}
						/>
						<button
							className="btn btn-outline-secondary for-visibilty-password-button"
							type="button"
							onClick={togglePasswordVisibility}
							title=" btn"
						>
							<i
								className={`fa-regular fa-eye${!showPassword ? "-slash" : ""}`}
							></i>
						</button>
						<div className="border_bottom"></div>
					</div>
					{errors.password && (
						<div className="alert alert-danger ">{errors.password.message}</div>
					)}
					<div className="d-flex justify-content-between my-2">
						<Link to="/register" className="text-white">
							Register now ?
						</Link>
						<Link to="/ForgetPasword" className="text-white">
							Forget Password ?
						</Link>
					</div>
					<button type="submit" className="w-100 btn color-button rounded-5">
						{spinner ? (
							<div className="spinner-border" role="status"></div>
						) : (
							"Log in"
						)}
					</button>
				</form>
			</div>
		</div>
	);
}
