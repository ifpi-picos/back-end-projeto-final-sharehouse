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

router.post('/imagem', multer(imagem).array('file', 10), async (req, res) => {
  const uploader = async (path) => await cloudinary.uploads(path, 'file');
  const urls = [];
  const erro = validationResult(req);

  if (!erro.isEmpty()) {
    res.status(422).send({ erro: erro.array() });
  } else {
    try {
      // Upload de imagens
      for(let i = 0; i <= req.files.length - 1; i++) {
        if(req.files[i].path) {
          urls[i] = await uploader(req.files[i].path);
          fs.unlinkSync(req.files[i].path);
        }
      }

      const { body } = req;

      const house = await controllersHouse.create({
        title: body.title,
        details: body.details,
        address: body.address,
        price: body.price,
        beds: body.beds,
        baths: body.baths,
        contact: body.contact,
        type: body.type,
        amenities: body.amenities,
        urlImagem: urls
      });

      res.json({
        msg: message.success.createHouse
      }).status(200);
    } catch (err) {
      res.send(err).status(401);
    }
  }
});

router.get('/:id', async (req, res) => {
  const { params: { id } } = req;

  try {
    const house = await modelHouse.find({ _id: id });

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

router.post('/filter', async (req, res) => {
  const { body } = req;

  let query = [];

  if(body.title) {
    query.push({
      title: new RegExp(body.title, 'i')
    });
  }

  if(body.price) {
    query.push({
      price: {"$gt": 500, "$gte": body.price}
    });
  }

  if(body.type) {
    query.push({
      type: body.type
    });
  }

  if(body.beds) {
    query.push({
      beds: {"$gte": body.beds}
    });
  }

  if(body.baths) {
    query.push({
      baths: {"$gte": body.baths}
    });
  }

  if(body.amentities) {
    query.push({
      amentities: {"$in": [body.amentities]}
    });
  }

  const house = await modelHouse.find({
    $and: [{
      ...query[0]
    }]
  });
  
  res.json(house);
});

module.exports = router;
