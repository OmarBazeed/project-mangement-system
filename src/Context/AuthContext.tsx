import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { baseUrl, getRequestHeaders, handleApiError } from "../utils/Utils";

// Define the type of the decoded token
interface DecodedToken {
  userGroup: string;
  // Add other properties if needed
  userName: string;
  userEmail: string;
}

interface AuthContextType {
  saveAdminData: () => void;
  adminData: DecodedToken | null;
  userRole: string | null;
  Token: string | null;
  logout: () => void;
  currentUser: currentUser | null;
  getCurrentUser: () => void;
}

interface currentUser {
  id: number;
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  imagePath: string;
  creationDate: string;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [adminData, setAdminData] = useState<DecodedToken | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<currentUser | null>(null);
  const Token = localStorage.getItem("token");

  const saveAdminData = () => {
    const encodedToken = localStorage.getItem("token");
    if (encodedToken) {
      const decodedToken = jwtDecode<DecodedToken>(encodedToken);
      setAdminData(decodedToken);
      setUserRole(decodedToken?.userGroup);
      getCurrentUser();
    }
  };
  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/Users/currentUser`, {
        headers: getRequestHeaders(),
      });
      // console.log(data);
      setCurrentUser(data);
    } catch (error) {
      handleApiError(error);
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    setAdminData(null);
  };

  useEffect(() => {
    saveAdminData();
  }, []);

  const contextValue: AuthContextType = {
    adminData,
    userRole,
    saveAdminData,
    Token,
    logout,
    currentUser,
    getCurrentUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useUser = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUser must be used within an AuthContextProvider");
  }
  return context;
};
