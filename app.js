const path = require("path"); //provides utilities for working with file and directory paths.
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan"); //logs HTTP requests and errors in concole
const exphbs = require("express-handlebars"); //templating engine
const methodOverride = require("method-override"); //Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn’t support it.( like in our template)
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");

// LOAD CONFIG
dotenv.config({ path: "./config/config.env" });

//LOAD PASSPORT
require("./config/passport")(passport);

connectDB();

const app = express();

//BODY PARSER
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //layouts;
// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

//DETERMINE LEVEL OF LOGGING
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//HELPERS
const {
  stripTags,
  truncate,
  formatDate,
  editIcon,
  select,
} = require("./helpers/hbs");

//Handlebars
app.engine(
  ".hbs",
  exphbs.engine({
    helpers: {
      formatDate,
      stripTags,
      truncate,
      editIcon,
      select,
    },
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// SESSIONS
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

//SET GLOBAL VARIABLE
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

//STATIC FOLDER
app.use(express.static(path.join(__dirname, "public")));

//ROUTES
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/songs", require("./routes/songs"));
app.use("/network", require("./routes/network"));

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running on ${process.env.NODE_ENV} mode on PORT ${PORT}`)
);
