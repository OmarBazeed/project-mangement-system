import { useEffect, useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import "./sideBar.css";
import { useUser } from "../../../../Context/AuthContext";

export default function SideBar() {
  const { logout } = useUser();
  let [breakPoint, setBreakpoint] = useState("no");
  const [isCollapse, setIsCollapse] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [toggleIcon, setToggleIcon] = useState(false);

  const BreakPoint = () => {
    setBreakpoint(breakPoint === "sm" ? "no" : "sm");
    setToggleIcon(!toggleIcon);
  };

  const getSize = () => {
    setWindowWidth(window.innerWidth);
  };

  const toggelCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  useEffect(() => {
    window.addEventListener("resize", getSize);
    if (windowWidth < 992 && window.innerWidth < 992) {
      setIsCollapse(true);
    } else {
      setIsCollapse(false);
    }
    if (windowWidth < 576 && window.innerWidth < 576) {
      setBreakpoint("sm");
    } else {
      setBreakpoint("no");
    }
    return () => {
      window.removeEventListener("resize", getSize);
    };
  }, [windowWidth]);

  return (
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
                onClick={window.innerWidth < 576 ? BreakPoint : toggelCollapse}
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
              icon={<i className="bi bi-house-door fs-4"></i>}
              component={<Link to="/dashboard" />}
            >
              Home
            </MenuItem>
            <MenuItem
              icon={<i className="bi bi-people fs-4"></i>}
              component={<Link to="/dashboard/users" />}
              data-title="Users"
            >
              Users
            </MenuItem>
            <MenuItem
              icon={<i className="bi bi-columns-gap fs-4"></i>}
              component={<Link to="/dashboard/projects" />}
              data-title="Projects"
            >
              Projects
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-list-check fs-4"></i>}
              component={<Link to="/dashboard/tasks" />}
              data-title="Tasks"
            >
              Tasks
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-list-check fs-4"></i>}
              component={<Link to="/dashboard/tasks-board" />}
              data-title="Tasks Board"
            >
              Tasks Board
            </MenuItem>
            <MenuItem
              className="mt-5"
              icon={<i className="fa fa-right-from-bracket fs-4"></i>}
              onClick={() => logout()}
              data-title="Logout"
            >
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>
        {window.innerWidth > 576 ? (
          ""
        ) : (
          <button onClick={BreakPoint} className="btn-toggle text-theme">
            <i
              className={`bi ${
                !toggleIcon ? "bi-text-indent-left" : "bi-text-indent-right"
              } fs-1`}
            ></i>
          </button>
        )}
      </div>
    </section>
  );
}
