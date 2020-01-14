class ControllerHouse {
  constructor(house) {
    this.House = house;
  }

  async get() {
    try {
      return await this.House.find({});
    } catch (err) {
      throw new Error(err);
    }
  }

  async getByID(id) {
    try {
      return await this.House.find({ _id: id });
    } catch (err) {
      throw new Error(err);
    }
  }

  async create(houseDTO) {
    try {
      const house = await new this.House(houseDTO);
      house.save();
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(id, houseTDO) {
    try {
      await this.House.findOneAndUpdate({ _id: id }, houseTDO);
    } catch (err) {
      throw new Error(err);
    }
  }

  async remove(id) {
    try {
      await this.House.remove({ _id: id });
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = ControllerHouse;
