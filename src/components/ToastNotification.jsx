import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * ToastNotification Component
 * Provides global toast notifications throughout the application
 */

// Configure toast appearance
const toastConfig = {
  position: 'top-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

/**
 * Success toast notification
 * @param {string} message - Message to display
 */
export const showSuccess = (message) => {
  toast.success(message, {
    ...toastConfig,
    style: { background: '#10B981', color: 'white' },
  });
};

/**
 * Error toast notification
 * @param {string} message - Message to display
 */
export const showError = (message) => {
  toast.error(message, {
    ...toastConfig,
    style: { background: '#EF4444', color: 'white' },
  });
};

/**
 * Info toast notification
 * @param {string} message - Message to display
 */
export const showInfo = (message) => {
  toast.info(message, {
    ...toastConfig,
    style: { background: '#3B82F6', color: 'white' },
  });
};

/**
 * Warning toast notification
 * @param {string} message - Message to display
 */
export const showWarning = (message) => {
  toast.warn(message, {
    ...toastConfig,
    style: { background: '#F59E0B', color: 'white' },
  });
};

/**
 * ToastNotification Component
 * Renders the ToastContainer with custom styling
 */
const ToastNotification = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      // Custom styling for Exide branding
      toastStyle={{
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
        fontSize: '14px',
        fontWeight: '500',
      }}
    />
  );
};

export default ToastNotification;

