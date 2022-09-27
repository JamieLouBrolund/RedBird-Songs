express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");

const Network = require("../models/Network");

//@desc Showw add page
//@Route GET /network/add
router.get("/add", ensureAuth, (req, res) => {
  res.render("network/add");
});

//@desc Process add form
//@Route POST /songs
router.post("/", ensureAuth, async (req, res) => {
  try {
    //const result = await cloudinary.uploader.upload//(req.file.path);
    req.body.user = req.user.id;
    await Network.create(req.body);
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

//@desc Show edit page
//@Route GET /songs/edit/:id
router.get("/edit/:id", ensureAuth, async (req, res) => {
  try {
    const network = await Network.findOne({
      _id: req.params.id,
    }).lean();

    if (!network) {
      return res.render("error/404");
    }

    if (network.user != req.user.id) {
      res.redirect("/network");
    } else {
      res.render("network/edit", {
        network,
      });
    }
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

//@desc Update Song
//@Route PUT /songs/:id
router.put("/:id", ensureAuth, async (req, res) => {
  try {
    let network = await Network.findById(req.params.id).lean();

    if (!network) {
      return res.render("error/404");
    }

    if (network.user != req.user.id) {
      res.redirect("/network");
    } else {
      network = await Network.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      res.redirect("/dashboard");
    }
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

//@desc Delete song
//@Route DELETE /song/:id
router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    await Network.remove({ _id: req.params.id });
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// @desc    User songs
// @route   GET /songs/user/:userId
router.get("/user/:userId", ensureAuth, async (req, res) => {
  try {
    const network = await Network.find({
      user: req.params.userId,
    })
      .populate("user")
      .lean();

    res.render("network/index", {
      network,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
