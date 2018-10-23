const express = require('express');
const app = express();
const port = process.env.PORT || 3100;
const bodyParser = require('body-parser');
const path = require("path")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('./controllers'));
app.use(express.static(path.join(__dirname, "client", "build")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log('Listening on port 3100...')
});