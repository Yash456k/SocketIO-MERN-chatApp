import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { chatState } from "../../context/Counter";

const ENDPOINT = "http://localhost:4000";

const useSocket = (setMessages, setChats, setSocketId) => {
  const [socket, setSocket] = useState(null);
  const { user } = chatState();

  useEffect(() => {
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      setSocketId(newSocket.id);
    });

    newSocket.on("message received", (newMessageRecieved) => {
      setMessages((prevMessages) => [...prevMessages, newMessageRecieved]);

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat._id === newMessageRecieved.chat._id
            ? { ...chat, latestMessage: newMessageRecieved }
            : chat
        )
      );
    });

    return () => {
      newSocket.disconnect();
    };
  }, [setMessages, setChats, setSocketId]);

  return socket;
};

export default useSocket;
