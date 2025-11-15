import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import Toast from "./Toast";

interface ToastType {
  id: number;
  message: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
}

interface ToastContextProps {
  showToast: (
    message: string,
    type?: ToastType["type"],
    duration?: number
  ) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

let toastId = 0;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const showToast = (
    message: string,
    type: ToastType["type"] = "success",
    duration = 3000
  ) => {
    const id = toastId++;
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-6 right-6 flex flex-col gap-3 z-[9999]">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context)
    throw new Error("useToastContext must be used within a ToastProvider");
  return context;
};
