const { Schema } = require('mongoose')

const Actor = new Schema(
    {
        movie: { type: Schema.Types.ObjectId, ref: 'movie_id' },
        name: { type: String, required: true },
        age: { type: Number, required: true },
        alive: { type: Boolean, required: true },
        headshot_img: {type: String, required: true},
    },
    {timestamps: true}

)



//VERSION THAT USES INDEX.JS

// module.exports = Actor

//ALTERNATE WITHOUT INDEX.JS

const mongoose = require('mongoose')
module.exports = mongoose.model('actor', Actor)
// module.exports = mongoose.model('actors', Actor)