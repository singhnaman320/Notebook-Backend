const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

class UserService {
  async registerUser(username, password) {
    const userExists = await User.findOne({ username });
    
    if (userExists) {
      throw new Error('User already exists');
    }
    
    const user = await User.create({
      username,
      password
    });
    
    return {
      _id: user._id,
      username: user.username,
      token: generateToken(user._id)
    };
  }

  async loginUser(username, password) {
    const user = await User.findOne({ username });
    
    if (user && (await user.matchPassword(password))) {
      return {
        _id: user._id,
        username: user.username,
        token: generateToken(user._id)
      };
    } else {
      throw new Error('Invalid username or password');
    }
  }
}

module.exports = new UserService();