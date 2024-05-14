import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthLayout from "./Modules/SharedModule/components/AuthLayout/AuthLayout";
import { ToastContainer } from "react-toastify";
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
					path: "forget-password",
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
					path: "verify-account",
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
			<ToastContainer />
			<RouterProvider router={routes} />
		</>
	);
}

export default App;
