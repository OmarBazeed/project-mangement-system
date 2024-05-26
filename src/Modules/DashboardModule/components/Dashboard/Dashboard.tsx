import axios from "axios";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  DoughnutController,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useCallback, useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { useUser } from "../../../../Context/AuthContext";
import {
  baseUrl,
  getRequestHeaders,
  handleApiError,
} from "../../../../utils/Utils";
import Header from "../../../SharedModule/components/Header/Header";

import {
  StatusCountInterface,
  UsersCountInterface,
} from "../../../../interfaces/Auth";
import "./Dashboard.modules.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  DoughnutController,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const { userRole } = useUser();
  const [statusObj, setStatusObj] = useState<StatusCountInterface>({
    done: 0,
    inProgress: 0,
    toDo: 0,
  });
  const [usersObj, setUsersObj] = useState<UsersCountInterface>({
    activatedEmployeeCount: 0,
    deactivatedEmployeeCount: 0,
  });
  // const [themeMode, setThemeMode] = useState(
  //   localStorage.getItem("dark") === "true"
  // );

  const getTasksCount = useCallback(async () => {
    try {
      const response = await axios.get(`${baseUrl}/Task/count`, {
        headers: getRequestHeaders(),
      });
      setStatusObj(response.data);
    } catch (error) {
      handleApiError(error);
    }
  }, []);

  const getUserCount = useCallback(async () => {
    try {
      const response = await axios.get(`${baseUrl}/Users/count`, {
        headers: getRequestHeaders(),
      });

      setUsersObj(response.data);
    } catch (error) {
      handleApiError(error);
    }
  }, []);

  useEffect(() => {
    getTasksCount();
    userRole === "Manager" && getUserCount();
  }, [getTasksCount, getUserCount, userRole]);

  // Listen for changes in localStorage
  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     setThemeMode(localStorage.getItem("dark") === "true");
  //   };

  //   window.addEventListener("storage", handleStorageChange);

  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []);

  const tasksData = {
    labels: ["To Do", "In Progress", "Done"],
    datasets: [
      {
        label: "Tasks",
        data: [statusObj.toDo, statusObj.inProgress, statusObj.done],
        backgroundColor: ["#e84393", "#0097e6", "#44bd32"],
      },
    ],
  };

  const usersData = {
    labels: ["Active", "De-active"],
    datasets: [
      {
        label: "Users",
        data: [
          usersObj.activatedEmployeeCount,
          usersObj.deactivatedEmployeeCount,
        ],
        backgroundColor: ["#4cd137", "#e84118"],
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    // plugins: {
    //   legend: {
    //     labels: {
    //       color: themeMode ? "white" : "black",
    //     },
    //   },
    // },
  };

  return (
    <>
      <div className="main-content">
        <Header />

        <div className="container-fluid py-5">
          <div className="row flex-wrap justify-content-around gap-1 p-3 ">
            <div className="p-3 col-sm-10 col-md-5 rounded-4 chartBg">
              <div className="titles">
                <h3 className=" chartText">Tasks</h3>
                <p className=" chartText">List of all tasks</p>
              </div>

              <div className="d-flex tasks-count my-5">
                <div className="col-md-4 mb-1">
                  <div className="tasks p-3 rounded-4">
                    <i className="iconss fa fa-tasks my-3"></i>
                    <span className="py-1 ps-1 text-dark-light chartText">
                      To do
                    </span>
                    <h3 className="ps-1 text-dark-light chartText">
                      {statusObj.toDo}
                    </h3>
                  </div>
                </div>
                <div className="col-md-4 mb-1">
                  <div className="tasks1 p-3 rounded-4">
                    <i className="iconss fa-solid fa-group-arrows-rotate my-3"></i>
                    <span className="py-1 ps-1 text-dark-light chartText">
                      In-progress
                    </span>
                    <h3 className="ps-1 text-dark-light chartText">
                      {statusObj.inProgress}
                    </h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="tasks2 p-3 rounded-4">
                    <i className="iconss fa-solid fa-calendar-check my-3"></i>
                    <span className="py-1 ps-1 text-dark-light chartText">
                      Done
                    </span>
                    <h3 className="ps-1 text-dark-light chartText">
                      {statusObj.done}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="tasks-charts pt-5 d-flex justify-content-center align-items-center">
                <Doughnut
                  data={tasksData}
                  options={chartOptions}
                  height={290}
                  width={400}
                />
              </div>
            </div>

            {userRole === "Manager" ? (
              <div className="p-3 col-sm-10 col-md-5 rounded-4 chartBg">
                <div className="titles">
                  <h3 className="chartText">Users</h3>
                  <p className=" chartText">List of all users</p>
                </div>

                <div className="d-flex justify-content-between align-items-center users-count my-5">
                  <div className="user rounded-4 p-3">
                    <i className="iconss fa-solid fa-user-large my-2"></i>
                    <span className="py-1 ps-1 text-dark-light chartText">
                      Active users
                    </span>
                    <h3 className="ps-1 text-dark-light chartText">
                      {usersObj.activatedEmployeeCount}
                    </h3>
                  </div>

                  <div className="mb-1">
                    <div className="user1 rounded-4 p-3">
                      <i className="iconss fa-solid fa-user-slash my-2"></i>
                      <span className="py-1 ps-1 text-dark-light chartText">
                        De-active users
                      </span>
                      <h3 className="ps-1 text-dark-light chartText">
                        {usersObj.deactivatedEmployeeCount}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="tasks-charts pt-5 d-flex justify-content-center align-items-center">
                  <Bar
                    data={usersData}
                    options={chartOptions}
                    height={290}
                    width={400}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
