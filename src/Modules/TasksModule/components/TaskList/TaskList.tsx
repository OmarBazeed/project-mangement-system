import axios from "axios";
import { useCallback, useEffect, useState } from "react";
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
  const [taskId, setTaskId] = useState(0);
  const [showDelete, setShowDelete] = useState(false);

  const getTask = useCallback(
    async (pageSize: number) => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `${baseUrl}/Task/manager?pageSize=${pageSize}&pageNumber=${pageNumber}`,
          {
            headers: requestHeaders,
            // params: {
            //   name: name,
            // },
          }
        );

        setTasks(data.data);
        console.log(data.data);
        setTotalPages(data.totalNumberOfPages);
        setTotalTasks(data.totalNumberOfPages);
      } catch (err) {
        handleApiError(err);
      }
      setIsLoading(false);
    },
    [pageNumber]
  );

  const onDeleteSubmit = async () => {
    handleCloseDelete();
    try {
      await axios.delete(`${baseUrl}/Task/${taskId}`, {
        headers: requestHeaders,
      });
      getTask(10);
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
  const handleShowDelete = (id: number, name: string) => {
    // set the values to handle  them in the delete process
    setTaskId(id);
    setTaskName(name);
    setShowDelete(true);
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
    getTask(3);
  }, [getTask]);

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
                tasks.map((task: TaskInterface) => (
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
                            onClick={() =>
                              handleShowDelete(task.id, task.title)
                            }
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
      </section>
    </>
  );
}
