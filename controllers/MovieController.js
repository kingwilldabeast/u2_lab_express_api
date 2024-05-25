const Movie = require('../models/movie.js');
// const Movie = require('../models/index.js');

//Read
const getAllMovies = async (req, res) => {
    try {
        const moviesArray = await Movie.find()
        res.json(moviesArray)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

//sort new to old
const getNewMoviesFirst = async (req, res) => {
    try {
        const moviesArray = await Movie.find()
        moviesArray.sort((a, b) => b.releaseYear - a.releaseYear);
        res.json(moviesArray)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

//sort old to new
const getOldMoviesFirst = async (req, res) => {
    try {
        const moviesArray = await Movie.find()
        moviesArray.sort((a, b) => a.releaseYear - b.releaseYear);
        res.json(moviesArray)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

//Read
const getMovieById = async (req, res) => {
    try {
        const { id } = req.params
        const singleMovie = await Movie.findById(id)
        if (singleMovie) {
            return res.json(singleMovie)
        }
        return res.status(404).send(`that Movie doesn't exist`)
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That Movie doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

//create
const createMovie = async (req, res) => {
    try {
        const newMovie = await new Movie(req.body)
        await newMovie.save()
        return res.status(201).json({
            newMovie,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//update
const updateMovie = async (req, res) => {
    try {
        let { id } = req.params;
        let changedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true })
        if (changedMovie) {
            return res.status(200).json(changedMovie)
        }
        throw new Error("Movie not found and can't be updated")
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

//delete
const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const erasedObject = await Movie.findByIdAndDelete(id)
        if (erasedObject) {
            return res.status(200).send("Movie deleted");
        }
        throw new Error("Movie not found and can't be deleted");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAllMovies, 
    getMovieById, 
    getNewMoviesFirst,
    getOldMoviesFirst,
    createMovie, 
    updateMovie, 
    deleteMovie
}