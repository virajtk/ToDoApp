const express = require("express");

const authCtrl = require("../controllers/auth.controller");

const router = express.Router();

router.route("/")
    .post(authCtrl.login);

module.exports = {
    router
}
