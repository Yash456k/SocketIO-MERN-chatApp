import React, { useState } from "react";
import axios from "axios";
import { chatState } from "../context/Counter";

const SearchBar = ({ onClose, setChats, chats }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { user, setSelectedChat } = chatState();
  const [selectedSearch, setSelectedSearch] = useState();

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
      onClose();
      return;
    }

    // Create a new chat if it doesn't exist
    const messageData = {
      senderId: user._id,
      userId: userChat._id,
    };

    try {
      const { data } = await axios.post(`/api/chats`, messageData);

      console.log("got the chat !", data);

      setSelectedChat(data);
      setChats((prevChats) => [...prevChats, data]); // Trigger a re-render
      onClose();
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
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

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-blue-300 p-4 shadow-lg z-50">
      <button
        onClick={onClose}
        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded mb-4 w-full"
      >
        Close
      </button>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for users..."
          className="w-full p-2 border border-gray-300 rounded mb-2 text-black"
        />
        <button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded w-full"
        >
          Search
        </button>
      </form>
      <ul className="space-y-2">
        {searchResults.map((user) => (
          <li
            key={user._id}
            onClick={() => {
              handleClickForSearch(user);
            }}
            className={`cursor-pointer p-2 border border-gray-300 rounded ${
              selectedSearch === user ? "bg-blue-800" : "bg-blue-400"
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
