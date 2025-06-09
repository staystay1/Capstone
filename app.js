const apiKey = process.env.API_KEY;
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.post("/api/linkinfo", async (req, res) => {
  const { encodedUrl } = req.body; // Accept the already encoded URL

  if (!encodedUrl) {
    return res.status(400).json({ error: "Encoded URL is required" });
  }

  try {
    const endpoint = `https://www.virustotal.com/api/v3/urls/${encodedUrl}`;

    const response = await axios.get(endpoint, {
      headers: {
        "x-apikey": apiKey,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching link info:", error.message);
    res.status(500).json({ error: "Failed to fetch link info" });
  }
});

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
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
