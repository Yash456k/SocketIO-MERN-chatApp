import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { chatState } from "../context/Counter";

const SearchBar = ({ onClose, setChats, chats }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { user, setSelectedChat } = chatState();
  const [selectedSearch, setSelectedSearch] = useState();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Match this with the transition duration
  };

  const handleClickForSearch = async (userChat) => {
    console.log("set user ", userChat);
    setSelectedSearch(userChat);

    // Check if the chat already exists
    const existingChat = chats.find((chat) =>
      chat.users.some((u) => u._id === userChat._id)
    );

    if (existingChat) {
      console.log("Chat already exists!", existingChat);
      setSelectedChat(existingChat);
      handleClose();
      return;
    }

    const messageData = {
      senderId: user._id,
      userId: userChat._id,
    };

    try {
      const { data } = await axios.post(`/api/chats`, messageData);

      console.log("got the chat !", data);

      setSelectedChat(data);
      setChats((prevChats) => [...prevChats, data]);
      handleClose();
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const handleSearch = async (searchTerm) => {
    if (searchTerm.trim()) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.get(
          `/api/users?search=${searchTerm}`,
          config
        );
        console.log(data);
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 600), []);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedHandleSearch(e.target.value);
  };

  return (
    <div
      className={`fixed top-0 right-0 w-full h-full bg-[#DBFCB4] p-4 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        onClick={handleClose}
        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded mb-4 w-full transition duration-300 ease-in-out"
      >
        Close
      </button>
      <form onSubmit={(e) => e.preventDefault()} className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for users..."
          className="w-full p-2 border border-gray-300 rounded mb-2 text-black"
        />
      </form>
      <ul className="space-y-2">
        {searchResults.map((user) => (
          <li
            key={user._id}
            onClick={() => {
              handleClickForSearch(user);
            }}
            className={`cursor-pointer p-2 border border-gray-300 rounded transition duration-300 ease-in-out ${
              selectedSearch === user
                ? "bg-blue-800"
                : "bg-blue-400 hover:bg-blue-500"
            }`}
          >
            <div className="font-bold">{user.name}</div>
            <div className="text-sm py-1">{user.email}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
