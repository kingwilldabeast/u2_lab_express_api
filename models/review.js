const { Schema } = require('mongoose')

const Review = new Schema(
    {
        movie: { type: Schema.Types.ObjectId, ref: 'movie_id' },
        score: { type: Number, required: true },
        comment: { type: String, required: true },
    },
    {timestamps: true}

)



//VERSION THAT USES INDEX.JS

// module.exports = Review

//ALTERNATE WITHOUT INDEX.JS

const mongoose = require('mongoose')
module.exports = mongoose.model('review', Review)
// module.exports = mongoose.model('reviews', Review)