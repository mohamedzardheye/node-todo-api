const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');



const {Todo} = require('./../server/models/todo');
const {users} = require('./../server/models/users');


var id =     '5944c8559c89f424888737b6';
var userId = '594375a318651a192c33b170';


if(!ObjectID.isValid(id,userId)){
  return console.log('ID NOT VALIED');
}

//
// Todo.remove({}).then ((result) => {
//   console.log("Removed all tods",result);
// });

Todo.findByIdAndRemove('594766b3304843eeb5a3dcc1').then((todo) =>{
  console.log(todo);
});
