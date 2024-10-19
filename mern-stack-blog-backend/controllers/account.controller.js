const Account = require("../models/account.model");
const bcrypt = require("bcryptjs");

async function createAccount(req, res, next) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Vui lòng nhập tất cả các trường" });
  }
  try {
    let user = await Account.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exist" });
    }
    if (password.length < 6) {
        return res.status(500).json({ message: "Password must be at least 6 characters" });
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
        message: "Tạo tài khoản thành công",
        data: data,
      })
    );
  } catch (err) {
    next(err);
  }
}
const AccountController = { createAccount };
module.exports = AccountController;
