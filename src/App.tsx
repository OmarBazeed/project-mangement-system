import { RouterProvider, createHashRouter } from "react-router-dom";
import "./App.css";
import ForgetPass from "./Modules/AuthModule/components/ForgetPass/ForgetPass";
import Login from "./Modules/AuthModule/components/Login/Login";
import Register from "./Modules/AuthModule/components/Register/Register";
import ResetPass from "./Modules/AuthModule/components/ResetPass/ResetPass";
import VerifyAccount from "./Modules/AuthModule/components/VerifyAccount/VerifyAccount";
import Dashboard from "./Modules/DashboardModule/components/Dashboard/Dashboard";
import ProjectData from "./Modules/ProjectModule/components/ProjectData/ProjectData";
import ProjectList from "./Modules/ProjectModule/components/ProjectList/ProjectList";
import AuthLayout from "./Modules/SharedModule/components/AuthLayout/AuthLayout";
import MasterLayout from "./Modules/SharedModule/components/MasterLayout/MasterLayout";
import Notfound from "./Modules/SharedModule/components/Notfound/Notfound";
import {
  LoginProtectedRoute,
  ProtectedRoute,
} from "./Modules/SharedModule/components/ProtectedRoute/ProtectedRoute";
import TaskBoard from "./Modules/TasksModule/components/TaskBoard/TaskBoard";
import TaskData from "./Modules/TasksModule/components/TaskData/TaskData";
import TaskList from "./Modules/TasksModule/components/TaskList/TaskList";
import AccountInfo from "./Modules/UserProfileModule/components/AccountInfo/AccountInfo";
import AccountSetting from "./Modules/UserProfileModule/components/AccountSetting/AccountSetting";
import ChangePassword from "./Modules/UserProfileModule/components/ChangePassword/ChangePassword";
import Profile from "./Modules/UserProfileModule/components/Profile/Profile";
import UsersList from "./Modules/UsersModule/components/UsersList/UsersList";

function App() {
  const routes = createHashRouter([
    {
      path: "/",
      element: (
        <LoginProtectedRoute>
          <AuthLayout />
        </LoginProtectedRoute>
      ),
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
          path: "tasks-board",
          element: <TaskBoard />,
        },
        {
          path: "tasks",
          element: <TaskList />,
        },
        {
          path: "tasks-data",
          element: <TaskData />,
        },
        {
          path: "users",
          element: <UsersList />,
        },
        {
          path: "profile",
          element: <Profile />,
          errorElement: <Notfound />,
          children: [
            {
              index: true,
              element: <AccountInfo />,
            },
            {
              path: "account-info",
              element: <AccountInfo />,
            },
            {
              path: "account-setting",
              element: <AccountSetting />,
            },
            {
              path: "change-password",
              element: <ChangePassword />,
            },
          ],
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
