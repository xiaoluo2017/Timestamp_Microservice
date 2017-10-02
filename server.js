var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var express = require('express');
var app = express();

app.use(express.static('public'));
app.use(express.static('views'));

app.get("/", function (req, res) {
  res.sendFile("/index.html");
})

app.get("/:time", function (req, res) {
  var time = req.params.time, date;
  var isValid = /^[0-9]+$/.test(time);
  if (isValid) {
    date = new Date(parseInt(time) * 1000);
  } else {
    date = new Date(time.split(/[^0-9A-Za-z]/g).join(", "));
  }
  if (date.getTime() === null) res.send({unix: null, natrual: null});
  else res.send({unix: date.getTime() / 1000, natural: months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()});
})


app.listen(process.env.PORT, function () {
  console.log("listen start");
});
