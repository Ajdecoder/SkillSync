import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationToasts = ({
  message = null,
  type = 'default',
  position = 'bottom-left',
  autoClose = 3000,
  hideProgressBar = false,
  newestOnTop = false,
  closeOnClick = true,
  pauseOnHover = true,
  pauseOnFocusLoss = true,
  draggable = true,
  theme = 'light',
}) => {
  useEffect(() => {
    if (!message) return; // Prevents empty toasts

    const toastOptions = { autoClose, position };

    switch (type.toLowerCase()) {
      case 'success':
        toast.success(message, toastOptions);
        break;
      case 'error':
        toast.error(message, toastOptions);
        break;
      case 'warning':
        toast.warning(message, toastOptions);
        break;
      case 'info':
        toast.info(message, toastOptions);
        break;
      default:
        toast(message, toastOptions);
    }
  }, [message, type, autoClose, position]);

  return (
    <ToastContainer
      position={position}
      autoClose={autoClose}
      hideProgressBar={hideProgressBar}
      newestOnTop={newestOnTop}
      closeOnClick={closeOnClick}
      pauseOnHover={pauseOnHover}
      pauseOnFocusLoss={pauseOnFocusLoss}
      draggable={draggable}
      theme={theme}
    />
  );
};

export default NotificationToasts;
