import { useUser } from "../../../../Context/AuthContext";
import Images from "../../../ImageModule/components/Images/Images";

export default function NavBar() {
  const { adminData } = useUser();

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top ">
        <div className="container-fluid">
          <a className="navbar-brand  ">
            <img className="w-100" src={Images.logo} alt="" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {/* <span className="navbar-toggler-icon"></span> */}
            <i className="fa-solid fa-sliders"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <div className="user-data d-flex  align-items-center    ">
                  <div className="user-img rounded-circle me-3">
                    <img
                      className="w-100 rounded-circle"
                      src={Images.test}
                      alt=""
                      style={{ width: "50px", height: "50px" }}
                    />
                  </div>
                  <div className="user-info me-2 ">
                    <h6>{adminData?.userName}</h6>
                    <p>{adminData?.userEmail}</p>
                  </div>
                  <div className="me-2">
                    <div className="btn-group dropstart">
                      <button
                        type="button"
                        className=" border-0 bg-transparent "
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fa-solid fa-chevron-down"></i>
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
        </div>
      </nav>
    </>
  );
}
