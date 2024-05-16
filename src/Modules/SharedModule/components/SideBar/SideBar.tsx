import React, { useEffect, useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import "./sideBar.css";
export default function SideBar() {
  // for breakpoint sidbbar
  let [breakPoint, setBreakpoint] = useState("no");
  // for collopse sidbar
  const [isCollapse, setIsCollapse] = useState(false);
  // for window wideth
  const [windowWidth, setWindowWidth] = useState(0);
  const [toggleIcon, setToggleIcon] = useState(false);
  // function for set breakpoint value
  const BreakPoint = () => {
    setBreakpoint(
      breakPoint == "sm" ? (breakPoint = "no") : (breakPoint = "sm")
    );
    setToggleIcon(!toggleIcon);
  };
  const getSize = () => {
    setWindowWidth(window.innerWidth);
  };
  const toggelCollapse = () => {
    setIsCollapse(!isCollapse);
  };
  useEffect(() => {
    // event to check window width size when  resize
    window.addEventListener("resize", getSize);
    // conditional statement for checking window width is it smaller than 992px
    if (windowWidth < 992 && window.innerWidth < 992) {
      // if it is true then set the sidebar collapse to true
      setIsCollapse(true);
    } else {
      // if it is false then set the sidebar collapse to false
      setIsCollapse(false);
    }
    // conditional statement for checking window width is it smaller than 576px
    if (windowWidth < 576 && window.innerWidth < 576) {
      setBreakpoint("sm");
    } else {
      setBreakpoint("no");
    }
    return () => {
      // remove event listener when component ummountd
      window.removeEventListener("resize", getSize);
    };
  }, [window.innerWidth]);
  return (
    <>
      <section>
        <div className="sidBar">
          <Sidebar
            width="217px"
            breakPoint={breakPoint}
            collapsedWidth="65px"
            collapsed={isCollapse}
          >
            <Menu>
              {window.innerWidth < 576 ? (
                ""
              ) : (
                <button
                  onClick={
                    window.innerWidth < 576 ? BreakPoint : toggelCollapse
                  }
                  className="btn-collapse"
                >
                  <i
                    className={`fa-solid ${
                      isCollapse ? "fa-chevron-right" : "fa-chevron-left"
                    }`}
                  ></i>
                </button>
              )}

              <MenuItem
                icon={<i className="bi bi-house-door"></i>}
                component={<Link to="/dashboard" />}
              >
                Home
              </MenuItem>

              <MenuItem
                icon={<i className="bi bi-people"></i>}
                component={<Link to="/dashboard/users" />}
              >
                Users
              </MenuItem>

              <MenuItem
                icon={<i className="bi bi-columns-gap"></i>}
                component={<Link to="/dashboard/projects" />}
              >
                Project
              </MenuItem>

              <MenuItem
                icon={<i className="fa-solid fa-list-check"></i>}
                component={<Link to="/dashboard/tasks" />}
              >
                Tasks
              </MenuItem>

              {/* <MenuItem
              onClick={handleShow}
              icon={
                <i
                  className="fa-solid fa-unlock-keyhole"
                  aria-hidden="true"
                ></i>
              }
            >
              <span className="changePass">Change Password</span>
            </MenuItem> */}
              <MenuItem
                className="mt-5"
                // onClick={logOut}
                icon={
                  <i
                    className="fa fa-right-from-bracket"
                    aria-hidden="true"
                  ></i>
                }
              >
                Logout
              </MenuItem>
            </Menu>
          </Sidebar>
          {window.innerWidth > 576 ? (
            ""
          ) : (
            <button onClick={BreakPoint} className="btn-toggle">
              {
                <i
                  className={`bi ${
                    !toggleIcon
                      ? " bi-text-indent-left"
                      : " bi-text-indent-right"
                  }   fs-1 text-theme`}
                ></i>
              }
            </button>
          )}
        </div>
      </section>
    </>
  );
}
