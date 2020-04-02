const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const api = require('./routes/api/index.js');


app.get('/', (req, res) => res.send(__dirname+'/client/index.php'));


app.use(express.static('client'));

app.use('/api', api);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))




