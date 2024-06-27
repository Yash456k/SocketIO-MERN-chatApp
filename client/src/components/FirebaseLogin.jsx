import React, { useState, useEffect, useContext } from "react";
import { auth } from "../config/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithCredential,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { chatState } from "../context/Counter";
import { useNavigate } from "react-router";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const FirebaseLogin = () => {
  const { setUser } = chatState();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    console.log("user from firebaselogin under useEffect", user);
    if (user) navigate("/chat");
  }, []);

  const googleLoginSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log(decoded);

    const credential = GoogleAuthProvider.credential(
      credentialResponse.credential
    );

    try {
      const userCredential = await signInWithCredential(auth, credential);
      console.log("User signed in with Google:", userCredential);

      const response = await axios.post("/api/users/login", {
        userEmail: decoded.email,
      });

      if (response.data === "no user") {
        const createUserResponse = await axios.post("/api/users", {
          userEmail: decoded.email,
          name: decoded.name,
          isAdmin: false,
        });

        const userData = {
          _id: createUserResponse.data._id,
          displayName: createUserResponse.data.displayName,
          email: createUserResponse.data.email,
          token: createUserResponse.data.token,
        };

        localStorage.setItem("userInfo", JSON.stringify(userData));
        setUser(userData);
      } else {
        const userData = {
          _id: response.data._id,
          displayName: response.data.displayName,
          email: response.data.email,
          token: response.data.token,
        };

        localStorage.setItem("userInfo", JSON.stringify(userData));
        setUser(userData);
      }
      navigate("/chat");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post("/api/users", {
        userEmail: email,
        name: name,
        isAdmin: false,
      });

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });

      const userData = {
        _id: response.data._id,
        displayName: name,
        email: email,
        token: response.data.token,
      };

      localStorage.setItem("userInfo", JSON.stringify(userData));
      setUser(userData);

      navigate("/chat");
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/users/login", {
        userEmail: emailLogin,
      });

      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailLogin,
        passwordLogin
      );
      const user = userCredential.user;

      const userData = {
        _id: response.data._id,
        displayName: response.data.displayName,
        email: response.data.email,
        token: response.data.token,
      };

      localStorage.setItem("userInfo", JSON.stringify(userData));
      setUser(userData);

      navigate("/chat");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const toggleLoginSignup = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setIsTransitioning(false);
    }, 300);
  };

  const gradientClass = isLogin
    ? "bg-gradient-to-br from-cyan-600 to-emerald-600"
    : "bg-gradient-to-br to-violet-500 from-green-600";

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${gradientClass} p-4 transition-all duration-500 ease-in-out`}
    >
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        <div
          className={`transition-all duration-300 ease-in-out ${
            isTransitioning
              ? "opacity-0 transform translate-x-full"
              : "opacity-100 transform translate-x-0"
          }`}
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-4 animate-fade-in">
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
                  required
                />
              </div>
            )}
            <div className="mb-4 animate-fade-in">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={isLogin ? emailLogin : email}
                onChange={(e) =>
                  isLogin
                    ? setEmailLogin(e.target.value)
                    : setEmail(e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
                required
              />
            </div>
            <div className="mb-6 animate-fade-in">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={isLogin ? passwordLogin : password}
                onChange={(e) =>
                  isLogin
                    ? setPasswordLogin(e.target.value)
                    : setPassword(e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
          <div className="mt-4 text-center">
            <button
              onClick={toggleLoginSignup}
              className="text-cyan-600 hover:underline transition-all duration-300"
            >
              {isLogin
                ? "Need an account? Sign Up"
                : "Already have an account? Login"}
            </button>
          </div>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <GoogleLogin
                onSuccess={googleLoginSuccess}
                onError={() => {
                  console.log("Login Failed");
                }}
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300"
                  >
                    <img
                      className="h-5 w-5 mr-2"
                      src="/api/placeholder/20/20"
                      alt="Google logo"
                    />
                    <span>Continue with Google</span>
                  </button>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirebaseLogin;
