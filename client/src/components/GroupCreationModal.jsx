import React, { useState, useCallback } from "react";
import axios from "axios";
import { chatState } from "../context/Counter";

const GroupCreationModal = ({ onClose, setChats }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const { user } = chatState();

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
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  const debouncedHandleSearch = useCallback(
    debounce((term) => handleSearch(term), 600),
    []
  );

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedHandleSearch(e.target.value);
  };

  const handleUserSelect = (selectedUser) => {
    if (!selectedUsers.some((user) => user._id === selectedUser._id)) {
      setSelectedUsers([...selectedUsers, selectedUser]);
    }
  };

  const handleUserRemove = (userId) => {
    setSelectedUsers(selectedUsers.filter((user) => user._id !== userId));
  };

  const handleCreateGroup = async () => {
    if (groupName.trim() && selectedUsers.length > 0) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        const groupData = {
          groupName: groupName,
          isGroupChat: true,
          userIds: [
            user._id,
            ...selectedUsers.map((selectedUser) => selectedUser._id),
          ],
          groupAdmin: user._id,
        };

        const { data } = await axios.post(
          "/api/chats/createGroup",
          groupData,
          config
        );
        setChats((prevChats) => [...prevChats, data]);
        onClose();
      } catch (error) {
        console.error("Error creating group:", error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96 text-black">
        <h2 className="text-2xl font-bold mb-4">Create Group</h2>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Enter group name"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for users..."
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <ul className="max-h-40 overflow-y-auto mb-4">
          {searchResults.map((user) => (
            <li
              key={user._id}
              onClick={() => handleUserSelect(user)}
              className="cursor-pointer p-2 hover:bg-gray-100 "
            >
              {user.name}
              <p className="text-xs">{user.email}</p>
            </li>
          ))}
        </ul>
        <div className="mb-4">
          <h3 className="font-bold mb-2">Selected Users:</h3>
          {selectedUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between bg-gray-100 p-2 mb-2 rounded "
            >
              <span>{user.name}</span>
              <button
                onClick={() => handleUserRemove(user._id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black p-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateGroup}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Create Group
          </button>
        </div>
      </div>
    </div>
  );
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

export default GroupCreationModal;
