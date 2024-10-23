const bodyParser = require("body-parser");
const express = require("express");
const {AccountController} = require("../controllers");

const accountRoute = express.Router();
accountRoute.use(bodyParser.json());

accountRoute.post("/api/register", async (req, res, next) => { 
    AccountController.createAccount(req, res, next);
})
accountRoute.post("/api/login", async (req, res, next) => {
    AccountController.loginAccount(req, res, next);
})

accountRoute.post("/forgotPassword",AccountController.forgotPassword);

module.exports = accountRoute