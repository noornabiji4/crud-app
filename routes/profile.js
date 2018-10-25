const express = require('express');
const router = express.Router();
const db = require('../models');
const middleware = require('../middleware');
const {loggedIn} = middleware;

//profile 
router.get('/', (req, res) => {
    db.Profile.find()
        .then((profile) => res.json(profile))
        .catch((err) => res.send(err));
});

// profile home route
router.post('/' ,(req, res) => {
    db.Profile.create(req.body)
        .then(res.redirect('/home'))
        .catch((err) => res.send(err))
});

// profile show
router.get('/:id', (req, res) => {
    let id = req.params.id;
    db.Profile.findById(id)
        .then((profile) => res.json(profile))
        .catch((err) => res.send(err))
});

// update profile
router.put('/:id', (req, res) => {
    db.Profile.findByIdAndUpdate({ _id:req.params.id }, req.body)
        .then((profile) => res.json(profile))
        .catch((err) => res.send(err))
});

//delete profile

router.delete('/:id', (req, res) => {
    db.Profile.remove({ _id:req.params.id })
        .then(res.send("removed"))
        .catch((err) => res.send(err))
});


module.exports = router; 
