import User from "../model/userModel.js";
import generateToken from "../config/generateToken.js";

export const allUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
};

export const loginUser = async (req, res) => {
  const { userEmail } = req.body;
  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.send("no user");
    }

    const data = {
      _id: user._id,
      email: user.email,
      displayName: user.name,
      token: generateToken(user._id),
    };
    console.log("user login data", data);

    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const registerUser = async (req, res) => {
  const { name, userEmail, isAdmin } = req.body;
  try {
    const user = await User.create({ name, email: userEmail, isAdmin });

    const data = {
      _id: user._id,
      email: user.email,
      displayName: user.name,
      token: generateToken(user._id),
    };

    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
