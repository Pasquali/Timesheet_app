const express = require('express');
const app = express();
const hostname = 'localhost';
const port = process.env.PORT;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('./controllers'));

app.listen(port, hostname, function() {
  console.log('Listening on port 3100...')
});