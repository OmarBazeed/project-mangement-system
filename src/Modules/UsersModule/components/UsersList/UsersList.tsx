import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl, requestHeaders } from "../../../../utils/Utils";
import NoData from "../../../SharedModule/components/NoData/NoData";
import moment from "moment";
import style from "./Users.module.css";


export default function UsersList() {
  const [isLoading, setIsLoading] = useState(false);
	const [usersList, setUsersList] = useState([]);

  const navigate = useNavigate();

  const getUsersList = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get(
				`${baseUrl}/Users/Manager`,
				{
					headers: requestHeaders,
				}
			);
      console.log(response);
			setUsersList(response.data.data);
			// setTotalPages(response.totalNumberOfPages);
			// setTotalUserject(response.totalNumberOfPages);
		} catch (err) {
			console.log(err);
		}
		setIsLoading(false);
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

		useEffect(() => {
			getUsersList();
		}, []);


  return (
		<>
			<section>
				<div
					className={`project-data-head container-fluid shadow-sm  head-bg pt-5 pb-2 px-5`}
				>
					<div className={`row`}>
						<div className="col-md-6">
							<div
								className={`text-theme text-lg-start text-sm-center text-center`}
							>
								<button
									onClick={() => {
										navigate("/dashboard/tasks");
									}}
									className={`border-0 bg-transparent `}
								></button>
								<h2 className={`text-theme `}>Users</h2>
							</div>
						</div>
					</div>
				</div>

				{/* table */}

				<div
					className={`project-body head-bg mt-5 container rounded-4 shadow  px-4 py-5`}
				>
					<ul className={`${style.responsiveTableProjects} text-white`}>
						<li className={`${style.tableHeader}`}>
							<div className={`${style.col} ${style.col1}`}>ID</div>
							<div className={`${style.col} ${style.col2}`}>Title</div>
							<div className={`${style.col} ${style.col3}`}>No of tasks</div>
							<div className={`${style.col} ${style.col4}`}>Creation Date</div>
							<div className={`${style.col} ${style.col5}`}>Actions</div>
						</li>
					</ul>
					{isLoading ? (
						<div className="container text-center mt-5 pt-5 text-theme">
							{btnloading()}
						</div>
					) : (
						<ul className={`${style.responsiveTableProjects}`}>
							{usersList.length > 0 ? (
								usersList.map((user) => (
									<li
										key={user.id}
										className={`${style.tableRow} bg-theme text-theme`}
									>
										<div
											className={`${style.col}  ${style.col1}`}
											data-label="ID"
										>
											{user.id}
										</div>
										<div
											className={`${style.col} ${style.col2}`}
											data-label="Title :"
										>
											{user.userName}
										</div>
										<div
											className={`${style.col} ${style.col3}`}
											data-label="No of tasks :"
										>
											{user.task?.lenngth > 0 ? user.task?.lenngth : 0}
										</div>
										<div
											className={`${style.col} ${style.col4}`}
											data-label="Creation Date :"
										>
											{/* {item.modificationDate} */}
											{moment(user.creationDate).format("LLLL")}
										</div>
										<div
											className={`${style.col} ${style.col5}`}
											data-label="Actions :"
										>
											<div className="btn-group">
												{window.innerWidth < 650 ? (
													""
												) : (
													<i
														data-bs-toggle="dropdown"
														aria-expanded="false"
														className="fa-solid fa-ellipsis"
													></i>
												)}

												<ul
													className={`  ${
														window.innerWidth < 650
															? "d-flex  align-items-center  justify-content-center "
															: "dropdown-menu dropdown-menu-end"
													}  m-0 p-0`}
												>
													<li
														role="button"
														// onClick={() => handleShowShowItem(user)}
														className="px-3 py-1 pt-2  "
													>
														<div className="dropdown-div ">
															<i className="fa-regular fa-eye me-2"></i>
															{window.innerWidth < 650 ? "" : <span>View</span>}
														</div>
													</li>
													<li
														role="button"
														// onClick={() => handleUpdate(item.id, item.name)}
														className="px-3 py-1"
													>
														<div role="button" className="dropdown-div">
															<i className="fa-regular fa-pen-to-square me-2 "></i>
															{window.innerWidth < 650 ? "" : <span>Edit</span>}
														</div>
													</li>
													<li
														role="button"
														onClick={() => handleShowDelete(user.id, user.title)}
														className="px-3 py-1 "
													>
														<div className="dropdown-div">
															<i className="fa-solid fa-trash-can me-2"></i>
															{window.innerWidth < 650 ? (
																""
															) : (
																<span>Delelte</span>
															)}
														</div>
													</li>
												</ul>
											</div>
										</div>
									</li>
								))
							) : (
								<NoData />
							)}
						</ul>
					)}
				</div>
			</section>
		</>
	);
}
