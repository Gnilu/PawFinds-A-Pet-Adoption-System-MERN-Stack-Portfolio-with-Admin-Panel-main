const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user data to request using the correct key
    req.user = {
      userId: decoded.userId, 
      role: decoded.role
    };

    console.log("Auth middleware decoded user:", req.user);
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};
