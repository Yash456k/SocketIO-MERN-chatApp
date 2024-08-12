import React, { useState } from "react";

function MessageInput({
  input,
  setInput,
  sendMessage,
  socket,
  selectedChat,
  sendingMessage,
}) {
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleInputChange = (e) => {
    setInput(e.target.value);

    if (socket && selectedChat) {
      socket.emit("typing", selectedChat._id);
    }

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        if (socket && selectedChat) {
          socket.emit("stop typing", selectedChat._id);
        }
      }, 1200)
    );
  };

  return (
    <form
      className="bg-[#F1F8E9] flex md:flex-row md:w-full flex-col w-full items-center justify-between p-2 md:mt-3"
      onSubmit={sendMessage}
    >
      <input
        className="md:w-[78%] w-full p-2 border m-1 border-gray-300 rounded-full"
        value={input}
        onChange={handleInputChange}
        autoComplete="off"
        placeholder="Type a message"
      />
      <button
        className={`${
          sendingMessage &&
          "opacity-50 cursor-not-allowed pointer-events-none hover:pointer-events-none"
        } p-2 md:w-1/5 w-full m-1 bg-[#8BC34A] text-white rounded-full hover:bg-green-700`}
      >
        {sendingMessage ? "Sending..." : "Send"}
      </button>
    </form>
  );
}

export default MessageInput;
