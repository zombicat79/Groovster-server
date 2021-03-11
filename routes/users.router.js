const express = require("express");
const router = express.Router();
const fileUploader = require('../configs/cloudinary.config');
const bcrypt = require("bcrypt");

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
router.get("/search/:search", isLoggedIn, (req, res, next) => {
    const {search} = req.params;

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
    .populate("events")
    .then((selectedUser) => {
      res.status(200).json(selectedUser);
    })
    .catch((err) => next(err));
});

// Update Settings 
router.put("/settings/:id", isLoggedIn, fileUploader.single('image'), (req, res, next) => {
  const { id } = req.params;
  const { password } = req.body;
  const { username, email, image } = req.body

  if (password.length > 0) {
    bcrypt.genSalt(10)
    .then((salt) => {
      console.log(salt)
      bcrypt.hash(password, salt)
      .then((hashPass) => {
        console.log(hashPass)
        User.findByIdAndUpdate(id, {password: hashPass, username, email, image})
        .then((modifiedUser) => {
          res.status(201).json(modifiedUser)
       })
      })
    })
    .catch((err) => next(err));
  }

  else {
    console.log(req.body)
    User.findByIdAndUpdate(id, {username, email, image})
    .then((selectedUser) => {
      res.status(201).json(selectedUser);
      })
    .catch((err) => next(err)); 
  }
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

// POST '/api/users/photo'
router.post("/photo", isLoggedIn, fileUploader.single('image'), (req, res, next) => {

    if (!req.file) {
        return next(createError('No file uploaded'))
    }

    res.json({ imageUrl: req.file.path })
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
