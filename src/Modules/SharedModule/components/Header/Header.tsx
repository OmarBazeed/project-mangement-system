import { useUser } from "../../../../Context/AuthContext";
import "./Header.modules.css";
export default function Header() {
  const { adminData } = useUser();
  return (
    <div className="container-fluid pt-4">
      <div className="header-container d-flex align-items-center   ">
        <div className="">
          <div className="header-content ps-5 typewriter">
            <h2 className="mb-4">
              Welcome
              <span className="fw-bold mx-2" style={{ color: "#EE9A28" }}>
                {adminData?.userName}
              </span>
            </h2>
            <p>You can add project and assign tasks to your team</p>
          </div>
        </div>
      </div>
    </div>
  );
}
