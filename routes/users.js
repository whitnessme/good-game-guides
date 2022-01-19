const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("../utils");
const bcrypt = require("bcryptjs");
const { loginUser, logoutUser } = require("../auth");

const userValidators = [
  check('fullName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for the Name')
    .isLength({ max: 100 })
    .withMessage('Name must not be more than 100 characters'),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for the Email address')
    .isLength({ max: 50 })
    .withMessage('Email address must not be more than 50 characters')
    .isEmail()
    .withMessage('Email address is not a valid email')
    .custom((value) => {
      return db.User.findOne({ where: { emailAddress: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided Email Address is already in use by another account');
          }
        });
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for the Password')
    .isLength({ max: 50 })
    .withMessage('Password must not be more than 50 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")')
];

router.get("/signup", csrfProtection, (req, res) => {
  const user = db.User.build();
  res.render('user-signup', {
    title: 'Sign Up',
    user,
    csrfToken: req.csrfToken()
  });
});

router.post("/signup", csrfProtection, userValidators, asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  const user = db.User.build({ fullName, email, password });

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.hashedPassword = hashedPassword;
    await user.save();
    loginUser(req, res, user);
    res.redirect('/');
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('user-signup', {
      title: 'Sign Up',
      user,
      errors,
      csrfToken: req.csrfToken()
    });
  }
}));

router.get("/login");
router.post("/login");

router.post("/logout", (req, res) => {
  logoutUser(req, res);
  res.redirect("/users/login");
});
module.exports = router;
