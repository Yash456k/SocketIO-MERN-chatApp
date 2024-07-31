import React, { useState, useCallback, useMemo } from "react";
import { chatState } from "../context/Counter";
import SearchBar from "./SearchBar";
import GroupCreationModal from "./GroupCreationModal";
import { getSender } from "../config/utility";
import { ArrowUpRight } from "lucide-react";

const Sidebar = React.memo(({ chats, setChats }) => {
  const { setSelectedChat, selectedChat, user } = chatState();
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleChatClick = useCallback(
    (chat) => {
      setSelectedChat(chat);
      setIsSidebarOpen(false);
      console.log("selected Chat changed:", chat);
    },
    [setSelectedChat]
  );

  const chatElements = useMemo(() => {
    return chats.map((chat, index) => {
      console.log(chat);

      const otherUser = getSender(user, chat);
      console.log("otheruser is", otherUser);
      const latestMessage = chat.latestMessage;
      let displayMessage = "No messages yet";

      if (latestMessage) {
        if (chat.isGroupChat) {
          displayMessage = `${latestMessage.sender?.name || "Unknown"}: ${
            latestMessage.content
          }`;
        } else {
          displayMessage = latestMessage.content;
        }
      }

      return (
        <div
          key={index}
          className={`px-2 py-3 cursor-pointer text-[#33691E] ${
            selectedChat === chat ? "bg-[#DCEDC8]" : "bg-[#F1F8E9]"
          }`}
          onClick={() => handleChatClick(chat)}
        >
          <div className="font-bold">{otherUser}</div>
          <div className="text-sm text-green-600 overflow-hidden">
            {displayMessage.substr(0, 40) +
              (displayMessage.length >= 40 ? "\u2026" : "")}
          </div>
        </div>
      );
    });
  }, [chats, selectedChat, user, handleChatClick]);

  return (
    <>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="bg-teal-600 hover:bg-teal-700 text-white p-2 rounded md:hidden fixed top-2 left-2 z-50"
      >
        <div className="w-6 h-0.5 bg-white mb-1"></div>
        <div className="w-6 h-0.5 bg-white mb-1"></div>
        <div className="w-6 h-0.5 bg-white"></div>
      </button>
      <div
        className={`fixed md:static h-full inset-y-0 left-0 w-full md:w-1/4 bg-[#d2f1ae] text-white overflow-y-auto md:border-r border-[#c5e1a5] transform transition-transform duration-300 ease-in-out z-40
          ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
      >
        <div className="flex md:flex-col flex-row text-teal-900 justify-between items-center mb-3 pt-12 md:pt-0">
          <h2 className="text-3xl m-3 font-semibold">Chats</h2>
          <div className="flex flex-col md:flex-row">
            <button
              onClick={() => setIsSearchBarOpen(true)}
              className="bg-[#8BC34A] hover:bg-teal-800 text-white p-2 m-1 rounded"
            >
              Add / Find User
            </button>
            {/* <button
              onClick={() => setIsGroupModalOpen(true)}
              className="bg-[#8BC34A] hover:bg-teal-800 text-white p-2 m-1 rounded"
            >
              Create Group
            </button> */}
          </div>
        </div>
        {chats.length === 0 ? (
          <div className="flex flex-col items-center justify-around h-64 w-full text-teal-900">
            <div className="flex items-center justify-center w-full flex-col md:p-3 p-8 md:text-sm text-xl">
              <ArrowUpRight />
              <p>
                Click "Add / Find User" to get started. Try finding "Yash456k"
                and chatting with the creator of this app (me !).
              </p>
            </div>
            <div className="text-xl mb-4 text-center">
              No chats yet. Start a new conversation!
            </div>
          </div>
        ) : (
          chatElements
        )}
        {isSearchBarOpen && (
          <SearchBar
            setChats={setChats}
            chats={chats}
            onClose={() => setIsSearchBarOpen(false)}
          />
        )}
        {isGroupModalOpen && (
          <GroupCreationModal
            onClose={() => setIsGroupModalOpen(false)}
            setChats={setChats}
          />
        )}
      </div>
    </>
  );
});

export default Sidebar;
