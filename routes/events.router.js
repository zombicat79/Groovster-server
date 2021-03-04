const express = require("express");
const router = express.Router();

const { isLoggedIn, isNotLoggedIn} = require("../helpers/middleware");

const Event = require('./../models/event.model')


// RETRIEVE ALL EVENTS RELATED TO A CERTAIN ARTIST
router.get('/:artistId', (req, res, next) => {
    const { artistId } = req.params;
    
    Event.find({artist: artistId})
    .then( (foundEvents) => {
        res
        .status(200)
        .json(foundEvents)
    })
    .catch( (err) => next(err));  
})

// CREATE NEW EVENT
router.post('/:artistId/create', (req, res, next) => {
    const { artistId } = req.params;
    const { title, description, date } = req.body
    
    Event.create({artist: artistId, title, description, date})
    .then( (createdEvent) => {
        res
        .status(200)
        .json(createdEvent)
    })
    .catch( (err) => next(err));  
})

// MODIFY A CERTAIN EVENT
router.put('/:eventId', (req, res, next) => {
    const { eventId } = req.params;
    const { title, description, date, participants } = req.body;
    
    Event.findByIdAndUpdate(eventId, { title, description, date, participants })
    .then( (updatedEvent) => {
        res
        .status(202)
        .json(updatedEvent)
    })
    .catch( (err) => next(err));  
})

// DELETE A CERTAIN EVENT
router.delete('/:eventId', (req, res, next) => {
    const { eventId } = req.params;
    
    Event.findByIdAndRemove(eventId)
    .then( () => {
        res
        .status(202)
        .send()
    })
    .catch( (err) => next(err));  
})

module.exports = router;
