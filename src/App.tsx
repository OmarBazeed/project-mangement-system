import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import ForgetPass from "./Modules/AuthModule/components/ForgetPass/ForgetPass";
import Login from "./Modules/AuthModule/components/Login/Login";
import Register from "./Modules/AuthModule/components/Register/Register";
import ResetPass from "./Modules/AuthModule/components/ResetPass/ResetPass";
import VerifyAccount from "./Modules/AuthModule/components/VerifyAccount/VerifyAccount";
import Dashboard from "./Modules/DashboardModule/components/Dashboard/Dashboard";
import ProjectList from "./Modules/ProjectModule/components/ProjectList/ProjectList";
import AuthLayout from "./Modules/SharedModule/components/AuthLayout/AuthLayout";
import MasterLayout from "./Modules/SharedModule/components/MasterLayout/MasterLayout";
import Notfound from "./Modules/SharedModule/components/Notfound/Notfound";
import TaskList from "./Modules/TasksModule/components/TaskList/TaskList";
import UsersList from "./Modules/UsersModule/components/UsersList/UsersList";
import ProtectedRoute from "./Modules/SharedModule/components/ProtectedRoute/ProtectedRoute";
import ProjectData from "./Modules/ProjectModule/components/ProjectData/ProjectData";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <Notfound />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "forget-pass",
          element: <ForgetPass />,
        },
        {
          path: "reset-password",
          element: <ResetPass />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "verifyaccount",
          element: <VerifyAccount />,
        },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <Notfound />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "projects",
          element: <ProjectList />,
        },
        {
          path: "projects-data",
          element: <ProjectData />,
        },
        {
          path: "tasks",
          element: <TaskList />,
        },
        {
          path: "users",
          element: <UsersList />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
