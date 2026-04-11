const jwt = require("jsonwebtoken");

const JWT_SECRET = "your_secret_key";

function authMiddleware(
  req,
  res,
  next
) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      JWT_SECRET
    );

    req.userId = decoded.userId;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
}

module.exports = authMiddleware;
