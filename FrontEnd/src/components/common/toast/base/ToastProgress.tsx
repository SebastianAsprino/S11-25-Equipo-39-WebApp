import type { FC } from "react";

interface ToastProgressProps {
  type: "success" | "error" | "warning" | "info";
  width: string;
  duration?: number;
}

const ToastProgress: FC<ToastProgressProps> = ({
  type,
  width,
  duration = 3000,
}) => {
  const colorClass =
    type === "success"
      ? "bg-green-500 dark:bg-green-400"
      : type === "error"
      ? "bg-red-500 dark:bg-red-400"
      : type === "warning"
      ? "bg-yellow-400 dark:bg-yellow-500"
      : "bg-blue-500 dark:bg-blue-400";

  return (
    <div className="h-1 mt-2 w-full bg-gray-300/50 dark:bg-white/10 rounded-full overflow-hidden">
      <div
        style={{ width, transition: `width ${duration}ms linear` }}
        className={`h-full ${colorClass}`}
      />
    </div>
  );
};

export default ToastProgress;
