import { toast } from 'react-toastify';

const ToastUtil = {
  success: (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  },
  error: (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  },
  info: (message) => {
    toast.info(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  },
  warn: (message) => {
    toast.warn(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  },
};

export default ToastUtil;
