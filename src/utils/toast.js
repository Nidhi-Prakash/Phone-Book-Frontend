import { toast } from "react-toast";

export const successToast = (message) => {
  toast.success(message);
};

export const errorToast = (message) => {
  toast.error(message);
};
