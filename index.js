const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'))
})

app.use('/', router)

app.use(express.static(path.join(__dirname, './public')))

router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

module.exports = app;