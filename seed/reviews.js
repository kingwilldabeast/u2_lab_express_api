//this is also a child of movie

//we need array of 6 review, 2 each for 3 movies
const db = require('../db')
// const { Movie, Review } = require('../models')
const { Movie } = require('../models')
const { Review } = require('../models')
// const { Movie } = require('../models/movie')
// const { Review } = require('../models/review')

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
    
  
    const reviews = [
        // The Bourne Identity
        {
            movie: theBourneIdentity[0]._id,
            score: 8.5,
            comment: "An intense and thrilling spy movie with exceptional performances by Matt Damon and the supporting cast. The action sequences are top-notch!"
        },
        {
            movie: theBourneIdentity[0]._id,
            score: 9.0,
            comment: "A masterclass in modern espionage films. The pacing is perfect, and the storyline keeps you on the edge of your seat."
        },
        {
            movie: theBourneIdentity[0]._id,
            score: 7.5,
            comment: "Solid action and a gripping plot. Matt Damon shines as Jason Bourne, bringing depth to the character."
        },
        // Tinker Tailor Soldier Spy
        {
            movie: tinkerTailorSoldierSpy[0]._id,
            score: 8.0,
            comment: "A slow-burn spy thriller with a stellar cast. Gary Oldman delivers a subtle yet powerful performance. It's a movie that rewards patience."
        },
        {
            movie: tinkerTailorSoldierSpy[0]._id,
            score: 8.8,
            comment: "Intricately plotted and beautifully shot. This film is a thinking person's spy movie with incredible attention to detail."
        },
        {
            movie: tinkerTailorSoldierSpy[0]._id,
            score: 7.0,
            comment: "A bit slow at times, but the payoff is worth it. The ensemble cast is fantastic, and the atmosphere is perfectly crafted."
        },
        // Casino Royale
        {
            movie: casinoRoyale[0]._id,
            score: 9.2,
            comment: "A thrilling reboot of the James Bond franchise. Daniel Craig is outstanding as Bond, bringing a gritty realism to the role."
        },
        {
            movie: casinoRoyale[0]._id,
            score: 8.7,
            comment: "Action-packed and emotionally engaging. Eva Green's Vesper Lynd is one of the best Bond girls in the series."
        },
        {
            movie: casinoRoyale[0]._id,
            score: 8.9,
            comment: "A fresh take on Bond with high stakes and great character development. Mads Mikkelsen's Le Chiffre is a memorable villain."
        },
        // Kingsman: The Secret Service
        {
            movie: kingsmanTheSecretService[0]._id,
            score: 8.5,
            comment: "A fun and stylish spy movie that doesn't take itself too seriously. Great action scenes and a standout performance by Colin Firth."
        },
        {
            movie: kingsmanTheSecretService[0]._id,
            score: 8.2,
            comment: "Innovative and entertaining with a sharp sense of humor. The church scene is an instant classic."
        },
        {
            movie: kingsmanTheSecretService[0]._id,
            score: 7.8,
            comment: "A refreshing take on the spy genre with over-the-top action and clever dialogue. Taron Egerton is a star in the making."
        },
        // Bridge of Spies
        {
            movie: bridgeOfSpies[0]._id,
            score: 8.3,
            comment: "A gripping Cold War drama directed by Spielberg. Tom Hanks delivers a strong performance as a lawyer caught in international intrigue."
        },
        {
            movie: bridgeOfSpies[0]._id,
            score: 8.0,
            comment: "Thoughtful and well-crafted, with excellent cinematography and a compelling story. Mark Rylance is superb in his supporting role."
        },
        {
            movie: bridgeOfSpies[0]._id,
            score: 7.9,
            comment: "A solid historical drama that keeps you engaged. The negotiation scenes are particularly well done, showing the tense atmosphere of the era."
        }
    ];
    
  
    await Review.insertMany(reviews)
    console.log('Created books with publishers!')
  }
  
  const run = async () => {
    await main()
    //closes database
    db.close()
  }
  
  run()