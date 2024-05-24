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
//
export interface TaskInterface {
  id: string;
  title: string;
  employee?: { userName: string };
  project?: { title: string };
  status: string;
  description: string;
}
//
export interface TaskSubmitInterface {
  title: string;
  description: string;
  employeeId: string;
  projectId: string;
}
export interface TaskUpdateSubmitInterface {
  title: string;
  description: string;
  employeeId: string;
}
//
export interface ProjectInterface {
  projectId?: string;
  title: string;
  id: number;
  creationDate: string;
  task: [] | string;
}
export interface ProjectSubmitUpdateInterface {
  title: string;
  description: string;
}
//
export interface TasksInterface extends Array<TaskInterface> {}

export interface TaskProps {
  task: TaskInterface;
}
//
export interface ColumnProps {
  title: string;
  tasks: TasksInterface;
  status: string;
  changeTaskStatus: changeTaskStatus;
}

export type changeTaskStatus = (
  id: string,
  prevStateus: string,
  newStatus: string
) => void;
