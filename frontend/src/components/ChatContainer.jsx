import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
    setReplyToMessage,
  } = useChatStore();
  const { authUser, theme } = useAuthStore();
  const messageEndRef = useRef(null);
  const [popupForMessageId, setPopupForMessageId] = useState(null);
  const popupRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }
    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages.length) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Close popup if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target)
      ) {
        setPopupForMessageId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Theme-based styling
  const themeColors = {
    light: {
      popupBg: "bg-white border border-gray-300 text-gray-800",
      replyBg: "bg-blue-50 border-l-4 border-blue-500 text-blue-700",
      popupHover: "hover:bg-gray-200",
      popupDanger: "hover:bg-red-100 text-red-600",
    },
    dark: {
      popupBg: "bg-gray-800 border border-gray-600 text-gray-200",
      replyBg: "bg-blue-900 border-l-4 border-blue-700 text-blue-300",
      popupHover: "hover:bg-gray-700",
      popupDanger: "hover:bg-red-700 text-red-400",
    },
  };

  const colors = themeColors[theme] || themeColors.light;

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
        {messages.map((message) => {
          const isSent = message.senderId === authUser._id;
          const showPopup = popupForMessageId === message._id;

          return (
            <div
              key={message._id}
              className={`chat ${isSent ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      isSent
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>

              <div className="chat-header mb-1 flex justify-between items-center w-full">
                <time className={`text-xs opacity-50 ${isSent ? "ml-1" : "mr-1"}`}>
                  {formatMessageTime(message.createdAt)}
                </time>

                {/* Three dots menu */}
                <div
                  className={`relative ${isSent ? "ml-auto mr-2" : "mr-auto ml-2"}`}
                  ref={showPopup ? popupRef : null}
                >
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() =>
                      setPopupForMessageId(showPopup ? null : message._id)
                    }
                    aria-label="Message options"
                  >
                    {/* Vertical three dots */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6h.01M12 12h.01M12 18h.01"
                      />
                    </svg>
                  </button>

                  {/* Pop-up menu */}
                  {showPopup && (
                    <div
                      className={`absolute top-full mt-2 w-28 rounded shadow-lg z-20 ${
                        isSent ? "right-0" : "left-0"
                      } ${colors.popupBg}`}
                      style={{ minWidth: "7rem" }}
                    >
                      <button
                        onClick={() => {
                          setReplyToMessage(message);
                          setPopupForMessageId(null);
                        }}
                        className={`block w-full text-left px-3 py-2 ${colors.popupHover}`}
                      >
                        Reply
                      </button>
                      <button
                        onClick={() => {
                          useChatStore.getState().deleteMessage(message._id);
                          setPopupForMessageId(null);
                        }}
                        className={`block w-full text-left px-3 py-2 ${colors.popupDanger}`}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Chat bubble */}
              <div className="chat-bubble flex flex-col max-w-xs">
                {message.replyTo && (
                  <div
                    className={`${colors.replyBg} mb-1 px-2 py-1 rounded border-l-4 text-sm truncate`}
                  >
                    {message.replyTo.text
                      ? message.replyTo.text
                      : message.replyTo.image
                      ? "📎 Image"
                      : "Replied message"}
                  </div>
                )}
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
