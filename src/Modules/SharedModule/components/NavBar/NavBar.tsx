import { useState } from "react";
import { useUser } from "../../../../Context/AuthContext";
import Images from "../../../ImageModule/components/Images/Images";
import useLocalStorage from "use-local-storage";

export default function NavBar() {
  const [dark, setDark] = useLocalStorage("dark", false);
  const { adminData } = useUser();

  
  document
    .querySelector("body")
    ?.setAttribute("data-theme", dark ? "dark" : "light");

  return (
    <>
      <nav className="navbar navbar-expand-lg nav-theme shadow fixed-top ">
        <div className="container-fluid">
          <a className="navbar-brand">
            {dark ? (
              <img height={54} className="w-100" src={Images.logoDark} alt="" />
            ) : (
              <img
                height={50}
                className="w-100"
                src={Images.logoLight}
                alt=""
              />
            )}
          </a>
          <button
            className="navbar-toggler border-white "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa-solid fa-sliders text-theme"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <div className="user-data d-flex  align-items-center    ">
                  <div className="user-img rounded-circle me-3">
                    <img
                      className="w-100 rounded-circle me-1"
                      src={Images.test}
                      alt=""
                    />
                  </div>
                  <div className="user-info me-2 ">
                    <h6 className="text-theme">{adminData?.userName}</h6>
                    <p className="text-theme">{adminData?.userEmail}</p>
                  </div>
                  <div className="me-2">
                    <div className="btn-group dropstart">
                      <button
                        type="button"
                        className=" border-0 bg-transparent "
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fa-solid fa-chevron-down text-theme"></i>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            Profile
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            logOut
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="mx-lg-3 ">
            {/* <button onClick={toggletheme} className="border-0 bg-transparent ">
              f
            </button> */}
            <label htmlFor="switch-dark-theme" className="toggle-dark-theme">
              <input
                type="checkbox"
                className="input-dark-theme"
                id="switch-dark-theme"
                onChange={() => setDark(!dark)}
                checked={dark}
              />

              <div className="icon-dark-theme icon--moon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width={20}
                  height={20}
                >
                  <path
                    fillRule="evenodd"
                    d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <div className="icon-dark-theme icon--sun">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width={20}
                  height={20}
                >
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                </svg>
              </div>
            </label>
          </div>
        </div>
      </nav>
    </>
  );
}
