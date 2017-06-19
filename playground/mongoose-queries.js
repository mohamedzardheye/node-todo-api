const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');



const {Todo} = require('./../server/models/todo');
const {users} = require('./../server/models/users');


var id =     '5944c8559c89f424888737b6';
var userId = '594375a318651a192c33b170';


if(!ObjectID.isValid(id,userId)){
  return console.log('ID NOT VALIED');
}
// Todo.find({
//   _id:id
// }).then((todos)=> {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id:id
// }).then((todo)=> {
//   console.log('Todos', todo);
// });

Todo.findById(id).then((todo)=> {
  if(!todo){
  return  console.log('id not found');
  }
  console.log('Todo By Id ', todo);
}).catch((e) => console.log(e));


users.findById(userId).then((User) => {
  if(!User){
    return console.log('user id not found');
  }
  console.log('User By id ', User);
}).catch((e) => console.log(e));
