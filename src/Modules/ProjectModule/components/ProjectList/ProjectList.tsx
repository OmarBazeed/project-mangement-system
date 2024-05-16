import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../Project.module.css";
import moment from "moment";
import NoData from "../../../SharedModule/components/NoData/NoData";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";
import { ModalFooter } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

export default function ProjectList() {
  const navigate = useNavigate();
  const requestHeaders = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const baseUrl = `https://upskilling-egypt.com:3003/api/v1`;
  const [projects, setprojects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // State for page number
  const [pageNumber, setPageNumber] = useState(1);
  // State for total number of pages
  const [totalPages, setTotalPages] = useState(0);
  // State for total number of pages
  const [totalProject, setTotalProject] = useState(0);
  const [proName, setProName] = useState(null);
  const [proId, setProId] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  const getProject = async (pageSize: any) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${baseUrl}/Project/manager?pageSize=${pageSize}&pageNumbe=${pageNumber}`,
        {
          headers: requestHeaders,
          // params: {
          //   name: name,
          // },
        }
      );

      setprojects(data.data);
      console.log(data.data);
      setTotalPages(data.totalNumberOfPages);
      setTotalProject(data.totalNumberOfPages);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  const onDeleteSubmit = async () => {
    handleCloseDelete();
    try {
      const response = await axios.delete(`${baseUrl}/Project/${proId}`, {
        headers: requestHeaders,
      });
      getProject(10);
      toast.success(`Deleted ${proName} Successfully`);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCloseDelete = () => {
    // resetting the values to default after closing the modal
    setShowDelete(false);
    setProId(null);
    setProName(null);
  };
  const handleShowDelete = (id, name) => {
    // set the values to handle  them in the delete process
    setProId(id);
    setProName(name);
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
    getProject(20);
  }, []);

  return (
    <>
      <section>
        <div
          className={`project-head container-fluid  head-bg  pt-5 pb-4 px-5`}
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

        <div
          className={`project-body head-bg mt-5 container rounded-4  px-4 py-5`}
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
              {projects.length > 0 ? (
                projects.map((pro) => (
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
                      {pro.task?.lenngth > 0 ? pro.task?.lenngth : 0}
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
