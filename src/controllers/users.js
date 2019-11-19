/* eslint-disable no-param-reassign */
class UsersController {
  constructor(user) {
    this.User = user;
  }

  async get() {
    try {
      return await this.User.find({}, { _id: '', name: '', email: '' });
    } catch (err) {
      throw new Error(err);
    }
  }

  async getById(id) {
    try {
      return await this.User.find({ _id: id }, { _id: '', name: '', email: '' });
    } catch (err) {
      throw new Error(err);
    }
  }

  async create(userDTO) {
    try {
      const user = await new this.User(userDTO);
      user.save();
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(id, userDTO) {
    try {
      await this.User.findOneAndUpdate({ _id: id }, userDTO);
    } catch (err) {
      throw new Error(err);
    }
  }

  async remove(id) {
    try {
      return this.User.remove({ _id: id });
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = UsersController;
