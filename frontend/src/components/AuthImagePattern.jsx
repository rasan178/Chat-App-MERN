const AuthImagePattern = ({ title, subtitle }) => {
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

  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {imageUrls.map((url, i) => (
            <div key={i} className="aspect-square rounded-2xl overflow-hidden">
              <img
                src={url}
                alt={`Grid item ${i + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
