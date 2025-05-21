const userService = require('../services/userService');

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userData = await userService.registerUser(username, password);
    res.status(201).json(userData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userData = await userService.loginUser(username, password);
    res.json(userData);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser };
