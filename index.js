const express = require('express');
const app = express();
const moment = require('moment');

const port = process.env.PORT || 3000;

const PATH = __dirname + "/index.html";

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

app.get("/", (req, res) =>{
 res.sendFile(PATH);
});

app.get("/api/date_string", (req, res) =>{
  res.json(
    moment(0, 'x').format('ddd, D MMM YYYY HH:mm:ss') + ' GMT'
  );
})

app.get("/api", (req, res) =>{
  res.send({
    unix: parseInt(new Date().valueOf()),
    utc: new Date().toUTCString()
  });
})

app.get("/api/:date_string", (req, res) =>{
  let date;
    const inputDate = req.params.date_string ;

    if (moment(inputDate).isValid()) {
      date = {
        unix: parseInt(new Date(inputDate).valueOf()),
        utc: new Date(parseInt(new Date(inputDate).valueOf())).toUTCString()
      } 
    } 
    else if (moment(parseInt(inputDate), 'x').isValid()) {
      date = {
        unix: parseInt(inputDate),
        utc: new Date(parseInt(inputDate)).toUTCString()
      }
    }
    else{
      res.status(400).send({error: 'Invalid Date'});
      return;
      }

    res.send(date); 
});

app.listen(port);