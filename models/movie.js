const { Schema } = require('mongoose')

const movieSchema = new Schema(
    {
        title: {type: String, required: true},
        runtimeMinutes: {type: Number, required: true},
        rating: {type: String, required: true},
        releaseYear: {type: Number, required: true},
        description: {type: String, required: true},
        poster_img: {type: String, required: true},
        actors: [{type: Schema.Types.ObjectId, ref: 'Actor' }],
        reviews: [{type: Schema.Types.ObjectId, ref: 'Review' }]
    },
    {timestamps: true}

)

//VERSION THAT USES INDEX.JS

// module.exports = Movie

//ALTERNATE WITHOUT INDEX.JS
const mongoose = require('mongoose')
module.exports = mongoose.model('Movie', movieSchema)
// module.exports = mongoose.model('movies', movieSchema)