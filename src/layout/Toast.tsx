import ReactDOM from "react-dom";
import { toast, ToastContainer, ToastOptions } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export function Toasts() {
  const toastPortal = document.getElementById("toasts");
  return <>{ReactDOM.createPortal(<ToastContainer />, toastPortal!)}</>;
}

const toastConfig: ToastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: "light",
};

class Notification {
  constructor() {
    toast.dismiss();
  }

  /**
   * Clear all toast notifications that are currently being displayed on the page.
   */
  static clearAll() {
    toast.dismiss();
  }

  /**
   * Show info toast message.
   *
   * @param message
   */
  static info(message: string) {
    toast.info(message, toastConfig);
  }

  /**
   * Show success toast message.
   *
   * @param message
   */
  static success(message: string) {
    toast.success(message, toastConfig);
  }

  /**
   * Show warning toast message.
   *
   * @param message
   */
  static warning(message: string) {
    toast.warning(message, toastConfig);
  }

  /**
   * Show error toast message.
   *
   * @param message
   */
  static error(message: string) {
    toast.error(message, toastConfig);
  }
}

export default Notification;
