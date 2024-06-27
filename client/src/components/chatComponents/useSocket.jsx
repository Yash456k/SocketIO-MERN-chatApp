import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { chatState } from "../../context/Counter";

const ENDPOINT = "http://localhost:4000";

const useSocket = (setMessages, setSocketId) => {
  const [socket, setSocket] = useState(null);
  const { user } = chatState();

  useEffect(() => {
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      setSocketId(newSocket.id);
    });

    newSocket.on("message-from-server", (data) => {
      console.log("message from server =", data);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return socket;
};

export default useSocket;
