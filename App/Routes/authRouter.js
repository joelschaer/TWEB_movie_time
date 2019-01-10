const express = require('express');
const passport = require('passport');
const passportLocal = require('passport-local');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');

const authRouter = express.Router();
const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const User = require('../Models/userModel');

async function verifyUserByUsernamePassword(email, password) {
  const authUser = { _id: 0, auth: false };

  const user = await User.findOne().where('username').equals(email);

  if (user !== 'Undefined' && user.password === password) {
    authUser.auth = true;
    authUser._id = user._id;
  }

  return authUser;
}

passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  (email, password, done) => {
    const promise = verifyUserByUsernamePassword(username, password);
    promise.then((authUser) => {
      if (authUser.auth)
        return done(null, authUser);

      return done(null, false);
    }
    );
  },
));

passport.use(new JWTStrategy(
  {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  (jwtPayload, done) => {
    const { user_id } = jwtPayload;
    const promise = User.findById(user_id);
    promise.then((authUser) => {
      if (authUser._id.toString() === user_id)
        return done(null, authUser);

      return done(null, false);
    });
  },
));

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
