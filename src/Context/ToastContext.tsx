import { ReactNode, createContext, useContext } from "react";
import {ToastContextType} from '../interfaces/Auth'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// Create a context with the defined type
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Custom hook to use the toast context
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
// Toast provider component
export const ToastProvider:  React.FC<{ children: ReactNode }>=({ children }) => {
  // Define functions to show different types of toast notifications
  const showToast = (message: string) => {
    toast(message);
  };

  const showSuccessToast = (message: string) => {
    toast.success(message);
  };

  const showErrorToast = (message: string) => {
    toast.error(message);
  };
              
  // Define the context value
  const contextValue: ToastContextType = {
    showToast,
    showSuccessToast,
    showErrorToast,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
};