import React, { useState } from "react";
import style from "../Project.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
export default function ProjectData() {
	const [isLoading, setIsLoading] = useState(false);
	const requestHeaders = {
		Authorization: `Bearer ${localStorage.getItem("token")}`,
	};
	const baseUrl = `https://upskilling-egypt.com:3003/api/v1`;
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		criteriaMode: "all",
	});
	const navigate = useNavigate();
	const onSubmit = (pro: any) => {
		try {
			const { data } = axios.post(`${baseUrl}/Project`, pro, {
				headers: requestHeaders,
			});
			toast.success("New Project Has Been Added Successfully");
			navigate("/dashboard/projects");
		} catch (error) {
			console.log(error.data);
		}
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
	return (
		<>
			<section>
				<div
					className={`project-data-head container-fluid shadow-sm  head-bg pt-5 pb-4 px-5`}
				>
					<div className={`row`}>
						<div className="col-md-6">
							<div
								className={`text-theme text-lg-start text-sm-center text-center`}
							>
								<button
									onClick={() => {
										navigate("/dashboard/projects");
									}}
									className={`border-0 bg-transparent mb-3 `}
								>
									<span
										className={`text-theme text-lg-start text-sm-center text-center `}
									>
										<i
											className={`fa-solid fa-chevron-left text-theme me-2`}
										></i>
										View All Projects
									</span>
								</button>
								<h2 className={`text-theme `}>Add a New Project</h2>
							</div>
						</div>
					</div>
				</div>
				<div
					className={`project-body head-bg mt-5 container rounded-4 shadow `}
				>
					<div className="container-auth-form py-5  ">
						{/* form body */}
						<div className="form-body mt-3">
							{/* */}
							<form onSubmit={handleSubmit(onSubmit)}>
								{/* title input */}
								<div className="input-container">
									<input
										placeholder="Name"
										className={`input-field input-theme ${
											errors.title && "border-danger "
										}`}
										type="text"
										{...register("title", {
											required: "Title is required",
										})}
									/>
									<label htmlFor="input-field" className={`input-label `}>
										Title
									</label>
									<span className="input-highlight"></span>
								</div>
								{errors.title && (
									<p className="text-start text-danger ps-3">
										{errors.title.message}
									</p>
								)}
								{/* description input */}
								<div className="input-container mt-5">
									<textarea
										rows={5}
										placeholder="Description"
										className={`input-field input-theme ${
											errors.description && "border-danger "
										}`}
										type="text"
										{...register("description", {
											required: "Description is required",
										})}
									></textarea>
									<label htmlFor={`input-field`} className={`input-label `}>
										Description
									</label>
									<span className={`input-highlight`}></span>
								</div>
								{errors.description && (
									<p className={`text-start text-danger ps-3`}>
										{errors.description.message}
									</p>
								)}
								<div className={`d-flex justify-content-between mt-5 `}>
									<button
										onClick={() => {
											navigate("/dashboard/projects");
										}}
										type="button"
										className={`px-5 rounded-3 border-dark bg-white  fs-5 `}
									>
										Cancel
									</button>
									{/* submit button */}
									<button type="submit" className="main-btn">
										{isLoading ? btnloading() : " Save"}
										{/* Save */}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
