import React, { useEffect } from "react";

import { Users } from "lucide-react";
import { UserSkeleton } from "..";

import useChatStore from "../../store/useChatStore";
import useAuthStore from "../../store/useAuthStore";
import useSocketStore from "../../store/useSocketStore";

const Sidebar = () => {
  const {
    getChatUsers,
    chatUsers,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
  } = useChatStore();

  const { onlineUsers } = useSocketStore();
  const { user } = useAuthStore();

  useEffect(() => {
    getChatUsers(user._id);
  }, [getChatUsers, onlineUsers]);

  if (isUsersLoading) return <UserSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-64 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/* TODO: Online filter toggle */}
      </div>

      <div className="overflow-y-auto w-full py-3">
        {chatUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${
                selectedUser?._id === user._id
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              }
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profile || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.has(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.name}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.has(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};
export default Sidebar;
