import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { AuthContextProvider } from "./Context/AuthContext.tsx";
import { ToastProvider } from "./Context/ToastContext.tsx";
import { ToastContainer } from "react-toastify";
import BaseUrlContextProvider from "./Context/BaseUrlContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<AuthContextProvider>
			<ToastProvider>
				<BaseUrlContextProvider>
					<App />
				</BaseUrlContextProvider>
			</ToastProvider>
			<ToastContainer />
		</AuthContextProvider>
	</React.StrictMode>
);
