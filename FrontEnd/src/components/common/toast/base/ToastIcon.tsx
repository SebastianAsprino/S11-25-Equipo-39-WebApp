import type { FC } from "react";

interface ToastIconProps {
  type: "success" | "error" | "warning" | "info";
}

const ToastIcon: FC<ToastIconProps> = ({ type }) => {
  const baseStyle =
    "w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0";

  switch (type) {
    case "success":
      return (
        <div className={`${baseStyle} bg-green-500 dark:bg-green-400`}>
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      );
    case "error":
      return (
        <div className={`${baseStyle} bg-red-500 dark:bg-red-400`}>
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      );
    case "warning":
      return (
        <div className={`${baseStyle} bg-yellow-400 dark:bg-yellow-500`}>
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M5.07 19h13.86L12 4 5.07 19z"
            />
          </svg>
        </div>
      );
    case "info":
      return (
        <div className={`${baseStyle} bg-blue-500 dark:bg-blue-400`}>
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"
            />
          </svg>
        </div>
      );
    default:
      return null;
  }
};

export default ToastIcon;
