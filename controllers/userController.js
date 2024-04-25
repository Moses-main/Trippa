// userController.js
const User = require("../models/User");

// Fetch all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch single user by ID
exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser = new User({
      email,
      password,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { email, password } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.email = email;
    user.password = password;
    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// @desc     get user profile
// @route    GET /api/users/profile
// @access   Private
exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  try {
    if (user) {
      res.json({
        _id: user._id,
        email: user.email,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc     Update user profile
// @route    PUT /api/users/profile
// @access   Private

exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id,

      {
        email: req.body.email,

      }, {
      new: true,
      runValidators: true
    });
    if (!user) {
      res.status(404)
      throw new Error("User not found");
    }
    res.json({
      _id: user._id,
      email: user.email,

    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
