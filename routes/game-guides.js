const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const csrf = require("csurf");
const { csrfProtection, asyncHandler } = require("../utils");
const { loginUser, logoutUser, restoreUser, requireAuth } = require("../auth");
const db = require("../db/models");

const router = express.Router();

// List Page

// Detail Page
router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const gameGuideId = parseInt(req.params.id, 10);
    const gameGuide = await db.GameGuide.findByPk(gameGuideId);
    const { userId } = req.session.auth;
    const guides = await db.GameGuide.findAll();

    let statusObj = {
      1: "Want to Play",
      2: "Currently Playing",
      3: "Played",
    };

    const guideStatusCheck = await db.StatusShelf.findAll({
      where: {
        gameGuideId,
        userId,
      },
    });

    let currentStatus;
    if (guideStatusCheck.length) {
      currentStatus = statusObj[guideStatusCheck[0].statusId];
    }

    console.log("=========TEST", currentStatus);

    let title = gameGuide.title;

    res.render("game-guides-id", {
      title,
      gameGuide,
      userId,
      guides,
      currentStatus,
    });
  })
);

module.exports = router;
