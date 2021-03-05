const express = require("express");
const router = express.Router();

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

// PUT '/api/users/:id'
router.put("/:id", isLoggedIn, (req, res, next) => {
    
  const { id } = req.params;
//   const { username, email, preferences } = req.body;

  User.findByIdAndUpdate(id, req.body)
    .then((selectedUser) => {
      res.status(201).json(selectedUser);
    })
    .catch((err) => next(err));
});

// PUT '/api/users/:id'
// router.put("/update/pref/:preferences", isLoggedIn, (req, res, next) => {
//   const { preferences } = req.params;
//   const { user } = req.body;

//   User.findByIdAndUpdate(user, { preferences })
//     .then((updatedUser) => {
//         res.status(201).json(updatedUser)
//     })
//     .catch((err) => console.log(err));
// });

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
