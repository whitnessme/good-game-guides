const express = require('express');
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
    statusAndAllCounts
} = require('../creation');

const router = express.Router();

// READ - Display list of user's custom shelves
router.get('/my-game-guides/custom-shelves/edit', asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    res.render('custom-shelves-edit', { title: 'test' });
}));

// READ - Display all guides in user's shelves
router.get('/my-game-guides', asyncHandler(async (req, res) => {
    const url = req.url;
    const { userId } = req.session.auth;

    const guides = await allStatusShelfEntries(userId);
  
    const customShelfAndCount = await customCounts(userId);
    const {all, one, two, three} = await statusAndAllCounts(userId);

    res.render('my-game-guides', { url, userId, guides, customShelfAndCount, all, one, two, three });
}));

// READ - Display all guides in specified status shelf
router.get('/my-game-guides/status-shelves/:id(\\d+)', asyncHandler(async (req, res) => {
    const url = req.url;
    const { userId } = req.session.auth;
    const shelfId = parseInt(req.params.id, 10);

    const guides = await findStatusShelfEntries(userId, shelfId);
    const customShelfAndCount = await customCounts(userId);
    const {all, one, two, three} = await statusAndAllCounts(userId);

    res.render('my-game-guides', { url, userId, guides, customShelfAndCount, all, one, two, three });
}));

// READ - display all guides in specified custom shelf
// :id can contain 1 or more letters (lower or uppercase), digits, underscore, dash, or space
router.get('/my-game-guides/custom-shelves/:id([\\w\- %]+)', asyncHandler(async (req, res) => {
    const url = req.url;
    const { userId } = req.session.auth;
    const shelfName = req.params.id;

    const guides = await findCustomShelfEntries(userId, shelfName);
  
    const customShelfAndCount = await customCounts(userId);
    const {all, one, two, three} = await statusAndAllCounts(userId);

    res.render('my-game-guides', { url, userId, guides, shelfName, customShelfAndCount, all, one, two, three });
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

    const allCustomShelves = await db.CustomShelf.findAll({
        where: {
            name: req.params.customId,
            userId
        },
    });

    const customShelfEntry = await db.CustomShelf.findOne({
        where: {
            userId,
            gameGuideId: req.params.gameGuideId,
            name: req.params.customId
        }
    });

    if (customShelfEntry && allCustomShelves.length > 1) {
        await customShelfEntry.destroy();
    } else if (customShelfEntry) {
        await customShelfEntry.update({ gameGuideId: null });
    }

    res.json({ message: 'success' });
}));

module.exports = router;
