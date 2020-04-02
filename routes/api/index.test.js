var axios = require('axios');
const mysql = require('mysql');

var con;


let url = "https://www.lyne1-17.wbs.uni.worc.ac.uk/api";


it("will switch on lights works.", async ()=>{
    expect.assertions(1);

    let req = axios.post(url+'/switchLights', {
        lightId: '17',
        turnOn: 'true',
        userName:'test1',
        color:'#FFFFF'
      }).then((res)=>{
        return res.data;
      });

    return await expect(req).resolves.toEqual("Light On!");
});


it("will switch off lights works.", async ()=>{
    expect.assertions(1);

    let req = axios.post(url+'/switchLights', {
        lightId: '17',
        turnOn: 'false',
        userName:'test1',
        color:'#FFFFF'
      }).then((res)=>{
        return res.data;
      });

    return await expect(req).resolves.toEqual("Light Off!");
});



//Need to add one at start

it("will add a light for a user.", async ()=>{
    expect.assertions(1);

    con = mysql.createConnection({
      host: "172.16.11.22",
      user: "balm2_admin",
      password: "admin123",
      database: "balm2_17_homespotdb"
    });
    
    
    // get the table which to insert the on/off value
    let table = "PHILIPSLIGHT";
  
    //insert statement
    let sql = "INSERT INTO " + table + "(Name, Colour, Username, OnOff) VALUES ('lol', 'FFTFSA', 'test', 'false');";
  
    var sqlProm =  new Promise((resolve)=>{
      con.connect(function (err) {
        if (err) throw err;
        con.query(sql, function (err, result, fields) {
          if (err) throw err;
          resolve(result);
        });
      });
    });

    let resp = await sqlProm;
    resp = resp.affectedRows;

    return expect(resp).toEqual(1);
});



it("will delete a light for a user.", async ()=>{
  expect.assertions(1);

  con = mysql.createConnection({
    host: "172.16.11.22",
    user: "balm2_admin",
    password: "admin123",
    database: "balm2_17_homespotdb"
  });
  
  
  // get the table which to insert the on/off value
  let table = "PHILIPSLIGHT";

  //insert statement
  let sql = "INSERT INTO " + table + "(Name, Colour, Username, OnOff) VALUES ('lol', 'FFTFSA', 'test', 'false');";

  var ret = new Promise((resolve)=>{
    con.connect(function (err) {
      if (err) throw err;
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
    });
  }).then(async (data)=>{

    let id = data.insertId;

    con = mysql.createConnection({
      host: "172.16.11.22",
      user: "balm2_admin",
      password: "admin123",
      database: "balm2_17_homespotdb"
    });
    
    // get the table which to insert the on/off value
    let table = "PHILIPSLIGHT";
  
    //insert statement
    let sql = "DELETE FROM " + table + " WHERE Id="+id+";";
    console.log(sql);
    let deletePart = new Promise((resolve)=>{
      con.connect(function (err) {
        if (err) throw err;
        con.query(sql, function (err, result, fields) {
          if (err) throw err;
          resolve(result);
        });
      });
    });

    let resp = await deletePart;
    resp = resp.affectedRows;

    return expect(resp).toEqual(1);
  });

  return await ret;
});
