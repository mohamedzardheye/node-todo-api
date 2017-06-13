const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err , db) => {
  if(err){
    return console.log('un able to connect to mongodb');
  }

  console.log('connect to mongodb');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectId('593d5a07dccbf1025c6dd294')
  // },{
  //   $set: {
  //     completed: true
  //   }
  //   },{
  //     returnOriginal: false
  //   }).then((result) => {
  //     console.log(result);
  //   });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectId('593f934feb05e3b27bc8b14e')
  },{
      $set: {
        name: 'Bilal cige'
      },
  $inc : {
    age : -3
  }
}, {
    returnOriginal:false
  }).then((result) => {
    console.log(result);
  });
  // db.close();
});
