import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="p-3 sm:p-4 border-b border-base-300 bg-gradient-to-r from-base-100 to-base-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar with online indicator */}
          <div className="relative">
            <div className="avatar">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full relative overflow-hidden ring-2 ring-base-300 hover:ring-primary transition-all duration-200">
                <img 
                  src={selectedUser.profilePic || "/avatar.png"} 
                  alt={selectedUser.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Online status indicator */}
            <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-base-100 transition-colors duration-200 ${
              isOnline ? 'bg-success' : 'bg-base-content/30'
            }`}></div>
          </div>

          {/* User info */}
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm sm:text-base text-base-content truncate">
              {selectedUser.fullName}
            </h3>
            <p className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
              isOnline ? 'text-success' : 'text-base-content/60'
            }`}>
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button 
          onClick={() => setSelectedUser(null)}
          className="p-1.5 sm:p-2 rounded-full hover:bg-base-300 active:bg-base-300/70 transition-colors duration-200 text-base-content/70 hover:text-base-content"
          aria-label="Close chat"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;