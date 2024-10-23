const Account = require("../models/account.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
require('dotenv').config();

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
  const { email, password } = req.body; 
  // console.log(email, password);

  try {
    // Tìm tài khoản dựa trên email
    const account = await Account.findOne({email});
    if (!account) {
      console.log(account);
      
      return res.status(401).json({ message: "Invalid email ." });
    }

    // So sánh mật khẩu đã nhập với mật khẩu trong cơ sở dữ liệu
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // Tạo token (JWT) cho tài khoản
    const token = jwt.sign(
      { id: account._id, email: account.email,isAdmin: account.isAdmin}, 
      process.env.JWT_SECRET, 
      { expiresIn: "1h" } 
    );
    
    // Gửi phản hồi thành công với token và thông tin tài khoản
    res.status(200).json({
      message: "Login successful!",
      token, 
      user: {
        id: account._id,
        email: account.email,
        username: account.name,
        isAdmin: account.isAdmin
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during login." });
  }
}


async function forgotPassword(req, res, next) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Vui lòng cung cấp địa chỉ email" });
  }

  try {
    const account = await Account.findOne({ email });
    if (!account) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    
    const newPassword = Math.random().toString(36).slice(-8);
    console.log("Mật khẩu mới:", newPassword);

   
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

   
    account.password = hashedPassword;
    await account.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: account.email,
      subject: "Khôi phục mật khẩu",
      text: `Mật khẩu mới của bạn là: ${newPassword}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Mật khẩu mới đã được gửi đến email của bạn",
    });
  } catch (error) {
    console.error("Lỗi quên mật khẩu:", error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại sau" });
  }
}


const AccountController = { createAccount, loginAccount, forgotPassword };
module.exports = AccountController;