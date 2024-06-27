import React, { useState } from "react";
import { ChevronDown, Send, UserPlus } from "lucide-react";

const ColorScheme = ({ name, colors, active }) => (
  <div
    className={`p-4 ${
      active ? "border-2 border-blue-500" : "border border-gray-300"
    } rounded-lg`}
  >
    <h3 className="font-bold mb-2">{name}</h3>
    <div className="flex flex-col space-y-2">
      {Object.entries(colors).map(([key, value]) => (
        <div key={key} className="flex items-center">
          <div
            className="w-6 h-6 rounded mr-2"
            style={{ backgroundColor: value }}
          ></div>
          <span>
            {key}: {value}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const ChatAppMockup = ({ colors }) => (
  <div
    className="w-full h-[400px] rounded-lg shadow-lg"
    style={{ backgroundColor: colors.background }}
  >
    <div
      className="p-4 flex justify-between items-center"
      style={{ backgroundColor: colors.header }}
    >
      <h2 className="text-xl font-bold" style={{ color: colors.headerText }}>
        Chats
      </h2>
      <button
        className="px-3 py-1 rounded"
        style={{ backgroundColor: colors.button, color: colors.buttonText }}
      >
        Add / Find User
      </button>
    </div>
    <div className="flex h-[calc(100%-6rem)]">
      <div
        className="w-1/4 p-2 border-r"
        style={{ borderColor: colors.border }}
      >
        <div
          className="p-2 rounded mb-2"
          style={{
            backgroundColor: colors.activeChat,
            color: colors.activeChatText,
          }}
        >
          yashtest
          <div className="text-sm opacity-75">works yes</div>
        </div>
        <div className="p-2 rounded" style={{ color: colors.chatListText }}>
          yus kam
          <div className="text-sm opacity-75">that...</div>
        </div>
      </div>
      <div className="w-3/4 flex flex-col">
        <div className="flex-grow p-4 ">
          <div className="mb-2 text-right">
            <span
              className="inline-block p-2 rounded-lg"
              style={{
                backgroundColor: colors.sentMessage,
                color: colors.sentMessageText,
              }}
            >
              works yes
            </span>
          </div>
          <div className="mb-2">
            <span
              className="inline-block p-2 rounded-lg"
              style={{
                backgroundColor: colors.receivedMessage,
                color: colors.receivedMessageText,
              }}
            >
              works ?
            </span>
          </div>
          <div className="mb-2">
            <span
              className="inline-block p-2 rounded-lg"
              style={{
                backgroundColor: colors.receivedMessage,
                color: colors.receivedMessageText,
              }}
            >
              ok
            </span>
          </div>
        </div>
        <div className="p-4 flex">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-grow p-2 rounded-l-lg"
            style={{
              backgroundColor: colors.inputBackground,
              color: colors.inputText,
              borderColor: colors.border,
            }}
          />
          <button
            className="p-2 rounded-r-lg"
            style={{ backgroundColor: colors.button, color: colors.buttonText }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
);

const TestTrial = () => {
  const colorSchemes = {
    "Modern Dark": {
      background: "#1a1a1a",
      header: "#2c2c2c",
      headerText: "#ffffff",
      button: "#4a90e2",
      buttonText: "#ffffff",
      border: "#3a3a3a",
      activeChat: "#3a3a3a",
      activeChatText: "#ffffff",
      chatListText: "#cccccc",
      sentMessage: "#4a90e2",
      sentMessageText: "#ffffff",
      receivedMessage: "#3a3a3a",
      receivedMessageText: "#ffffff",
      inputBackground: "#2c2c2c",
      inputText: "#ffffff",
    },
    "Soft Light": {
      background: "#f0f4f8",
      header: "#ffffff",
      headerText: "#2c3e50",
      button: "#3498db",
      buttonText: "#ffffff",
      border: "#e0e6ed",
      activeChat: "#e0e6ed",
      activeChatText: "#2c3e50",
      chatListText: "#34495e",
      sentMessage: "#3498db",
      sentMessageText: "#ffffff",
      receivedMessage: "#ffffff",
      receivedMessageText: "#2c3e50",
      inputBackground: "#ffffff",
      inputText: "#2c3e50",
    },
    "Nature Inspired": {
      background: "#f1f8e9",
      header: "#4caf50",
      headerText: "#ffffff",
      button: "#8bc34a",
      buttonText: "#ffffff",
      border: "#c5e1a5",
      activeChat: "#dcedc8",
      activeChatText: "#33691e",
      chatListText: "#558b2f",
      sentMessage: "#8bc34a",
      sentMessageText: "#ffffff",
      receivedMessage: "#ffffff",
      receivedMessageText: "#33691e",
      inputBackground: "#ffffff",
      inputText: "#33691e",
    },
    "Ocean Breeze": {
      background: "#e0f7fa",
      header: "#00acc1",
      headerText: "#ffffff",
      button: "#0097a7",
      buttonText: "#ffffff",
      border: "#b2ebf2",
      activeChat: "#b2ebf2",
      activeChatText: "#006064",
      chatListText: "#00838f",
      sentMessage: "#0097a7",
      sentMessageText: "#ffffff",
      receivedMessage: "#ffffff",
      receivedMessageText: "#006064",
      inputBackground: "#ffffff",
      inputText: "#006064",
    },
    "Autumn Leaves": {
      background: "#fff3e0",
      header: "#ff9800",
      headerText: "#ffffff",
      button: "#f57c00",
      buttonText: "#ffffff",
      border: "#ffe0b2",
      activeChat: "#ffe0b2",
      activeChatText: "#e65100",
      chatListText: "#ef6c00",
      sentMessage: "#f57c00",
      sentMessageText: "#ffffff",
      receivedMessage: "#ffffff",
      receivedMessageText: "#e65100",
      inputBackground: "#ffffff",
      inputText: "#e65100",
    },
    "Cherry Blossom": {
      background: "#fce4ec",
      header: "#ec407a",
      headerText: "#ffffff",
      button: "#d81b60",
      buttonText: "#ffffff",
      border: "#f8bbd0",
      activeChat: "#f8bbd0",
      activeChatText: "#880e4f",
      chatListText: "#c2185b",
      sentMessage: "#d81b60",
      sentMessageText: "#ffffff",
      receivedMessage: "#ffffff",
      receivedMessageText: "#880e4f",
      inputBackground: "#ffffff",
      inputText: "#880e4f",
    },
    "Lavender Fields": {
      background: "#f3e5f5",
      header: "#8e24aa",
      headerText: "#ffffff",
      button: "#6a1b9a",
      buttonText: "#ffffff",
      border: "#e1bee7",
      activeChat: "#e1bee7",
      activeChatText: "#4a148c",
      chatListText: "#7b1fa2",
      sentMessage: "#6a1b9a",
      sentMessageText: "#ffffff",
      receivedMessage: "#ffffff",
      receivedMessageText: "#4a148c",
      inputBackground: "#ffffff",
      inputText: "#4a148c",
    },
    "Desert Sunset": {
      background: "#fff8e1",
      header: "#ff5722",
      headerText: "#ffffff",
      button: "#e64a19",
      buttonText: "#ffffff",
      border: "#ffecb3",
      activeChat: "#ffecb3",
      activeChatText: "#bf360c",
      chatListText: "#d84315",
      sentMessage: "#e64a19",
      sentMessageText: "#ffffff",
      receivedMessage: "#ffffff",
      receivedMessageText: "#bf360c",
      inputBackground: "#ffffff",
      inputText: "#bf360c",
    },
  };

  const [activeScheme, setActiveScheme] = useState("Modern Dark");

  return (
    <div className="p-4 max-w-4xl mx-auto overflow-y-scroll">
      <h1 className="text-2xl font-bold mb-4">Chat App Color Schemes</h1>
      <ChatAppMockup colors={colorSchemes[activeScheme]} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 overflow-y-scroll">
        {Object.entries(colorSchemes).map(([name, colors]) => (
          <div
            key={name}
            className="cursor-pointer"
            onClick={() => setActiveScheme(name)}
          >
            <ColorScheme
              name={name}
              colors={colors}
              active={name === activeScheme}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestTrial;
