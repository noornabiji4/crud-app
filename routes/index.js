var express = require('express');
var router = express.Router();
var middleware = require('../middleware');
var {loggedIn} = middleware;


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/home',(req,res)=>{
  res.render('profile');
}); 
router.get('/newProfile',(req,res)=>{
  res.render('newProfile');
}); 

router.get('/signup',(req,res)=>{
  res.render('signup');
});
router.get('/login',(req,res)=>{
  res.render('login');
});


module.exports = router;
