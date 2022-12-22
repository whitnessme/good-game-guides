const express = require("express");
const { check, validationResult } = require("express-validator");

const { csrfProtection, asyncHandler } = require("../utils");
const db = require("../db/models");
const { sequelize } = require("../db/models");
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
    customCounts,
    statusAndAllCounts,
    makeRatingArrsForGameGuideReviews
} = require("../creation");

const router = express.Router();

// READ - Display list of user's custom shelves
router.get(
    "/my-game-guides/custom-shelves/edit",
    csrfProtection,
    asyncHandler(async (req, res) => {
        const { userId } = req.session.auth;

        const customShelfAndCount = await customCounts(userId);

        res.render("custom-shelves-edit", {
            title: "Edit My Shelves | GoodGameGuides",
            userId,
            customShelfAndCount,
            csrfToken: req.csrfToken(),
        });
    })
);



// READ - Display all guides in user's shelves
router.get(
  "/my-game-guides",
  asyncHandler(async (req, res) => {
    const url = req.url;
    const { userId } = req.session.auth;

    const guides = await allStatusShelfEntries(userId);
    const updatedGuides = makeRatingArrsForGameGuideReviews(guides, userId)

    const customShelfAndCount = await customCounts(userId);
    const { all, one, two, three } = await statusAndAllCounts(userId);

    res.render("my-game-guides", {
      url,
      userId,
      updatedGuides,
      customShelfAndCount,
      all,
      one,
      two,
      three,
    });
  })
);

// READ - Display all guides in specified status shelf
router.get(
  "/my-game-guides/status-shelves/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const url = req.url;
    const { userId } = req.session.auth;
    const shelfId = parseInt(req.params.id, 10);

    const guides = await findStatusShelfEntries(userId, shelfId);
    const updatedGuides = makeRatingArrsForGameGuideReviews(guides, userId)
    
    const customShelfAndCount = await customCounts(userId);
    const { all, one, two, three } = await statusAndAllCounts(userId);

    res.render("my-game-guides", {
      url,
      userId,
      updatedGuides,
      customShelfAndCount,
      all,
      one,
      two,
      three,
    });
  })
);

// READ - display all guides in specified custom shelf
// :id can contain 1 or more letters (lower or uppercase), digits, underscore, dash, or space
router.get(
    "/my-game-guides/custom-shelves/:id([\\w-]+)",
    asyncHandler(async (req, res) => {
        const url = req.url;
        const { userId } = req.session.auth;
        const shelfName = req.params.id;

        const guides = await findCustomShelfEntries(userId, shelfName);
        const updatedGuides = makeRatingArrsForGameGuideReviews(guides, userId)

        const customShelfAndCount = await customCounts(userId);
        const { all, one, two, three } = await statusAndAllCounts(userId);

        res.render("my-game-guides", {
            url,
            userId,
            updatedGuides,
            shelfName,
            customShelfAndCount,
            all,
            one,
            two,
            three,
        });
    })
);

// CREATE - User creates custom shelf
router.post(
    "/users/:userId(\\d+)/customShelves",
    asyncHandler(async (req, res) => {
        const { userId } = req.session.auth;
        const { name } = req.body;

        const check = await addCustomShelfName(name, userId);

        res.json({ check });
    })
);

// DELETE - User removes guide from status shelf
router.delete(
    "/users/:userId(\\d+)/game-guides/:gameGuideId(\\d+)/status/:statusId(\\d+)",
    asyncHandler(async (req, res) => {
        const { userId } = req.session.auth;

        const statusShelfEntry = await db.StatusShelf.findOne({
            where: {
                userId,
                gameGuideId: req.params.gameGuideId,
                statusId: req.params.statusId,
            },
        });

        await statusShelfEntry.destroy();
        res.json({ message: "success" });
    })
);

// DELETE - User removes guide from custom shelf
router.delete(
    "/users/:userId(\\d+)/game-guides/:gameGuideId(\\d+)/custom/:customId([\\w-]+)",
    asyncHandler(async (req, res) => {
        const { userId } = req.session.auth;

        const allCustomShelves = await db.CustomShelf.findAll({
            where: {
                name: req.params.customId,
                userId,
            },
        });

        const customShelfEntry = await db.CustomShelf.findOne({
            where: {
                userId,
                gameGuideId: req.params.gameGuideId,
                name: req.params.customId,
            },
        });

        if (customShelfEntry && allCustomShelves.length > 1) {
            await customShelfEntry.destroy();
        } else if (customShelfEntry) {
            await customShelfEntry.update({ gameGuideId: null });
        }

        res.json({ message: "success" });
    })
);

// DELETE - User removes a custom shelf
router.delete("/custom-shelves/:shelfName([\\w-]+)", asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    const shelfName = req.params.shelfName;

    const shelf = await db.CustomShelf.findOne({
        where: {
            userId,
            name: shelfName
        }
    });

    await shelf.destroy();
    res.json({ message: "success" });

    // const shelves = await findCustomShelfEntries(userId, shelfName);

    // for (let shelf of shelves) {
    //     await shelf.destroy();
    // }

    // res.redirect("/my-game-guides/custom-shelves/edit");
}));

// UPDATE - User updates name of shelf
router.post("/custom-shelves/:shelfName([\\w-]+)/edit", asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    const shelfName = req.params.shelfName;
    const { name } = req.body;

    const shelves = await findCustomShelfEntries(userId, shelfName);

    for (let shelf of shelves) {
        await shelf.update({ name });
    }

    res.redirect("/my-game-guides/custom-shelves/edit");
}));

// CREATE - User creates custom shelf
// router.post(
//   "/users/:userId(\\d+)/customShelves",
//   asyncHandler(async (req, res) => {
//     const { userId } = req.session.auth;
//     const { name } = req.body;

//     const allCustomShelves = await db.CustomShelf.findAll({
//       where: {
//         name,
//         userId,
//       },
//     });

//     if (!allCustomShelves.length) {
//       await db.CustomShelf.create({
//         name,
//         userId,
//       });
//     }
//   })
// );

module.exports = router;
