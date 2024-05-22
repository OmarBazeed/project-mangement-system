import axios from "axios";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import ResponsivePagination from "react-responsive-pagination";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProjectInterface } from "../../../../interfaces/Auth";
import {
  baseUrl,
  getRequestHeaders,
  handleApiError,
  loader,
} from "../../../../utils/Utils";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";
import NoData from "../../../SharedModule/components/NoData/NoData";
import style from "../Project.module.css";

export default function ProjectList() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [proName, setProName] = useState("");
  const [proId, setProId] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");

  const getProject = useCallback(
    async (proTitle: string, pageSize: number, pageNumber: number) => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `${baseUrl}/Project/manager?pageSize=${pageSize}&pageNumber=${pageNumber}`,
          {
            headers: getRequestHeaders(),
            params: {
              title: proTitle,
            },
          }
        );

        setTotalPages(data.totalNumberOfPages);
        setProjects(data.data);
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
      await axios.delete(`${baseUrl}/Project/${proId}`, {
        headers: getRequestHeaders(),
      });
      // After deletion, we need to fetch the project list again
      getProject(projectTitle, 10, pageNumber);
      toast.success(`Deleted ${proName} Successfully`);
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
    setProId(0);
    setProName("");
  };

  const handleShowDelete = (id: number, name: string) => {
    setProId(id);
    setProName(name);
    setShowDelete(true);
  };

  useEffect(() => {
    getProject(projectTitle, 10, pageNumber);
  }, [getProject, projectTitle, pageNumber]);

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
                  Project
                </h2>
              </div>
            </div>
            <div className={`col-md-6 text-lg-end text-sm-center text-center `}>
              <div>
                <div className={``}>
                  <button
                    onClick={() => {
                      navigate("/dashboard/projects-data");
                    }}
                    className={`main-btn`}
                  >
                    Add New Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*Filtaration*/}

        <div className="container">
          <div className="input-container w-25 ">
            <input
              placeholder="Search By Name "
              className={`input-field input-theme`}
              type="text"
              onChange={(e) => {
                setProjectTitle(e.target.value);
                getProject(projectTitle, 10, pageNumber);
              }}
            />
            <label htmlFor="input-field" className={`input-label `}>
              Search
            </label>
            <span className="input-highlight"></span>
          </div>
        </div>
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
            <div className="container pt-5 mt-5 d-flex justify-content-center ">
              {loader()}
            </div>
          ) : (
            <ul className={`${style.responsiveTableProjects}`}>
              {projects.length > 0 ? (
                projects.map((pro: ProjectInterface) => (
                  <li
                    key={pro.id}
                    className={`${style.tableRow} bg-theme text-theme`}
                  >
                    <div
                      className={`${style.col}  ${style.col1}`}
                      data-label="ID"
                    >
                      {pro.id}
                    </div>
                    <div
                      className={`${style.col} ${style.col2}`}
                      data-label="Title :"
                    >
                      {pro.title}
                    </div>
                    <div
                      className={`${style.col} ${style.col3}`}
                      data-label="No of tasks :"
                    >
                      {pro.task?.length > 0 ? pro.task?.length : 0}
                    </div>
                    <div
                      className={`${style.col} ${style.col4}`}
                      data-label="Creation Date :"
                    >
                      {/* {item.modificationDate} */}
                      {moment(pro.creationDate).format("LLLL")}
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
                            onClick={() => {
                              navigate("/dashboard/projects-data", {
                                state: pro,
                              });
                            }}
                            className="px-3 py-1"
                          >
                            <div role="button" className="dropdown-div">
                              <i className="fa-regular fa-pen-to-square me-2 "></i>
                              {window.innerWidth < 650 ? "" : <span>Edit</span>}
                            </div>
                          </li>
                          <li
                            role="button"
                            onClick={() => handleShowDelete(pro.id, pro.title)}
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

          <div className="mt-5">
            <ResponsivePagination
              current={pageNumber}
              total={totalPages}
              onPageChange={(page) => setPageNumber(page)}
            />
          </div>
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
              <DeleteData deleteItem={proName} />
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
                  ` Delete this ${proName}`
                )}
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </section>
    </>
  );
}
