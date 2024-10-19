const bodyParser = require("body-parser");
const express = require("express");
const Account = require("../models/account.model");
const {AccountController} = require("../controllers");
const { default: mongoose } = require("mongoose");

const accountRoute = express.Router();
accountRoute.use(bodyParser.json());

accountRoute.post("/register", async (req, res, next) => { 
    AccountController.createAccount(req, res, next);
})
module.exports = accountRoute