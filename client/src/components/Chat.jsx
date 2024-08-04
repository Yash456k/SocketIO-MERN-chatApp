import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { chatState } from "../context/Counter";
import MessageList from "./chatComponents/MessageList";
import MessageInput from "./chatComponents/MessageInput";
import Sidebar from "./Sidebar";
import useSocket from "./chatComponents/useSocket";
import axios from "axios";

function Chat() {
  const { user, setUser, selectedChat } = chatState();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chats, setChats] = useState([]);
  const [typingUsers, setTypingUsers] = useState(false);
  const [chatsLoading, setChatsLoading] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);

  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const socket = useSocket(setMessages, setChats, setTypingUsers);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setUser(userInfo);
    }
  }, [setUser]);

  useEffect(() => {
    if (user && user._id) {
      const fetchChatData = async () => {
        try {
          setChatsLoading(true);
          const { data } = await axios.get(`/api/chats/${user._id}`);
          setChatsLoading(false);
          setChats(data);
          console.log("chats are", chats);
        } catch (error) {
          console.error(error);
        }
      };
      fetchChatData();
    }
  }, [user]);

  useEffect(() => {
    if (socket) socket.emit("setup", user);
  }, [socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() && socket && selectedChat && user) {
      const messageData = {
        senderId: user._id,
        chatId: selectedChat._id,
        content: input,
      };

      try {
        setInput("");
        setSendingMessage(true);
        const { data } = await axios.post("/api/messages", messageData);
        console.log("data of message sent is", data);
        const receiverId = data.chat.users.find((id) => id !== user._id);

        socket.emit("new message", data, receiverId);
        setMessages((prevMessages) => [
          ...prevMessages,
          { ...data, sender: { _id: user._id } },
        ]);

        setChats((prevChats) => {
          const updatedChats = prevChats.map((chat) =>
            chat._id === selectedChat._id
              ? { ...chat, latestMessage: data }
              : chat
          );
          setSendingMessage(false);

          updatedChats.sort((a, b) => {
            const aDate = new Date(a.latestMessage?.createdAt || a.updatedAt);
            const bDate = new Date(b.latestMessage?.createdAt || b.updatedAt);
            return bDate - aDate;
          });

          return updatedChats;
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="flex h-dvh justify-center items-center p-4 bg-[#8BC34A]">
      <Sidebar chats={chats} setChats={setChats} chatsLoading={chatsLoading} />
      <div className="bg-[#F1F8E9] h-full flex flex-col items-center justify-center w-full z-0">
        <MessageList
          messages={messages}
          user={user}
          messagesEndRef={messagesEndRef}
          setMessages={setMessages}
          socket={socket}
        />
        {selectedChat && typingUsers && (
          <div className="typing-indicator">
            <p>Other user is typing...</p>
          </div>
        )}
        <MessageInput
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          socket={socket}
          selectedChat={selectedChat}
          sendingMessage={sendingMessage}
        />
        <p className="p-2 text-gray-400 md:hidden">
          Made by{" "}
          <a
            href="https://www.linkedin.com/in/yash-khambhatta/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            yash Khambhatta
          </a>
        </p>
      </div>
    </div>
  );
}

export default Chat;
