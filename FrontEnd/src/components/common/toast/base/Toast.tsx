import type { FC } from "react";
import { useEffect, useState } from "react";
import ToastIcon from "./ToastIcon";
import ToastProgress from "./ToastProgress";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  onClose: () => void;
}

const Toast: FC<ToastProps> = ({
  message,
  type = "success",
  duration = 3000,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);
  const [progressWidth, setProgressWidth] = useState("100%");
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const progressTimeout = setTimeout(() => setProgressWidth("0%"), 50);

    const closeTimeout = setTimeout(() => setLeaving(true), duration);

    return () => {
      clearTimeout(progressTimeout);
      clearTimeout(closeTimeout);
    };
  }, [duration]);

  useEffect(() => {
    if (leaving) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [leaving, onClose]);

  if (!visible) return null;

  return (
    <div
      className={`w-[320px] z-[9999] ${
        leaving ? "animate-slideOut" : "animate-slideIn"
      }`}
    >
      <div
        className="flex gap-3 items-start rounded-lg px-4 py-3 border shadow-lg
                   bg-white text-gray-900 border-gray-300
                   dark:bg-[#2f3136] dark:text-white dark:border-[#202225]"
      >
        <ToastIcon type={type} />
        <div className="flex-1">
          <p className="text-sm">{message}</p>
          <ToastProgress
            type={type}
            width={progressWidth}
            duration={duration}
          />
        </div>

        <button
          onClick={() => setLeaving(true)}
          className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
        >
          ✕
        </button>
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(30px); opacity: 0; }
        }
        .animate-slideIn { animation: slideIn 0.25s ease-out forwards; }
        .animate-slideOut { animation: slideOut 0.3s ease-in forwards; }
      `}</style>
    </div>
  );
};

export default Toast;
