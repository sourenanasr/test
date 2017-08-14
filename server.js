const express = require('express');
const app = express();

app.use(express.static('public'))

app.get('*', function (req, res) {
  res.redirect('/');
});

app.listen(process.env.PORT || 5000, function () {
  console.log(`Gemvision website listening on port ${process.env.PORT || 5000}!`)
});
