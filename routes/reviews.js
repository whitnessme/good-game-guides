const express = require("express");
const { check, validationResult } = require("express-validator");

const { csrfProtection, asyncHandler } = require("../utils");
const db = require("../db/models");

const router = express.Router();

const reviewValidators = [
    check('rating')
        .exists({ checkFalsy: true })
        .withMessage('If you would like to submit a review, please provide a rating from 1 heart (did not like it) to 5 hearts (it was amazing).')
];

// READ - Get the form to create a new review
router.get(
    '/game-guides/:id(\\d+)/reviews/new/:rating(\\d+)',
    csrfProtection,
    asyncHandler(async (req, res) => {
        const { userId } = req.session.auth;
        const gameGuideId = parseInt(req.params.id, 10);
        const rating = parseInt(req.params.rating, 10);

        const gameGuide = await db.GameGuide.findByPk(gameGuideId);

        res.render('new-review', {
            title: 'Leave a Review',
            userId,
            gameGuideId,
            gameGuide,
            rating,
            csrfToken: req.csrfToken()
        });
    })
);

// CREATE - User creates a rating/review
router.post(
    '/game-guides/:id(\\d+)/reviews/new',
    csrfProtection,
    reviewValidators,
    asyncHandler(async (req, res) => {
        const { userId } = req.session.auth;
        const gameGuideId = parseInt(req.params.id, 10);
        const { rating, reviewText } = req.body;
        const gameGuide = await db.GameGuide.findByPk(gameGuideId);

        const validatorErrors = validationResult(req);

        if (validatorErrors.isEmpty()) {
            const review = await db.Review.create({
                rating,
                reviewText,
                userId,
                gameGuideId,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            res.redirect(`/game-guides/${gameGuideId}`);
        } else {
            const errors = validatorErrors.array().map(error => error.msg);

            res.render('new-review', {
                title: 'Leave a Review',
                userId,
                gameGuideId,
                gameGuide,
                rating,
                errors,
                csrfToken: req.csrfToken()
            });
        }
    })
);

// READ - Get the form to edit a review
router.get(
    '/game-guides/:gameGuideId(\\d+)/reviews/:id(\\d+)/edit',
    csrfProtection,
    asyncHandler(async (req, res) => {
        const gameGuideId = parseInt(req.params.gameGuideId, 10);
        const reviewId = parseInt(req.params.id, 10);
        const review = await db.Review.findByPk(reviewId);

        const gameGuide = await db.GameGuide.findByPk(gameGuideId);

        if (!review) throw new Error('Cannot find review.');

        res.render('edit-review', {
            title: 'Edit Your Review',
            gameGuideId,
            gameGuide,
            reviewId,
            rating: review.rating,
            reviewText: review.reviewText,
            csrfToken: req.csrfToken()
        });
    })
);

// UPDATE - User updates their rating/review
router.post(
    '/game-guides/:gameGuideId(\\d+)/reviews/:id(\\d+)/edit',
    csrfProtection,
    reviewValidators,
    asyncHandler(async (req, res) => {
        const gameGuideId = parseInt(req.params.gameGuideId, 10);
        const reviewId = parseInt(req.params.id, 10);
        const review = await db.Review.findByPk(reviewId);
        const gameGuide = await db.GameGuide.findByPk(gameGuideId);

        const { rating, reviewText } = req.body;

        if (!review) throw new Error('Cannot find review.');

        const validatorErrors = validationResult(req);

        if (validatorErrors.isEmpty()) {
            const updatedReview = await review.update({
                rating,
                reviewText,
                updatedAt: new Date()
            });

            res.redirect(`/game-guides/${gameGuideId}`);
        } else {
            const errors = validatorErrors.array().map(error => error.msg);

            res.render('edit-review', {
                title: 'Edit Your Review',
                gameGuideId,
                gameGuide,
                reviewId,
                rating: review.rating,
                reviewText: review.reviewText,
                errors,
                csrfToken: req.csrfToken()
            });
        }
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
