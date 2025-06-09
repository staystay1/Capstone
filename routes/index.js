require("dotenv").config();
const apiKey = process.env.API_KEY;

const axios = require("axios");
const bodyParser = require("body-parser");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Link Scanner" });
});

router.post("/", async function (req, res, next) {
  const encodedUrl = btoa(req.body.txt).replace(/=+$/, "");

  if (!encodedUrl) {
    return res.status(400).json({ error: "Encoded URL is required" });
  }

  console.log("----------------");
  console.log(encodedUrl);

  try {
    const endpoint = `https://www.virustotal.com/api/v3/urls/${encodedUrl}`;

    const response = await axios.get(endpoint, {
      headers: {
        "x-apikey": apiKey,
      },
    });

    res.json(response.data);

    // res.json(response.data);
  } catch (error) {
    console.error("Error fetching link info:", error.message);
    res.status(500).json({ error: "Failed to fetch link info" });
  }

  // res.render("index", { title: "Link Scanner" });
});

module.exports = router;
