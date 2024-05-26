//this is also a child of movie

const db = require('../db')

// const { Movie, Review } = require('../models') //with index.js?
const Movie  = require('../models/movie')
const Review  = require('../models/review')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))



const resetCollections = async () => {
    try {
        await Review.deleteMany({});
        console.log('Reviews collection reset');
    } catch (error) {
        console.error('Error resetting collections:', error);
    }
};

const main = async () => {
    await resetCollections();

    try {

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

        const reviewsArray = [
            { movie: movieMap['The Bourne Identity']._id, score: 8.5, comment: "An intense and thrilling spy movie with exceptional performances by Matt Damon and the supporting cast. The action sequences are top-notch!" },
            { movie: movieMap['The Bourne Identity']._id, score: 9.0, comment: "A masterclass in modern espionage films. The pacing is perfect, and the storyline keeps you on the edge of your seat." },
            { movie: movieMap['The Bourne Identity']._id, score: 7.5, comment: "Solid action and a gripping plot. Matt Damon shines as Jason Bourne, bringing depth to the character." },
            { movie: movieMap['Tinker Tailor Soldier Spy']._id, score: 8.0, comment: "A slow-burn spy thriller with a stellar cast. Gary Oldman delivers a subtle yet powerful performance. It's a movie that rewards patience." },
            { movie: movieMap['Tinker Tailor Soldier Spy']._id, score: 8.8, comment: "Intricately plotted and beautifully shot. This film is a thinking person's spy movie with incredible attention to detail." },
            { movie: movieMap['Tinker Tailor Soldier Spy']._id, score: 7.0, comment: "A bit slow at times, but the payoff is worth it. The ensemble cast is fantastic, and the atmosphere is perfectly crafted." },
            { movie: movieMap['Casino Royale']._id, score: 9.2, comment: "A thrilling reboot of the James Bond franchise. Daniel Craig is outstanding as Bond, bringing a gritty realism to the role." },
            { movie: movieMap['Casino Royale']._id, score: 8.7, comment: "Action-packed and emotionally engaging. Eva Green's Vesper Lynd is one of the best Bond girls in the series." },
            { movie: movieMap['Casino Royale']._id, score: 8.9, comment: "A fresh take on Bond with high stakes and great character development. Mads Mikkelsen's Le Chiffre is a memorable villain." },
            { movie: movieMap['Kingsman: The Secret Service']._id, score: 8.5, comment: "A fun and stylish spy movie that doesn't take itself too seriously. Great action scenes and a standout performance by Colin Firth." },
            { movie: movieMap['Kingsman: The Secret Service']._id, score: 8.2, comment: "Innovative and entertaining with a sharp sense of humor. The church scene is an instant classic." },
            { movie: movieMap['Kingsman: The Secret Service']._id, score: 7.8, comment: "A refreshing take on the spy genre with over-the-top action and clever dialogue. Taron Egerton is a star in the making." },
            { movie: movieMap['Bridge of Spies']._id, score: 8.3, comment: "A gripping Cold War drama directed by Spielberg. Tom Hanks delivers a strong performance as a lawyer caught in international intrigue." },
            { movie: movieMap['Bridge of Spies']._id, score: 8.0, comment: "Thoughtful and well-crafted, with excellent cinematography and a compelling story. Mark Rylance is superb in his supporting role." },
            { movie: movieMap['Bridge of Spies']._id, score: 7.9, comment: "A solid historical drama that keeps you engaged. The negotiation scenes are particularly well done, showing the tense atmosphere of the era." }
        ];
    
  
        const insertedReviews = await Review.insertMany(reviewsArray);
        console.log(`Created ${insertedReviews.length} reviews`);

        for (const review of insertedReviews) {
            console.log(`the review is ${review}`)
            const movie = await Movie.findById(review.movie);
            movie.reviews.push(review._id);
            await movie.save();
        }

        console.log('Reviews linked to movies successfully');
    } catch (error) {
        console.error('Error in main seeding function:', error);
    }
};
  
  const run = async () => {
    await main()
    //closes database
    db.close()
  }
  
  run()