const express = require("express");
const router = express.Router();

const { isLoggedIn, isNotLoggedIn, validateAuthData } = require("../helpers/middleware");

const User = require('./../models/user.model')

// GET '/api/users/:id'
router.get('/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params;
    
    User.findById(id)
    .then( (selectedUser) => {
        res
        .status(200)
        .json(selectedUser)
    })
    .catch( (err) => next(err));  
})

// PUT '/api/users/:id'
router.put('/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params;
    const { username, email } = req.body;

    User.findByIdAndUpdate(id, { username, email })
    .then( (selectedUser) => {
        res
        .status(201)
        .json(selectedUser)
    })
    .catch( (err) => next((err)));
})

// DELETE '/api/users/:id'
router.delete('/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params;

    User.findByIdAndRemove(id)
    .then( (targetedUser) => {
        res.status(202)
        res.send()
    })
    .catch( (err) => next(createError(err)));
})

module.exports = router;
