import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import ResponsivePagination from "react-responsive-pagination";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TaskInterface } from "../../../../interfaces/Auth";
import {
  baseUrl,
  getRequestHeaders,
  handleApiError,
  loader,
} from "../../../../utils/Utils";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";
import NoData from "../../../SharedModule/components/NoData/NoData";
import style from "../Tasks.module.css";

export default function TasksList() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<[TaskInterface] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  // State for page number
  const [pageNumber, setPageNumber] = useState(1);
  // State for total number of pages
  const [totalPages, setTotalPages] = useState(0);
  // State for task name used in search
  const [taskTitle, setTaskTitle] = useState("");
  const [taskId, setTaskId] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const [taskName, setTaskName] = useState("");

  const getTask = useCallback(
    async (taTitle: string, pageNumber: number, pageSize: number) => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `${baseUrl}/Task/manager?pageSize=${pageSize}&pageNumber=${pageNumber}`,
          {
            headers: getRequestHeaders(),
            params: {
              title: taTitle,
            },
          }
        );

        setTasks(data.data);
        setTotalPages(data.totalNumberOfPages);
      } catch (err) {
        handleApiError(err);
      }
      setIsLoading(false);
    },
    []
  );

  const onDeleteSubmit = async () => {
    handleCloseDelete();
    try {
      await axios.delete(`${baseUrl}/Task/${taskId}`, {
        headers: getRequestHeaders(),
      });
      getTask(taskTitle, pageNumber, 10);
      toast.success(`Deleted ${taskName} Successfully`);
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleCloseDelete = () => {
    // resetting the values to default after closing the modal
    setShowDelete(false);
    setTaskId(0);
    setTaskName("");
  };

  const handleShowDelete = (id: number, title: string) => {
    // set the values to handle them in the delete process
    setTaskId(id);
    setTaskName(title);
    setShowDelete(true);
  };

  const getTaskStatus = (status: string) => {
    switch (status) {
      case "ToDo":
        return <p className={`${style.status} ${style.todo}`}>To Do</p>;
      case "InProgress":
        return (
          <p className={`${style.status} ${style.inProgress}`}>In Progress</p>
        );
      case "Done":
        return <p className={`${style.status} ${style.done}`}>Done</p>;
      default:
        return <p className={`${style.status}`}>Unknown</p>;
    }
  };

  // Update the useEffect to include taskTitle and reset pageNumber on search
  useEffect(() => {
    getTask(taskTitle, pageNumber, 10);
  }, [taskTitle, pageNumber, getTask]);
  useEffect(() => {
    // Reset page number when taskTitle changes /** Important Note **/
    setPageNumber(1);
  }, [taskTitle]);

  return (
    <>
      <section>
        <div
          className={`project-head container-fluid shadow-sm head-bg pt-5 pb-4 px-5`}
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
            <div className={`col-md-6 text-lg-end text-sm-center text-center`}>
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

        {/* Filtaration */}
        <div
          className={`filtaration container rounded-4 w-100 mt-3 ${style.inputSearch}`}
        >
          <div className="container">
            <div className="input-container w-75">
              <input
                placeholder="Search By Name"
                className={`input-field input-theme`}
                type="text"
                onChange={(e) => setTaskTitle(e.target.value)}
              />
              <label htmlFor="input-field" className={`input-label`}>
                Search
              </label>
              <span className="input-highlight"></span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div
          className={`project-body head-bg mt-5 container rounded-4 shadow px-4 py-5`}
        >
          <ul className={`${style.responsiveTableProjects} text-white`}>
            <li className={`${style.tableHeader}`}>
              <div className={`${style.col} ${style.col1}`}>ID</div>
              <div className={`${style.col} ${style.col2}`}>Title</div>
              <div className={`${style.col} ${style.col2}`}>Status</div>
              <div className={`${style.col} ${style.col3}`}>User</div>
              <div className={`${style.col} ${style.col4}`}>Project</div>
              <div className={`${style.col} ${style.col5}`}>Actions</div>
            </li>
          </ul>
          {isLoading ? (
            <div className="container pt-5 mt-5 d-flex justify-content-center">
              {loader()}
            </div>
          ) : (
            <ul className={`${style.responsiveTableProjects}`}>
              {tasks.length > 0 ? (
                tasks.map((task: TaskInterface) => (
                  <li
                    key={task.id}
                    className={`${style.tableRow} bg-theme text-theme`}
                  >
                    <div
                      className={`${style.col} ${style.col1}`}
                      data-label="ID"
                    >
                      {task.id}
                    </div>
                    <div
                      className={`${style.col} ${style.col2}`}
                      data-label="Title"
                    >
                      {task.title}
                    </div>
                    <div
                      className={`${style.col} ${style.col2}`}
                      data-label="Status"
                    >
                      {getTaskStatus(task.status)}
                    </div>
                    <div
                      className={`${style.col} ${style.col3}`}
                      data-label="User"
                    >
                      {task.employee?.userName}
                    </div>
                    <div
                      className={`${style.col} ${style.col4}`}
                      data-label="Project"
                    >
                      {task.project?.title}
                    </div>
                    <div
                      className={`${style.col} ${style.col5}`}
                      data-label="Actions"
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
                          className={`${
                            window.innerWidth < 650
                              ? "d-flex align-items-center justify-content-center"
                              : "dropdown-menu dropdown-menu-end"
                          } m-0 p-0`}
                        >
                          <li role="button" className="px-3 py-1 pt-2">
                            <div className="dropdown-div">
                              <i className="fa-regular fa-eye me-2"></i>
                              {window.innerWidth < 650 ? "" : <span>View</span>}
                            </div>
                          </li>
                          <li
                            role="button"
                            onClick={() =>
                              navigate("/dashboard/tasks-data", { state: task })
                            }
                            className="px-3 py-1"
                          >
                            <div role="button" className="dropdown-div">
                              <i className="fa-regular fa-pen-to-square me-2"></i>
                              {window.innerWidth < 650 ? "" : <span>Edit</span>}
                            </div>
                          </li>
                          <li
                            role="button"
                            onClick={() =>
                              handleShowDelete(task.id, task.title)
                            }
                            className="px-3 py-1"
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
          <div className="mt-5">
            <ResponsivePagination
              current={pageNumber}
              total={totalPages}
              onPageChange={(page) => setPageNumber(page)}
            />
          </div>
        </div>

        {/* modal handle delete */}
        <Modal
          className="posModalDelete"
          show={showDelete}
          onHide={handleCloseDelete}
        >
          <Modal.Body className="p-4 bg-theme">
            <div className="addCatModalHead text-end">
              <div className="addCatModalHeadClose">
                <i
                  onClick={() => handleCloseDelete()}
                  className="fa-solid fa-close btn border-danger px-2 rounded-circle text-danger"
                ></i>
              </div>
            </div>

            <div className="addCatModalBody">
              <DeleteData deleteItem={taskName} />
            </div>

            <div className="addCatModalFooter"></div>

            <div className="text-end">
              <button
                onClick={onDeleteSubmit}
                className={`btn py-1 px-3 fs-6 fw-medium btn btn-outline-danger`}
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
      </section>
    </>
  );
}
