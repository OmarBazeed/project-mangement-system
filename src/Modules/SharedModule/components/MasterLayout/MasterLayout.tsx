import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";

export default function MasterLayout() {
  return (
    <>
      <NavBar />
      <div className="d-flex ">
        <div>
          <SideBar />
        </div>
        <div className="w-100 dash-layout overflow-y-auto bg-success">
          <Outlet />
        </div>
      </div>
    </>
  );
}
