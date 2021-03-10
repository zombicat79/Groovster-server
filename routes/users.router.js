const express = require("express");
const router = express.Router();
const fileUploader = require('../configs/cloudinary.config');

const {
  isLoggedIn,
  isNotLoggedIn,
  validateAuthData,
} = require("../helpers/middleware");

const User = require("./../models/user.model");

// GET ALL USERS
router.get("/", isLoggedIn, (req, res, next) => {
    User.find()
    .then( (allUsers) => {
        res.status(200).json(allUsers);
    })
    .catch( (err) => next(err));
})

//GET USERS BY SEARCH
router.get("/:search", isLoggedIn, (req, res, next) => {
    const {search} = req.params

    User.find({username: search})
    .then( (matchingUsers) => {
        res.status(200).json(matchingUsers);
    })
    .catch( (err) => next(err));
})

// GET '/api/users/:id'
router.get("/:id", isLoggedIn, (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .then((selectedUser) => {
      res.status(200).json(selectedUser);
    })
    .catch((err) => next(err));
});

// PUT 'api/users/:id/:chatId'
router.put("/:id/:chat", (req, res, next) =>{
  const {id, chat} = req.params; 

  User.findByIdAndUpdate(id, {chat})
  .then((selectedUser) => {
      res.status(201).json(selectedUser);
      })
  .catch((err) => next(err));
})

// PUT '/api/users/:id'
router.put("/:id", isLoggedIn, fileUploader.single('image'), (req, res, next) => {
    const { id } = req.params;

    User.findByIdAndUpdate(id, req.body)
    .then((selectedUser) => {
        res.status(201).json(selectedUser);
        })
    .catch((err) => next(err));
});

// DELETE '/api/users/:id'
router.delete("/:id", isLoggedIn, (req, res, next) => {
  const { id } = req.params;

  User.findByIdAndRemove(id)
    .then((targetedUser) => {
      res.status(202);
      res.send();
    })
    .catch((err) => next(createError(err)));
});

module.exports = router;
