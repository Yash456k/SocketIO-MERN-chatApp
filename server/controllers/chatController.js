import Chat from "../model/chatModel.js";

export const createChat = async (req, res) => {
  const { userId, senderId } = req.body;

  const isChat = await Chat.find({
    $and: [
      {
        users: { $elemMatch: { $eq: userId } },
      },
      {
        users: { $elemMatch: { $eq: senderId } },
      },
    ],
  })
    .populate("users")
    .populate("latestMessage");

  console.log(isChat);
  console.log("now zeroooooooooooooooooooooooooooooooooo index");
  console.log(isChat[0]);

  if (isChat.length > 0) {
    console.log("chat exists !");
    res.send(isChat[0]);
  } else
    try {
      const chat = await Chat.create({
        chatName: "sender",
        isGroupChat: false,
        users: [userId, senderId],
      });

      const FullChat = await Chat.findOne({ _id: chat._id }).populate("users");

      res.status(201).json(FullChat);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

export const fetchChats = async (req, res) => {
  try {
    const user = await Chat.find({
      users: { $elemMatch: { $eq: req.params.userId } },
    })
      .populate("latestMessage")
      .populate("users")
      .sort({ updatedAt: -1 });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
