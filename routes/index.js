const express = require("express");
const { user } = require("pg/lib/defaults");
const router = express.Router();
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("../utils");

/* GET home page. */
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    let currentGuides;
    let wantToGuides;
    const guides = await db.GameGuide.findAll();
    let noCurr = [];
    let noWant = [];

    if (req.session.auth) {
      const { userId } = req.session.auth;

      currentGuides = await db.StatusShelf.findAll({
        where: {
          userId,
          statusId: 2,
        },
        include: db.GameGuide,
      });
      wantToGuides = await db.StatusShelf.findAll({
        where: {
          userId,
          statusId: 1,
        },
        include: {
          model: db.GameGuide,
        },
      });
    }

    if (!currentGuides.length) {
      noCurr.push("Please add guides to view them here");
    }
    console.log(noCurr.length);
    if (!wantToGuides.length) {
      noWant.push("Please add guides to view them here");
    }
    res.render("index", {
      title: "Home",
      guides,
      currentGuides,
      wantToGuides,
      noCurr,
      noWant,
    });
  })
);

module.exports = router;
