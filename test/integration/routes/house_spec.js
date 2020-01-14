const chai = require('chai');
const House = require('../../../src/models/house');
const message = require('../../../src/utils/message.json');

global.expect = chai.expect;

describe('Routes: house', () => {
  let request;
  // eslint-disable-next-line no-undef
  before(() => setupApp()
    .then((app) => {
      // eslint-disable-next-line no-undef
      request = supertest(app);
    }).catch((err) => {
      console.error(err);
      throw new Error(err);
    }));

  const defaultId = '56cb91bdc3464f14678934ca';

  const houseDefault = {
    address: {
      state: 'Maranhão',
      city: 'são Raimundo das Mangabeiras',
      district: 'São Francisco',
      street: '13 de maio',
      reference: 'paragás',
      number: 81,
    },
    details: {
      beds: 0,
    },
    price: 200,
    type: {
      house: true,
    },
    amenities: {
      beach: true,
      pool: true,
    },
    coordinates: [-7.069470, -41.398026],
  };
  const expectHouse = {
    urlImagem: [],
    address: {
      state: 'Maranhão',
      city: 'são Raimundo das Mangabeiras',
      district: 'São Francisco',
      street: '13 de maio',
      reference: 'paragás',
      number: 81,
    },
    details: {
      beds: 0,
    },
    price: 200,
    type: {
      house: true,
    },
    amenities: {
      beach: true,
      pool: true,
    },
    coordinates: [-7.069470, -41.398026],
    __v: 0,
    _id: defaultId,
  };
  beforeEach(() => {
    const house = new House(houseDefault);
    house._id = defaultId;
    return house.deleteOne({})
      .then(() => house.save());
  });

  afterEach(() => House.deleteOne({}));

  describe('Get /api/house', () => {
    it('should return a list of houses', (done) => {
      request
        .get('/house')
        .end((err, res) => {
          // eslint-disable-next-line no-undef
          expect(res.body[0]).to.eql(expectHouse);
          done(err);
        });
    });
    context('when an id is specified', () => {
      it('should return 200 with one House', (done) => {
        request
          .get(`/house/${defaultId}`)
          .end((err, res) => {
            // eslint-disable-next-line no-undef
            expect(res.statusCode).to.eql(200);
            // eslint-disable-next-line no-undef
            expect(res.body[0]).to.eql(expectHouse);
            done(err);
          });
      });
    });
  });
  describe('POST /house', () => {
    context('when posting in house', () => {
      it('should return a `success` with status code 201', (done) => {
        const customId = '56cb91bdc3464f14678934ba';
        const newHouse = { _id: customId, __v: 0, ...houseDefault };

        request
          .post('/house')
          .send(newHouse)
          .end((err, res) => {
            // eslint-disable-next-line no-undef
            expect(res.statusCode).to.eql(200);
            // eslint-disable-next-line no-undef
            expect(res.text).to.eql(message.success.createHouse);
            done(err);
          });
      });
    });
  });
  describe('PUT /house/:id', () => {
    context('when editing a house', () => {
      it('should update the house and return 200 as status code', (done) => {
        const customUser = {
          valor: 100,
        };
        const updatedHouse = { ...customUser, ...houseDefault };

        request
          .put(`/house/${defaultId}`)
          .send(updatedHouse)
          .end((err, res) => {
            // eslint-disable-next-line no-undef
            expect(res.status).to.eql(200);
            done(err);
          });
      });
    });
  });
  describe('DELETE /house/:id', () => {
    context('when deleting a house', () => {
      it('should delete a house and return 204 as status code', (done) => {
        request
          .delete(`/house/${defaultId}`)
          .end((err, res) => {
            // eslint-disable-next-line no-undef
            expect(res.status).to.eql(200);
            done(err);
          });
      });
    });
  });
});
