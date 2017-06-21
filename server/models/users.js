const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
  email: {
    type:String,
    required: true,
    minlength:5,
    maxlength:50,
    trim: true,
    unique:true,
    validate:{
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password:{
    type:String,
    required:true,

  },
  tokens: [{
    access:{
      type:String,
      required:true
    },
    token:{
      type: String,
      required:true
    }
  }]
});

UserSchema.methods.toJSON = function (){
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject,['_id','email']);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id:user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token});
  return user.save().then(() => {
    return token;
  });
};
var users = mongoose.model('users', UserSchema);

module.exports = {users};



//
// var newUser = new users({
//   email: '   mh  cfff  '
// });
//
// newUser.save().then((docs) => {
//   console.log('saved to mongo' , docs);
// },(e) => {
//   console.log('un able to save', e);
// });
