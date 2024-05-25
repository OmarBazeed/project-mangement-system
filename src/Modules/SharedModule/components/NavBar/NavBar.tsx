import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../../../Context/AuthContext";
import { useLocalStorage } from "../../../../utils/Utils";
import Images from "../../../ImageModule/components/Images/Images";
import style from "../../../UserProfileModule/components/UserProfile.module.css";
import "./Navbar.modules.css";

export default function NavBar() {
  const { currentUser, logout } = useUser();
  // Fetching localStorage Value For Dark-Light Mode From A Custom Hook...
  const [dark, setDark] = useLocalStorage("dark", false);
  const navigate = useNavigate();
  document.body.setAttribute("data-theme", dark ? "dark" : "light");

  return (
    <>
      <nav className="navbar navbar-expand-lg nav-theme shadow fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/dashboard">
            <img
              height={54}
              className="w-100"
              src={dark ? Images.logoDark : Images.logoLight}
              alt=""
            />
          </Link>

          <button
            className="navbar-toggler border-white"
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
                <div className="me-2 user-box text-md-start">
                  <div className="btn-group dropstart">
                    <button
                      type="button"
                      className="border-0 bg-transparent"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="user-data d-flex align-items-center align-items-center">
                        <div className="user-img rounded-circle me-3">
                          {currentUser?.imagePath ? (
                            <div className={`${style.navUserImg} text-white `}>
                              <img
                                className="w-100 "
                                src={`https://upskilling-egypt.com:3003/${currentUser.imagePath}`}
                                alt=""
                              />
                            </div>
                          ) : (
                            <div className={`${style.navUserImg} text-white `}>
                              <h2 className="mt-1">
                                {currentUser?.userName.charAt(0).toUpperCase()}
                              </h2>
                            </div>
                          )}
                        </div>
                        <div className="user-info me-2 pt-2">
                          <h6 className="text-theme mb-0 pb-0">
                            {currentUser?.userName}
                          </h6>
                          <p className="text-theme mb-0 pb-0">
                            {currentUser?.email}
                          </p>
                        </div>
                        <div>
                          <i className="fa-solid fa-chevron-down text-theme"></i>
                        </div>
                      </div>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a
                          className="dropdown-item"
                          onClick={() => {
                            navigate("/dashboard/profile");
                          }}
                        >
                          Profile
                        </a>
                      </li>
                      <li>
                        <a onClick={() => logout()} className="dropdown-item">
                          logOut
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="mx-lg-3 ms-sm-auto">
            <label
              data-tooltip={dark ? "Switch to light" : "Switch to dark"}
              htmlFor={`switch-dark-theme`}
              className="toggle-dark-theme"
            >
              <input
                type="checkbox"
                className="input-dark-theme"
                id="switch-dark-theme"
                onChange={() => setDark(!dark)}
                checked={dark}
              />
              {dark ? (
                <div className="icon-dark-theme icon--sun">
                  <img width={20} height={20} src={Images.sun} alt="" />
                </div>
              ) : (
                <div className="icon-dark-theme icon--moon">
                  <img width={20} height={20} src={Images.moon} alt="" />
                </div>
              )}
            </label>
          </div>
        </div>
      </nav>
    </>
  );
}
