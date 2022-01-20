const express = require('express');
const { check, validationResult } = require("express-validator");

const { csrfProtection, asyncHandler } = require("../utils");
const db = require("../db/models");

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    // const { userId } = req.session.auth;

    res.render('my-game-guides', {});
}));

router.get('/status-shelves/:id(\\d+)');

router.get('/custom-shelves/:id(\\d+)');

router.get('/custom-shelves/edit');


module.exports = router;
