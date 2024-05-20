import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../../../Context/AuthContext";

export const ProtectedRoute: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { adminData } = useUser();

  if (adminData == null && !localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  } else {
    return children; // Return the children directly
  }
};
// export const LoginProtectedRoute: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const { adminData } = useUser();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (adminData && localStorage.getItem("token")) {
//       navigate("/dashboard", { replace: false });
//     }
//   }, [adminData, navigate]);

//   return children;
// };
