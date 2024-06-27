import Message from "../model/messageModel.js";
import Chat from "../model/chatModel.js";

export const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createMessage = async (req, res) => {
  const { content, senderId, chatId } = req.body;
  try {
    // Create the new message
    let newMessage = await Message.create({
      content,
      sender: senderId,
      chat: chatId,
    });

    // Populate the sender and chat fields
    newMessage = await newMessage.populate("sender", "name email");

    newMessage = await newMessage.populate("chat");

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: newMessage,
    });

    console.log("new message created", newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
