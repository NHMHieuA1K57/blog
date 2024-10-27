const bodyParser = require("body-parser");
const express = require("express");
const Account = require("../models/account.model");
const {AccountController} = require("../controllers");
const {authenticationToken,authorizeAdmin} = require("../authMiddleware/authenticationToken");

const accountRoute = express.Router();
accountRoute.use(bodyParser.json());

accountRoute.post("/api/register", async (req, res, next) => { 
    AccountController.createAccount(req, res, next);
})
accountRoute.post("/api/login", async (req, res, next) => {
    AccountController.loginAccount(req, res, next);
})
accountRoute.patch("/api/updateProfile/:id",authenticationToken, async (req, res, next) => {
    AccountController.updateProfile(req, res, next);
})
accountRoute.get("/api/getUser",authenticationToken,authorizeAdmin, async (req, res, next) => {
    AccountController.getUsers(req, res, next);
})
accountRoute.patch("/api/changeStatusBan/:id",authenticationToken, authorizeAdmin, async (req, res, next) => {
    AccountController.changeStatusBanUser(req,res,next)
})
accountRoute.get("/api/getUserIsBaned",authenticationToken,authorizeAdmin, async (req, res, next) => {
    AccountController.getUsersIsBan(req, res, next);
})
module.exports = accountRoute
