const jwt = require('jsonwebtoken');
const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {users} = require('./../../models/users');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const User = [{
  _id : userOneId,
  email: 'maxamed@gmail.com',
  password: '123abc',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id:userOneId,  access:'auth'}, 'abc123').toString()

  }]

},{
  _id: userTwoId,
  email:'jec@expamle.com',
  password:'userTwopass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id:userTwoId,  access:'auth'}, 'abc123').toString()

  }]
}];
const todos = [{
  _id : new ObjectID(),
  text: 'First test todo',
  _creator: userOneId
},
{
  _id : new ObjectID(),
  text: 'Second test Todo',
  completed: true,
  completedAt:333,
  _creator: userTwoId
}];


const populateTodos = ((done) => {
  Todo.remove({}).then (() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

const populateUsers = (done) => {
  users.remove({}).then (() => {
    var userOne = new users(User[0]).save();
    var userTwo = new users(User[1]).save();

    return Promise.all([userOne, userTwo])
  }).then (() => done());
};

module.exports = {todos, populateTodos , User, populateUsers};
