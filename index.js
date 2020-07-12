const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
const cors = require("cors");
app.use(cors()); 
let ejs = require('ejs');
const mongoose = require('mongoose');

const path = require('path')
// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

require('./app/routes/posts.route')(app)

  app.get('/', (req,res)=>{
    res.render('pages/index'); 
  })

// Connect to port
const port = process.env.PORT || 8085       

app.listen(port, ()=> console.log(`listening on port ${port}...`));
// mongoose.connect('mongodb+srv://profinder_application_db:mAbDA4o5vpC4pJ8p@cluster0-o8sgf.mongodb.net/test?retryWrites=true&w=majority')
mongoose.connect('mongodb+srv://sca:ySwems6Q87IRzoi5@cluster0.q88tk.mongodb.net/simple_blog?retryWrites=true&w=majority')
  .then(() => { 
    console.log('Successfully connected to MongoDB Atlas!'); 
  }) 
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });