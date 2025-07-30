import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Send, Settings, User, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Vertical Navbar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-20 xl:w-64 bg-gradient-to-b from-base-100 to-base-200 border-r border-base-300 z-50 backdrop-blur-lg">
        <div className="flex flex-col h-full w-full">
          {/* Logo Section */}
          <div className="p-4 xl:p-6 border-b border-base-300">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-all group">
              <div className="size-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
                <Send className="w-6 h-6 text-primary-content" />
              </div>
              <div className="hidden xl:block">
                <h1 className="text-xl font-bold text-base-content">Chatify</h1>
                <p className="text-xs text-base-content/60">Stay Connected</p>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 xl:p-6 space-y-3">
            <Link
              to="/settings"
              className="flex items-center gap-4 p-3 xl:p-4 rounded-xl hover:bg-base-300 active:bg-base-300/70 transition-all duration-200 group"
            >
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Settings className="w-5 h-5 text-primary" />
              </div>
              <span className="hidden xl:inline font-medium text-base-content">Settings</span>
            </Link>

            {authUser && (
              <Link
                to="/profile"
                className="flex items-center gap-4 p-3 xl:p-4 rounded-xl hover:bg-base-300 active:bg-base-300/70 transition-all duration-200 group"
              >
                <div className="p-2 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                  <User className="w-5 h-5 text-secondary" />
                </div>
                <span className="hidden xl:inline font-medium text-base-content">Profile</span>
              </Link>
            )}
          </nav>

          {/* User Section & Logout */}
          {authUser && (
            <div className="p-4 xl:p-6 border-t border-base-300 space-y-3">
              {/* User Info */}
              <div className="flex items-center gap-3 p-2 xl:p-3 rounded-xl bg-base-200">
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full ring-2 ring-primary/20">
                    <img src={authUser.profilePic || "/avatar.png"} alt={authUser.fullName} />
                  </div>
                </div>
                <div className="hidden xl:block min-w-0 flex-1">
                  <p className="font-medium text-sm text-base-content truncate">{authUser.fullName}</p>
                  <p className="text-xs text-success">Online</p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="flex items-center gap-4 p-3 xl:p-4 rounded-xl hover:bg-error/10 active:bg-error/20 transition-all duration-200 group w-full"
              >
                <div className="p-2 rounded-lg bg-error/10 group-hover:bg-error/20 transition-colors">
                  <LogOut className="w-5 h-5 text-error" />
                </div>
                <span className="hidden xl:inline font-medium text-error">Logout</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Top Navbar */}
      <header className="lg:hidden bg-gradient-to-r from-base-100 to-base-200 border-b border-base-300 fixed w-full top-0 z-50 backdrop-blur-lg">
        <div className="container mx-auto px-4 h-16">
          <div className="flex items-center justify-between h-full">
            {/* Mobile Logo */}
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-all">
              <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                <Send className="w-5 h-5 text-primary-content" />
              </div>
              <h1 className="text-lg font-bold text-base-content">Chatify</h1>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-xl hover:bg-base-300 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-base-content" />
              ) : (
                <Menu className="w-6 h-6 text-base-content" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-base-100 border-b border-base-300 shadow-lg backdrop-blur-lg">
            <div className="container mx-auto px-4 py-4 space-y-2">
              <Link
                to="/settings"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-base-200 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Settings className="w-5 h-5 text-primary" />
                <span className="font-medium">Settings</span>
              </Link>

              {authUser && (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-base-200 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5 text-secondary" />
                    <span className="font-medium">Profile</span>
                  </Link>

                  {/* Mobile User Info */}
                  <div className="flex items-center gap-3 p-3 bg-base-200 rounded-xl">
                    <div className="avatar">
                      <div className="w-8 h-8 rounded-full">
                        <img src={authUser.profilePic || "/avatar.png"} alt={authUser.fullName} />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{authUser.fullName}</p>
                      <p className="text-xs text-success">Online</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-error/10 transition-colors w-full text-error"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;