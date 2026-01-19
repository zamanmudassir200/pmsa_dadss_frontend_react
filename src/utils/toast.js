import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
};

export const toastSuccess = (message, options = {}) => {
  toast.success(message, { ...defaultOptions, ...options });
};

export const toastError = (message, options = {}) => {
  toast.error(message, { ...defaultOptions, ...options });
};

export const toastInfo = (message, options = {}) => {
  toast.info(message, { ...defaultOptions, ...options });
};

export const toastWarning = (message, options = {}) => {
  toast.warning(message, { ...defaultOptions, ...options });
};
