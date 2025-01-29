const jwt = require("jsonwebtoken");
require("dotenv").config();
const authenticateToken = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        code: 401,

        message: "Unauthorized access: No token provided",
      });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          code: 403,
          message: "Unauthorized access: Invalid token",
        });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const adminProtect = (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin") {
    return res
      .status(403)
      .json({ message: "Unauthorized access: Admin role required" });
  }
  next();
};

const userProtect = (req, res, next) => {
  const { role } = req.user;
  if (role !== "user") {
    return res
      .status(403)
      .json({ message: "Unauthorized access: User role required" });
  }
  next();
};

// const vendorProtect = (req, res, next) => {
//   const { role } = req.user;
// if (role !== 'vendor') {
//     return res.status(403).json({ message: 'Unauthorized access: Vendor role required' });
//   }
//  next();
// };
module.exports = {
  authenticateToken,
  adminProtect,
  userProtect,
};
