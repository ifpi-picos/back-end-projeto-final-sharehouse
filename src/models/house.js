const mongoose = require('mongoose');

const schema = mongoose.Schema({
  address: {
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    reference: {
      type: String
    },
    number: {
      type: Number,
      required: true,
    },
  },
  details: {
    beds: Number,
    baths: Number,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    house: Boolean,
    apartment: Boolean,
  },
  amenities: {
    balcony: Boolean,
    pool: Boolean,
    beach: Boolean,
    parking: Boolean,
    air_conditioning: Boolean,
    college: Boolean,
  },
  coordinates: {
    type: [Number], // { latitude, longitude }
    required: true
  }
});

module.exports = mongoose.model('House', schema);