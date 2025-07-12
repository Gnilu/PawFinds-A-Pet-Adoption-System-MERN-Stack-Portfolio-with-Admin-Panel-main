const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Model/User");

// Register a new user (only user can register via form)
exports.register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  console.log("Register payload:", req.body);

  if (password !== confirmPassword) {
    console.log("Passwords do not match");
    return res.status(400).json({ message: "Passwords do not match" });
  }

  if (!username || !email || !password) {
    console.log("Missing required fields");
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    await User.create({
      username,
      email,
      password: hashedPassword,
      role: "user",
    });

    console.log("User registered successfully");
    res.status(201).json({ message: "User registered successfully" });
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
    console.log("Missing username or password");
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log("Invalid credentials: user not found");
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid password");
      return res.status(400).json({ message: "Invalid Password" });
    }

    console.log("User role:", user.role);

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      token,
      role: user.role,
      message: user.role === "admin" ? "Admin logged in" : "User logged in",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    res.status(200).json({ status: "success", data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Additional methods for admin features if needed...
