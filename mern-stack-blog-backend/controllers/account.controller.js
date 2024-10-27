const Account = require("../models/account.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function createAccount(req, res, next) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  try {
    let user = await Account.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exist" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const newAccount = new Account({
      name,
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    newAccount.password = await bcrypt.hash(password, salt);
    await newAccount.save().then((data) =>
      res.status(200).json({
        message: "Create new account success",
        data: data,
      })
    );
  } catch (err) {
    next(err);
  }
}
async function loginAccount(req, res, next) {
  const { email, password } = req.body; // Lấy email và password từ request body
  // console.log(email, password);

  try {
    // Tìm tài khoản dựa trên email
    const account = await Account.findOne({ email });

    // Nếu không tìm thấy tài khoản
    if (!account) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // So sánh mật khẩu đã nhập với mật khẩu trong cơ sở dữ liệu
    const isMatch = await bcrypt.compare(password, account.password);

    // Nếu mật khẩu không khớp
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Tạo token (JWT) cho tài khoản
    const token = jwt.sign(
      {
        id: account._id,
        email: account.email,
        isAdmin: account.isAdmin,
        isBan: account.isBan,
      }, // Payload chứa thông tin người dùng
      process.env.JWT_SECRET, // Secret key từ biến môi trường
      { expiresIn: "1h" } // Token sẽ hết hạn sau 1 giờ
    );

    // Gửi phản hồi thành công với token và thông tin tài khoản
    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        email: account.email,
        name: account.name,
        role: account.isAdmin ? "Admin" : "User",
        status: account.isBan ? "Ban" : "Active",
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during login." });
  }
}

async function updateProfile(req, res, next) {
  try {
    const { name, password } = req.body;
    const account = await Account.findById(req.user.id); // Sử dụng req.user.id

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (name) {
      account.name = name;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      account.password = await bcrypt.hash(password, salt);
    }

    await account.save();
    res.status(200).json({ message: "Update profile success", data: account });
  } catch (error) {
    next(error);
  }
}
async function getUsers(req, res, next) {
  try {
    const accountWithRoleUsers = await Account.find({ isAdmin: false });
    res.status(200).json({
      message: "Get users success",
      data: accountWithRoleUsers,
    });
  } catch (err) {
    return next(err);
  }
}
async function changeStatusBanUser(req, res, next) {
  try {
    const { id } = req.params;

    // Tìm user theo id
    const user = await Account.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Thay đổi trạng thái isBan
    user.isBan = !user.isBan;
    await user.save();

    const message = user.isBan ? "User banned successfully" : "User unbanned successfully";
    res.status(200).json({ message, data: user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}
async function getUsersIsBan(req, res, next) {
  try {
    const accountWithRoleUsers = await Account.find({ isBan: true });
    res.status(200).json({
      message: "Get users success",
      data: accountWithRoleUsers,
    });
  } catch (err) {
    return next(err);
  }
}
const AccountController = {
  createAccount,
  loginAccount,
  updateProfile,
  getUsers,
  changeStatusBanUser,
  getUsersIsBan
};
module.exports = AccountController;
