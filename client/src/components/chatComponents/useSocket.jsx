import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { chatState } from "../../context/Counter";

const ENDPOINT = "https://socket-io-mern-chat-app-kkx6.vercel.app";

// https://socket-io-mern-chat-app-kkx6-3wxwssob8-yashs-projects-98b2c247.vercel.app
// https://socketio-mern-chatapp.onrender.com
// https://socket-io-mern-chat-app-kkx6.vercel.app

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
      console.log("got a message yes");
      console.log(newMessageReceived);

      setChats((prevChats) => {
        const chatIndex = prevChats.findIndex(
          (chat) => chat._id === newMessageReceived.chat._id
        );
        console.log("chat index is", chatIndex);

        if (chatIndex !== -1) {
          // Chat exists, update it
          const updatedChats = [...prevChats];
          updatedChats[chatIndex] = {
            ...updatedChats[chatIndex],
            latestMessage: newMessageReceived,
          };

          // Sort chats
          updatedChats.sort((a, b) => {
            const aDate = new Date(a.latestMessage?.createdAt || a.updatedAt);
            const bDate = new Date(b.latestMessage?.createdAt || b.updatedAt);
            return bDate - aDate;
          });

          return updatedChats;
        } else {
          // Chat doesn't exist locally, fetch all chats
          const fetchChats = async () => {
            try {
              console.log(
                "Fetching all chats as the received message's chat is not in the local state"
              );
              const { data } = await axios.get(`/api/chats/${user._id}`);
              setChats(data);
            } catch (error) {
              console.error("Error fetching chats:", error);
            }
          };
          fetchChats();

          // Return the current state while the fetch is in progress
          return prevChats;
        }
      });
    });

    newSocket.on("typing", (room) => {
      console.log("User is typing");
      setTypingUsers(true);
    });

    newSocket.on("stop typing", (room) => {
      console.log("User stopped typing");
      setTypingUsers(false);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [setMessages, setChats, setTypingUsers, user._id]);

  return socket;
};

export default useSocket;
