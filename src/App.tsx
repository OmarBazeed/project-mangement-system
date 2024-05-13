import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthLayout from "./Modules/SharedModule/components/AuthLayout/AuthLayout";
import Notfound from "./Modules/SharedModule/components/Notfound/Notfound";
import Login from "./Modules/AuthModule/components/Login/Login";
import ForgetPass from "./Modules/AuthModule/components/ForgetPass/ForgetPass";
import ResetPass from "./Modules/AuthModule/components/ResetPass/ResetPass";
import Register from "./Modules/AuthModule/components/Register/Register";
import VerifyAccount from "./Modules/AuthModule/components/VerifyAccount/VerifyAccount";
import MasterLayout from "./Modules/SharedModule/components/MasterLayout/MasterLayout";
import Dashboard from "./Modules/DashboardModule/components/Dashboard/Dashboard";
import ProjectList from "./Modules/ProjectModule/components/ProjectList/ProjectList";
import TaskList from "./Modules/TasksModule/components/TaskList/TaskList";
import UsersList from "./Modules/UsersModule/components/UsersList/UsersList";
import BaceUrlContext from "./Context/BaceUrlContext";
import ProtectedRoute from "./Modules/SharedModule/components/ProtectedRoute/ProtectedRoute";

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
          path: "reset-pass",
          element: <ResetPass />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "verify-account",
          element: <VerifyAccount />,
        },
      ],
    },
    {
      path: "dashboard",
      element: <MasterLayout />,
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
      <BaceUrlContext>
        <RouterProvider router={routes} />
      </BaceUrlContext>
    </>
  );
}

export default App;
