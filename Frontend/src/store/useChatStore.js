import { create } from "zustand";
import axiosInstance from "../utils/axios.js";

import { toast } from "react-hot-toast";

import useSocketStore from "./useSocketStore.js";

const useChatStore = create((set, get) => ({
  // * chat Users
  chatUsers: [],
  selectedUser: null,
  isUsersLoading: false,

  // * Messages
  messages: [],
  isMessagesLoading: false,

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  clearSelectedUser: () => {
    set({ selectedUser: null });
  },

  addMessage: (msg) => {
    set((state) => ({
      messages: [...state.messages, msg],
    }));
  },

  getChatUsers: async (id) => {
    const { onlineUsers } = useSocketStore.getState();

    set({ isUsersLoading: true });
    try {
      const response = await axiosInstance.get(
        `/api/user/chat/${encodeURIComponent(id)}`
      );

      const usersToChat = response.data.users;
      // ! Sort users by Online Status
      const sortedUsers = usersToChat.sort((a, b) => {
        const aHas = onlineUsers.has(a._id);
        const bHas = onlineUsers.has(b._id);

        return bHas - aHas;
      });

      set({ chatUsers: sortedUsers });
    } catch (error) {
      toast.error(error?.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (from, to) => {
    set({ isMessagesLoading: true });

    try {
      const response = await axiosInstance.get(
        `/api/message/get/${encodeURIComponent(from)}/${encodeURIComponent(to)}`
      );

      set({ messages: response.data.messages });
    } catch (error) {
      toast.error(error?.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (from, to, messageData) => {
    try {
      const response = await axiosInstance.post(
        `/api/message/send/${encodeURIComponent(from)}/${encodeURIComponent(
          to
        )}`,
        messageData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    } catch (error) {
      toast.error(error?.response.data.message);
    }
  },

  // * listen to new Messages
  subscribeToMessages: () => {
    const { selectedUser, addMessage, messages } = get();
    const { socket } = useSocketStore.getState();

    if (!selectedUser) return;

    // ? Update Messages
    socket.on("newMessage", (msg) => {
      // ! Check sender or receiver
      if (
        msg.sender === selectedUser._id ||
        msg.receiver === selectedUser._id
      ) {
        addMessage(msg);
      }
    });
  },

  // * stop listening from Messages
  unSubscribeFromMessages: () => {
    const { socket } = useSocketStore.getState();

    // ? Stop new Message
    socket.off("newMessage");
  },
}));

export default useChatStore;
