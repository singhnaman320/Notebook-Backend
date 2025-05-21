const {
  loginUserService,
  registerUserService,
} = require("../services/userService");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await loginUserService(email, password);
    res.json(userData);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userData = await registerUserService(name, email, password);
    res.status(201).json(userData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
