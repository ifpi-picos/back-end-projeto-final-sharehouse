// eslint-disable-next-line max-classes-per-file
const sinon = require('sinon');
const HouseController = require('../../../src/controllers/house');
const House = require('../../../src/models/house');

describe('Controller: House', () => {
  const defaultHouse = {
    endereco: {
      estado: 'Maranhão',
      cidade: 'são Raimundo das Mangabeiras',
      bairro: 'São Francisco',
      rua: '13 de maio',
      complemento: 'paragás',
      numero: 81,
    },
    valor: 200,
    __v: 0,
    _id: '56cb91bdc3464f14678934ca',
  };
  const expectHouse = {
    endereco: {
      estado: 'Maranhão',
      cidade: 'são Raimundo das Mangabeiras',
      bairro: 'São Francisco',
      rua: '13 de maio',
      complemento: 'paragás',
      numero: 81,
    },
    valor: 200,
    _id: '56cb91bdc3464f14678934ca',
  };
  describe('get() Houses', () => {
    it('should call send with a list of Houses', () => {
      House.find = sinon.stub();
      House.find.withArgs({}).resolves(defaultHouse);
      const houseController = new HouseController(House);
      return houseController.get().then((result) => {
        // eslint-disable-next-line no-undef
        expect(result).to.eql(defaultHouse);
      });
    });

    it('should return 400 when an error occurs', () => {
      House.find = sinon.stub();
      House.find.withArgs({}).rejects('Error400');
      const houseController = new HouseController(House);
      return houseController
        .get()
        .then(() => { })
        .catch((err) => {
          // eslint-disable-next-line no-undef
          expect(err.message).to.eql('Error400');
        });
    });
  });
  describe('getById()', () => {
    it('should call send with one House', () => {
      const fakeId = 'a-fake-id';
      House.find = sinon.stub();
      House.find.withArgs({ _id: fakeId }).resolves(expectHouse);
      const houseController = new HouseController(House);
      return houseController.getByID(fakeId).then((result) => {
        // eslint-disable-next-line no-undef
        expect(result).to.eql(expectHouse);
      });
    });
  });

  describe('create() House', () => {
    it('should call send with a new House', () => {
      class fakeHouse {
        // eslint-disable-next-line class-methods-use-this
        save() { }
      }
      sinon
        .stub(fakeHouse.prototype, 'save')
        .withArgs()
        .resolves();
      const houseController = new HouseController(fakeHouse);
      return houseController.create(defaultHouse).then((result) => {
        // eslint-disable-next-line no-undef
        expect(result).to.eql(undefined);
      });
    });
    context('when an error occurs', () => {
      it('should return 400', () => {
        class fakeHouse {
          // eslint-disable-next-line class-methods-use-this
          save() { }
        }
        sinon
          .stub(fakeHouse.prototype, 'save')
          .withArgs({})
          .rejects('Error400');
        const houseController = new HouseController(fakeHouse);
        return houseController
          .create(defaultHouse)
          .then(() => { })
          .catch((err) => {
            // eslint-disable-next-line no-undef
            expect(err.message).to.eql('Error400');
          });
      });
    });
  });
  describe('update() House', () => {
    it('should respond with 200 when the User has been updated', () => {
      const fakeid = '56cb91bdc3464f14678934ca';
      const updateHouse = {
        endereco: {
          estado: 'Maranhão',
          cidade: 'são Raimundo das Mangabeiras',
          bairro: 'São Francisco',
          rua: '13 de maio',
          complemento: 'paragás',
          numero: 81,
        },
        valor: 200,
        _id: fakeid,
      };
      class fakeHouse {
        static findOneAndUpdate() { }
      }
      // eslint-disable-next-line new-cap
      const fakeHouseInstance = new fakeHouse();
      const findOneAndUpdateStub = sinon.stub(fakeHouse, 'findOneAndUpdate');
      findOneAndUpdateStub.withArgs({ _id: fakeid }, updateHouse).resolves(fakeHouseInstance);
      const houseController = new HouseController(fakeHouse);
      return houseController.update(fakeid, updateHouse).then((result) => {
        // eslint-disable-next-line no-undef
        expect(result).to.eql(undefined);
      });
    });
    context('when an error occurs', () => {
      it('should return 400', () => {
        const fakeid = 'a-fake-id';
        const updateHouse = {
          endereco: {
            estado: 'Maranhão',
            cidade: 'são Raimundo das Mangabeiras',
            bairro: 'São Francisco',
            rua: '13 de maio',
            complemento: 'paragás',
            numero: 81,
          },
          valor: 200,
          _id: fakeid,
        };
        class fakeHouse {
          static findOneAndUpdate() { }
        }
        // eslint-disable-next-line new-cap
        const findOneAndUpdateStub = sinon.stub(fakeHouse, 'findOneAndUpdate');
        findOneAndUpdateStub.withArgs({ _id: fakeid }, updateHouse).rejects('Error400');
        const houseController = new HouseController(fakeHouse);
        return houseController
          .update(fakeid, updateHouse)
          .then(() => { })
          .catch((err) => {
            // eslint-disable-next-line no-undef
            expect(err.message).to.eql('Error400');
          });
      });
    });
  });
  describe('delete() house', () => {
    it('should respond with 200 when the User has been deleted', () => {
      const fakeId = 'a-fake-id';
      class fakeHouse {
        static remove() { }
      }
      const removeStub = sinon.stub(fakeHouse, 'remove');
      removeStub.withArgs({ _id: fakeId }).resolves([1]);
      const houseController = new HouseController(fakeHouse);
      return houseController
        .remove(fakeId)
        .then(() => { })
        .catch((err) => {
          // eslint-disable-next-line no-undef
          expect(err.message).to.eql(1);
        });
    });
    context('when an error occurs', () => {
      it('should return 400', () => {
        const fakeId = 'a-fake-id';
        class fakeHouse {
          static remove() { }
        }
        const removeStub = sinon.stub(fakeHouse, 'remove');
        removeStub.withArgs({ _id: fakeId }).rejects('Error400');
        const houseController = new HouseController(fakeHouse);
        return houseController
          .remove(fakeId)
          .then(() => { })
          .catch((err) => {
            // eslint-disable-next-line no-undef
            expect(err.message).to.eql('Error400');
          });
      });
    });
  });
});
