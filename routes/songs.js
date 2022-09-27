express = require("express");
const router = express.Router();
const cloudinary = require("../middleware/cloudinary");
const upload = require("../middleware/multer");
const { ensureAuth } = require("../middleware/auth");

const Song = require("../models/Song");

//@desc Showw add page
//@Route GET /songs/add
router.get("/add", ensureAuth, (req, res) => {
  res.render("songs/add");
});

//@desc Process add form
//@Route POST /songs
router.post("/", ensureAuth, async (req, res) => {
  try {
    //const result = await cloudinary.uploader.upload//(req.file.path, {
    //  resource_type: "video",
    //});
    //upload.single("file");

    await Song.create({
      title: req.body.title,
      body: req.body.body,
      songLink: req.body.songFile,
      //image: req.secure_url,
      //songFile: req.secure_url,
      //cloudinaryId: result.public_id,
      user: req.user.id,
    });
    req.body.user = req.user.id;
    //await Song.create(req.body);
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

//@desc Showw all public songs
//@Route GET /songs

router.get("/", ensureAuth, async (req, res) => {
  try {
    const songs = await Song.find({ status: "public" })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();
    res.render("songs/index", {
      songs,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

//@desc Show single song
//@Route GET /songs/:id
router.get("/:id", ensureAuth, async (req, res) => {
  try {
    let song = await Song.findById(req.params.id).populate("user").lean();

    if (!song) {
      return res.render("error/404");
    }

    res.render("songs/edit", {
      song,
    });
  } catch (err) {
    console.error(err);
    res.render("error/404");
  }
});

//@desc Show edit page
//@Route GET /songs/edit/:id
router.get("/edit/:id", ensureAuth, async (req, res) => {
  try {
    const song = await Song.findOne({
      _id: req.params.id,
    }).lean();

    if (!song) {
      return res.render("error/404");
    }

    if (song.user != req.user.id) {
      res.redirect("/songs");
    } else {
      res.render("songs/edit", {
        song,
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
    let song = await Song.findById(req.params.id).lean();

    if (!song) {
      return res.render("error/404");
    }

    if (song.user != req.user.id) {
      res.redirect("/songs");
    } else {
      song = await Song.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      });

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
    await Song.remove({ _id: req.params.id });
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
    const songs = await Song.find({
      user: req.params.userId,
    })
      .populate("user")
      .lean();

    res.render("songs/index", {
      songs,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
