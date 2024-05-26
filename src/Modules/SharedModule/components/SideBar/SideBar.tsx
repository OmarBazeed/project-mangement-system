import { useEffect, useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useUser } from "../../../../Context/AuthContext";
import "./sideBar.css";

export default function SideBar() {
  const { userRole } = useUser();
  let [breakPoint, setBreakpoint] = useState("no");
  const [isCollapse, setIsCollapse] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [toggleIcon, setToggleIcon] = useState(false);
  const [activeSideBar, setActiveSideBar] = useState("Home");

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

  const handleActiveItem = (item: string) => {
    setActiveSideBar(item);
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
          <Menu className="mt-sm-3">
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
              data-title="Home"
              icon={<i className="bi bi-house-door fs-4"></i>}
              component={<Link to="/dashboard" />}
              className="mt-sm-2"
              onClick={() => handleActiveItem("Home")}
              active={activeSideBar === "Home"}
            >
              Home
            </MenuItem>
            {userRole === "Manager" ? (
              <MenuItem
                data-title="Users"
                icon={<i className="bi bi-people fs-4"></i>}
                component={<Link to="/dashboard/users" />}
                className="mt-sm-2"
                onClick={() => handleActiveItem("Users")}
                active={activeSideBar === "Users"}
              >
                Users
              </MenuItem>
            ) : (
              ""
            )}

            <MenuItem
              data-title="Projects"
              icon={<i className="bi bi-columns-gap fs-4"></i>}
              component={<Link to="/dashboard/projects" />}
              className="mt-sm-2"
              onClick={() => handleActiveItem("Projects")}
              active={activeSideBar === "Projects"}
            >
              Projects
            </MenuItem>
            {userRole === "Manager" ? (
              <MenuItem
                data-title="Tasks"
                icon={<i className="fa-solid fa-list-check fs-4"></i>}
                component={<Link to="/dashboard/tasks" />}
                className="mt-sm-2"
                onClick={() => handleActiveItem("Tasks")}
                active={activeSideBar === "Tasks"}
              >
                Tasks
              </MenuItem>
            ) : (
              ""
            )}
            {userRole === "Manager" ? (
              ""
            ) : (
              <MenuItem
                data-title="Tasks"
                icon={<i className="fa-solid fa-list-check fs-4"></i>}
                component={<Link to="/dashboard/tasks-board" />}
                className="mt-sm-2"
                onClick={() => handleActiveItem("Tasks Board")}
                active={activeSideBar === "Tasks Board"}
              >
                Tasks Board
              </MenuItem>
            )}
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
