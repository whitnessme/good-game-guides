const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("../utils");
const bcrypt = require("bcryptjs");
const { loginUser, logoutUser } = require("../auth");

router.get("/signup", csrfProtection, (req, res) => {});
router.post("/signup", csrfProtection, (req, res) => {});

router.get("/login");
router.post("/login");

router.post("/logout", (req, res) => {
  logoutUser(req, res);
  res.redirect("/users/login");
});
module.exports = router;
