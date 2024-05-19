import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { ModalFooter } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../../../../Context/AuthContext";
import { UsersInterface } from "../../../../interfaces/Auth";
import {
  baseUrl,
  handleApiError,
  requestHeaders,
} from "../../../../utils/Utils";
import Images from "../../../ImageModule/components/Images/Images";
import NoData from "../../../SharedModule/components/NoData/NoData";
import style from "./Users.module.css";

export default function UsersList() {
  const [isLoading, setIsLoading] = useState(false);
  const [usersList, setUsersList] = useState<[UsersInterface] | []>([]);
  const [showView, setShowView] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UsersInterface>({
    country: "",
    email: "",
    id: 0,
    imagePath: "",
    isActivated: false,
    creationDate: "",
    phoneNumber: "",
    userName: "",
    userGroup: "",
    task: [],
  });

  const handleViewClose = () => setShowView(false);

  const handleCloseShowUser = () => {
    setShowView(false);
  };

  const { adminData } = useUser();
  const navigate = useNavigate();

  const getUsersList = async () => {
    setIsLoading(true);
    try {
      const {
        data: { data },
      } = await axios.get(`${baseUrl}/Users/Manager`, {
        headers: requestHeaders,
      });
      setUsersList(data);
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
  };

  const toggleUserStatus = async (
    id: number,
    userName: string,
    isActivated: boolean
  ) => {
    try {
      await axios.put(
        `${baseUrl}/Users/${id}`,
        {},
        {
          headers: requestHeaders,
        }
      );
      getUsersList();
      setIsLoading(false);

      //*** Controlling Toast When You Click To Active/Deactive The User ***//
      !isActivated
        ? toast.success(
            <div
              dangerouslySetInnerHTML={{
                __html: `You Have Successfully Activated <span class="fw-bold text-success">${userName}</span>`,
              }}
            />,
            {
              position: "bottom-right",
            }
          )
        : toast.warning(
            <div
              dangerouslySetInnerHTML={{
                __html: `You Have Successfully Deactivated <span class="fw-bold text-warning">${userName}</span>`,
              }}
            />,
            {
              position: "bottom-right",
            }
          );

      // setTotalPages(response.totalNumberOfPages);
      // setTotalUserject(response.totalNumberOfPages);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleShowUser = (user: UsersInterface) => {
    setSelectedUser(user);
    setShowView(true);
    console.log(user);
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
    if (adminData?.userGroup === "Manager") {
      getUsersList();
    }
  }, [adminData]);
  return (
    <>
      <section>
        <div
          className={`project-data-head container-fluid shadow-sm  head-bg py-3 px-5`}
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

        {/* Modal for View */}
        <Modal show={showView} onHide={handleViewClose}>
          <Modal.Header closeButton>
            <h3>User Details</h3>
          </Modal.Header>
          <Modal.Body>
            <div className="fw-bold">
              <p className="text-center">
                {selectedUser.imagePath ? (
                  <img
                    src={`https://upskilling-egypt.com:3003/${selectedUser.imagePath}`}
                    alt="..."
                    style={{ width: "70px", height: "70px" }}
                  />
                ) : (
                  <img style={{ width: "70px" }} src={`${Images.NoData}`} />
                )}
              </p>
              <p>
                <i className="mx-2 bi bi-people text-success"></i>
                {`Name: ${selectedUser.userName}`}
              </p>
              <p>
                <i className="mx-2 bi bi-envelope text-success"></i>
                {`Email: ${selectedUser.email} `}
              </p>
              <p className="d-flex align-items-center">
                {selectedUser.isActivated ? (
                  <i className="mx-2 fas fa-toggle-on text-success" />
                ) : (
                  <i className="mx-2 fas fa-toggle-on text-danger" />
                )}
                {`Active: ${selectedUser.isActivated} `}
              </p>
              <p>
                <i className="mx-2 fas fa-tasks text-success"></i>
                {`Tasks No.: ${
                  selectedUser.task.length > 0 ? selectedUser.task.length : 0
                } `}
              </p>
            </div>
          </Modal.Body>
          <ModalFooter className="py-3">
            <button
              onClick={handleCloseShowUser}
              className={`btn py-1 px-3 fs-6 fw-medium btn btn-outline-success `}
            >
              Back
            </button>
          </ModalFooter>
        </Modal>

        {/* table */}

        <div
          className={`project-body head-bg mt-5 container rounded-4 shadow  px-4 py-5`}
        >
          <ul className={`${style.responsiveTableProjects} text-white`}>
            <li className={`${style.tableHeader}`}>
              <div className={`${style.col} ${style.col1}`}>ID</div>
              <div className={`${style.col} ${style.col2}`}>UserName</div>
              <div className={`${style.col} ${style.col3}`}>Image</div>
              <div className={`${style.col} ${style.col4}`}>Creation Date</div>
              <div className={`${style.col} ${style.col5}`}>Actions</div>
              <div className={`${style.col} ${style.col6}`}>Status</div>
            </li>
          </ul>
          {isLoading ? (
            <div className="container pt-5 mt-5 text-center text-theme">
              {btnloading()}
            </div>
          ) : (
            <ul className={`${style.responsiveTableProjects}`}>
              {usersList.length > 0 ? (
                usersList.map((user: UsersInterface) => (
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
                      data-label="Images :"
                    >
                      {user.imagePath ? (
                        <img
                          className={`${style.noImg}`}
                          src={`https://upskilling-egypt.com:3003/${user.imagePath}`}
                          alt=""
                        />
                      ) : (
                        <img
                          className={`${style.noImg}`}
                          alt="no Data Image"
                          src={`${Images.NoData}`}
                        />
                      )}
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
                          className={`${
                            window.innerWidth < 650
                              ? "d-flex  align-items-center  justify-content-center "
                              : "dropdown-menu dropdown-menu-end"
                          }  m-0 p-0`}
                        >
                          <li
                            role="button"
                            className="px-3 py-1 pt-2 "
                            onClick={() => handleShowUser(user)}
                          >
                            <div className="dropdown-div ">
                              <i className="m-2 fa-regular fa-eye"></i>
                              {window.innerWidth < 650 ? "" : <span>View</span>}
                            </div>
                          </li>
                          <li
                            role="button"
                            // onClick={() => handleUpdate(item.id, item.name)}
                            className="px-3 py-1"
                          >
                            <div role="button" className="dropdown-div">
                              <i className="m-2 fa-regular fa-pen-to-square "></i>
                              {window.innerWidth < 650 ? "" : <span>Edit</span>}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div role="button" className="dropdown-div">
                      {user.isActivated ? (
                        <i
                          onClick={() =>
                            toggleUserStatus(
                              user.id,
                              user.userName,
                              user.isActivated
                            )
                          }
                          className="fas fa-toggle-on fa-2x text-success"
                        ></i>
                      ) : (
                        <i
                          onClick={() =>
                            toggleUserStatus(
                              user.id,
                              user.userName,
                              user.isActivated
                            )
                          }
                          className="fas fa-toggle-off fa-2x text-danger"
                        ></i>
                      )}
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
