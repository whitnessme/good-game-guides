const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const guides = [
    {title: 'Coming soon', author: "demo"},
    {title: 'Coming soon', author: "demo"}
  ]
  // const guides = await db.GameGuide.findAll()
  res.render("index", { title: "Home", guides});
});

module.exports = router;
