import { ReactNode, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../../../../Context/AuthContext";

export const ProtectedRoute: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { adminData } = useUser();
  if (adminData == null && !localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }
  return children;
};
export const LoginProtectedRoute: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { adminData } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (adminData && localStorage.getItem("token")) {
      navigate("/dashboard", { replace: true });
    }
  }, [adminData, navigate]);

  return children;
};
