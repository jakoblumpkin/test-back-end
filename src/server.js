'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
//const PORT = process.env.PORT || 3002;
const cors=require('cors');
const Data = require('./data.js');
const mongoose = require('mongoose');

app.use(cors());

app.use(express.json());

// const MONGODB_URI = process.env.MONGODB_URI;
// mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.urlencoded({extended:true}));

app.get('/', function (request, response) {
  response.send('Hello World');
});

app.get('/items', Data.getAllItems);
app.get('/items/:id', Data.getOneItem);
app.delete('/items/:id', Data.deleteOneItem);
app.post('/items', Data.addAnItem);
app.put('/items/:id', Data.updateOneItem);

app.use('*', (req,res) => {
  res.status(404).send('These are not the droids you are looking for.');
});

app.use( (error,req,res,next) => {
  res.status(500).send(`My Bad ... ${error.message}`);
});

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, console.log(`Server is up and running on port: ${port}`));
  },
};
