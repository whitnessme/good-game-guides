const express = require("express");

const { csrfProtection, asyncHandler } = require("../utils");
const db = require("../db/models");

const router = express.Router();

// CREATE - User creates a rating/review
router.post(
    '/game-guides/:id(\\d+)/reviews/new',
    csrfProtection,
    asyncHandler(async (req, res) => {
        const { userId } = req.session.auth;
        const gameGuideId = parseInt(req.params.id, 10);

        const { rating, reviewText } = req.body;

        const review = await db.Review.create({
            rating,
            reviewText,
            userId,
            gameGuideId,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return res.json(review);
    })
);

// UPDATE - User updates their rating/review
router.put(
    '/reviews/:id(\\d+)/edit',
    csrfProtection,
    asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id, 10);
        const review = await db.Review.findByPk(id);

        const { rating, reviewText } = req.body;

        if (!review) throw new Error('Cannot find review.');

        const updatedReview = await review.update({
            rating,
            reviewText,
            updatedAt: new Date()
        });

        return res.json(updatedReview);
    })
);

// DELETE - User removes their review
router.delete(
    '/reviews/:id(\\d+)',
    asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id, 10);
        const review = await db.Review.findByPk(id);

        if (!review) throw new Error('Cannot find review.');

        await db.Review.destroy({
            where: {
                id: review.id
            }
        });

        return res.json(review.id);
    })
);

module.exports = router;
