import { useToastContext } from "../base/ToastProvider";

export const useToast = () => {
  const { showToast } = useToastContext();
  return { showToast };
};
