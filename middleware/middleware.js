const jwt = require("jsonwebtoken");
require("dotenv").config();
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized access: No token provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Unauthorized access: Invalid token" });
    }
    req.user = user;
    next();
  });
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
