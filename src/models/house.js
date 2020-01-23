const mongoose = require('mongoose');

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  beds: {
    type: Number,
    required: true
  },
  baths: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  type: {
    house: Boolean,
    apartment: Boolean
  },
  urlImagem: [],
  amenities: []
});

module.exports = mongoose.model('House', schema);
