const express = require('express');
const app = express();

app.use(express.static('public'))

// app.get('/public/:file', function (req, res) {
//   res.sendFile('public/' + req.params.file, { root : __dirname });
// });

app.get('*', function (req, res) {
  // res.send('Hello');
  res.redirect('/');
});

app.listen(process.env.PORT || 3333, function () {
  console.log(`Gemvision website listening on port ${process.env.PORT || 3333}!`)
});
