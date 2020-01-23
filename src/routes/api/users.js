const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { validationResult } = require('express-validator');
const UserValidar = require('../../validation/user');

const userValidar = new UserValidar();
const UsersController = require('../../controllers/users');
const User = require('../../models/user');
const cloudinary = require('../../middlewares/cloudinary');
const imagem = require('../../middlewares/multer');
const message = require('../../utils/message.json');

const router = express.Router();

const usersController = new UsersController(User);

const jwt = require('jsonwebtoken');

const auth = require('../../config/auth.json');

router.get('/', async (req, res) => {
  try {
    const users = await usersController.get();
    res.send(users);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/me', async (req, res) => {
  try {
    let token = req.headers.authorization.replace('Bearer ', '').trim();

    jwt.verify(token, auth.key, function(err, decoded) {
      if (err) {
        res.json(err).status(401);
      } else {
        res.json(decoded);
      }
    });
  } catch (error) {
    res.json(error);
  }
})

router.get('/:id', async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await usersController.getById(id);
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/authenticate', userValidar.login(), async (req, res) => {
  const erro = validationResult(req);
  if (!erro.isEmpty()) {
    res.status(422).send({ erro: erro.array() });
  } else {
    try {
      const { email, password } = req.body;
      const user = await usersController.authenticate(email, password);
      res.send(user).status(200);
    } catch (err) {
      res.send(err).status(400);
    }
  }
});

router.post('/', multer(imagem).single('file'), async (req, res) => {
  const uploader = async (path) => await cloudinary.uploads(path, 'file');

  try {
    let urlUser = await uploader(req.file.path);

    const { body } = req;

    /** Não permite usuários duplicados */
    User.findOne({ email: body.email }).countDocuments((err, count) => {
      if(count == 0) {
        const user = usersController.create({
          name: body.name,
          email: body.email,
          password: body.password,
          sexo: body.sexo,
          urlUser: urlUser.url,
          role: body.role
        });
  
        res.json({
          status: 'ok'
        }).status(200);
      } else {
        res.json({
          msg: 'Já existe um usuário cadastrado com esse e-mail.'
        }).status(401);
      }
    });
  } catch (error) {
    res.json({
      msg: 'Erro interno! ' + error
    }).status(500);
  }
});

router.put('/:id', multer(imagem).single('file'), async (req, res) => {
  const uploader = async (path) => await cloudinary.uploads(path, 'file');

  try {
    const { body } = req;

    const user = await User.findOne({ _id: req.params.id }).populate('+password');

    if(body.name) {
      user['name'] = body.name;
    }

    if(body.password) {
      user['password'] = body.password;
    }

    if(req.file) {
      let urlUser = req.file ? await uploader(req.file.path) : null;
      user['urlUser'] = urlUser.url;
    }

    user.save();

    res.json({
      status: 'ok'
    }).status(200);
  } catch (error) {
    res.json({
      msg: 'Erro interno! ' + error
    }).status(500);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await usersController.remove(req.params.id);
    res.send(message.success.removeUser).status(204);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
