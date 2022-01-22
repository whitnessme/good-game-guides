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
    const customShelves = await db.CustomShelf.findAll({
        where: {
            userId
        }
    });

    res.render('my-game-guides', { url, userId, guides, customShelves });
}));

// Read /my-game-guides/custom-shelves/:id, display all guides in specified custom shelf
// :id can contain 1 or more letters (lower or uppercase), digits, underscore, dash, or space
router.get('/my-game-guides/custom-shelves/:id([\\w\- ]+)', asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    const shelfName = req.params.id;

    const guides = await findCustomShelfEntries(userId, shelfName);
    const customShelves = await db.CustomShelf.findAll({
        where: {
            userId
        }
    });

    res.render('my-game-guides', { userId, guides, customShelves });
}));

// Read /my-game-guides/custom-shelves/edit
router.get('/my-game-guides/custom-shelves/edit', asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;

    res.render('custom-shelves-edit', {});
}));

// Create /users/:userId/customShelves, create new custom shelf
router.post('/users/:userId(\\d+)/customShelves', asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    const { name } = req.body;

    const check = await addCustomShelfName(name, userId);

    res.json({ check });

}));

// Remove guide from status shelf
router.delete('/users/:userId(\\d+)/game-guides/:gameGuideId(\\d+)/status/:statusId(\\d+)', asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;

    const statusShelfEntry = await db.StatusShelf.findByPk({
        where: {
            statusId: req.params.statusId,
            gameGuideId: req.params.gameGuideId,
            userId
        }
    });

    await statusShelfEntry.destroy();
    res.json({ message: 'success' });
}));

module.exports = router;
