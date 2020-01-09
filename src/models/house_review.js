const mongoose = require('mongoose');

const schema = mongoose.Schema({
  house: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'House',
  },
  note: {
    type: Number,
    min: 1,
    max: 5,
    default: 5,
  },
});

module.exports = mongoose.schema('HouseReview', schema);
