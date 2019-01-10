const express = require('express');
const Movie = require('../Models/movieModel');
const User = require('../Models/userModel')

const watchlistRouter = express.Router();

watchlistRouter.route('/:username')
  .post((req, res) => {
      User.findOneAndUpdate({
        username: req.params.username
      }, {$push: {watchlist: req.body.movie_id}});
      // need handle in case of problems
      res.status(201).send("movie added to watchlist");
  });

module.exports = watchlistRouter;
