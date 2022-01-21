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
    allStatusShelfEntries
} = require('../creation');

const router = express.Router();

// /my-game-guides/
router.get('/', asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    const guides = await allStatusShelfEntries(userId);


    res.render('my-game-guides', { guides });
}));

// /my-game-guides/status-shelves/:id
// Status shelves will be integers
router.get('/status-shelves/:id(\\d+)', asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    const shelfId = parseInt(req.params.id, 10);

    const guides = await findStatusShelfEntries(userId, shelfId);

    res.render('my-game-guides-status', { guides });
}));

// Custom shelves will be strings of the name
router.get('/custom-shelves/:id(\\d+)');

router.get('/custom-shelves/edit');


module.exports = router;
