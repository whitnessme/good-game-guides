const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { sequelize } = require("../db/models");
const { Op } = require("sequelize");

const { csrfProtection, asyncHandler } = require("../utils");
const db = require("../db/models");

const {
  addStatusShelfEntry,
  findStatusShelfEntries,
  findCustomShelfEntries,
  addCustomShelfName,
  checkIfCustomNameExists,
  addGuideToCustomShelf,
  checkCountOfShelfEntries,
  allStatusShelfEntries,
  findAvgRating,
} = require("../creation");

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

    if (!guideStatusCheck.length) {
      const statusEntry = await db.StatusShelf.create({
        userId,
        statusId,
        gameGuideId,
      });

      res.json({ statusEntry });
    } else {
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
  "/users/:id(\\d+)/game-guides/:id(\\d+)/custom/:id",
  asyncHandler(async (req, res) => {
    const { userId, name, gameGuideId, id } = req.body;

    const activeCustomShelves = await db.CustomShelf.findAll({
      where: {
        name,
        userId,
        gameGuideId: gameGuideId,
      },
    });

    const allCustomShelves = await db.CustomShelf.findAll({
      where: {
        name,
        userId,
      },
    });

    let activeCustomShelf = activeCustomShelves[0];
    let allCustomShelf = allCustomShelves[0];

    if (activeCustomShelf && allCustomShelves.length > 1) {
      await activeCustomShelf.destroy();
    } else if (activeCustomShelf) {
      await activeCustomShelf.update({ gameGuideId: null });
    } else if (allCustomShelf && allCustomShelf.gameGuideId === null) {
      await allCustomShelf.update({ gameGuideId });
    } else {
      await db.CustomShelf.create({ name, userId, gameGuideId });
    }
  })
);

module.exports = router;
