var mongoose = require('mongoose');
mongoose.Promise = global.Promise;


mongoose.connect('mongodb://localhost:27017/TodoApp', (err, db ) => {
  if (err){
    return console.log('unable to connect to mongidb');
  }
  console.log('connected to mongodb ');
});

module.exports = {mongoose};
