const mongoose = require('mongoose');
console.log('mongo here')
const db =mongoose.connect('mongodb+srv://profinder_application_db:mAbDA4o5vpC4pJ8p@cluster0-o8sgf.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  }) 
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

  module.exports = db;