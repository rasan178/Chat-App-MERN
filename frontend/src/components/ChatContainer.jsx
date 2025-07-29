import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
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
  const { authUser } = useAuthStore();
  const { theme } = useThemeStore();
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
    <div className="flex-1 flex flex-col overflow-auto" data-theme={theme}>
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 relative bg-base-100">
        {messages.map((message) => {
          const isSent = message.senderId === authUser._id;
          const showPopup = popupForMessageId === message._id;

          return (
            <div
              key={message._id}
              className={`chat ${isSent ? "chat-end" : "chat-start"} group relative`}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border border-base-300 overflow-hidden shadow-sm">
                  <img
                    src={
                      isSent
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="chat-header mb-1">
                <time className={`text-xs opacity-50 ml-1 text-base-content/70`}>
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>

              {/* Message content wrapper with three dots menu */}
              <div className="relative flex items-start gap-2">
                {/* Chat bubble */}
                <div className={`chat-bubble flex flex-col max-w-xs shadow-sm ${
                  isSent 
                    ? 'bg-primary text-primary-content' 
                    : 'bg-base-200 text-base-content border border-base-300'
                }`}>
                  {message.replyTo && (
                    <div className={`mb-2 px-3 py-2 rounded-lg text-sm border-l-4 ${
                      isSent 
                        ? 'bg-primary-content/10 border-primary-content/30 text-primary-content/90' 
                        : 'bg-accent/10 border-accent text-accent-content'
                    }`}>
                      <div className="text-xs opacity-75 mb-1">Replying to:</div>
                      <div className="truncate">
                        {message.replyTo.text
                          ? message.replyTo.text
                          : message.replyTo.image
                          ? "📎 Image"
                          : "Replied message"}
                      </div>
                    </div>
                  )}
                  {message.image && (
                    <div className="mb-2">
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="sm:max-w-[200px] rounded-lg shadow-sm border border-base-300/50"
                      />
                    </div>
                  )}
                  {message.text && (
                    <p className="break-words leading-relaxed">{message.text}</p>
                  )}
                </div>

                {/* Three dots menu - positioned next to chat bubble */}
                <div
                  className={`relative ${isSent ? "order-first mr-2" : "ml-2"}`}
                  ref={showPopup ? popupRef : null}
                >
                  <button
                    className="btn btn-ghost btn-sm w-8 h-8 min-h-8 p-0 rounded-full text-base-content/40 hover:text-base-content/70 hover:bg-base-200 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-sm"
                    onClick={() =>
                      setPopupForMessageId(showPopup ? null : message._id)
                    }
                    aria-label="Message options"
                  >
                    {/* Vertical three dots */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
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
                      className={`absolute top-0 mt-8 w-36 rounded-xl z-20 overflow-hidden shadow-xl border border-base-300 bg-base-100 backdrop-blur-sm ${
                        isSent ? "right-0" : "left-0"
                      }`}
                      style={{
                        animation: 'fadeIn 0.15s ease-out'
                      }}
                    >
                      <button
                        onClick={() => {
                          setReplyToMessage(message);
                          setPopupForMessageId(null);
                        }}
                        className="flex items-center w-full text-left px-4 py-3 text-sm text-base-content hover:bg-base-200 transition-colors duration-150"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-3 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                          />
                        </svg>
                        Reply
                      </button>
                      <div className="border-t border-base-300"></div>
                      <button
                        onClick={() => {
                          useChatStore.getState().deleteMessage(message._id);
                          setPopupForMessageId(null);
                        }}
                        className="flex items-center w-full text-left px-4 py-3 text-sm text-error hover:bg-error/10 transition-colors duration-150"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ChatContainer;