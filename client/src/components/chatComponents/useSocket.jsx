import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { chatState } from "../../context/Counter";

const ENDPOINT = import.meta.env.VITE_BACKEND_URL;


const useSocket = (setMessages, setChats, setTypingUsers) => {
  const [socket, setSocket] = useState(null);
  const { user } = chatState();

  useEffect(() => {
    const newSocket = io(ENDPOINT, {
      transports: ["websocket", "polling"],
    });
    setSocket(newSocket);

    newSocket.on("message received", async (newMessageReceived) => {
      setMessages((prevMessages) => [...prevMessages, newMessageReceived]);

      setChats((prevChats) => {
        const chatIndex = prevChats.findIndex(
          (chat) => chat._id === newMessageReceived.chat._id
        );

        if (chatIndex !== -1) {
          const updatedChats = [...prevChats];
          updatedChats[chatIndex] = {
            ...updatedChats[chatIndex],
            latestMessage: newMessageReceived,
          };

          updatedChats.sort((a, b) => {
            const aDate = new Date(a.latestMessage?.createdAt || a.updatedAt);
            const bDate = new Date(b.latestMessage?.createdAt || b.updatedAt);
            return bDate - aDate;
          });

          return updatedChats;
        } else {
          const fetchChats = async () => {
            try {
              const { data } = await axios.get(`/api/chats/${user._id}`);
              setChats(data);
            } catch (error) {
              console.error("Error fetching chats:", error);
            }
          };
          fetchChats();

          return prevChats;
        }
      });
    });

    newSocket.on("typing", (room) => {
      setTypingUsers(true);
    });

    newSocket.on("stop typing", (room) => {
      setTypingUsers(false);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [setMessages, setChats, setTypingUsers, user._id]);

  return socket;
};

export default useSocket;
