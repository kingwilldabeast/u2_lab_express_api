const express = require('express');
const db = require('./db');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3001;
const movieController = require('./controllers/MovieController')
const actorController = require('./controllers/ActorController')
const reviewController = require('./controllers/ReviewController')

const app = express();

app.use(cors());
app.use(logger('dev'))
app.use(bodyParser.json()) 


db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))


app.get('/', (req, res) => res.send('This is our landing page!'))

app.get('/movies', movieController.getAllMovies)
app.get('/actors', actorController.getAllActors)
app.get('/reviews', reviewController.getAllReviews)

app.get('/movies/:id', movieController.getMovieById)
app.get('/actors/:id', actorController.getActorById)
app.get('/reviews/:id', reviewController.getReviewById)

//sort
app.get('/moviesnew', movieController.getNewMoviesFirst)
app.get('/moviesold', movieController.getOldMoviesFirst)

app.get('/reviewsgood', reviewController.getGoodReviewsFirst)
app.get('/reviewsbad', reviewController.getBadReviewsFirst)

//create
app.post('/movies', movieController.createMovie)
app.post('/actors', actorController.createActor)
app.post('/reviews', reviewController.createReview)

//update
app.put('/movies/:id', movieController.updateMovie)
app.put('/actors/:id', actorController.updateActor)
app.put('/reviews/:id', reviewController.updateReview)

//delete
app.delete('/movies/:id', movieController.deleteMovie)
app.delete('/actors/:id', actorController.deleteActor)
app.delete('/reviews/:id', reviewController.deleteReview)
