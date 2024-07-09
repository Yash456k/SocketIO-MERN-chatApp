import React, { useEffect } from "react";
import Message from "./Message";
import { chatState } from "../../context/Counter";
import axios from "axios";
import { User, MessageSquare } from "lucide-react";
import { getSender } from "../../config/utility";

function MessageList({ messages, setMessages, user, messagesEndRef, socket }) {
  const { selectedChat } = chatState();

  useEffect(() => {
    if (selectedChat && selectedChat._id) {
      const fetchChatData = async () => {
        try {
          const { data } = await axios.get(`/api/messages/${selectedChat._id}`);

          console.log("message data sent is", data);
          setMessages(data);
          if (socket) {
            socket.emit("join chat", selectedChat._id);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchChatData();
    }
  }, [selectedChat, setMessages, socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, messagesEndRef]);

  if (!selectedChat) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full bg-[#F1F8E9] text-teal-600">
        <MessageSquare size={64} className="mb-4 text-emerald-600" />
        <h2 className="text-3xl font-bold mb-2">Welcome to Your Chat!</h2>
        <p className="text-xl text-center max-w-md">
          Select a conversation or search for a new chat to begin your journey
          of connection.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full overflow-hidden from-[#F1F8E9] bg-gradient-to-tr to-[#F1F8E9]">
      <div className="bg-[#4CAF50] p-4 flex items-center justify-center md:justify-start">
        <User className="text-white mr-3" size={28} />
        <h2 className="text-2xl font-semibold text-white">
          {getSender(user, selectedChat.users)}
        </h2>
      </div>
      <ul className="p-3 mb-2 h-full w-full overflow-y-scroll flex flex-col space-y-2 hide-scrollbar">
        {" "}
        {/* Added pl-4 */}
        {messages.map((msg, index) => {
          const isCurrentUser = msg.sender._id === user._id;
          const prevUserId = index > 0 ? messages[index - 1].sender._id : null;
          const showUsername = !prevUserId || prevUserId !== msg.sender._id;

          return (
            <Message
              key={msg._id}
              msg={msg}
              user={user}
              isCurrentUser={isCurrentUser}
              showUsername={showUsername}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </ul>
    </div>
  );
}

export default MessageList;
