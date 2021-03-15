const express = require('express');
const bodyParser = require('body-parser')
const client = require('./esConfig');
const router  = require("./router");
require("dotenv").config();
require("./utility").resetIndex();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/",router);

app.set('port', process.env.APP_PORT || 3000);

client.ping({}, function(error) {
  if (error) {
      console.log('ES Cluster is down', error);
  } else {
      console.log('ES Cluster is up!');
  }
});

app.listen(app.get('port'), ()=>{
  console.log(`Express server listening on port, ${app.get('port')}`);
} );