var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = {Todo};


// var newTodo = new Todo({
//   text: 'cook dinner'
// });

// newTodo.save().then((doc) => {
//   console.log('Saved Todo', doc);
// },(e) => {
//   console.log('unable to connect');
// });
