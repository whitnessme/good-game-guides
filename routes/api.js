const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const { csrfProtection, asyncHandler } = require("../utils");
const db = require("../db/models");

const router = express.Router();

router.get(
  "/users/:id(\\d+)/game-guides/:id(\\d+)/status/:id(\\d+)",
  asyncHandler(async (req, res) => {
    let url = req.url.split("/");
    let userId = parseInt(url[2])
    let gameGuideId = parseInt(url[4])
    let statusId = parseInt(url[6])

    console.log(userId, gameGuideId, statusId)
  })
);

module.exports = router;
