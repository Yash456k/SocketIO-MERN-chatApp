import React from "react";
import { stringToColor } from "./utils";

function Message({ msg, isCurrentUser, showUsername }) {
  const userColor = stringToColor(msg.sender.name);

  return (
    <li
      className={`flex w-full fade-in ${
        isCurrentUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`p-3 rounded-xl max-w-xs break-words shadow-md ${
          isCurrentUser
            ? "bg-[#8BC34A] text-white text-right rounded-tr-none"
            : "bg-gray-100 text-black text-left rounded-tl-none"
        } ${showUsername ? "mt-3" : ""}`}
      >
        {showUsername && !isCurrentUser && (
          <div
            className="flex text-sm font-bold justify-start"
            style={{ color: userColor }}
          >
            {msg.sender.name}
          </div>
        )}
        <div>{msg.content}</div>
      </div>
    </li>
  );
}

export default Message;
