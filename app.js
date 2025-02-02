const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const { sequelize } = require("./db/models");
const { restoreUser } = require("./auth");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const myGameGuidesRouter = require("./routes/my-game-guides");
const gameGuidesRouter = require("./routes/game-guides");
const countRouter = require("./routes/count-api");
const apiRouter = require("./routes/api");
const reviewsRouter = require('./routes/reviews');

const app = express();

// view engine setup
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// set up session middleware
const store = new SequelizeStore({ db: sequelize });

app.use(
  session({
    secret: "superSecret",
    store,
    saveUninitialized: false,
    resave: false,
    name: "ggg.sid",
  })
);

// create Session table if it doesn't already exist
store.sync();

app.use(restoreUser);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use(myGameGuidesRouter);
app.use("/game-guides", gameGuidesRouter);
app.use("/count", countRouter);
app.use("/api", apiRouter);
app.use(reviewsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  if (err.status === 404) {
    res.status(404)
    res.render("404-game-over")
  }else {
    res.status(err.status || 500);
    res.render("error");
  }
});

module.exports = app;
