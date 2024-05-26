//this is the parent collection

const db = require('../db')

// const {Movie}  = require('../models') //with index.js?
const Movie  = require('../models/movie')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const resetCollections = async () => {
    try {
        await Movie.deleteMany({});
        console.log('Movie collection reset');
    } catch (error) {
        console.error('Error resetting collections:', error);
    }
};

const main = async () => {
    await resetCollections();   
    const movies = [
        {
            "title": "Skyfall",
            "runtimeMinutes": 143,
            "rating": "PG-13",
            "releaseYear": 2012,
            "description": "James Bond's loyalty to M is tested when her past comes back to haunt her. As MI6 comes under attack, 007 must track down and destroy the threat, no matter how personal the cost.",
            "poster_img": "https://example.com/skyfall.jpg",
        },
        {
            "title": "Mission: Impossible - Fallout",
            "runtimeMinutes": 147,
            "rating": "PG-13",
            "releaseYear": 2018,
            "description": "Ethan Hunt and his IMF team, along with some familiar allies, race against time after a mission gone wrong.",
            "poster_img": "https://example.com/mission_impossible_fallout.jpg"
        },
        {
            "title": "The Bourne Identity",
            "runtimeMinutes": 119,
            "rating": "PG-13",
            "releaseYear": 2002,
            "description": "A man is picked up by a fishing boat, bullet-riddled and without memory, then races to elude assassins and recover from amnesia.",
            "poster_img": "https://example.com/the_bourne_identity.jpg"
        },
        {
            "title": "Tinker Tailor Soldier Spy",
            "runtimeMinutes": 127,
            "rating": "R",
            "releaseYear": 2011,
            "description": "In the bleak days of the Cold War, espionage veteran George Smiley is forced from semi-retirement to uncover a Soviet agent within MI6.",
            "poster_img": "https://example.com/tinker_tailor_soldier_spy.jpg"
        },
        {
            "title": "Casino Royale",
            "runtimeMinutes": 144,
            "rating": "PG-13",
            "releaseYear": 2006,
            "description": "After earning 00 status and a license to kill, Secret Agent James Bond sets out on his first mission as 007.",
            "poster_img": "https://example.com/casino_royale.jpg"
        },
        {
            "title": "Kingsman: The Secret Service",
            "runtimeMinutes": 129,
            "rating": "R",
            "releaseYear": 2014,
            "description": "A spy organization recruits a promising street kid into the agency's training program, while a global threat emerges from a twisted tech genius.",
            "poster_img": "https://example.com/kingsman_the_secret_service.jpg"
        },
        {
            "title": "Bridge of Spies",
            "runtimeMinutes": 142,
            "rating": "PG-13",
            "releaseYear": 2015,
            "description": "During the Cold War, an American lawyer is recruited to defend an arrested Soviet spy in court, and then help the CIA facilitate an exchange of the spy for the Soviet-captured American U2 spy plane pilot, Francis Gary Powers.",
            "poster_img": "https://example.com/bridge_of_spies.jpg"
        },
        {
            "title": "Argo",
            "runtimeMinutes": 120,
            "rating": "R",
            "releaseYear": 2012,
            "description": "Acting under the cover of a Hollywood producer scouting a location for a science fiction film, a CIA agent launches a dangerous operation to rescue six Americans in Tehran during the U.S. hostage crisis in Iran in 1979.",
            "poster_img": "https://example.com/argo.jpg"
        },
        {
            "title": "The Spy Who Loved Me",
            "runtimeMinutes": 125,
            "rating": "PG",
            "releaseYear": 1977,
            "description": "James Bond investigates the hijacking of British and Russian submarines carrying nuclear warheads, with the help of a KGB agent whose lover he killed.",
            "poster_img": "https://example.com/the_spy_who_loved_me.jpg"
        },
        {
            "title": "Atomic Blonde",
            "runtimeMinutes": 115,
            "rating": "R",
            "releaseYear": 2017,
            "description": "An undercover MI6 agent is sent to Berlin during the Cold War to investigate the murder of a fellow agent and recover a missing list of double agents.",
            "poster_img": "https://example.com/atomic_blonde.jpg"
        }
    ]
    

    await Movie.insertMany(movies)
    console.log('Created movies!')
}

const run = async () => {
    await main() 
    db.close()
}

run ()