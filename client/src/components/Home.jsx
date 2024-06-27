import React, { useState, useEffect } from "react";
import { MessageSquare, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

const ChatAppFrontPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-800 to-black flex flex-col items-center justify-center text-emerald-100 p-4">
      <nav className="absolute top-0 right-0 m-4">
        <button
          onClick={handleRedirect}
          className="bg-emerald-500 text-black px-4 py-2 rounded-full font-semibold transition-all duration-300 flex items-center hover:bg-black hover:text-emerald-500 border border-emerald-500"
        >
          Go to ChatApp
          <ArrowRight className="ml-2" size={18} />
        </button>
      </nav>

      <div
        className={`flex flex-col items-center justify-center transform transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <MessageSquare
          size={80}
          className="mx-auto mb-8 animate-bounce text-emerald-400"
        />
        <h1 className="text-5xl font-bold mb-4 text-center text-emerald-300">
          Welcome to Yash's ChatApp
        </h1>
        <p className="text-xl mb-8 text-center text-emerald-200">
          Connect with friends and family instantly. Start chatting now!
        </p>
        <button
          onClick={handleRedirect}
          className="bg-emerald-500 text-black px-8 py-3 rounded-full font-semibold text-lg max-w-xs transition-all duration-300 transform hover:scale-105 hover:bg-black hover:text-emerald-500 border border-emerald-500"
        >
          Get Started
        </button>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex justify-between text-sm text-emerald-300">
        <span>© 2024 ChatApp</span>
        <span>Privacy Policy | Terms of Service</span>
      </div>
    </div>
  );
};

export default ChatAppFrontPage;
