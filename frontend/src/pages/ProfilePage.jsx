import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, Shield, Settings, Edit3 } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 pt-20">
      <div className="max-w-4xl mx-auto p-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-primary/10 backdrop-blur-sm px-6 py-3 rounded-full border border-primary/20 shadow-lg">
            <User className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              My Profile
            </h1>
          </div>
          <p className="mt-4 text-base-content/70 text-lg">Manage your account settings and preferences</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-base-100/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-base-300/50 hover:shadow-2xl transition-all duration-300">
              {/* Avatar Section */}
              <div className="flex flex-col items-center gap-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-base-100 rounded-full p-1">
                      <img
                        src={selectedImg || authUser.profilePic || "/avatar.png"}
                        alt="Profile"
                        className="size-32 rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <img
                    src={selectedImg || authUser.profilePic || "/avatar.png"}
                    alt="Profile"
                    className="size-32 rounded-full object-cover border-4 border-base-300 group-hover:opacity-0 transition-all duration-300 shadow-lg"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className={`
                      absolute -bottom-2 -right-2 
                      bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary
                      p-3 rounded-full cursor-pointer 
                      transition-all duration-300 shadow-lg hover:shadow-xl
                      transform hover:scale-110 active:scale-95
                      ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                    `}
                  >
                    <Camera className="w-5 h-5 text-white" />
                    <input
                      type="file"
                      id="avatar-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUpdatingProfile}
                    />
                  </label>
                </div>
                
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-base-content mb-2">{authUser?.fullName}</h2>
                  <div className="flex items-center justify-center gap-2 text-base-content/70">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Active</span>
                  </div>
                  <p className="text-sm text-base-content/60 mt-3 px-4 py-2 bg-base-200/50 rounded-full border border-base-300/50">
                    {isUpdatingProfile ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        Updating...
                      </span>
                    ) : (
                      "Click camera to update photo"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Information Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-base-100/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-base-300/50 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Edit3 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-base-content">Personal Information</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors duration-200">
                      <User className="w-4 h-4 text-blue-500" />
                    </div>
                    <label className="text-sm font-medium text-base-content/70">Full Name</label>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={authUser?.fullName}
                      readOnly
                      className="w-full px-4 py-3 bg-base-200/50 border border-base-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-200 hover:bg-base-200/70"
                    />
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors duration-200">
                      <Mail className="w-4 h-4 text-green-500" />
                    </div>
                    <label className="text-sm font-medium text-base-content/70">Email Address</label>
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      value={authUser?.email}
                      readOnly
                      className="w-full px-4 py-3 bg-base-200/50 border border-base-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-200 hover:bg-base-200/70"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="bg-base-100/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-base-300/50 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-secondary/10 rounded-xl">
                  <Shield className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-base-content">Account Information</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-base-200/50 to-base-300/30 rounded-xl border border-base-300/50 hover:from-base-200/70 hover:to-base-300/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                      <Calendar className="w-5 h-5 text-purple-500" />
                    </div>
                    <span className="text-sm font-medium text-base-content/70">Member Since</span>
                  </div>
                  <p className="text-lg font-semibold text-base-content">
                    {new Date(authUser.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20 hover:from-green-500/20 hover:to-emerald-500/20 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <Shield className="w-5 h-5 text-green-500" />
                    </div>
                    <span className="text-sm font-medium text-base-content/70">Account Status</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                    <p className="text-lg font-semibold text-green-500">Active</p>
                  </div>
                </div>
              </div>
            </div>
             </div>
            </div>
          </div>
        </div>
  );
};

export default ProfilePage;