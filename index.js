const express = require("express");
const app = express();

app.get("/", function (req, res) {
	res.send("Hello World");
});

app.get("/metrics", function (req, res) {
  res.status(200).send("Ok")
})

app.listen(3000);
