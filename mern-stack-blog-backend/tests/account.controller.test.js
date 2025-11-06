const AccountController = require("../controllers/account.controller");
const Account = require("../models/account.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

jest.mock("../models/account.model");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("AccountController", () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  // ------------------------------------------------------
  // 🔹 TEST cho createAccount()
  // ------------------------------------------------------
  describe("createAccount", () => {
    test("TC1 - Thiếu name/email/password => 400", async () => {
      req.body = { name: "", email: "", password: "" };
      await AccountController.createAccount(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Please fill in all fields",
      });
    });

    test("TC2 - Email đã tồn tại => 400", async () => {
      req.body = { name: "Hieu", email: "test@gmail.com", password: "123456" };
      Account.findOne.mockResolvedValue({ _id: "123" });
      await AccountController.createAccount(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Email already exist" });
    });

    test("TC3 - Password < 6 ký tự => 400", async () => {
      req.body = { name: "Hieu", email: "new@gmail.com", password: "123" };
      Account.findOne.mockResolvedValue(null);
      await AccountController.createAccount(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Password must be at least 6 characters",
      });
    });

    test("TC4 - Tạo tài khoản thành công => 200", async () => {
      req.body = { name: "Hieu", email: "new@gmail.com", password: "123456" };
      Account.findOne.mockResolvedValue(null);
      bcrypt.genSalt.mockResolvedValue("salt");
      bcrypt.hash.mockResolvedValue("hashedPassword");

      const mockSave = jest.fn().mockResolvedValue({ id: "abc" });
      Account.mockImplementation(() => ({ save: mockSave }));

      await AccountController.createAccount(req, res, next);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Create new account success",
        data: { id: "abc" },
      });
    });

    test("TC5 - Xảy ra lỗi trong try => next(err) được gọi", async () => {
      req.body = { name: "Hieu", email: "error@gmail.com", password: "123456" };
      Account.findOne.mockRejectedValue(new Error("DB error"));
      await AccountController.createAccount(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  // ------------------------------------------------------
  // 🔹 TEST cho loginAccount()
  // ------------------------------------------------------
  describe("loginAccount", () => {
    test("TC6 - Email không tồn tại => 401", async () => {
      req.body = { email: "none@gmail.com", password: "123456" };
      Account.findOne.mockResolvedValue(null);
      await AccountController.loginAccount(req, res, next);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid email or password.",
      });
    });

    test("TC7 - Password sai => 401", async () => {
      req.body = { email: "user@gmail.com", password: "wrong" };
      Account.findOne.mockResolvedValue({ password: "hashed" });
      bcrypt.compare.mockResolvedValue(false);
      await AccountController.loginAccount(req, res, next);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid email or password.",
      });
    });

    test("TC8 - Login thành công => 200 + token", async () => {
      req.body = { email: "user@gmail.com", password: "123456" };
      const account = {
        _id: "123",
        email: "user@gmail.com",
        password: "hashed",
        isAdmin: false,
        isBan: false,
        name: "Hieu",
        avatar: "img.png",
      };
      Account.findOne.mockResolvedValue(account);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("fakeToken");

      await AccountController.loginAccount(req, res, next);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Login successful!",
          token: "fakeToken",
          user: expect.objectContaining({
            id: "123",
            email: "user@gmail.com",
            role: "User",
            status: "Active",
          }),
        })
      );
    });

    test("TC9 - Xảy ra lỗi server => 500", async () => {
      req.body = { email: "user@gmail.com", password: "123456" };
      Account.findOne.mockRejectedValue(new Error("DB Error"));
      await AccountController.loginAccount(req, res, next);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "An error occurred during login.",
      });
    });
    test("TC10 - Password hợp lệ nhưng bcrypt.hash thất bại => next(err)", async () => {
      req.body = { name: "Hieu", email: "new2@gmail.com", password: "123456" };
      Account.findOne.mockResolvedValue(null);
      bcrypt.genSalt.mockResolvedValue("salt");
      bcrypt.hash.mockRejectedValue(new Error("Hash failed"));
      await AccountController.createAccount(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
