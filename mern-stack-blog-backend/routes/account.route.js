const bodyParser = require("body-parser");
const express = require("express");
const Account = require("../models/account.model");
const {AccountController} = require("../controllers");
const { default: mongoose } = require("mongoose");

const accountRoute = express.Router();
accountRoute.use(bodyParser.json());

accountRoute.post("/api/register", async (req, res, next) => { 
    AccountController.createAccount(req, res, next);
})
accountRoute.post("/api/login", async (req, res, next) => {
    AccountController.loginAccount(req, res, next);
})
module.exports = accountRoute