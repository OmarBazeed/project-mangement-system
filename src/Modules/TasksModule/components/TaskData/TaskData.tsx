import React, { useEffect, useState } from "react";
import style from "../Tasks.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
export default function TaskData() {
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [projects, setprojects] = useState([]);
  const [users, setUsers] = useState([]);


  const requestHeaders = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const baseUrl = `https://upskilling-egypt.com:3003/api/v1`;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    criteriaMode: "all",
  });
  const navigate = useNavigate();
  const onSubmit = (task: any) => {
    try {
      const { data } = axios.post(`${baseUrl}/Task`, task, {
        headers: requestHeaders,
      });
      // console.log(data);
      navigate('/dashboard/tasks')
      toast.success("Added Your Task Successfully");
    } catch (error) {
      console.log(error.data);
    }
  };

  const getProject = async (pageSize: any) => {
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
      console.log(err);
    }
    setIsLoading(false);
  };

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
      console.log(data.data);
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

  useEffect(()=> {
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
                {/*User and Project Selects*/}
                <div className="input-container mt-5">
                  <select
                    name="User"
                    className={`input-field input-theme ${
                      errors.employeeId && "border-danger "
                    }`}
                    {...register("employeeId", {
                      required: "User is required",
                    })}    
                  >
                    <option value=''>No User Selected</option>
                    {users.map((user)=> (
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

                  <div className="input-container mt-5">
                  <select
                    name="Project"
                    className={`input-field input-theme ${
                      errors.employeeId && "border-danger "
                    }`}
                    {...register("projectId", {
                      required: "Project is required",
                    })}    
                  >
                    <option value=''>No Project Selected</option>
                    {projects.map((pro)=> (
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
