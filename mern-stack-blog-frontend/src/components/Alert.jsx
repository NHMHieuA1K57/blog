import React from 'react';
import PropTypes from "prop-types";

const Alert = ({ message, type, onClose }) => {
  const alertStyles = {
    success: "bg-green-100 border-green-400 text-green-700",
    error: "bg-red-100 border-red-400 text-red-700",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
  };

  Alert.propTypes = {
  message: PropTypes.string.isRequired,     // 🟡 message phải là chuỗi và bắt buộc
  type: PropTypes.oneOf(["success", "error", "info", "warning"]).isRequired,  // 🟡 chỉ chấp nhận 1 trong các giá trị
  onClose: PropTypes.func.isRequired,       // 🟡 onClose phải là hàm và bắt buộc
};

let alertTitle;

if (type === "error") {
  alertTitle = "Error!";
} else if (type === "success") {
  alertTitle = "Success!";
} else {
  alertTitle = "Warning!";
}

  return (
    <div
      className={`border px-4 py-3 rounded relative ${alertStyles[type]}`}
      role="alert"
    >
      <strong className="font-bold">
        {alertTitle}
      </strong>
      <span className="block sm:inline"> {message}</span>
      <button
  onClick={onClose}
  className="absolute top-0 bottom-0 right-0 px-4 py-3"
  aria-label="Close alert"
  type="button"  // nên thêm type để tránh mặc định là "submit"
>
  <svg
    className="fill-current h-6 w-6 text-red-500"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
  >
    <title>Close</title>
    <path d="..." />
  </svg>
</button>

    </div>
  );
};

export default Alert;
