const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/shorten-url", async (req, res) => {
  const inputUrl = req.body.url;

  if (!isValidUrl(inputUrl)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const url = process.env.API_URL;
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": process.env.API_KEY,
      "X-RapidAPI-Host": process.env.API_HOST,
    },
    body: new URLSearchParams({
      url: inputUrl,
    }),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const shortenedUrl = result.result_url;
    res.json({ shortenedUrl });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
