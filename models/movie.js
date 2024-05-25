const { Schema } = require('mongoose')

const Movie = new Schema(
    {
        title: {type: String, required: true},
        runtimeMinutes: {type: Number, required: true},
        rating: {type: String, required: true},
        releaseYear: {type: Number, required: true},
        description: {type: String, required: true},
        poster_img: {type: String, required: true},
    },
    {timestamps: true}

)

//VERSION THAT USES INDEX.JS

// module.exports = Movie

//ALTERNATE WITHOUT INDEX.JS

const mongoose = require('mongoose')
module.exports = mongoose.model('movie', Movie)
// module.exports = mongoose.model('movies', Movie)