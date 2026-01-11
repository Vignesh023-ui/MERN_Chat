import { create } from "zustand";
import axiosInstance from "../utils/axios.js";

import useChatStore from "./useChatStore.js";
import useSocketStore from "./useSocketStore.js";

import toast from "react-hot-toast";

const useAuthStore = create((set) => ({
  isCheckingAuth: true,

  // * User Data
  user: null,
  isAuthenticated: false,

  // * Profile Data
  isImageUploading: false,

  isLoading: false,
  error: null,

  signUp: async (data) => {
    set({ isLoading: true });

    const { connectSocket } = useSocketStore.getState();
    try {
      const response = await axiosInstance.post("/api/auth/signup", data);

      set({
        user: response.data.success ? response.data.user : null,
        isAuthenticated: response.data.success,
        error: null,
      });
      toast.success(response.data.message);

      // ! Connect Socket - Sign Up
      connectSocket();
    } catch (error) {
      set({
        error: error?.response.data.message,
        user: null,
        isAuthenticated: false,
      });
      toast.error(error?.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (data) => {
    set({ isLoading: true });

    const { connectSocket } = useSocketStore.getState();
    try {
      const response = await axiosInstance.post("/api/auth/login", data);

      set({
        user: response.data.success ? response.data.user : null,
        isAuthenticated: response.data.success,
        error: null,
      });
      toast.success(response.data.message);

      // ! Connect Socket - Login
      connectSocket();
    } catch (error) {
      set({
        error: error?.response.data.message,
        user: null,
        isAuthenticated: false,
      });
      toast.error(error?.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });

    const { disconnectSocket } = useSocketStore.getState();
    try {
      const response = await axiosInstance.post("/api/auth/logout");

      set({ user: null, isAuthenticated: false, error: null });
      toast.success(response.data.message);

      // ! Disconnect Socket - Logout
      disconnectSocket();
    } catch (error) {
      set({
        error: error?.response.data.message,
        user: null,
        isAuthenticated: false,
      });
      toast.error(error?.response.data.message);
    } finally {
      const { clearSelectedUser } = useChatStore.getState();
      clearSelectedUser();

      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });

    const { connectSocket } = useSocketStore.getState();
    try {
      const response = await axiosInstance.get("/api/auth/check-auth");

      set({
        user: response.data.success ? response.data.user : null,
        isAuthenticated: response.data.success,
        error: null,
      });

      // ! Connect Socket - Authentication
      connectSocket();
    } catch (error) {
      set({
        error: error?.response.data.message,
        user: null,
        isAuthenticated: false,
      });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  uploadProfile: async ({ id, formData }) => {
    set({ isImageUploading: true });

    try {
      const response = await axiosInstance.post(
        `/api/user/upload/${encodeURIComponent(id)}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        set({ user: response.data.user });
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response.data.message);
    } finally {
      set({ isImageUploading: false });
    }
  },
}));

export default useAuthStore;
