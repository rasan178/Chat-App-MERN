import { Send, MessageCircle, Users, Sparkles } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const NoChatSelected = () => {
  const { theme } = useThemeStore();

  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-gradient-to-br from-base-100 via-base-100/80 to-base-200/50 relative overflow-hidden" data-theme={theme}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-48 h-48 bg-accent/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-lg text-center space-y-8 relative z-10">
        {/* Enhanced Icon Display */}
        <div className="flex justify-center items-center gap-6 mb-8">
          {/* Main icon */}
          <div className="relative group">
            <div className="absolute inset-0 w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-primary/80 blur-md opacity-50 group-hover:opacity-75 animate-pulse transition-opacity duration-300"></div>
            <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg shadow-primary/25">
              <Send className="w-10 h-10 text-white animate-bounce" />
            </div>
            {/* Floating sparkles */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-secondary rounded-full animate-ping"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-accent rounded-full animate-pulse delay-300"></div>
          </div>

          {/* Supporting icons */}
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center animate-float">
              <MessageCircle className="w-6 h-6 text-secondary" />
            </div>
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center animate-float-delayed">
              <Users className="w-6 h-6 text-accent" />
            </div>
          </div>
        </div>

        {/* Enhanced Welcome Text */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Welcome to Chatify!
            </h2>
            <Sparkles className="w-6 h-6 text-accent animate-pulse delay-500" />
          </div>
          
          <div className="w-32 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto animate-pulse"></div>
          
          <p className="text-base-content/70 text-lg leading-relaxed max-w-md mx-auto">
            Select a conversation from the sidebar to start chatting and connect with your friends
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px); 
          }
          50% { 
            transform: translateY(-10px); 
          }
        }
        
        @keyframes float-delayed {
          0%, 100% { 
            transform: translateY(0px); 
          }
          50% { 
            transform: translateY(-8px); 
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite 1.5s;
        }
      `}</style>
    </div>
  );
};

export default NoChatSelected;