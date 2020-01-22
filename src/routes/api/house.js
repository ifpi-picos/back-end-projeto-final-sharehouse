const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { validationResult } = require('express-validator');
const HouseValidar = require('../../validation/house');

const houseValidar = new HouseValidar();
const cloudinary = require('../../middlewares/cloudinary');
const imagem = require('../../middlewares/multer');
const modelHouse = require('../../models/house');
const ControllerHouse = require('../../controllers/house');
const message = require('../../utils/message.json');

const controllersHouse = new ControllerHouse(modelHouse);
const router = express.Router();

router.post('/', houseValidar.validar(), async (req, res) => {
  const erro = validationResult(req);
  if (!erro.isEmpty()) {
    res.status(422).send({ erro: erro.array() });
  } else {
    try {
      await controllersHouse.create(req.body);
      res.send(message.success.createHouse).status(200);
    } catch (err) {
      res.send(err).status(401);
    }
  }
});

router.get('/', async (req, res) => {
  try {
    const house = await controllersHouse.get();
    res.send(house).status(200);
  } catch (err) {
    res.send(err).status(400);
  }
});

router.post('/imagem', multer(imagem).single('file'), async (req, res) => {
  // eslint-disable-next-line no-return-await
  const uploader = async (path) => await cloudinary.uploads(path, 'file');
  const urls = [];
  const { file } = req;
  // eslint-disable-next-line no-restricted-syntax
  // for (const file of files) {
  const { path } = file;
  // eslint-disable-next-line no-await-in-loop
  const newPath = await uploader(path);
  urls.push(newPath);
  fs.unlinkSync(path);
  // }
  res.send(urls);
});

router.get('/:id', async (req, res) => {
  const { params: { id } } = req;
  try {
    const house = await controllersHouse.getById(id);
    res.send(house).status(200);
  } catch (err) {
    res.send(err).status(400);
  }
});

router.put('/:id', async (req, res) => {
  const { params: { id } } = req;
  try {
    await controllersHouse.update(id, req.body);
    res.send(message.success.editHouse);
  } catch (err) {
    res.send(err).status(400);
  }
});

router.delete('/:id', async (req, res) => {
  const { params: { id } } = req;
  try {
    await controllersHouse.remove(id);
    res.send(message.success.removeHuose);
  } catch (err) {
    res.send(err).status(400);
  }
});

module.exports = router;
