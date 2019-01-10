require('dotenv').load();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const movieRouter = require('./App/Routes/movieRouter');
const authRouter = require('./App/Routes/authRouter');
const watchlistRouter = require('./App/Routes/watchlistRouter')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://tweb:TEy72XJXyYEo7g@cluster0-jsaqp.mongodb.net/movie_time?retryWrites=true', { useNewUrlParser: true });
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);

app.use('/movies', movieRouter);

app.use('/watchlist', watchlistRouter);

app.get('/', (req, res) => {
  res.json({
    location: 'home',
  });
});

app.listen(process.env.PORT, () => console.log(`Express Running On localhost:${process.env.PORT}`));

module.exports = app;
