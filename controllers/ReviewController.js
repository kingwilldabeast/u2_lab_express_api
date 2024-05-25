const Review = require('../models/review.js');
// const Review = require('../models/index.js');

//Read
const getAllReviews = async (req, res) => {
    try {
        const reviewsArray = await Review.find()
        res.json(reviewsArray)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

//sort bad to good
const getBadReviewsFirst = async (req, res) => {
    try {
        const reviewsArray = await Review.find()
        reviewsArray.sort((a, b) => a.score - b.score);
        res.json(reviewsArray)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

//sort good to bad
const getGoodReviewsFirst = async (req, res) => {
    try {
        const reviewsArray = await Review.find()
        reviewsArray.sort((a, b) => b.score - a.score);
        res.json(reviewsArray)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
//Read
const getReviewById = async (req, res) => {
    try {
        const { id } = req.params
        const singleReview = await Review.findById(id)
        if (singleReview) {
            return res.json(singleReview)
        }
        return res.status(404).send(`that plant doesn't exist`)
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That review doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

//create
const createReview = async (req, res) => {
    try {
        const newReview = await new Review(req.body)
        await newReview.save()
        return res.status(201).json({
            newReview,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//update
const updateReview = async (req, res) => {
    try {
        let { id } = req.params;
        let changedReview = await Review.findByIdAndUpdate(id, req.body, { new: true })
        if (changedReview) {
            return res.status(200).json(changedReview)
        }
        throw new Error("Review not found and can't be updated")
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

//delete
const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const erasedReview = await Review.findByIdAndDelete(id)
        if (erasedReview) {
            return res.status(200).send("Review deleted");
        }
        throw new Error("Review not found and can't be deleted");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAllReviews, 
    getReviewById, 
    getBadReviewsFirst,
    getGoodReviewsFirst,
    createReview, 
    updateReview, 
    deleteReview
}