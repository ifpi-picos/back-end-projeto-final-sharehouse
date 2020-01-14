const { check } = require('express-validator');

class House {
  // eslint-disable-next-line class-methods-use-this
  validar() {
    return [
      check('address.state').notEmpty().withMessage('Campo Obrigatório'),
      check('address.city').notEmpty().withMessage('Campo Obrigatório'),
      check('address.district').notEmpty().withMessage('Campo Obrigatório'),
      check('address.street').notEmpty().withMessage('Campo Obrigatório'),
      check('reference').notEmpty().withMessage('Campo Obrigatório'),
      check('address.number').notEmpty().withMessage('Campo Obrigatório')
        .isNumeric()
        .withMessage('valor tem que ser numérico'),
      check('details.beds').notEmpty().withMessage('Campo Obrigatório')
        .isNumeric()
        .withMessage('valor tem que numérico'),
      check('preci').notEmpty().withMessage('Campo Obrigatório')
        .isNumeric()
        .withMessage('Campo Obrigatório'),
    ];
  }
}
module.exports = House;
