import React from "react";
import Images from "../../../ImageModule/components/Images/Images";
import { Outlet, useNavigate, Link } from "react-router-dom";
import style from "../UserProfile.module.css";
import { useUser } from "../../../../Context/AuthContext";
export default function Profile() {
  const { currentUser } = useUser();
  console.log(currentUser?.userName);
  const navigate = useNavigate();
  return (
    <>
      <section className="">
        <div
          className={`text-theme container-fluid shadow-sm  head-bg pt-5 pb-4 px-5`}
        >
          <div className={`row`}>
            <div className="col-md-6">
              <div
                className={`text-theme text-lg-start text-sm-center text-center`}
              >
                <button
                  onClick={() => {
                    navigate(-1);
                  }}
                  className={`border-0 bg-transparent mb-3 `}
                >
                  <span
                    className={`text-theme text-lg-start text-sm-center text-center `}
                  >
                    <i className={`fa-solid fa-chevron-left me-2`}></i>
                    Back?
                  </span>
                </button>
                <h2 className={` `}>Profile</h2>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`profile-body head-bg mt-5 container text-center  rounded-4 shadow text-theme`}
        >
          <div className="pb-4">
            <div className="row gy-3 justify-content-center align-items-center ">
              <div className="col-md-6  ">
                <div className={`${style.userImg} rounded-circle mx-auto mb-4`}>
                  {currentUser?.imagePath ? (
                    <div className={`${style.profileUserImg} text-white `}>
                      <img
                        className="w-100 "
                        src={`https://upskilling-egypt.com:3003/${currentUser.imagePath}`}
                        alt=""
                      />
                    </div>
                  ) : (
                    <div className={`${style.profileUserImg} text-white `}>
                      <h2 className={`${style.profileName}`}>
                        {currentUser?.userName.charAt(0).toUpperCase()}
                      </h2>
                    </div>
                  )}
                </div>
                <h2>{currentUser?.userName}</h2>
              </div>
            </div>
          </div>
          <div className={`profile-links w-100  mx-auto`}>
            <ul className="nav justify-content-center ">
              <li className="nav-item ">
                <Link
                  className={`nav-link ${style.linkBtn}`}
                  aria-current="page"
                  to="/dashboard/profile/account-info"
                >
                  Account Info
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link
                  className={`nav-link ${style.linkBtn}`}
                  aria-current="page"
                  to="/dashboard/profile/account-setting"
                >
                  Account Setting
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${style.linkBtn}`}
                  aria-current="page"
                  to="/dashboard/profile/change-password"
                >
                  Password
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-center mt-5">
            <Outlet></Outlet>
          </div>
        </div>
      </section>
    </>
  );
}
