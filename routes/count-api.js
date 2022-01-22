const express = require("express");
const { user } = require("pg/lib/defaults");
const router = express.Router();
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("../utils");

const { checkCountOfShelfEntries } = require('../creation')

router.get("/status", asyncHandler(async (req, res) => {
      const { userId, statusId } = req.body;
  
      const count = checkCountOfShelfEntries(statusId)
      res.json({ count });
    })
  );

module.exports = router;