import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";

export const CounterContext = createContext(null);

export const CounterProvider = (props) => {
  const [user, setUser] = useState("");

  const [selectedChat, setSelectedChat] = useState("");

  return (
    <CounterContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
      }}
    >
      {props.children}
    </CounterContext.Provider>
  );
};

export const chatState = () => {
  return useContext(CounterContext);
};
