const express = require("express");
const { user } = require("pg/lib/defaults");
const router = express.Router();
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("../utils");

/* GET home page. */
router.get("/", asyncHandler(async(req, res, next) => {
  let currentGuides;
  let wantToGuides;
  const guides = await db.GameGuide.findAll()
  
  if(req.session.auth) {
    const { userId } = req.session.auth;
    currentGuides = await db.StatusShelf.findAll({
      where: {
        userId,
        statusId: 2
      },
      include: db.GameGuide
    })
    wantToGuides = await db.StatusShelf.findAll({
      where: {
        userId,
        statusId: 1
      },
      include: {
        model: db.GameGuide
      }
    })
  }
    res.render("index", { title: "Home", guides, currentGuides, wantToGuides});
}));

module.exports = router;
