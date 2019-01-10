const express = require('express');
const Movie = require('../Models/movieModel');

const movieRouter = express.Router();

const PAGE_SIZE = 10;

const jwt = require('jsonwebtoken');

movieRouter.route('/')
  .get((req, res) => {
    let page = 1
    if (req.query.page){
      page = req.query.page;
    }
    const options = {
      page: page,
      limit: PAGE_SIZE,
  };
    Movie.paginate({}, options, (err, movies) => {
      res.json(movies);
    });
  })

module.exports = movieRouter;
