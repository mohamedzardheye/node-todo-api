var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');



var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {users} = require('./models/users');



var app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo ({
    text: req.body.text
  });

  var otherTodo = new Todo({
    text:req.body.text,
    completed: true
  });

  otherTodo.save().then((doc) => {
    res.send(doc);

  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req,res) => {
  var id = req.params.id;

// validating object id
  if(!ObjectID.isValid(id)){
    res.status(404).send('Id is invalid');
  }

  Todo.findById(id).then((todo) => {
    if(!todo) {
    res.send('no to do');
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send('Error');
  });

});


app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};
