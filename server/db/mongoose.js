var mongoose = require('mongoose');
mongoose.Promise = global.Promise;


mongoose.connect(process.env.MONGODB_URI, (err, db ) => {
  if (err){
    return console.log('unable to connect to mongodb');
  }
  console.log('connected to mongodb ');
});

module.exports = {mongoose};
