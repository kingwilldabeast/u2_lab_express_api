//this is a child of movie/movies

const db = require('../db')

// const { Movie, Actor } = require('../models') //with index.js?
const Movie  = require('../models/movie')
const Actor  = require('../models/actor')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const resetCollections = async () => {
    try {
        await Actor.deleteMany({});
        console.log('Actors collection reset');
    } catch (error) {
        console.error('Error resetting collections:', error);
    }
};

const main = async () => {
    await resetCollections();    
        
    const movies = await Movie.find({
        title: { 
            $in: [
                'Skyfall', 'Mission: Impossible - Fallout', 'The Bourne Identity',
                'Tinker Tailor Soldier Spy', 'Casino Royale', 'Kingsman: The Secret Service',
                'Bridge of Spies', 'Argo', 'The Spy Who Loved Me', 'Atomic Blonde'
            ]
        }
    });    
  
    const movieMap = {};
    movies.forEach(movie => movieMap[movie.title] = movie);

  
    const actorsArray = [
        {
            movie: movieMap['Skyfall']._id,
            name: "Daniel Craig",
            age: 54,
            alive: true,
            headshot_img: "assets/craig.png"
        },
        
        {
            movie: movieMap['Skyfall']._id,
            name: "Judi Dench",
            age: 89,
            alive: true,
            headshot_img: "assets/dench.png"
        },
        
        {
            movie: movieMap['Skyfall']._id,
            name: "Javier Bardem",
            age: 54,
            alive: true,
            headshot_img: "assets/bardem.png"
        },
        
        {
            movie: movieMap['Mission: Impossible - Fallout']._id,
            name: "Tom Cruise",
            age: 61,
            alive: true,
            headshot_img: "assets/cruise.png"
        },

        {
            movie: movieMap['Mission: Impossible - Fallout']._id,
            name: "Henry Cavill",
            age: 40,
            alive: true,
            headshot_img: "assets/cavill.png"
        },

        {
            movie: movieMap['Mission: Impossible - Fallout']._id,
            name: "Rebecca Ferguson",
            age: 40,
            alive: true,
            headshot_img: "assets/ferguson.png"
        },
        {
            movie: movieMap['The Bourne Identity']._id,
            name: "Matt Damon",
            age: 53,
            alive: true,
            headshot_img: "assets/damon.png"
        },
        {
            movie: movieMap['The Bourne Identity']._id,
            name: "Franka Potente",
            age: 49,
            alive: true,
            headshot_img: "assets/franka.png"
        },
        {
            movie: movieMap['The Bourne Identity']._id,
            name: "Chris Cooper",
            age: 72,
            alive: true,
            headshot_img: "assets/cooper.png"
        },
        {
            movie: movieMap['Tinker Tailor Soldier Spy']._id,
            name: "Gary Oldman",
            age: 66,
            alive: true,
            headshot_img: "assets/oldman.png"
        },
        {
            movie: movieMap['Tinker Tailor Soldier Spy']._id,
            name: "Colin Firth",
            age: 63,
            alive: true,
            headshot_img: "assets/firth.png"
        },
        {
            movie: movieMap['Tinker Tailor Soldier Spy']._id,
            name: "Tom Hardy",
            age: 46,
            alive: true,
            headshot_img: "assets/hardy.png"
        },
        {
            movie: movieMap['Casino Royale']._id,
            name: "Eva Green",
            age: 43,
            alive: true,
            headshot_img: "assets/eva.png"
        },
        {
            movie: movieMap['Casino Royale']._id,
            name: "Mads Mikkelsen",
            age: 58,
            alive: true,
            headshot_img: "assets/mads.png"
        }

    ]
  
    const insertedActors = await Actor.insertMany(actorsArray);
    console.log(`Created ${insertedActors.length} actors`);

    for (const actor of insertedActors) {
        console.log(`the actor is ${actor}`)
        const movie = await Movie.findById(actor.movie);
        movie.actors.push(actor._id);
        await movie.save();
    }

    console.log('Actors linked to movies successfully');
}
  
  const run = async () => {
    await main()
    //closes database
    db.close()
  }
  
  run()