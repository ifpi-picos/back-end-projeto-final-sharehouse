const mongoose = require('mongoose');

const schema = mongoose.Schema({
  endereco: {
    estado: {
      type: String,
      required: true,
    },
    cidade: {
      type: String,
      required: true,
    },
    bairro: {
      type: String,
      required: true,
    },
    rua: {
      type: String,
      required: true,
    },
    complemento: {
      type: String,
      required: true,
    },
    numero: {
      type: Number,
      required: true,
    },
  },
  valor: {
    type: Number,
    required: true,
  },
  tipoDeCasa: {
    type: Number,
  },

});

const house = mongoose.model('House', schema);

module.exports = house;
