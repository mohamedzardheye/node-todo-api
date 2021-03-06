require('./config/config');

var express = require('express');
const _ = require('lodash');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {users} = require('./models/users');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());



app.post('/todos', authenticate, (req, res) => {
  var todo = new Todo ({
    text: req.body.text,
    _creator: req.user._id
  });
  var otherTodo = new Todo({
    text:req.body.text,
    completed: true,
      _creator: req.user._id
  });

  otherTodo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator:req.user._id
  }).then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', authenticate,(req,res) => {
  var id = req.params.id;

// validating object id
  if(!ObjectID.isValid(id)){
    res.status(404).send('Id is invalid');
  }

  Todo.findOne({
    _id: id,
    _creator:req.user._id
  }).then((todo) => {
    if(!todo) {
    res.send('no to do');
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send('Error');
  });

});


app.delete('/todos/:id', authenticate, (req,res) => {
  var delete_id = req.params.id;

  if(!ObjectID.isValid(delete_id)){
      return res.status(404).send('Id is invalid');
  }

  Todo.findOneAndRemove({
    _id: delete_id,
  _creator:req.user._id
}).then((todo) =>{
    if(!todo){
    return res.send('No to do ');
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send('error');
  });
});


app.patch('/todos/:id',authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({
    _id: id,
    _creator:req.user._id
  }, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});





// POST /users
app.post('/users',(req, res) =>{

  var body = _.pick(req.body, ['email', 'password']);
  var user = new users(body);

  user.save().then(() =>{
    return user.generateAuthToken();

  }).then((token) =>{
    res.header('x-auth',token).send(user);

  }).catch((e) => {
    res.status(400).send(e);
  });
});



app.get('/users/me',authenticate, (req, res)  => {
  res.send(req.user);
});

// post / users./ login
app.post('/users/login', (req, res) =>{
  var body = _.pick(req.body, ['email', 'password']);

  users.findByCredentials(body.email, body.password).then((user) => {
    return   user.generateAuthToken().then((token) => {
  res.header('x-auth',token).send(user);
});
  }).catch((e) => {
    res.status(400).send();
  });

});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then (() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});


app.listen(port, () => {
  console.log('Started at'+port);
});

module.exports = {app};
