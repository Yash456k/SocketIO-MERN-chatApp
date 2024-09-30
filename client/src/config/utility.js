export const getSender = (loggedUser, chat) => {
  if (chat.isGroupChat) return chat.chatName || "Group Chat";

  const users = chat.users;
  const otherUser = users[0]?._id === loggedUser?._id ? users[1] : users[0];
  return otherUser?.name || "Deleted User";
};
