const express = require('express');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const imagem = require('../../middlewares/multer');
const modelHouse = require('../../models/house');
const ControllerHouse = require('../../controllers/house');
const message = require('../../utils/message.json');

const controllersHouse = new ControllerHouse(modelHouse);
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    await controllersHouse.create(req.body);
    res.send(message.success.createHouse).status(200);
  } catch (err) {
    res.send(err).status(401);
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
  const { path } = req.file;
  const uniqueFilename = new Date().toISOString();
  cloudinary.config({
    cloud_name: 'dqssnq9lr',
    api_key: '672883363642143',
    api_secret: '6epXkMj7ImF5A_ayc__QxCWuEww',
  });
  cloudinary.uploader.upload(
    path,
    { public_id: `blog/${uniqueFilename}`, tags: 'blog' }, // directory and tags are optional
    // eslint-disable-next-line consistent-return
    (err, image) => {
      if (err) return res.send(err);
      // remove file from server
      // eslint-disable-next-line global-require
      const fs = require('fs');
      fs.unlinkSync(path);
      res.json(image);
    },
  );
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
