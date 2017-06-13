const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err , db) => {
  if(err){
    return console.log('un able to connect to mongodb');
  }

  console.log('connected to mongodb');

//   db.collection('Todos').find({
//     _id: new ObjectId('593f7cbdeb05e3b27bc8aa24')
//   }).toArray().then ((docs) =>{
//     console.log('Todos');
//     console.log(JSON.stringify(docs, undefined, 2));
//   });


// db.collection('Todos').find().count().then ((count) =>{
//   console.log('Todos Count ',+ count);
// }, (err) => {
//   console.log('unable to fetch to do ', err);
// });


db.collection('Users').find({name: "mohamed zardheye"}).toArray() .then((docs) => {
  console.log('Users');
  console.log(JSON.stringify(docs, undefined, 2));
}, (err) => {
  console.log("un able to fetch users");
});


}); // end of connections
