import axios from "axios";
import { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { useUser } from "../../../../Context/AuthContext";
import {
  baseUrl,
  getRequestHeaders,
  handleApiError,
} from "../../../../utils/Utils";
import Header from "../../../SharedModule/components/Header";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  DoughnutController,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import "./Dashboard.Moule.css";

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
  const [todoCount, settodoCount] = useState<number>(0);
  const [progressCount, setprogressCount] = useState<number>(0);
  const [doneCount, setdoneCount] = useState<number>(0);
  const [activatedEmployeeCount, setactivatedEmployeeCount] =
    useState<number>(0);
  const [deactivatedEmployeeCount, setdeactivatedEmployeeCount] =
    useState<number>(0);

  const getTasksCount = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Task/count`, {
        headers: getRequestHeaders(),
      });

      settodoCount(response.data.done);
      setprogressCount(response.data.inProgress);
      setdoneCount(response.data.toDo);
    } catch (error) {
      handleApiError(error);
    }
  };

  const getUserCount = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Users/count`, {
        headers: getRequestHeaders(),
      });
      setactivatedEmployeeCount(response.data.activatedEmployeeCount);
      setdeactivatedEmployeeCount(response.data.deactivatedEmployeeCount);
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    getTasksCount();
    getUserCount();
  }, []);

  const tasksData = {
    labels: ["To Do", "In Progress", "Done"],
    datasets: [
      {
        label: "Tasks",
        data: [todoCount, progressCount, doneCount],
        backgroundColor: ["#FF6384", "#36A2EB", "#4BC0C0"],
      },
    ],
  };

  const usersData = {
    labels: ["Active", "De-active"],
    datasets: [
      {
        label: "Users",
        data: [activatedEmployeeCount, deactivatedEmployeeCount],
        backgroundColor: ["#FFCE56", "#9966FF"],
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
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
                      {todoCount}
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
                      {progressCount}
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
                      {doneCount}
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
                      {activatedEmployeeCount}
                    </h3>
                  </div>

                  <div className="mb-1">
                    <div className="user1 rounded-4 p-3">
                      <i className="iconss fa-solid fa-user-slash my-2"></i>
                      <span className="py-1 ps-1 text-dark-light chartText">
                        De-active users
                      </span>
                      <h3 className="ps-1 text-dark-light chartText">
                        {deactivatedEmployeeCount}
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
