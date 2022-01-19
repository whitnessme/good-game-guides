const express = require('express');
const { check, validationResult } = require("express-validator");

const { csrfProtection, asyncHandler } = require("../utils");
const db = require("../db/models");

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const gameGuides = await db.GameGuide.findAll({ where: {  } });
    res.render('my-game-guides', { title:  });
}));

router.get('/status-shelves/:id(\\d+)');

router.get('/custom-shelves/:id(\\d+)');

router.get('/custom-shelves/edit');


module.exports = router;
