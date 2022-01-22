const express = require('express');
const { check, validationResult } = require("express-validator");

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
    findAvgRating
} = require('../creation');

const router = express.Router();

// Read /my-game-guides, display all guides in user's shelves
router.get('/my-game-guides', asyncHandler(async (req, res) => {
    const url = req.url;
    const { userId } = req.session.auth;

    const guides = await allStatusShelfEntries(userId);
    const customShelves = await db.CustomShelf.findAll({
        where: {
            userId
        }
    });

    res.render('my-game-guides', { url, userId, guides, customShelves });
}));

// Read /my-game-guides/status-shelves/:id, display all guides in specified status shelf
router.get('/my-game-guides/status-shelves/:id(\\d+)', asyncHandler(async (req, res) => {
    const url = req.url;
    const { userId } = req.session.auth;
    const shelfId = parseInt(req.params.id, 10);

    const guides = await findStatusShelfEntries(userId, shelfId);

    res.render('my-game-guides', { url, userId, guides });
}));

// Read /my-game-guides/custom-shelves/:id, display all guides in specified custom shelf
// :id can contain 1 or more letters (lower or uppercase), digits, underscore, dash, or space
router.get('/my-game-guides/custom-shelves/:id([\\w\- ]+)', asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    const shelfName = req.params.id;

    const guides = await findCustomShelfEntries(userId, shelfName);

    res.render('my-game-guides', { userId, guides });
}));

// Read /my-game-guides/custom-shelves/edit
router.get('/my-game-guides/custom-shelves/edit');

// Create /users/:userId/customShelves, create new custom shelf
router.post('/users/:userId(\\d+)/customShelves', csrfProtection, asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    const { name } = req.body;

    // If validations, use below?
    // const customShelf = db.CustomShelf.build({ name });

    await addCustomShelfName(name, userId);


}));

module.exports = router;
