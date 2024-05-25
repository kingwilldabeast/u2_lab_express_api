//this is a child of movie/movies

// have an array of ten actors 

const db = require('../db')
const { Movie, Actor } = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
    const skyfall = await Movie.find({ title: 'Skyfall' });
    const missionImpossibleFallout = await Movie.find({ title: 'Mission: Impossible - Fallout' });
    const theBourneIdentity = await Movie.find({ title: 'The Bourne Identity' });
    const tinkerTailorSoldierSpy = await Movie.find({ title: 'Tinker Tailor Soldier Spy' });
    const casinoRoyale = await Movie.find({ title: 'Casino Royale' });
    const kingsmanTheSecretService = await Movie.find({ title: 'Kingsman: The Secret Service' });
    const bridgeOfSpies = await Movie.find({ title: 'Bridge of Spies' });
    const argo = await Movie.find({ title: 'Argo' });
    const theSpyWhoLovedMe = await Movie.find({ title: 'The Spy Who Loved Me' });
    const atomicBlonde = await Movie.find({ title: 'Atomic Blonde' });
    
    
  
    const actors = [
        {
            movie: skyfall[0]._id,
            name: "Daniel Craig",
            age: 54,
            alive: true,
            headshot_img: "https://example.com/daniel-craig.jpg"
        },
        
        {
            movie: skyfall[0]._id,
            name: "Judi Dench",
            age: 89,
            alive: true,
            headshot_img: "https://example.com/judi-dench.jpg"
        },
        
        {
            movie: skyfall[0]._id,
            name: "Javier Bardem",
            age: 54,
            alive: true,
            headshot_img: "https://example.com/javier-bardem.jpg"
        },
        
        {
            movie: missionImpossibleFallout[0]._id,
            name: "Tom Cruise",
            age: 61,
            alive: true,
            headshot_img: "https://example.com/tom-cruise.jpg"
        },

        {
            movie: missionImpossibleFallout[0]._id,
            name: "Henry Cavill",
            age: 40,
            alive: true,
            headshot_img: "https://example.com/henry-cavill.jpg"
        },

        {
            movie: missionImpossibleFallout[0]._id,
            name: "Rebecca Ferguson",
            age: 40,
            alive: true,
            headshot_img: "https://example.com/rebecca-ferguson.jpg"
        },
        {
    movie: theBourneIdentity[0]._id,
    name: "Matt Damon",
    age: 53,
    alive: true,
    headshot_img: "https://example.com/matt-damon.jpg"
},
{
    movie: theBourneIdentity[0]._id,
    name: "Franka Potente",
    age: 49,
    alive: true,
    headshot_img: "https://example.com/franka-potente.jpg"
},
{
    movie: theBourneIdentity[0]._id,
    name: "Chris Cooper",
    age: 72,
    alive: true,
    headshot_img: "https://example.com/chris-cooper.jpg"
},
{
    movie: tinkerTailorSoldierSpy[0]._id,
    name: "Gary Oldman",
    age: 66,
    alive: true,
    headshot_img: "https://example.com/gary-oldman.jpg"
},
{
    movie: tinkerTailorSoldierSpy[0]._id,
    name: "Colin Firth",
    age: 63,
    alive: true,
    headshot_img: "https://example.com/colin-firth.jpg"
},
{
    movie: tinkerTailorSoldierSpy[0]._id,
    name: "Tom Hardy",
    age: 46,
    alive: true,
    headshot_img: "https://example.com/tom-hardy.jpg"
},
{
    movie: casinoRoyale[0]._id,
    name: "Eva Green",
    age: 43,
    alive: true,
    headshot_img: "https://example.com/eva-green.jpg"
},
{
    movie: casinoRoyale[0]._id,
    name: "Mads Mikkelsen",
    age: 58,
    alive: true,
    headshot_img: "https://example.com/mads-mikkelsen.jpg"
}

    ]
  
    await Actor.insertMany(actors)
    console.log('Created actors with movies!')
  }
  
  const run = async () => {
    await main()
    //closes database
    db.close()
  }
  
  run()