const Actor = require('../models/actor.js');
// const Actor = require('../models/index.js');

//Read
const getAllActors = async (req, res) => {
    try {
        const actorsArray = await Actor.find()
        res.json(actorsArray)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

//Read
const getActorById = async (req, res) => {
    try {
        const { id } = req.params
        const singleActor = await Actor.findById(id)
        if (singleActor) {
            return res.json(singleActor)
        }
        return res.status(404).send(`that plant doesn't exist`)
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That actor doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

//create
const createActor = async (req, res) => {
    try {
        const newActor = await new Actor(req.body)
        await newActor.save()
        return res.status(201).json({
            newActor,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//update
const updateActor = async (req, res) => {
    try {
        let { id } = req.params;
        let changedActor = await Actor.findByIdAndUpdate(id, req.body, { new: true })
        if (changedActor) {
            return res.status(200).json(changedActor)
        }
        throw new Error("Actor not found and can't be updated")
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

//delete
const deleteActor = async (req, res) => {
    try {
        const { id } = req.params;
        const erasedActor = await Actor.findByIdAndDelete(id)
        if (erasedActor) {
            return res.status(200).send("Actor deleted");
        }
        throw new Error("Actor not found and can't be deleted");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAllActors, 
    getActorById, 
    createActor, 
    updateActor, 
    deleteActor
}