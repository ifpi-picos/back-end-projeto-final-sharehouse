const express = require('express');
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
