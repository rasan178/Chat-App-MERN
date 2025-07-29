import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, Send, ArrowRight } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [focusedField, setFocusedField] = useState(null);
  const { login, isLoggingIn } = useAuthStore();
  const { theme } = useThemeStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  const isFormValid = formData.email.trim() && formData.password.trim();

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-base-100 to-base-200 lg:pl-20 xl:pl-64" data-theme={theme}>
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-8 -right-8 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="w-full max-w-md space-y-8 relative z-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="relative">
                <div
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300"
                >
                  <Send className="w-8 h-8 text-white" />
                </div>
                <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              </div>
              <div className="mt-4 space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Welcome Back
                </h1>
                <p className="text-base-content/60 text-lg">Sign in to your account</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base">Email</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Mail className={`h-5 w-5 transition-colors duration-200 ${
                    focusedField === 'email' ? 'text-primary' : 'text-base-content/40'
                  }`} />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10 pr-4 h-12 transition-all duration-200 focus:scale-[1.02] focus:shadow-lg ${
                    focusedField === 'email' 
                      ? 'border-primary focus:border-primary' 
                      : 'border-base-300 hover:border-base-400'
                  }`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />
                <div className={`absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 transition-opacity duration-200 pointer-events-none ${
                  focusedField === 'email' ? 'opacity-100' : ''
                }`}></div>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base">Password</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Lock className={`h-5 w-5 transition-colors duration-200 ${
                    focusedField === 'password' ? 'text-primary' : 'text-base-content/40'
                  }`} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10 pr-12 h-12 transition-all duration-200 focus:scale-[1.02] focus:shadow-lg ${
                    focusedField === 'password' 
                      ? 'border-primary focus:border-primary' 
                      : 'border-base-300 hover:border-base-400'
                  }`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center z-10 hover:scale-110 transition-transform duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40 hover:text-base-content/60" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40 hover:text-base-content/60" />
                  )}
                </button>
                <div className={`absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 transition-opacity duration-200 pointer-events-none ${
                  focusedField === 'password' ? 'opacity-100' : ''
                }`}></div>
              </div>
            </div>

            <button 
              type="submit" 
              className={`btn w-full h-12 text-base font-semibold transition-all duration-300 group ${
                isFormValid 
                  ? 'btn-primary hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/25' 
                  : 'btn-disabled'
              }`} 
              disabled={isLoggingIn || !isFormValid}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign in</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-base-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-base-100 text-base-content/60">New to our platform?</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-base-content/60 mb-4">
              Don't have an account yet?
            </p>
            <Link 
              to="/signup" 
              className="btn btn-outline btn-primary w-full h-12 text-base font-semibold hover:scale-[1.02] transition-all duration-300 group"
            >
              <span>Create account</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={"Welcome back!"}
        subtitle={"Sign in to continue your conversations and catch up with your messages."}
      />
    </div>
  );
};

export default LoginPage;
