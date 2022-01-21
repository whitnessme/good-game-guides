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

// /my-game-guides/
router.get('/', asyncHandler(async (req, res) => {
    const url = req.url;
    const { userId } = req.session.auth;

    const guides = await allStatusShelfEntries(userId);

    res.render('my-game-guides', { url, guides });
}));

// /my-game-guides/status-shelves/:id
router.get('/status-shelves/:id(\\d+)', asyncHandler(async (req, res) => {
    const url = req.url;
    const { userId } = req.session.auth;
    const shelfId = parseInt(req.params.id, 10);

    const guides = await findStatusShelfEntries(userId, shelfId);

    res.render('my-game-guides', { url, guides });
}));

// /my-game-guides/custom-shelves/:id
// :id can contain 1 or more letters (lower or uppercase), digits, underscore, dash, or space
router.get('/custom-shelves/:id([\\w\- ]+)', asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    const shelfName = req.params.id;

    const guides = await findCustomShelfEntries(userId, shelfName);

    res.render('my-game-guides', { guides });
}));

router.get('/custom-shelves/edit');


module.exports = router;
