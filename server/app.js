const express = require('express');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const cors = require('cors')
const request = require('request');
dotenv.config();
const app = express().use('*',cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: false }));


const server = require('http').createServer(app);
server.listen(3001);

app.get('/jsonData',(req,res)=>{
    request('https://s3.ap-south-1.amazonaws.com/ss-local-files/products.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
           var importedJSON = JSON.parse(body);
           res.json({data:importedJSON})
        }
      })
})


console.log('server started')