import React from "react";
import { useUser } from "../../../Context/AuthContext";

export default function Header() {
  const { adminData } = useUser();
  return (
    <div className="container-fluid pt-4">
      <div className="header-container d-flex align-items-center   ">
        <div className="  ">
          <div className="header-content ps-5 ">
            <h2 className="mb-4">Welcome {adminData?.userName}</h2>
            <p>You can add project and assign tasks to your team</p>
          </div>
        </div>
      </div>
    </div>
  );
}
