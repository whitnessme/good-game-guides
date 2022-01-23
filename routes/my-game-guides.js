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

// READ - Display all guides in user's shelves
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

// READ - Display all guides in specified status shelf
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

// READ - display all guides in specified custom shelf
// :id can contain 1 or more letters (lower or uppercase), digits, underscore, dash, or space
router.get('/my-game-guides/custom-shelves/:id([\\w\- %]+)', asyncHandler(async (req, res) => {
    const url = req.url;
    const { userId } = req.session.auth;
    const shelfName = req.params.id;

    const guides = await findCustomShelfEntries(userId, shelfName);
    const customShelves = await db.CustomShelf.findAll({
        where: {
            userId
        }
    });

    res.render('my-game-guides', { url, userId, guides, customShelves, shelfName });
}));

// READ - Display list of user's custom shelves
router.get('/my-game-guides/custom-shelves/edit', asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;

    res.render('custom-shelves-edit', { title: 'test' });
}));

// CREATE - User creates custom shelf
router.post('/users/:userId(\\d+)/customShelves', asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    const { name } = req.body;

    const check = await addCustomShelfName(name, userId);

    res.json({ check });
}));

// DELETE - User removes guide from status shelf
router.delete('/users/:userId(\\d+)/game-guides/:gameGuideId(\\d+)/status/:statusId(\\d+)', asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;

    const statusShelfEntry = await db.StatusShelf.findOne({
        where: {
            userId,
            gameGuideId: req.params.gameGuideId,
            statusId: req.params.statusId
        }
    });

    await statusShelfEntry.destroy();
    res.json({ message: 'success' });
}));

// DELETE - User removes guide from custom shelf
router.delete('/users/:userId(\\d+)/game-guides/:gameGuideId(\\d+)/custom/:customId([\\w\- %]+)', asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;

    const customShelfEntry = await db.CustomShelf.findOne({
        where: {
            userId,
            gameGuideId: req.params.gameGuideId,
            name: customId
        }
    });

    await customShelfEntry.destroy();
    res.json({ message: 'success' });
}));

module.exports = router;
