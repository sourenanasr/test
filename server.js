const express = require('express');
const app = express();
const bodyParser  = require('body-parser');
const nodemailer = require('nodemailer');
const emailConfig = require('./email.config.json');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.get('/public/:file', function (req, res) {
//   res.sendFile('public/' + req.params.file, { root : __dirname });
// });

var transporter = nodemailer.createTransport({
  service: emailConfig.service,
  auth: {
      user: emailConfig.username, // Your email id
      pass: emailConfig.password // Your password
  }
});

app.post('/email', function(req, res) {
  var message = emailConfig.template.replace("{{company-name}}", req.body.companyName)
                                    .replace("{{sur-name}}", req.body.surName)
                                    .replace("{{email}}", req.body.email)
                                    .replace("{{phone-number}}", req.body.phoneNumber)
                                    .replace("{{additional-info}}", req.body.additionalInfo);
  var mailOptions = {
      from: emailConfig.sender, // sender address
      to: emailConfig.reciever, // list of receivers
      subject: 'Demo Request', // Subject line
      html: message // You can choose to send an HTML body instead
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({successful: false, message: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({successful: true, message: info.response});
    };
  });
});

app.get('*', function (req, res) {
  // res.send('Hello');
  res.redirect('/');
});

app.listen(process.env.PORT || 3333, function () {
  console.log(`Gemvision website listening on port ${process.env.PORT || 3333}!`)
});
