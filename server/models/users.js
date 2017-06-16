var mongoose = require('mongoose');



var users = mongoose.model('users', {
  email: {
    type:String,
    required: true,
    minlength:5,
    maxlength:20,
    trim: true
  }
});

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
