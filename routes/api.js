const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const { csrfProtection, asyncHandler } = require("../utils");
const db = require("../db/models");

const router = express.Router();

// router.get(
//   "/users/:id(\\d+)/game-guides/:id(\\d+)/status/:id(\\d+)",
//   asyncHandler(async (req, res) => {
//     let url = req.url.split("/");
//     let userId = parseInt(url[2]);
//     let gameGuideId = parseInt(url[4]);
//     let statusId = parseInt(url[6]);

//     const status = await db.StatusShelf.findByPk(statusId);
//     res.json(status);
//   })
// );

router.post(
  "/users/:id(\\d+)/game-guides/:id(\\d+)/status/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const { userId, statusId, gameGuideId } = req.body;

    const guideStatusCheck = await db.StatusShelf.findAll({
      where: {
        gameGuideId,
        userId,
      },
    });

    console.log("========TEST", guideStatusCheck[0]);

    if (!guideStatusCheck.length) {
      const statusEntry = await db.StatusShelf.create({
        userId,
        statusId,
        gameGuideId,
      });

      res.json({ statusEntry });
    } else {
      console.log("UPDATE");
      const status = await db.StatusShelf.findOne({
        where: {
          gameGuideId,
          userId,
        },
      });

      await status.update({ statusId });
      res.json({ status });
    }
  })
);

router.post(
  "/users/:id(\\d+)/game-guides/:id(\\d+)/custom/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const { userId, customId, gameGuideId } = req.body;
  })
);

module.exports = router;
