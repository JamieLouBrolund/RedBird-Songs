express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const Contact = require("../models/Contact");

//@desc Showw add page
//@Route GET /network/add
router.get("/addContact", ensureAuth, (req, res) => {
  res.render("contacts/addContact");
});

//@desc Process add form
//@Route POST /contact
router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Contact.create({
      body: req.body.body,
      name: req.body.name,
      pro: req.body.pro,
      location: req.body.location,
      email: req.body.email,
      user: req.user.id,
    });
    res.redirect("/network");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

//@desc Show edit page
//@Route GET /contact/edit/:id
router.get("/editContact/:id", ensureAuth, async (req, res) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
    }).lean();

    if (!contact) {
      return res.render("error/404");
    }

    if (contact.user != req.user.id) {
      res.redirect("/contacts");
    } else {
      res.render("contacts/editContact", {
        contact,
      });
    }
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

//@desc Update Contact
//@Route PUT /contacts/:id
router.put("/:id", ensureAuth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id).lean();

    if (!contact) {
      return res.render("error/404");
    }

    if (contact.user != req.user.id) {
      res.redirect("/contacts");
    } else {
      contact = await Contact.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      res.redirect("/network");
    }
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

//@desc Delete contact
//@Route DELETE /contacts/:id
router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    await Contact.remove({ _id: req.params.id });
    res.redirect("/network");
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// @desc    User Contact
// @route   GET /contact/user/:userId
router.get("/user/:userId", ensureAuth, async (req, res) => {
  try {
    const contact = await Contact.find({
      user: req.params.userId,
    })
      .populate("user")
      .lean();

    res.render("contacts/index", {
      contact,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
