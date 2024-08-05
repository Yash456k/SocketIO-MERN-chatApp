import React, { useEffect, useState, useCallback } from "react";
import Message from "./Message";
import { chatState } from "../../context/Counter";
import axios from "axios";
import { User, Users, MessageSquare, Loader } from "lucide-react";
import { getSender } from "../../config/utility";

const RenderHeader = ({ isAi, selectedChat, user, aiConversation }) => (
  <div className="bg-[#4CAF50] p-4 flex items-center justify-center md:justify-start">
    {isAi ? (
      <div className="flex flex-row">
        <svg
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="32"
        >
          <path
            d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z"
            fill="url(#prefix__paint0_radial_980_20147)"
          />
          <defs>
            <radialGradient
              id="prefix__paint0_radial_980_20147"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)"
            >
              <stop offset=".067" stop-color="#9168C0" />
              <stop offset=".343" stop-color="#5684D1" />
              <stop offset=".672" stop-color="#1BA1E3" />
            </radialGradient>
          </defs>
        </svg>
        <h2 className="text-2xl font-semibold text-white"> Google Gemini</h2>
      </div>
    ) : (
      <>
        {selectedChat.isGroupChat ? (
          <Users className="text-white mr-3" size={28} />
        ) : (
          <User className="text-white mr-3" size={28} />
        )}
        <h2 className="text-2xl font-semibold text-white">
          {getSender(user, selectedChat)}
        </h2>
      </>
    )}
  </div>
);

const RenderMessages = ({
  messages,
  user,
  messagesEndRef,
  isAi,
  aiConversation,
}) => {
  const messageList = isAi ? aiConversation : messages;

  return (
    <ul className="p-3 mb-2 h-full w-full overflow-y-scroll flex flex-col space-y-2 hide-scrollbar">
      {!messageList.length && (
        <div className="flex flex-col items-center justify-center h-full w-full text-center">
          {isAi ? (
            <>
              <p className="text-xl text-gray-700 mb-2">
                Start chatting with Google Gemini! It can keep track of your
                conversation and provide insightful responses.
              </p>
              <p className="text-md text-gray-500">
                Ask anything and get ready for an engaging interaction.
              </p>
            </>
          ) : (
            <p className="text-xl text-gray-700">
              No messages yet. Start the conversation now!
            </p>
          )}
        </div>
      )}
      {messageList.length > 0 &&
        messageList.map((msg, index) => {
          const isCurrentUser = msg.sender._id === user._id;
          const prevUserId =
            index > 0 ? messageList[index - 1].sender._id : null;
          const showUsername = !prevUserId || prevUserId !== msg.sender._id;
          const createdAt = new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });

          return (
            <Message
              key={msg._id}
              msg={msg}
              user={user}
              isCurrentUser={isCurrentUser}
              showUsername={showUsername}
              createdAt={createdAt}
            />
          );
        })}
      <div ref={messagesEndRef} />
    </ul>
  );
};

const MessageList = ({
  messages,
  setMessages,
  user,
  messagesEndRef,
  socket,
  isAi,
  aiConversation,
}) => {
  const [messageLoading, setMessageLoading] = useState(false);
  const { selectedChat } = chatState();

  const fetchChatData = useCallback(async () => {
    if (selectedChat && selectedChat._id && !isAi) {
      try {
        setMessageLoading(true);
        const { data } = await axios.get(`/api/messages/${selectedChat._id}`);
        setMessageLoading(false);
        console.log("message data sent is", data);
        setMessages(data);
        if (socket) {
          socket.emit("join chat", selectedChat._id);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [selectedChat, setMessages, socket, isAi]);

  useEffect(() => {
    fetchChatData();
  }, [fetchChatData]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, aiConversation, messagesEndRef]);

  if (!selectedChat && !isAi) {
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
      <RenderHeader
        isAi={isAi}
        selectedChat={selectedChat}
        user={user}
        aiConversation={aiConversation}
      />
      {messageLoading ? (
        <Loader
          className="h-full animate-spin mx-auto mb-4 place-items-center"
          size={50}
        />
      ) : (
        <RenderMessages
          messages={messages}
          user={user}
          messagesEndRef={messagesEndRef}
          isAi={isAi}
          aiConversation={aiConversation}
        />
      )}
    </div>
  );
};

export default React.memo(MessageList);
