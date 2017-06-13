const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err , db) => {
  if(err){
    return console.log('un able to connect to mongodb');
  }

  console.log('connect to mongodb');
  // db.collection('Todos').insertOne({
  //     text: 'Something To do',
  //     completed: false
  // }, (err, result) => {
  //   if(err){
  //     return console.log('Unable to insert' , err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  db.collection('Users').insertOne({
    name: 'mohamed zardheye',
    age: 23,
    location: 'Hargeisa, somaliland'
  }, (err, result) => {
    if (err){
      return console.log('Unable to insert users', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  db.close();
});
