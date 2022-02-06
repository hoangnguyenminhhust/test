const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded._id);

    if (!user) {
      res.status(401).send({
        error: 'Please authenticate.',
      });
    } else {
      req.user = user;
      next();
    }
  } catch (e) {
    console.log(e);
    res.status(401).send({
      error: 'Please authenticate.',
    });
  }
};

const authAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById({ _id: decoded._id });
    if (!user) throw new Error();
    if (user.role === 'customer') throw new Error();

    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = {
  authUser,
  authAdmin,
};
