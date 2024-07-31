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
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: req.params.userId } },
    })
      .populate({
        path: "latestMessage",
        populate: {
          path: "sender",
          model: "User",
        },
      })
      .populate("users")
      .sort({ updatedAt: -1 });

    console.log("chats send!");

    res.status(200).json(chats);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createGroup = async (req, res) => {
  try {
    const { groupName, userIds, groupAdmin } = req.body;

    // Log the request body to check the data
    console.log("Request body:", req.body);

    if (!groupName || !userIds || !groupAdmin) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if userIds is an array and not empty
    if (!Array.isArray(userIds) || userIds.length === 0) {
      return res
        .status(400)
        .json({ error: "userIds must be a non-empty array" });
    }

    const chat = await Chat.create({
      chatName: groupName,
      isGroupChat: true,
      users: userIds,
      groupAdmin,
    });

    const FullChat = await Chat.findOne({ _id: chat._id }).populate("users");
    res.status(200).json(FullChat);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
