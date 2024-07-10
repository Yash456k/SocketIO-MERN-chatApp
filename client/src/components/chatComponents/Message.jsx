import React from "react";
import { stringToColor } from "./utils";

function Message({ msg, isCurrentUser, showUsername, createdAt }) {
  const userColor = stringToColor(msg.sender.name);

  return (
    <li
      className={`flex w-full fade-in ${
        isCurrentUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`relative p-3 rounded-xl max-w-xs break-words shadow-md ${
          isCurrentUser
            ? `bg-[#8BC34A] text-white text-left ${
                showUsername ? "rounded-tr-none" : ""
              }`
            : `bg-gray-100 text-black text-left ${
                showUsername ? "rounded-tl-none" : ""
              }`
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
        <div className="">
          <div className="mr-7 relative top-0.5">{msg.content}</div>
          <div
            className={`relative left-1.5 top-2 float-right text-xs md:text-xs text-[0.6rem] ${
              isCurrentUser ? "text-white" : "text-gray-600"
            }`}
          >
            {createdAt}
          </div>
        </div>
      </div>
    </li>
  );
}

export default Message;
