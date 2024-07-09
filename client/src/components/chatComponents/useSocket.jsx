import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { chatState } from "../../context/Counter";

const ENDPOINT = "http://localhost:4000";

//http://localhost:4000
//https://socketio-mern-chatapp.onrender.com

const useSocket = (setMessages, setChats, setSocketId) => {
  const [socket, setSocket] = useState(null);
  const { user } = chatState();

  useEffect(() => {
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      setSocketId(newSocket.id);
    });

    newSocket.on("message received", async (newMessageReceived) => {
      setMessages((prevMessages) => [...prevMessages, newMessageReceived]);

      setChats((prevChats) => {
        const chatExists = prevChats.some(
          (chat) => chat._id === newMessageReceived.chat._id
        );

        if (chatExists) {
          return prevChats.map((chat) =>
            chat._id === newMessageReceived.chat._id
              ? { ...chat, latestMessage: newMessageReceived }
              : chat
          );
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

          return [
            ...prevChats,
            {
              _id: newMessageReceived.chat._id,
              latestMessage: newMessageReceived,
              users: [user, newMessageReceived.sender], // Assuming new chat users
            },
          ];
        }
      });
    });

    return () => {
      newSocket.disconnect();
    };
  }, [setMessages, setChats, setSocketId]);

  return socket;
};

export default useSocket;
