export const getSender = (loggedUser, chat) => {
  if (chat.isGroupChat) return chat.chatName;
  const users = chat.users;
  return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
};
