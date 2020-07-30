const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
const cors = require("cors");
app.use(cors()); 
app.use(express.urlencoded({
  extended:true
}))
let ejs = require('ejs');
const mongoose = require('mongoose');
const path = require('path')
const Post = require ("./app/models/posts.model")
// app.use("./public", express.static(__dirname + '/public'));
// app.use(express.static('public'))
app.use(express.static(__dirname + '/public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

require('./app/routes/posts.route')(app) 
require('./app/routes/users.route')(app) 
require('./app/routes/comments.routes')(app) 

  app.get('/', (req,res)=>{
    Post.find().sort({date_created: -1}).then(
      (posts)=>{
        // res.status(200).json({posts})
        res.render('pages/index', {
          posts: posts,
          
        });
      }
    ).catch(
      (error)=>{
        res.status(400).json({error:error})
      }
    )
       
  })  
 
  app.get('/addposts', (req,res)=>{  
    res.render('pages/addPosts');
  })

  app.get('/register', (req,res)=>{  
    res.render('pages/register');
  })
  app.get('/login', (req,res)=>{  
    res.render('pages/login');
  })
  app.get('/profile', (req,res)=>{  
    res.render('pages/profile');
  })
  

// Connect to port
const port = process.env.PORT || 8085       

app.listen(port, ()=> console.log(`listening on port ${port}...`));
// mongoose.connect('mongodb+srv://profinder_application_db:mAbDA4o5vpC4pJ8p@cluster0-o8sgf.mongodb.net/test?retryWrites=true&w=majority')
mongoose.connect('mongodb+srv://sca:ySwems6Q87IRzoi5@cluster0.q88tk.mongodb.net/simple_blog?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => { 
    console.log('Successfully connected to MongoDB Atlas!'); 
  }) 
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });