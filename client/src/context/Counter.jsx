import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";

export const CounterContext = createContext(null);

export const CounterProvider = (props) => {
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [selectedChat, setSelectedChat] = useState("");

  const navigate = useNavigate();

  return (
    <CounterContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        userId,
        setUserId,
        displayName,
        setDisplayName,
        userEmail,
        setUserEmail,
      }}
    >
      {props.children}
    </CounterContext.Provider>
  );
};

export const chatState = () => {
  return useContext(CounterContext);
};
