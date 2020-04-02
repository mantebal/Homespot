const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const fetch = require("node-fetch");
router.use(express.json());

var con = mysql.createConnection({
  host: "172.16.11.22",
  user: "balm2_admin",
  password: "admin123",
  database: "balm2_17_homespotdb"
});


//Turn the light on or off
router.post('/switchLights', function switchLights(req, res){
  let data = req.body;
  let lightId = data.lightId;
  let turnOn = data.turnOn;
  let userName = data.username;
  let color = data.color;

  
  //Change Device
  fetch('http://ec2-34-217-73-34.us-west-2.compute.amazonaws.com:8080/api/switchLights', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userName, turnOn, lightId, color })
  }).then((res)=>{
    console.log(res);
  });

  //update DB
  //let trueFalse = turnOn ? "1" : "0";

  // get the table which to insert the on/off value
  let table = "PHILIPSLIGHT";

  //insert statement
  let sql = "UPDATE " + table + " SET OnOff = '" + turnOn + "', Colour = '"+color+"' WHERE Username = '" + userName + "' AND Id = " + lightId + ";";
  let result;
  con.connect(function (err) {
    if (err) throw err;
    con.query(sql, function (err, result, fields) {
      if (err) res.send(err);
      res.send(result);
    });
  });

  let resString = JSON.parse(turnOn) ? "Light On!" : "Light Off!";
});

//TODO


//GET ALL devices FOR USER
router.get('/devices/:id', () => {
  //insert statement
  let sql = "UPDATE " + table + " SET Colour = '" + color + "' WHERE Username = '" + userName + "' AND Id = " + deviceId + ";";

  var data;
  con.connect(function (err) {
    if (err) throw err;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      data = res
    });
  });
  res.send(data);
});

//CHANGE THE COLOR OF A LIGHT
router.post('/changeColor', (req, res) => {
  let data = req.body;
  let deviceId = data.deviceId;
  let color = data.color || data.colour;

  let userName = data.username;



  // get the table which to change the name
  let table = "PHILIPSLIGHT";

  //insert statement
  let sql = "UPDATE " + table + " SET Colour = '" + color + "' WHERE Username = '" + userName + "' AND Id = " + deviceId + ";";

  con.connect(function (err) {
    if (err) throw err;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });

  res.send("Light is now "+color);
});

//CHANGE THE name OF A DEVICE
router.put('/changeName', (req, res) => {
  let data = req.body;
  let deviceId = data.deviceId;
  let NewName = data.name;

  let userName = data.username;



  // get the table which to change the name
  let table = data.type;

  //insert statement
  let sql = "UPDATE " + table + " SET Name = '" + NewName + "' WHERE Username = '" + userName + "' AND Id = " + deviceId + ";";

  con.connect(function (err) {
    if (err) throw err;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });

  res.send("device is now called " + NewName);
});

//DELETE A DEVICE
router.delete('/removeDevice', (req, res) => {
  let data = req.body;
  let deviceId = data.deviceId;

  let userName = data.username;



  // get the table which to change the name
  let table = data.type;

  //insert statement
  let sql = "DELETE FROM " + table + " WHERE Username = '" + userName + "' AND Id = " + deviceId + ";";

  con.connect(function (err) {
    if (err) throw err;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });

  res.send("device has been deleted");
});

//UPDATE an alarm
router.put('/updateAlarm', (req, res) => {
  let data = req.body;
  let alarmId = data.alarmId;
  let turnOn = JSON.parse(data.turnOn);

  let userName = data.username;

  //update DB
  let trueFalse = turnOn ? "1" : "0";
  // get the table which to insert the on/off value
  let table = "ALARM";

  //insert statement
  let sql = "UPDATE " + table + " SET OnOff = " + trueFalse + ", Time = " + Date.now() + " WHERE Username = '" + userName + "' AND Id = " + alarmId + ";";

  con.connect(function (err) {
    if (err) throw err;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });
  res.send("device updated");
});




module.exports = router;
