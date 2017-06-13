const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err , db) => {
  if(err){
    return console.log('un able to connect to mongodb');
  }

  console.log('connect to mongodb');

// delete many
// db.collection('Todos').deleteMany({text: 'eat lunch'}).then ((result) => {
//   console.log(result);
// });


// delete one
// db.collection('Todos').deleteOne({text : 'eat lunch'}).then ((result) => {
//   console.log(result);
// });


//find and deleteOne
// db.collection('Todos').findOneAndDelete({completed :true}).then ((result) => {
//   console.log(result);
// });

// delete many in users collection
// db.collection('Users').deleteMany({name: 'mohamed zardheye'}).then ((result) => {
//   console.log(result);
// });


//findOne and Delete usres collectiion
db.collection('Users').findOneAndDelete({
  _id: new ObjectId('593f83e9eb05e3b27bc8abdb')
}).then((result) => {
  console.log(result);
});


  //db.close();
});
