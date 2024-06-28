import React, { useState, useEffect } from "react";
import { MessageSquare, ArrowRight, X, Loader } from "lucide-react";
import { useNavigate } from "react-router";
import axios from "axios";

const CustomAlert = ({ message, onClose }) => (
  <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-4 rounded-md shadow-lg flex items-center">
    <p>{message}</p>
    <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
      <X size={18} />
    </button>
  </div>
);

const CustomAlertYes = ({ message, onClose }) => (
  <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-md shadow-lg flex items-center">
    <p>{message}</p>
    <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
      <X size={18} />
    </button>
  </div>
);

const ChatAppFrontPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isServerActive, setIsServerActive] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertYes, setShowAlertYes] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(checkServerStatus, 5000);
    checkServerStatus();

    return () => clearInterval(interval);
  }, []);

  const checkServerStatus = async () => {
    try {
      const response = await axios.get("/api/checkIfActive");
      setIsServerActive(true);
      setLoading(false);
    } catch (error) {
      console.error("Server is not active:", error);
      setIsServerActive(false);
    }
  };

  useEffect(() => {
    if (isServerActive) {
      setShowAlertYes(true);
      setShowAlert(false);
    }
  }, [isServerActive]);

  const handleRedirect = () => {
    checkServerStatus();
    if (isServerActive) {
      navigate("/login");
    } else {
      setShowAlert(true);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
    setShowAlertYes(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-800 to-black flex flex-col items-center justify-center text-emerald-100 p-4">
      <nav className="absolute top-0 right-0 m-4">
        <button
          onClick={handleRedirect}
          className={`bg-emerald-500 text-black px-4 py-2 rounded-full font-semibold transition-all duration-300 flex items-center hover:bg-black hover:text-emerald-500 border border-emerald-500 ${
            !isServerActive && "opacity-50 "
          }`}
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
        {loading ? (
          <div className="text-center">
            <Loader className="animate-spin mx-auto mb-4" size={40} />
            <h1 className="text-3xl font-bold mb-4 text-center text-white">
              Please wait... The server is starting up
            </h1>
            <p className="text-emerald-200">This might take up to a minute</p>
          </div>
        ) : (
          <>
            <h1 className="text-5xl font-bold mb-4 text-center text-emerald-300">
              Welcome to Yash's ChatApp
            </h1>
            <p className="text-xl mb-8 text-center text-emerald-200">
              Connect with friends and family instantly. Start chatting now!
            </p>
            <button
              onClick={handleRedirect}
              className={`bg-emerald-500 text-black px-8 py-3 rounded-full font-semibold text-lg max-w-xs transition-all duration-300 transform hover:scale-105 hover:bg-black hover:text-emerald-500 border border-emerald-500 ${
                !isServerActive && "opacity-50 cursor-not-allowed"
              }`}
              disabled={!isServerActive}
            >
              Get Started
            </button>
          </>
        )}
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex justify-between text-sm text-emerald-300">
        <span>© 2024 ChatApp</span>
        <span>Privacy Policy | Terms of Service</span>
      </div>

      {showAlert && (
        <CustomAlert
          message="The server will be ready in a minute. Please wait and try again."
          onClose={closeAlert}
        />
      )}

      {showAlertYes && (
        <CustomAlertYes
          message="The server is ready! Press the buttons to proceed."
          onClose={closeAlert}
        />
      )}
    </div>
  );
};

export default ChatAppFrontPage;
