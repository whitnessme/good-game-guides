const express = require("express");
const { user } = require("pg/lib/defaults");
const router = express.Router();
const db = require("../db/models");

/* GET home page. */
router.get("/", async(req, res, next) => {
  const guides = await db.GameGuide.findAll()
  const currentGuides = await db.StatusShelf.findAll({
    where: {
      userId: user.id,
      statusId: 2
    },
    include: {
      model: GameGuide
    }
  })
  res.render("index", { title: "Home", guides});
});

module.exports = router;
