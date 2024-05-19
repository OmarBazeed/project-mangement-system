import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../Tasks.module.css";
import NoData from "../../../SharedModule/components/NoData/NoData";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import {
  baseUrl,
  handleApiError,
  requestHeaders,
} from "../../../../utils/Utils";
import { TaskInterface } from "../../../../interfaces/Auth";
import { useForm } from "react-hook-form";

export default function TasksList() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // State for page number
  const [pageNumber, setPageNumber] = useState(1);
  // State for total number of pages
  const [totalPages, setTotalPages] = useState(0);
  // State for total number of pages
  const [totalTasks, setTotalTasks] = useState(0);
  const [taskName, setTaskName] = useState("");
  const [tasksList, setTasksList] = useState<[UsersInterface] | []>([]);
  const [taskId, setTaskId] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [users, setUsers] = useState([]);
  const [paginationNum, setPaginationNum] = useState<number[]>([]);



  const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		criteriaMode: "all",
	});


  const getUsers = async (pageSize: any) => {
		setIsLoading(true);
		try {
			const { data } = await axios.get(
				`${baseUrl}/Users?pageSize=${pageSize}&pageNumbe=${pageNumber}`,
				{
					headers: requestHeaders,
					// params: {
					//   name: name,
					// },
				}
			);
			setUsers(data.data);
			toast.success(data.data)
		} catch (error) {
			toast.error(error)
		}
		setIsLoading(false);
	};



  const getTask = async (taskName: string, pageSize: number, pageNumber: number) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${baseUrl}/Task/manager?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        {
          headers: requestHeaders,
          params: {
            title: taskName,
          },
        }
      );

      setTasks(data.data);
      console.log(data.data);
      setTotalPages(data.totalNumberOfPages);
      setPaginationNum(
        Array(data.data.totalNumberOfPages)
          .fill(0)
          .map((_, i) => i + 1)
      );
      setTotalTasks(data.totalNumberOfPages);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

 

  /*const getTasksList = async (taskName: string, pSize: number, pNum: number) => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${baseUrl}/Task/manager?pageSize=${pSize}&pageNumber=${pNum}`,
        {
          headers: requestHeaders,
          params: {
            title: taskName,
          },
        }
      );
      setTasksList(res.data.data);
      setPaginationNum(
        Array(res.data.totalNumberOfPages)
          .fill(0)
          .map((_, i) => i + 1)
      );
      // setTotalPages(response.totalNumberOfPages);
      // setTotalUserject(response.totalNumberOfPages);
    } catch (err) {
      const errMsg =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "An unexpected error occurred";
      toast.error(errMsg);
    }
    setIsLoading(false);
  };*/



  const onDeleteSubmit = async () => {
    handleCloseDelete();
    try {
      const response = await axios.delete(`${baseUrl}/Task/${taskId}`, {
        headers: requestHeaders,
      });
      getTask(10);
      toast.success(`Deleted ${taskName} Successfully`);
    } catch (err) {
      console.log(err);
    }
  };

  const onUpdateSubmit = async (data) => {
    try {
      const response = await axios.put(`${baseUrl}/Task/${taskId}`, data , {
        headers: requestHeaders,
      });
      handleCloseUpdate();
      getTask(10);
      toast.success(`Updated ${taskName} Successfully`);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };


  const handleCloseDelete = () => {
    // resetting the values to default after closing the modal
    setShowDelete(false);
    setTaskId(null);
    setTaskName(null);
  };
  const handleShowDelete = (id, name) => {
    // set the values to handle  them in the delete process
    setTaskId(id);
    setTaskName(name);
    setShowDelete(true);
  };

  const handleCloseUpdate = () => {
    setShowUpdate(false);
    setTaskId(null);
    setTaskName(null);
  }

  const handleShowUpdate = (id, name) => {
    setTaskId(id);
    setTaskName(name);
    setShowUpdate(true);
  }

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
    getTask(taskName, 10, 1);
    getUsers(50);
  }, [taskName]);

  return (
    <>
      <section>
        <div
          className={`project-head container-fluid shadow-sm  head-bg pt-5 pb-4 px-5`}
        >
          <div className={`row`}>
            <div className="col-md-6">
              <div>
                <h2
                  className={`text-theme text-lg-start text-sm-center text-center`}
                >
                  Tasks
                </h2>
              </div>
            </div>
            <div className={`col-md-6 text-lg-end text-sm-center text-center `}>
              <div>
                <div className={``}>
                  <button
                    onClick={() => {
                      navigate("/dashboard/tasks-data");
                    }}
                    className={`main-btn`}
                  >
                    Add New Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*Filtaration*/}
        <div
          className={`filtaration container rounded-4 w-100 mt-3 ${style.inputSearch}`}
        >
          <div className="row">
            <div className="col-md-9 inputSearch">
              <input
                type="text"
                placeholder="Search Fleets"
                className={`form-control p-3 rounded-5 ${style.filterInput}`}
                onChange={(e) => {
                  setTaskName(e.target.value);
                  Tasks(taskName, 10, 1);
                }}
              />
              <i className={`fa fa-search ${style.userSearchIcon}`}></i>
            </div>
            <button className="col-md-1 btn btn-success border-0 rounded-5">
              <i className="fa fa-filter"></i> Filter
            </button>
          </div>
        </div>


        <div
          className={`project-body head-bg mt-5 container rounded-4 shadow  px-4 py-5`}
        >
          <ul className={`${style.responsiveTableProjects} text-white`}>
            <li className={`${style.tableHeader}`}>
              <div className={`${style.col} ${style.col1}`}>ID</div>
              <div className={`${style.col} ${style.col2}`}>Title</div>
              <div className={`${style.col} ${style.col3}`}>User</div>
              <div className={`${style.col} ${style.col4}`}>Project</div>
              <div className={`${style.col} ${style.col5}`}>Actions</div>
            </li>
          </ul>
          {isLoading ? (
            <div className="container text-center mt-5 pt-5 text-theme">
              {btnloading()}
            </div>
          ) : (
            <ul className={`${style.responsiveTableProjects}`}>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <li
                    key={task.id}
                    className={`${style.tableRow} bg-theme text-theme`}
                  >
                    <div
                      className={`${style.col}  ${style.col1}`}
                      data-label="ID"
                    >
                      {task.id}
                    </div>
                    <div
                      className={`${style.col} ${style.col2}`}
                      data-label="Title :"
                    >
                      {task.title}
                    </div>
                    <div
                      className={`${style.col} ${style.col3}`}
                      data-label="User"
                    >
                      {task.employee.userName}
                    </div>
                    <div
                      className={`${style.col} ${style.col4}`}
                      data-label="Project"
                    >
                      {task.project.title}
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
                            // onClick={() => handleShowShowItem(pro)}
                            className="px-3 py-1 pt-2  "
                          >
                            <div className="dropdown-div ">
                              <i className="fa-regular fa-eye me-2"></i>
                              {window.innerWidth < 650 ? "" : <span>View</span>}
                            </div>
                          </li>
                          <li
                            role="button"
                            onClick={() => handleShowUpdate(task.id, task.title)}
                            className="px-3 py-1"
                          >
                            <div role="button" className="dropdown-div">
                              <i className="fa-regular fa-pen-to-square me-2 "></i>
                              {window.innerWidth < 650 ? "" : <span>Edit</span>}
                            </div>
                          </li>
                          <li
                            role="button"
                            onClick={() => handleShowDelete(task.id, task.title)}
                            className="px-3 py-1 "
                          >
                            <div className="dropdown-div">
                              <i className="fa-solid fa-trash-can me-2"></i>
                              {window.innerWidth < 650 ? (
                                ""
                              ) : (
                                <span>Delete</span>
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

        {/* modal handle delete  */}
        <Modal
          className="posModalDelete"
          show={showDelete}
          onHide={handleCloseDelete}
        >
          <Modal.Body className="p-4 bg-theme">
            <div className="addCatModalHead text-end">
              <div className="addCatModalHeadClose ">
                <i
                  onClick={() => handleCloseDelete()}
                  className="fa-solid fa-close btn border-danger py-1 px-2 rounded-circle   text-danger "
                ></i>
              </div>
            </div>

            {/* ------------  */}
            <div className="addCatModalBody ">
              <DeleteData deleteItem={taskName} />
            </div>
            {/* ------------- */}
            <div className="addCatModalFooter"></div>

            <div className=" text-end">
              <button
                onClick={onDeleteSubmit}
                className={`btn py-1 px-3 fs-6  fw-medium  btn btn-outline-danger `}
              >
                {isLoading ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  ` Delete this ${taskName}`
                )}
              </button>
            </div>
          </Modal.Body>
        </Modal>

        {/* modal handle update */}
        <Modal
          className="posModalUpdate"
          show={showUpdate}
          onHide={handleCloseUpdate}
        >
          <Modal.Body className="p-4 bg-theme">
            <div className="addCatModalHead text-end">
              <div className="addCatModalHeadClose">
                <i
                  onClick={() => handleCloseUpdate()}
                  className="fa-solid fa-close btn border-danger py-1 px-2 rounded-circle text-danger"
                ></i>
              </div>
            </div>

            <div className="addCatModalBody">
              <div className="text-center">
                <h5>Update {taskName}</h5>
                <form onSubmit={handleSubmit(onUpdateSubmit)}>
                  <div className="input-container">
                    <input
                      placeholder="title"
                      className={`input-field input-theme ${
                        errors.title && "border-danger"
                      }`}
                      type="text"
                      {...register("title", {
                        required: "Title is required",
                      })}
                    />
                    <label htmlFor="input-field" className={`input-label`}>Title</label>
                    <span className="input-highlight"></span>
                  </div>
                  {errors.title && (
                    <p className="text-start text-danger ps-3">{errors.title.message}</p>
                  )}
                  
                  <div className="input-container">
                    <input
                      placeholder="description"
                      className={`input-field input-theme ${
                        errors.description && "border-danger"
                      }`}
                      type="text"
                      {...register("description", {
                        required: "Description is required",
                      })}
                    />
                    <label htmlFor="input-field" className={`input-label`}>Description</label>
                    <span className="input-highlight"></span>
                  </div>
                  {errors.description && (
                    <p className="text-start text-danger ps-3">{errors.description.message}</p>
                  )}

                  <div className="input-container mt-5">
                    <select
                      name="User"
                      className={`input-field input-theme ${
                        errors.employeeId && "border-danger"
                      }`}
                      {...register("employeeId", {
                        required: "User is required",
                      })}
                    >
                      <option value="">No User Selected</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.userName}
                        </option>
                      ))}
                    </select>
                    <label htmlFor={`input-field`} className={`input-label`}>User</label>
                    <span className={`input-highlight`}></span>
                  </div>
                  {errors.employeeId && (
                    <p className={`text-start text-danger ps-3`}>{errors.employeeId.message}</p>
                  )}

                  <div className="text-end">
                    <button
                      type="submit"
                      className={`btn py-1 px-3 fs-6 fw-medium btn btn-outline-success`}
                    >
                      {isLoading ? (
                        <i className="fa-solid fa-spinner fa-spin"></i>
                      ) : (
                        `Update ${taskName}`
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        {/*Pagination*/}
        <div className="w-100 container my-3">
          <nav aria-label="Page navigation example w-100">
            <ul className="pagination w-100 d-flex align-items-center justify-content-center flex-wrap">
              <li className="page-item">
                <a className="page-link" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {paginationNum.map((ele) => {
                return (
                  <li
                    className="page-item"
                    key={ele}
                    onClick={() => getTask(taskName, 10, ele)}
                  >
                    <a className="page-link">{ele}</a>
                  </li>
                );
              })}
              <li className="page-item">
                <a className="page-link" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}
