const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id:10
};

var token = jwt.sign(data,'123abc');
console.log(token);

var decoded = jwt.verify(token,'123abc');
console.log('decoded', decoded);
// var message = 'i am a user 1';
// var hash = SHA256(message).toString();
// console.log('non hash password'+message);
// console.log('hash password =' +hash);
