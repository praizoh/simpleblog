const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
const cors = require("cors");
app.use(cors()); 
const mongoose = require('mongoose');

const path = require('path')

require('./app/routes/posts.route')(app)

app.get('/', (req,res)=>{
    res.status(200).send('Welcome To Profinder')
  })

// Connect to port
const port = process.env.PORT || 8085     

app.listen(port, ()=> console.log(`listening on port ${port}...`));
mongoose.connect('mongodb+srv://profinder_application_db:mAbDA4o5vpC4pJ8p@cluster0-o8sgf.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!'); 
  }) 
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });