const express = require("express");
const { user } = require("pg/lib/defaults");
const router = express.Router();
const db = require("../db/models");
const { sequelize } = require("../db/models");
const { csrfProtection, asyncHandler } = require("../utils");
const { checkCountOfShelfEntries } = require('../creation')

/* GET home page. */
router.get("/", asyncHandler(async (req, res, next) => {
  let currentGuides;
  let wantToGuides;
  
  const guides = await db.GameGuide.findAll()
  let noCurr = [];
  let noWant = [];
  
  let customShelves;
  
  let count1;
  let count2;
  let count3;

  let customCounts = [];

  if (req.session.auth) {
    const { userId } = req.session.auth;

    customShelves = await db.CustomShelf.findAll({
      where: {
        userId
      },
      attributes: [[sequelize.fn('distinct', sequelize.col('name')), 'name']],
      raw: true,
    })

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

    count1 = await checkCountOfShelfEntries(1, userId);
    count2 = await checkCountOfShelfEntries(2, userId);
    count3 = await checkCountOfShelfEntries(3, userId);

    for (let shelf of customShelves) {
      let shelfName = shelf.name
      const result = await checkCountOfShelfEntries(shelfName, userId);
      customCounts.push({count: result, name: shelfName})
    }
  }
  console.log("HERE: ", customCounts)
  console.log('Hello???? ', customShelves)

  if (currentGuides && !currentGuides.length) {
    noCurr.push("Please add guides to view them here")
  }
 
  if (wantToGuides && !wantToGuides.length) {
    noWant.push("Please add guides to view them here")
  }
  res.render("index", {
    title: "Home",
    guides,
    currentGuides,
    wantToGuides,
    noCurr,
    noWant,
    customShelves,
    count1,
    count2,
    count3,
    customCounts,
  });
}));

module.exports = router;
