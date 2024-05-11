import React from "react";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";

export default function MasterLayout() {
  return (
    <>
      <div className="d-flex">
        <div className="w-25 bg-danger">
          <SideBar />
        </div>
        <div className="w-75 vh-100 overflow-y-auto bg-success ">
          <div className="bg-info">
            <NavBar />
          </div>
          <div className="bg-warning">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
