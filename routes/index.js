const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

const Song = require("../models/Song");

//@desc Login/Landing Page
//@Route GET /
router.get("/", ensureGuest, (req, res) => {
  res.render("login", { layout: "login" });
});

//@desc Dashboard
//@Route GET /dashboard
router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const songs = await Song.find({ user: req.user.id }).lean();
    console.log(req.user.id);
    console.log(songs);
    res.render("dashboard", {
      name: req.user.firstName,
      songs,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
