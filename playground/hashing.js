const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


var password = '123abc!';
bcrypt.genSalt(10, (err , salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});


var hashedPassword = '$2a$10$eYAEnV1mMyflKphvKfqAOuGziYly6NGNXSk.11GBNM9n5zxI179uG'
bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});
// var data = {
//   id:10
// };
//
// var token = jwt.sign(data,'123abc');
// console.log(token);
//
// var decoded = jwt.verify(token,'123abc');
// console.log('decoded', decoded);


// var message = 'i am a user 1';
// var hash = SHA256(message).toString();
// console.log('non hash password'+message);
// console.log('hash password =' +hash);
