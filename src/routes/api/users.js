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

router.get('/', async (req, res) => {
  try {
    const users = await usersController.get();
    res.send(users);
  } catch (err) {
    res.status(400).send(err);
  }
});

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
  }
  try {
    const { email, password } = req.body;
    const user = await usersController.authenticate(email, password);
    res.send(user).status(200);
  } catch (err) {
    console.log('erro:', err);
    res.send(err).status(400);
  }
});

router.post('/', multer(imagem).array('file', 2), async (req, res) => {
  const erro = validationResult(req);
  if (!erro.isEmpty()) {
    res.status(422).send({ erro: erro.array() });
  }
  // eslint-disable-next-line no-return-await
  const uploader = async (path) => await cloudinary.uploads(path, 'file');
  const urls = [];
  const { files } = req;
  // eslint-disable-next-line no-restricted-syntax
  for (const file of files) {
    const { path } = file;
    // eslint-disable-next-line no-await-in-loop
    const newPath = await uploader(path);
    urls.push(newPath);
    fs.unlinkSync(path);
  }
  req.body.urlUser = urls;
  try {
    await usersController.create(req.body);
    res.send(message.success.createUser).status(200);
  } catch (err) {
    res.send(err).status(400);
  }
});

router.put('/:id', async (req, res) => {
  try {
    await usersController.update(req.params.id, req.body);
    res.send(message.success.editUser);
  } catch (err) {
    res.status(400).send(err);
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
