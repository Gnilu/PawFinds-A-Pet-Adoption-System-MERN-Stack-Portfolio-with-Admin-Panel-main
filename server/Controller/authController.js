const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Model/User");

// Register a new user (only user can register via form)
exports.register = async (req, res) => {
  console.log("Register payload:", req.body);
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check if username or email already exists
    const userExists = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (userExists) {
      return res.status(400).json({ message: "Username or email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: "user",
    });

    // Optionally generate JWT token at registration
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      role: newUser.role,
      username: newUser.username
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login for both users and admin
exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log("Login payload:", req.body);

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      token,
      username: user.username,
      role: user.role,
      message: user.role === "admin" ? "Admin logged in" : "User logged in",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch all users with role "user"
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password"); // Exclude passwords
    res.status(200).json({ status: "success", data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Additional admin methods can be added here...
