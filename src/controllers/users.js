/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = require('../config/auth.json');

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
      const users = await this.User.findById({ _id: id });
      users.name = userDTO.name;
      users.email = userDTO.email;
      users.role = userDTO.role;
      if (userDTO.password) {
        users.password = userDTO.password;
      }
      return users.save();
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

  async authenticate(email, password) {
    try {
      const user = await this.User.findOne({ email });

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return false;
      }

      const token = jwt.sign({
        name: user.name,
        email: user.email,
        role: user.role,
      }, auth.key, {
        expiresIn: auth.tokenExpiresIn,
      });

      return {
        token,
        data: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
      };
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = UsersController;
