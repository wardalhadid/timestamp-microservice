const express = require('express');
const app = express();
const moment = require('moment');

const port = process.env.PORT || 3000;

const PATH = __dirname + "/index.html";

app.get("/", (req, res) =>{
 res.sendFile(PATH);
});

app.get("/api/date?", (req, res) =>{
  res.send({
    unix: 0,
    utc: moment(0, 'x')
  });
})

app.get("/api", (req, res) =>{
  res.send({
    unix: 0,
    utc: moment(0, 'x')
  });
})

app.get("/api/:id", (req, res) =>{
  let date;
    const inputDate = req.params.id;

    if (moment(inputDate).isValid()) {
      date = {
        unix: moment(inputDate, 'MM-DD-YYYY').unix() * 1000,
        utc: moment(inputDate, 'MM-DD-YYYY')
      } 
    } 
    else if (moment(parseInt(inputDate), 'x').isValid()) {
      date = {
        unix: inputDate,
        utc: moment(inputDate, 'x')
      }
    }
    else{
      res.status(400).send('Invalid Date');
      return;
      }

    res.send(date); 
});

app.listen(port);