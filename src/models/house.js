const mongoose = require('mongoose');

const schema = mongoose.Schema({
  address: {
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    district: {
      type: String,
    },
    street: {
      type: String,
    },
    reference: {
      type: String,
    },
    number: {
      type: Number,
    },
  },
  details: {
    beds: Number,
    baths: Number,
  },
  price: {
    type: Number,
  },
  type: {
    house: Boolean,
    apartment: Boolean,
  },
  urlImagem: [],
  amenities: {
    balcony: Boolean,
    pool: Boolean,
    beach: Boolean,
    parking: Boolean,
    air_conditioning: Boolean,
    college: Boolean,
  },
});

module.exports = mongoose.model('House', schema);
