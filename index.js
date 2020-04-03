const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Helo, work");
});

//'/' represents root of website, second argument is a callback funciton
// req has many properties,
// expressjs.com  - lookup api reference

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
