require('./config/config');

var express = require('express');
const _ = require('lodash');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {users} = require('./models/users');

var app = express();
const port = process.env.PORT || 3000;
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


app.delete('/todos/:id', (req,res) => {
  var delete_id = req.params.id;

  if(!ObjectID.isValid(delete_id)){
      return res.status(404).send('Id is invalid');
  }

  Todo.findByIdAndRemove(delete_id).then((todo) =>{
    if(!todo){
    return res.send('No to do ');
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send('error');
  });
});


app.patch('/todos/:id', (req, res) => {
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

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});
// app.patch('/todos/:id', (req, res) => {
//   var id = req.params.id;
//   var body = _.pick(req.body, ['text', 'completed']);
//
//   if (!ObjectID.isValid(id)) {
//     return res.status(404).send();
//   }
//
//   if (_.isBoolean(body.completed) && body.completed) {
//     body.completedAt = new Date().getTime();
//   } else {
//     body.completed = false;
//     body.completedAt = null;
//   }
//
//   Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
//     if (!todo) {
//       return res.status(404).send();
//     }
//
//     res.send({todo});
//   }).catch((e) => {
//     res.status(400).send();
//   })
// });

app.listen(port, () => {
  console.log('Started up at port'+port);
});

module.exports = {app};
