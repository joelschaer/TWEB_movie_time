const express = require('express');
const jwt = require('jsonwebtoken');

const authRouter = express.Router();

const User = require('../Models/userModel');

authRouter.route('/login')
  .post((req, res) => {
    const { username, password } = req.body;
    User.findOne({ username: username }, (err, user) => {
      if (password == user.password) {
        const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET);
        res.send({ user_id: user._id, token });
      }
      else {
        res.status(403).send("access denied");
      }
    });
    // todo: problem will occure if username doesn't exists
  });

authRouter.route('/register')
  .post((req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    user.save();
    // todo : handle error (if duplicated)
    res.status(201).send("created");
  });


module.exports = authRouter;
