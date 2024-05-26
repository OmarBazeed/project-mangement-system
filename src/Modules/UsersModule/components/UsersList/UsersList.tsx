import axios from "axios";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import ResponsivePagination from "react-responsive-pagination";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UsersInterface } from "../../../../interfaces/Auth";
import {
  baseUrl,
  getRequestHeaders,
  handleApiError,
  imagesURL,
  loader,
} from "../../../../utils/Utils";
import Images from "../../../ImageModule/components/Images/Images";
import NoData from "../../../SharedModule/components/NoData/NoData";
import style from "./Users.module.css";

export default function UsersList() {
  const [isLoading, setIsLoading] = useState(false);
  const [usersList, setUsersList] = useState<UsersInterface[]>([]);
  const [showView, setShowView] = useState(false);
  const [userUsername, setUserUsername] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1); // Initialize to 1
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

  const closeModal = () => setShowView(false);

  const handleCloseShowUser = () => {
    setShowView(false);
  };

  const navigate = useNavigate();

  const getUsersList = useCallback(
    async (userUsername: string, pageNumber: number, pageSize: number) => {
      setIsLoading(true);

      try {
        const res = await axios.get(
          `${baseUrl}/Users/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
          {
            headers: getRequestHeaders(),
            params: { userName: userUsername },
          }
        );

        setUsersList(res.data.data);
        setTotalPages(res.data.totalNumberOfPages);
      } catch (err) {
        const errMsg =
          axios.isAxiosError(err) && err.response?.data?.message
            ? err.response.data.message
            : "An unexpected error occurred";
        toast.error(errMsg);
      }
      setIsLoading(false);
    },
    []
  );

  const toggleUserStatus = async (
    id: number,
    userName: string,
    isActivated: boolean
  ) => {
    try {
      await axios.put(
        `${baseUrl}/Users/${id}`,
        {},
        { headers: getRequestHeaders() }
      );
      getUsersList(userUsername, pageNumber, 10);
      setIsLoading(false);
      !isActivated
        ? toast.success(
            <div
              dangerouslySetInnerHTML={{
                __html: `You Have Successfully Activated <span class="fw-bold text-success">${userName}</span>`,
              }}
            />,
            { position: "bottom-right" }
          )
        : toast.warning(
            <div
              dangerouslySetInnerHTML={{
                __html: `You Have Successfully Deactivated <span class="fw-bold text-warning">${userName}</span>`,
              }}
            />,
            { position: "bottom-right" }
          );
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleShowUser = (user: UsersInterface) => {
    setSelectedUser(user);
    setShowView(true);
  };

  useEffect(() => {
    getUsersList(userUsername, pageNumber, 10);
  }, [userUsername, pageNumber, getUsersList]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserUsername(value);
    setPageNumber(1); // Reset to first page on new search
  };

  return (
    <>
      <section>
        <div
          className={`project-data-head container-fluid shadow-sm head-bg py-3 px-5`}
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

        {/* modal handle delete  */}
        <Modal
          className="posModalDelete mt-5"
          show={showView}
          onHide={closeModal}
        >
          <Modal.Body className="p-4 bg-theme">
            <div className="addCatModalHead text-end d-flex justify-content-between mb-5">
              <h3 className="text-theme">User Details</h3>
              <div className="addCatModalHeadClose ">
                <button
                  onClick={() => closeModal()}
                  className="fa-solid fa-close btn border-danger px-2 rounded-circle text-danger"
                ></button>
              </div>
            </div>

            {/* ------------  */}
            <div className="addCatModalBody text-theme ">
              <div className="">
                <p className="text-center">
                  {selectedUser.imagePath ? (
                    <img
                      src={`${imagesURL}/${selectedUser.imagePath}`}
                      alt="..."
                      className=" w-100 "
                    />
                  ) : (
                    <img className="w-100" src={`${Images.NoUserImage}`} />
                  )}
                </p>
                <p>
                  <i className="mx-2 bi bi-people text-success"></i>
                  Name :
                  <span className="fw-bold mx-2">{selectedUser.userName} </span>
                </p>
                <p>
                  <i className="mx-2 bi bi-envelope text-success"></i>
                  Email :
                  <span className="fw-bold mx-2">{selectedUser.email} </span>
                </p>
                <p className="d-flex align-items-center">
                  {selectedUser.isActivated ? (
                    <i className="mx-2 fa-regular fa-thumbs-up text-success" />
                  ) : (
                    <i className="mx-2 fa-regular fa-thumbs-down text-danger" />
                  )}
                  Active :
                  <span className="fw-bold mx-2">
                    {selectedUser.isActivated ? "yes" : "no"}
                  </span>
                </p>
                <p>
                  <i className="mx-2 fas fa-tasks text-success"></i>
                  Tasks :
                  <span className="fw-bold mx-2">
                    {selectedUser.task?.length ? selectedUser.task?.length : 0}{" "}
                  </span>
                </p>
              </div>
            </div>
            {/* ------------- */}
            <div className="addCatModalFooter"></div>

            <div className=" text-end">
              <button
                onClick={handleCloseShowUser}
                className={`btn py-1 px-3 fs-6 fw-medium btn btn-outline-success`}
              >
                Back
              </button>
            </div>
          </Modal.Body>
        </Modal>
        {/*Filtaration*/}
        <div className="container">
          <div className="input-container w-75 ">
            <input
              placeholder="Search By Name "
              className={`input-field input-theme`}
              type="text"
              onChange={handleSearchChange}
            />
            <label htmlFor="input-field" className={`input-label `}>
              Search
            </label>
            <span className="input-highlight"></span>
          </div>
        </div>

        {/* table */}
        <div
          className={`project-body head-bg mt-5 container rounded-4 shadow px-4 py-5`}
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
            <div className="container pt-5 mt-5 d-flex justify-content-center ">
              {loader()}
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
                      className={`${style.col} ${style.col1}`}
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
                          className={`${style.noImg} rounded-5`}
                          src={`${imagesURL}/${user.imagePath}`}
                          alt=""
                        />
                      ) : (
                        <img
                          className={`${style.noImg} rounded-5`}
                          alt="no Data Image"
                          src={`${Images.NoUserImage}`}
                        />
                      )}
                    </div>
                    <div
                      className={`${style.col} ${style.col4}`}
                      data-label="Creation Date :"
                    >
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
                              ? "d-flex align-items-center justify-content-center "
                              : "dropdown-menu dropdown-menu-end"
                          } m-0 p-0`}
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
                          <li role="button" className="px-3 py-1">
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
          {/*Pagination*/}
          <div className="mt-5">
            <ResponsivePagination
              current={pageNumber}
              total={totalPages}
              onPageChange={(page) => {
                setPageNumber(page);
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
