import React, { useState, useEffect } from "react";
import { chatState } from "../context/Counter";
import SearchBar from "./SearchBar";
import { getSender } from "../config/utility";

const Sidebar = ({ chats, setChats }) => {
  const { setSelectedChat, selectedChat, user } = chatState();
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    console.log("these are chats from sidebar", chats);
  }, [chats]);

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
    console.log("selected Chat changed:", chat);
  };

  return (
    <>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="bg-teal-600 hover:bg-teal-700 text-white p-2 rounded md:hidden absolute top-2 left-2 z-50"
      >
        <div className="w-6 h-0.5 bg-white mb-1"></div>
        <div className="w-6 h-0.5 bg-white mb-1"></div>
        <div className="w-6 h-0.5 bg-white"></div>
      </button>

      <div
        className={`border-r border-[#c5e1a5] bg-[#F1F8E9] text-white h-full overflow-y-auto absolute md:static transform ${
          isSidebarOpen ? "translate-x-0 pt-12" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 w-3/4 md:w-1/4 z-40`}
        style={{
          top: isSidebarOpen ? "0" : "-100vh",
        }}
      >
        <div className="flex md:flex-col flex-row text-teal-900 justify-between items-center mb-3">
          <h2 className="text-3xl m-3 font-semibold">Chats</h2>
          <button
            onClick={() => setIsSearchBarOpen(true)}
            className="bg-[#8BC34A] hover:bg-teal-800 text-white p-2 m-1 rounded"
          >
            Add / Find User
          </button>
        </div>
        {chats.map((chat, index) => {
          console.log(chat);
          const otherUser = getSender(user, chat.users);
          console.log("otheruser is", otherUser);
          const latestMessage = chat.latestMessage;

          return (
            <div
              key={index}
              className={`px-2 py-3 cursor-pointer text-[#33691E] ${
                selectedChat === chat ? "bg-[#DCEDC8]" : "bg-[#F1F8E9]"
              } `}
              onClick={() => handleChatClick(chat)}
            >
              <div className="font-bold">{otherUser}</div>
              {latestMessage && (
                <div className="text-sm text-green-600">
                  {latestMessage.content}
                </div>
              )}
            </div>
          );
        })}
        {isSearchBarOpen && (
          <SearchBar
            setChats={setChats}
            chats={chats}
            onClose={() => setIsSearchBarOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default Sidebar;
