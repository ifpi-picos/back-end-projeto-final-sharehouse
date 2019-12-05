/* eslint-disable no-undef */
/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
const sinon = require('sinon');
const UsersController = require('../../../src/controllers/users');
const User = require('../../../src/models/user');

describe('Controller: Users', () => {
  const defaultUser = [
    {
      __v: 0,
      _id: '56cb91bdc3464f14678934ca',
      name: 'Default User',
      email: 'email@email.com',
      password: '12345678',
      role: 'user',
    },
  ];

  const defaultUserExpected = {
    _id: '56cb91bdc3464f14678934ca',
    name: 'Default User',
    email: 'email@email.com',
    role: 'user',
  };

  describe('get() Users', () => {
    it('should call send with a list of Users', () => {
      User.find = sinon.stub();
      User.find.withArgs({}).resolves(defaultUser);
      const usersController = new UsersController(User);
      return usersController.get().then((result) => {
        expect(result).to.eql(defaultUser);
      });
    });

    it('should return 400 when an error occurs', () => {
      User.find = sinon.stub();
      User.find.withArgs({}).rejects('Error400');
      const usersController = new UsersController(User);
      return usersController
        .get()
        .then(() => {})
        .catch((err) => {
          expect(err.message).to.eql('Error400');
        });
    });
  });

  describe('getById()', () => {
    it('should call send with one User', () => {
      const fakeId = 'a-fake-id';
      User.find = sinon.stub();
      User.find.withArgs({ _id: fakeId }).resolves(defaultUserExpected);
      const usersController = new UsersController(User);
      return usersController.getById(fakeId).then((result) => {
        expect(result).to.eql(defaultUserExpected);
      });
    });
  });

  describe('create() User', () => {
    it('should call send with a new User', () => {
      class fakeUser {
        save() {}
      }
      sinon
        .stub(fakeUser.prototype, 'save')
        .withArgs()
        .resolves();

      const usersController = new UsersController(fakeUser);
      return usersController.create(defaultUser).then((result) => {
        expect(result).to.eql(undefined);
      });
    });

    context('when an error occurs', () => {
      it('should return 400', () => {
        class fakeUser {
          save() {}
        }
        sinon
          .stub(fakeUser.prototype, 'save')
          .withArgs({})
          .rejects('Error400');
        const usersController = new UsersController(fakeUser);
        return usersController
          .create(defaultUser)
          .then(() => {})
          .catch((err) => {
            expect(err.message).to.eql('Error400');
          });
      });
    });
  });

  describe('update() User', () => {
    it('should respond with 200 when the User has been updated', () => {
      const fakeId = '56cb91bdc3464f14678934ca';
      const updatedUser = {
        _id: fakeId,
        nome: 'Default User',
        email: 'novo@email.com',
        password: 'password',
        role: 'user',
      };
      class fakeUser {
        static find() {}

        save() {}
      }
      // eslint-disable-next-line new-cap
      const fakeUsersInstance = new fakeUser();
      const findOneAndUpdateStub = sinon.stub(fakeUser, 'find');
      findOneAndUpdateStub.withArgs({ _id: fakeId }).resolves(fakeUsersInstance);
      const usersController = new UsersController(fakeUser);
      return usersController.update(fakeId, updatedUser).then((result) => {
        expect(result).to.eql(undefined);
      });
    });

    context('when an error occurs', () => {
      it('should return 400', () => {
        const fakeId = 'a-fake-id';
        const updatedUser = {
          _id: fakeId,
          name: 'Updated User',
          email: 'Updated email',
        };
        class fakeUser {
          static find() {}
        }
        const findOneAndUpdateStub = sinon.stub(fakeUser, 'find');
        findOneAndUpdateStub.withArgs({ _id: fakeId }).rejects('Error400');
        const usersController = new UsersController(fakeUser);
        return usersController
          .update(fakeId, updatedUser)
          .then(() => {})
          .catch((err) => {
            expect(err.message).to.eql('Error400');
          });
      });
    });
  });

  describe('delete() User', () => {
    it('should respond with 200 when the User has been deleted', () => {
      const fakeId = 'a-fake-id';
      class fakeUser {
        static deleteOne() {}
      }

      const removeStub = sinon.stub(fakeUser, 'deleteOne');
      removeStub.withArgs({ _id: fakeId }).resolves([1]);
      const usersController = new UsersController(fakeUser);
      return usersController
        .remove(fakeId)
        .then(() => {})
        .catch((err) => {
          expect(err.message).to.eql(1);
        });
    });

    context('when an error occurs', () => {
      it('should return 400', () => {
        const fakeId = 'a-fake-id';
        class fakeUser {
          static deleteOne() {}
        }
        const removeStub = sinon.stub(fakeUser, 'deleteOne');
        removeStub.withArgs({ _id: fakeId }).rejects({ message: 'Error400' });
        const usersController = new UsersController(fakeUser);
        return usersController
          .remove(fakeId)
          .then(() => {})
          .catch((err) => {
            expect(err.message).to.eql('Error400');
          });
      });
    });
  });
});
