import { useState, useEffect } from 'react';
import { useThemeStore } from "../store/useThemeStore";

const AuthImagePattern = ({ title, subtitle }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [animationDelay, setAnimationDelay] = useState(0);
  const { theme } = useThemeStore();

  const imageUrls = [
    'https://static.vecteezy.com/system/resources/thumbnails/008/296/859/small_2x/concept-illustration-of-man-and-woman-friends-having-online-conversation-messaging-chatting-communication-texting-messages-in-mobile-phone-apps-flat-cartoon-style-free-vector.jpg',
    'https://www.shutterstock.com/image-vector/chat-messages-smartphone-sms-on-600nw-1744210046.jpg',
    'https://png.pngtree.com/png-clipart/20200224/original/pngtree-online-chatting-app-concept-flat-vector-illustration-png-image_5221681.jpg',
    'https://thumbs.dreamstime.com/b/messaging-application-abstract-concept-vector-illustration-texting-desktop-mobile-phone-chat-app-soft-social-media-messenger-video-194533543.jpg',
    'https://static.vecteezy.com/system/resources/previews/041/453/528/non_2x/boy-and-girl-chatting-on-mobile-man-woman-couple-chatting-on-mobile-phone-messaging-using-chat-app-or-social-network-two-persons-cellphone-conversation-sending-messages-illustration-vector.jpg',
    'https://static.vecteezy.com/system/resources/previews/001/895/663/non_2x/chat-app-design-ui-free-vector.jpg',
    'https://png.pngtree.com/png-clipart/20230925/original/pngtree-mobile-chat-icon-in-comic-style-with-message-notifications-vector-png-image_12860687.png',
    'https://static.vecteezy.com/system/resources/previews/008/149/606/non_2x/people-chatting-on-smartphone-application-vector.jpg',
    'https://img.freepik.com/premium-vector/illustrative-vector-app-development-editable-design_203633-1580.jpg',
  ];

  // Create continuous looping animations
  useEffect(() => {
    // Start continuous animation loop
    setAnimationDelay(0);
  }, []);

  const getImageClassName = (index) => {
    const baseClasses = "object-cover w-full h-full transition-all duration-500 ease-out transform";
    const hoverClasses = hoveredIndex === index 
      ? "scale-110 brightness-110" 
      : hoveredIndex !== null 
        ? "scale-95 brightness-75" 
        : "scale-100 brightness-100";
    
    return `${baseClasses} ${hoverClasses}`;
  };

  const getContainerClassName = (index) => {
    const baseClasses = "aspect-square rounded-2xl overflow-hidden relative group cursor-pointer transform transition-all duration-500";
    const animationClasses = `animate-float-up animate-infinite`;
    
    return `${baseClasses} ${animationClasses}`;
  };

  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-base-200 via-base-300 to-base-200 p-12 relative overflow-hidden" data-theme={theme}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/3 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-lg text-center relative z-10">
        {/* Enhanced image grid with animations */}
        <div className="grid grid-cols-3 gap-4 mb-12 perspective-1000">
          {imageUrls.map((url, i) => (
            <div
              key={i}
              className={getContainerClassName(i)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                animationDelay: `${i * 0.2}s`,
                transform: hoveredIndex === i ? 'translateZ(20px) rotateY(5deg)' : 'translateZ(0px) rotateY(0deg)'
              }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700 z-20"></div>
              
              <img
                src={url}
                alt={`Chat illustration ${i + 1}`}
                className={getImageClassName(i)}
                loading="lazy"
              />
              
              {/* Floating badge for center image */}
              {i === 4 && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center transform group-hover:scale-125 transition-transform duration-300 z-30">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Enhanced text section */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
              {title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
          </div>
          
          <p className="text-base-content/70 text-lg leading-relaxed max-w-md mx-auto">
            {subtitle}
          </p>

          {/* Feature highlights */}
          <div className="flex justify-center items-center space-x-8 mt-8 opacity-60">
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.4;
          }
          25% { 
            transform: translateY(-15px) rotate(2deg); 
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-25px) rotate(0deg); 
            opacity: 0.3;
          }
          75% { 
            transform: translateY(-10px) rotate(-2deg); 
            opacity: 0.5;
          }
        }
        
        @keyframes float-delayed {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.3;
          }
          33% { 
            transform: translateY(-20px) rotate(-3deg); 
            opacity: 0.5;
          }
          66% { 
            transform: translateY(-10px) rotate(2deg); 
            opacity: 0.2;
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% { 
            opacity: 0.2; 
            transform: scale(1);
          }
          50% { 
            opacity: 0.4; 
            transform: scale(1.05);
          }
        }
        
        @keyframes float-up {
          0%, 100% { 
            transform: translateY(0px) scale(1); 
          }
          25% { 
            transform: translateY(-3px) scale(1.02); 
          }
          50% { 
            transform: translateY(-6px) scale(1); 
          }
          75% { 
            transform: translateY(-2px) scale(0.98); 
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        
        .animate-float-up {
          animation: float-up 4s ease-in-out infinite;
        }
        
        .animate-infinite {
          animation-iteration-count: infinite;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default AuthImagePattern;