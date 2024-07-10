import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { chatState } from "../../context/Counter";

const ENDPOINT = "https://socketio-mern-chatapp.onrender.com";

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
          const updatedChats = prevChats.map((chat) =>
            chat._id === newMessageReceived.chat._id
              ? { ...chat, latestMessage: newMessageReceived }
              : chat
          );

          // Sort chats so that the one with the latest message is on top
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

          return [
            ...prevChats,
            {
              _id: newMessageReceived.chat._id,
              latestMessage: newMessageReceived,
              users: [user, newMessageReceived.sender],
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
