// // authMiddleware.js
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// // Middleware to authenticate JWT token
// exports.authenticateToken = async (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token == null) {
//     return res.sendStatus(401);
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.userId);
//     next();
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(403);
//   }
// };
