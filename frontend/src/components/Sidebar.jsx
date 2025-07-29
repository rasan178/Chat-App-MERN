import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Search, UserCheck, Zap, MessageCircle, Sparkles } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users
    .filter((user) => showOnlineOnly ? onlineUsers.includes(user._id) : true)
    .filter((user) => user.fullName.toLowerCase().includes(searchTerm.toLowerCase()));

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside
      className="h-full w-16 lg:w-72 border-r border-base-300/80 backdrop-blur-sm flex flex-col transition-all duration-300 bg-gradient-to-b from-base-100/95 to-base-200/50"
      data-theme={theme}
    >
      {/* Header Section - Hidden on mobile */}
      <div className="hidden lg:block border-b border-base-300/80 w-full p-5 bg-gradient-to-r from-base-100/80 to-base-200/30 backdrop-blur-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/25">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
          </div>
          <div>
            <h2 className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Contacts
            </h2>
            <p className="text-xs text-base-content/60">Stay connected</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/40" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered input-sm w-full pl-10 bg-base-100/50 focus:bg-base-100 transition-all duration-200 focus:scale-[1.02]"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="cursor-pointer flex items-center gap-3 group">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm checkbox-primary"
            />
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm font-medium">Show online only</span>
            </div>
          </label>
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 border border-primary/20">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-primary font-medium">{onlineUsers.length}</span>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="overflow-y-auto w-full py-2 flex-1">
        {filteredUsers.length > 0 ? (
          <>
            {/* Header hidden on mobile */}
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 text-xs font-semibold text-base-content/50 uppercase tracking-wide">
              <MessageCircle className="w-3 h-3" />
              <span>{showOnlineOnly ? "Online Now" : "All Contacts"} ({filteredUsers.length})</span>
            </div>

            {filteredUsers.map((user, index) => {
              const isOnline = onlineUsers.includes(user._id);
              const isSelected = selectedUser?._id === user._id;

              return (
                <button
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className={`
                    w-full p-2 lg:p-3 mx-auto my-1 rounded-xl flex items-center justify-center lg:justify-start gap-3
                    transition-all duration-200 group relative overflow-hidden
                    hover:scale-[1.02] hover:shadow-md
                    ${isSelected 
                      ? "bg-gradient-to-r from-primary/20 to-secondary/10 shadow-lg shadow-primary/10 border border-primary/30" 
                      : "hover:bg-base-200/80 hover:shadow-sm"
                    }
                  `}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 animate-pulse lg:hidden"></div>
                  )}

                  <div className="relative z-10">
                    <img
                      src={user.profilePic || "/avatar.png"}
                      alt={user.fullName}
                      className={`w-10 h-10 lg:w-12 lg:h-12 object-cover rounded-full transition-all duration-200 ${
                        isSelected ? "ring-2 ring-primary shadow-lg" : "group-hover:ring-2 group-hover:ring-base-300"
                      }`}
                    />
                    {isOnline && (
                      <div className="absolute -bottom-1 -right-1">
                        <div className="w-3 h-3 lg:w-4 lg:h-4 bg-green-500 rounded-full ring-2 ring-base-100 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-white rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    )}
                    {isOnline && isSelected && (
                      <div className="absolute -top-1 -left-1 w-3 h-3 lg:w-4 lg:h-4 bg-secondary rounded-full flex items-center justify-center animate-bounce">
                        <Zap className="w-2 h-2 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Info hidden on mobile */}
                  <div className="hidden lg:block text-left min-w-0 flex-1 z-10">
                    <div
                      className={`font-semibold truncate transition-colors duration-200 ${
                        isSelected ? "text-primary" : "text-base-content group-hover:text-primary"
                      }`}
                    >
                      {user.fullName}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isOnline ? "bg-green-500" : "bg-base-content/30"
                        }`}
                      ></div>
                      <span
                        className={`text-xs font-medium ${
                          isOnline ? "text-green-600" : "text-base-content/60"
                        }`}
                      >
                        {isOnline ? "Online" : "Offline"}
                      </span>
                      {isOnline && <Sparkles className="w-3 h-3 text-secondary ml-1 animate-pulse" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-base-content/40" />
            </div>
            <p className="text-base-content/60 text-center text-sm">
              {searchTerm
                ? "No contacts found"
                : showOnlineOnly
                ? "No online users"
                : "No contacts yet"}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-primary text-xs mt-2 hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>

      {/* Footer - hidden on mobile */}
      <div className="hidden lg:block border-t border-base-300/50 p-3 bg-base-100/30 backdrop-blur-sm">
        <div className="flex items-center justify-between text-xs text-base-content/60">
          <span>{users.length} total contacts</span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>{onlineUsers.length} online</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
