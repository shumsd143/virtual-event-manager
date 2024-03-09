const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../constants");
const { get } = require("../services/user.service");

async function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    const user = await get(decoded.email);
    if (user == null)
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    req.user = user;
    next();
  } catch (error) {
    console.error("Error decoding token:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}

module.exports = { authMiddleware };
