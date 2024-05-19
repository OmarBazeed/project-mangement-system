export interface FormData {
  email: string;
  password: string;
  message?: string;
  confirmPassword?: string;
  seed?: string;
}
export interface ToastContextType {
  showToast: (message: string) => void;
  showSuccessToast: (message: string) => void;
  showErrorToast: (message: string) => void;
}
export interface UsersInterface {
  country: string;
  email: string;
  id: number;
  imagePath: string;
  isActivated: boolean;
  creationDate: string;
  phoneNumber: string;
  task: [];
  userName: string;
  err?: string;
  userGroup: string;
  user?: string;
}
export interface TaskInterface {
  id: number;
  title: string;
  employee: { userName: string };
  project: { title: string };
}
export interface ProjectInterface {
  projectId?: string;
  title: string;
  id: number;
  creationDate: string;
  task: [] | string;
}
export interface TaskSubmitInterface {
  title: string;
  description: string;
  employeeId: string;
  projectId: string;
}
