import { toast } from "react-hot-toast";

export const validateForm = (formData) => {
  // * Name Validation
  if (formData?.name && !formData?.name?.trim()) {
    toast.error("Full name is required");
    return false;
  }

  // * Email Validation
  if (!formData?.email?.trim()) {
    toast.error("Email is required");
    return false;
  }
  if (!/\S+@\S+\.\S+/.test(formData?.email)) {
    toast.error("Invalid email format");
    return false;
  }

  // * Password Validation
  if (!formData?.password) {
    toast.error("Password is required");
    return false;
  }
  if (formData?.password.length < 4) {
    toast.error("Password must be at least 4 characters");
    return false;
  }

  return true;
};
