const { check } = require('express-validator');

class House {
  // eslint-disable-next-line class-methods-use-this
  validar() {
    return [
      check('title').notEmpty().withMessage('Campo Obrigatório'),
      check('address').notEmpty().withMessage('Campo Obrigatório'),
      check('type').notEmpty().withMessage('Campo Obrigatório'),
      check('beds').notEmpty().withMessage('Campo Obrigatório')
        .isNumeric()
        .withMessage('valor tem que numérico'),
      check('baths').notEmpty().withMessage('Campo Obrigatório')
        .isNumeric()
        .withMessage('valor tem que numérico'),
      check('price').notEmpty().withMessage('Campo Obrigatório')
        .isNumeric()
        .withMessage('Campo Obrigatório'),
    ];
  }
}
module.exports = House;
