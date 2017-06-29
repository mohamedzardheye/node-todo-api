const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {users} = require('./../models/users');
const {todos, populateTodos,User, populateUsers} = require('./seed/seed');


beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('Should create a new todo ', (done) => {
    var text = 'test todo text';

    request(app)
    .post('/todos')
    .set('x-auth', User[0].tokens[0].token)
    .send({text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text);
    })
    .end((err, res) => {
      if(err){
        return done(err);
      }

      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => done(e));
    });
  });

it('should not create todo with invalid body data', (done) => {
  request(app)
    .post('/todos')
      .set('x-auth', User[0].tokens[0].token)
    .send({})
    .expect(400)
    .end((err, res) => {
      if(err){
        return done(err);
      }

      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();

      }).catch((e) => done(e));
    });
});
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
    .get('/todos')
      .set('x-auth', User[0].tokens[0].token)
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(1)
    })
    .end(done)
  });
});


describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
    .get('/todos/'+todos[0]._id.toHexString())
    .set('x-auth', User[0].tokens[0].token)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);

    })
    .end(done);
  });

  it('should not  return todo doc by other users', (done) => {
    request(app)
    .get('/todos/'+todos[0]._id.toHexString())
    .set('x-auth', User[0].tokens[0].token)
    .expect(200)
        .end(done);
  });

it('should return 404 if todo not found ', (done) => {

  var hexId = new ObjectID().toHexString();

        request(app)
          .get('/todos/'+123)
          .set('x-auth', User[0].tokens[0].token)
          .expect(404)
          .end(done);
});

it('should return 404 for non-object id', (done) => {
  request(app)
    .get('/todos/123abc')
    .set('x-auth', User[0].tokens[0].token)
    .expect(404)
    .end(done)
});




}); // end  describe

describe('DELETE /todos/:id', () => {


  it ('should remove a todo', (done) =>{
    var hexId = todos[1]._id.toHexString();

    request(app)
    .delete('/todos/'+hexId)
    .set('x-auth', User[1].tokens[0].token)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo._id).toBe(hexId);
  })
    .end((err, res) => {
      if(err){
        return done(err);
      }
 Todo.findById(hexId).then((todos) =>{

   expect(todos).toNotExist();
   done().catch((e) => done(e));
 });
});
});


  it('Should return 404 if todo not found', (done) =>{
    var hexId = new ObjectID().toHexString();

          request(app)
            .delete('/todos/'+12)
              .set('x-auth', User[1].tokens[0].token)
            .expect(404)
            .end(done);
  });

  it('should return 404 if object id is invaled',(done) =>
  {
    request(app)
      .delete('/todos/123abc')
        .set('x-auth', User[1].tokens[0].token)
      .expect(404)
      .end(done)
  });


}); // end describe



describe('Patch /todos/:id', () => {
  it('Should update the todo', (done) => {
    // garb id of first item
    var hexId = todos[1]._id.toHexString();
    var text = 'this should be the new text';

    request(app)
    .patch(`/todos/${hexId}`)
    .set('x-auth', User[1].tokens[0].token)
    .send({
      completed: true,
      text
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(true);
      expect(res.body.todo.completedAt).toBeA('number');
    })
    .end(done);
    // update text , set completed true
    //200
    // test is changed  completed true
  });

  it('should clear completedAt when todo is not completed', (done) =>{
    var hexId = todos[1]._id.toHexString();
    var text = 'This should be the new text!!';

    request(app)
      .patch(`/todos/${hexId}`)
        .set('x-auth', User[1].tokens[0].token)
      .send({
        completed: false,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done);
  });

});

describe('Get / users/me', () => {

  it('should retrun user if authenticated', (done) => {
    request(app)
    .get('/users/me')
    .set('x-auth', User[0].tokens[0].token)
    .expect(200)
    .expect((res) => {
      expect(res.body._id).toBe(User[0]._id.toHexString());
      expect(res.body.email).toBe(User[0].email);
    })
    .end(done);
  });

it('should return 401 if not authenticated', done => {
request(app)
  .get('/users/me')
  .expect(401)
  .expect((res) => {
    expect(res.body).toEqual({});
  })
  .end(done)
})
}) ; // end describe

describe('Post /USERS', () => {
  it('Should create a user', (done) =>{
    var email = 'expamle@expamle.com';
    var password = '1234ff';

    request(app)
    .post('/users')
    .send({email, password})
    .expect(200)
    .expect((res) => {
      expect(res.headers['x-auth']).toExist();
      expect(res.body._id).toExist();
      expect(res.body.email).toBe(email);
    })
    .end((err) => {
      if (err){
        return done(err);
      }
      users.findOne({email}).then((user) => {
        expect(user).toExist();
        expect(user.password).toNotBe(password);
        done();
      });
    });
  });

  it('should return validation error ', (done) => {
    var email = 'expamle';
    var password = '12';

    request(app)
    .post('/users')
    .send({email, password})
    .expect(400)

    .end(done);
  });

it('should not create user email if it in user ', (done) => {



  request(app)
  .post('/users')
  .send({email: User[0].email})
  .expect(400)

  .end(done);

});
});// end describe

describe('Post /users/login', () => {
  it('should login user and retrun auth token', (done) => {
    request(app)
    .post('/users/login')
    .send({
      email: User[1].email,
      password: User[1].password
    })
    .expect(200)
    .expect((res) => {
      expect(res.header['x-auth']).toExist();
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        users.findById(User[1]._id).then((user) => {
          expect(user.tokens[1]).toInclude({
            access: 'auth',
            token: res.headers['x-auth']
          });
          done();
        }).catch((e) => done(e));
      });
  });
  it('should reject in valid ', (done) => {

    request(app)
    .post('/users/login')
    .send({
      email: User[1].email,
      password: User[1].password +'1'
    })
    .expect(400)
    .expect((res) => {
      expect(res.header['x-auth']).toNotExist();
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        users.findById(User[1]._id).then((user) => {
          expect(user.tokens.length).toBe(1);
          done();
        }).catch((e) => done(e));
      });
  });
});


describe ('DELETE USERS/me . token', () => {
  it('should remove token on logout', (done) =>{
    request(app)
    .delete('/users/me/token')
    .set('x-auth', User[0].tokens[0].token)
    .expect(200)
    .end((err, res) => {
      if(err){
        return done(err);
      }
      users.findById(User[0]._id).then((user) => {
        expect(user.tokens.length).toBe(0);
        done();

      }).catch((e) => done(e));
    });
  })
})
