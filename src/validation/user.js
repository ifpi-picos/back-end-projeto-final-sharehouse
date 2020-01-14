const { check } = require('express-validator');

class User {
  // eslint-disable-next-line class-methods-use-this
  validar() {
    return [
      check('name').notEmpty().withMessage('Campo Obrigatório'),
      check('email').notEmpty().withMessage('Campo Obrigatório')
        .isEmail()
        .withMessage('tem que ser email válido'),
      check('passwprd').notEmpty().withMessage('Campo Obrigatório'),
      check('sexo').notEmpty().withMessage('Campo Obrigatório'),
      check('address').notEmpty().withMessage('Campo Obrigatório'),
    ];
  }
}
module.exports = User;
