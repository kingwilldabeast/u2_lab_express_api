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
            headshot_img: "https://example.com/daniel-craig.jpg"
        },
        
        {
            movie: movieMap['Skyfall']._id,
            name: "Judi Dench",
            age: 89,
            alive: true,
            headshot_img: "https://example.com/judi-dench.jpg"
        },
        
        {
            movie: movieMap['Skyfall']._id,
            name: "Javier Bardem",
            age: 54,
            alive: true,
            headshot_img: "https://example.com/javier-bardem.jpg"
        },
        
        {
            movie: movieMap['Mission: Impossible - Fallout']._id,
            name: "Tom Cruise",
            age: 61,
            alive: true,
            headshot_img: "https://example.com/tom-cruise.jpg"
        },

        {
            movie: movieMap['Mission: Impossible - Fallout']._id,
            name: "Henry Cavill",
            age: 40,
            alive: true,
            headshot_img: "https://example.com/henry-cavill.jpg"
        },

        {
            movie: movieMap['Mission: Impossible - Fallout']._id,
            name: "Rebecca Ferguson",
            age: 40,
            alive: true,
            headshot_img: "https://example.com/rebecca-ferguson.jpg"
        },
        {
            movie: movieMap['The Bourne Identity']._id,
            name: "Matt Damon",
            age: 53,
            alive: true,
            headshot_img: "https://example.com/matt-damon.jpg"
        },
        {
            movie: movieMap['The Bourne Identity']._id,
            name: "Franka Potente",
            age: 49,
            alive: true,
            headshot_img: "https://example.com/franka-potente.jpg"
        },
        {
            movie: movieMap['The Bourne Identity']._id,
            name: "Chris Cooper",
            age: 72,
            alive: true,
            headshot_img: "https://example.com/chris-cooper.jpg"
        },
        {
            movie: movieMap['Tinker Tailor Soldier Spy']._id,
            name: "Gary Oldman",
            age: 66,
            alive: true,
            headshot_img: "https://example.com/gary-oldman.jpg"
        },
        {
            movie: movieMap['Tinker Tailor Soldier Spy']._id,
            name: "Colin Firth",
            age: 63,
            alive: true,
            headshot_img: "https://example.com/colin-firth.jpg"
        },
        {
            movie: movieMap['Tinker Tailor Soldier Spy']._id,
            name: "Tom Hardy",
            age: 46,
            alive: true,
            headshot_img: "https://example.com/tom-hardy.jpg"
        },
        {
            movie: movieMap['Casino Royale']._id,
            name: "Eva Green",
            age: 43,
            alive: true,
            headshot_img: "https://example.com/eva-green.jpg"
        },
        {
            movie: movieMap['Casino Royale']._id,
            name: "Mads Mikkelsen",
            age: 58,
            alive: true,
            headshot_img: "https://example.com/mads-mikkelsen.jpg"
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