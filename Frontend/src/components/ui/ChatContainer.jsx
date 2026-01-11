import React, { useEffect, useRef } from "react";

import useChatStore from "../../store/useChatStore";
import useAuthStore from "../../store/useAuthStore";

import { MessageSkeleton, ChatHeader, ChatInput } from "..";
import { formatMessageTime } from "../../utils/formatDate";

const ChatContainer = () => {
  const {
    messages,
    isMessagesLoading,
    getMessages,
    selectedUser,
    subscribeToMessages,
    unSubscribeFromMessages,
    addMessage,
  } = useChatStore();
  const { user } = useAuthStore();

  const chatEndRef = useRef();

  useEffect(() => {
    // * Fetch messages when the selected user changes
    if (selectedUser) {
      getMessages(user._id, selectedUser._id);
    }

    // ? check and update new Messages
    subscribeToMessages();

    // ? clean up - off connection
    return () => unSubscribeFromMessages();
  }, [
    selectedUser,
    getMessages,
    subscribeToMessages,
    unSubscribeFromMessages,
    addMessage,
  ]);

  // * Scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <ChatInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center mt-8">
            <div className="bg-secondary/10 p-4 rounded-lg border border-secondary/20">
              <p className="text-secondary text-sm">
                No chat found. Start a conversation!
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message._id}
              className={`chat ${
                message.sender === user._id ? "chat-end" : "chat-start"
              }`}
              ref={chatEndRef}
            >
              <div className=" chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      message.sender === user._id
                        ? user.profile || "/avatar.png"
                        : selectedUser.profile || "/avatar.png"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div className="chat-bubble flex flex-col">
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[250px] rounded-md mb-2"
                  />
                )}
                {message.text && (
                  <p className="whitespace-pre-wrap">{message.text}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <ChatInput />
    </div>
  );
};

export default ChatContainer;
