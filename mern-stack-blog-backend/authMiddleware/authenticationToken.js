const jwt = require("jsonwebtoken");

// Middleware xác thực token
const authenticationToken = (req, res, next) => {
  // Lấy token từ header 'Authorization'
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Xác minh token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Sử dụng secret key từ môi trường
    req.user = decoded; // Lưu thông tin user vào req để sử dụng trong controller
    next(); // Cho phép tiếp tục nếu token hợp lệ
  } catch (error) {
    // Kiểm tra xem lỗi là do token hết hạn hay không
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token has expired. Please log in again." });
    }
    // Nếu token không hợp lệ
    return res.status(403).json({ message: "Invalid token." });
  }
};

module.exports = authenticationToken;
