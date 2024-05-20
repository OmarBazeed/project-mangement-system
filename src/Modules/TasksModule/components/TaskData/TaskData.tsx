import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ProjectInterface,
  TaskInterface,
  TaskSubmitInterface,
  TaskUpdateSubmitInterface,
  UsersInterface,
} from "../../../../interfaces/Auth";
import {
  baseUrl,
  handleApiError,
  requestHeaders,
} from "../../../../utils/Utils";
export default function TaskData() {
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [projects, setprojects] = useState([]);
  const [users, setUsers] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [taskId, setTaskId] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const task = location.state;
  // console.log(location);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskSubmitInterface>({
    criteriaMode: "all",
  });

  const onSubmit: SubmitHandler<TaskSubmitInterface> = async (task) => {
    try {
      await axios.post(`${baseUrl}/Task`, task, {
        headers: requestHeaders,
      });
      toast.success("New Task Has Been Added Successfully");
      navigate("/dashboard/tasks");
    } catch (error) {
      handleApiError(error);
    }
  };

  const getProject = async (pageSize: number) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${baseUrl}/Project?pageSize=${pageSize}&pageNumbe=${pageNumber}`,
        {
          headers: requestHeaders,
          // params: {
          //   name: name,
          // },
        }
      );
      setprojects(data.data);
    } catch (err) {
      handleApiError(err);
    }
    setIsLoading(false);
  };
  const onUpdateSubmit:SubmitHandler<TaskUpdateSubmitInterface> = async (data: TaskInterface) => {
    try {
      const response = await axios.put(`${baseUrl}/Task/${taskId}`, data, {
        headers: requestHeaders,
      });
      // handleCloseUpdate();
      // getTask(taskName, 10, 1);
      toast.success(`Updated Task Successfully`);
      navigate("/dashboard/tasks");
    } catch (error) {
      toast.error(error.response.data.message);
    }
    // console.log(data);
  };
  const getUsers = async (pageSize: number) => {
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
      console.log(data.data);
    } catch (err) {
      handleApiError(err);
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
    if (task) {
      console.log(task);
      setIsUpdate(true);
      setTaskId(task.id);
      reset({
        title: task.title,
        description: task.description,
        employeeId: task.employee.id,
      });
    }
    getProject(10);
    getUsers(10);
  }, []);

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
                    navigate("/dashboard/tasks");
                  }}
                  className={`border-0 bg-transparent mb-3 `}
                >
                  <span
                    className={`text-theme text-lg-start text-sm-center text-center `}
                  >
                    <i
                      className={`fa-solid fa-chevron-left text-theme me-2`}
                    ></i>
                    View All Tasks
                  </span>
                </button>
                <h2 className={`text-theme `}>Add a New Task</h2>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`project-body head-bg mt-5 container rounded-4 shadow `}
        >
          <div className="container-auth-form py-4  ">
            {/* form body */}
            <div className="form-body mt-3">
              {/* */}
              <form
                onSubmit={handleSubmit(isUpdate ? onUpdateSubmit : onSubmit)}
              >
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
                {/*User and Project Selects*/}
                <div className="input-container mt-5">
                  <select
                    className={`input-field input-theme ${
                      errors.employeeId && "border-danger "
                    }`}
                    {...register("employeeId", {
                      required: "User is required",
                    })}
                  >
                    {task ? (
                      <option value={task.employee.id}>
                        {task.employee.userName}
                      </option>
                    ) : (
                      ""
                    )}
                    <option value="">No User Selected</option>
                    {users.map((user: UsersInterface) => (
                      <option key={user.id} value={user.id}>
                        {user.userName}
                      </option>
                    ))}
                  </select>
                  <label htmlFor={`input-field`} className={`input-label `}>
                    User
                  </label>
                  <span className={`input-highlight`}></span>
                </div>
                {errors.employeeId && (
                  <p className={`text-start text-danger ps-3`}>
                    {errors.employeeId.message}
                  </p>
                )}

                {task ? (
                  ""
                ) : (
                  <div className="input-container mt-5">
                    <select
                      className={`input-field input-theme ${
                        errors.employeeId && "border-danger "
                      }`}
                      {...register("projectId", {
                        required: "Project is required",
                      })}
                    >
                      <option value="">No Project Selected</option>
                      {projects.map((pro: ProjectInterface) => (
                        <option key={pro.id} value={pro.id}>
                          {pro.title}
                        </option>
                      ))}
                    </select>
                    <label htmlFor={`input-field`} className={`input-label`}>
                      Project
                    </label>
                    <span className={`input-highlight`}></span>
                  </div>
                )}
                {errors.projectId && (
                  <p className={`text-start text-danger ps-3`}>
                    {errors.projectId.message}
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
