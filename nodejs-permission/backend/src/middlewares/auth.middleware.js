const jwt = require("../utils/jwt");

module.exports = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ").at(-1);
  const decoded = jwt.verifyToken(token);
  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: "Token không hợp lệ",
    });
  }
  req.userId = decoded.id;
  req.userType = decoded.type;
  next();
};
