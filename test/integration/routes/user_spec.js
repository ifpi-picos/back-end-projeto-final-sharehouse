/* eslint-disable no-underscore-dangle */
/* global setupApp supertest expect */
const User = require('../../../src/models/user');
const message = require('../../../src/utils/message.json');

describe('Routes: users', () => {
  let request;

  before(() => setupApp()
    .then((app) => {
      request = supertest(app);
    }).catch((err) => {
      throw new Error(err);
    }));

  const defaultId = '56cb91bdc3464f14678934ca';

  const defaultUser = {
    name: 'Default User',
    email: 'email@email.com',
    password: '12345678',
  };
  const expectedUser = {
    _id: defaultId,
    name: 'Default User',
    email: 'email@email.com',
  };

  beforeEach(() => {
    const user = new User(defaultUser);
    user._id = defaultId;
    return User.deleteMany({})
      .then(() => user.save());
  });

  afterEach(() => User.deleteMany({}));

  // after(() => process.exit());

  describe('GET /api/users', () => {
    it('should return a list of users', (done) => {
      request
        .get('/users')
        .end((err, res) => {
          expect(res.body[0]).to.eql(expectedUser);
          done(err);
        });
    });

    context('when an id is specified', () => {
      it('should return 200 with one User', (done) => {
        request
          .get(`/users/${defaultId}`)
          .end((err, res) => {
            expect(res.statusCode).to.eql(200);
            expect(res.body[0]).to.eql(expectedUser);
            done(err);
          });
      });
    });
  });

  describe('POST /users', () => {
    context('when posting a User', () => {
      it('should return a `success` with status code 201', (done) => {
        const customId = '56cb91bdc3464f14678934ba';
        const newUser = { _id: customId, __v: 0, ...defaultUser };

        request
          .post('/users')
          .send(newUser)
          .end((err, res) => {
            expect(res.statusCode).to.eql(201);
            expect(res.text).to.eql(message.success.createUser);
            done(err);
          });
      });
    });
  });

  describe('PUT /users/:id', () => {
    context('when editing a User', () => {
      it('should update the User and return 200 as status code', (done) => {
        const customUser = {
          name: 'Custom name',
        };
        const updatedUser = { ...customUser, ...defaultUser };

        request
          .put(`/users/${defaultId}`)
          .send(updatedUser)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            done(err);
          });
      });
    });
  });

  describe('DELETE /users/:id', () => {
    context('when deleting a User', () => {
      it('should delete a User and return 204 as status code', (done) => {
        request
          .delete(`/users/${defaultId}`)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            done(err);
          });
      });
    });
  });
});
