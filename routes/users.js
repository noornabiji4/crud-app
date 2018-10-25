var express = require('express');
var router = express.Router();
const db = require('../models');
const passport = require('passport');

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('users routes');
});


//for passport session midddleware
router.use(passport.initialize());

//// auth routes
// /users/signup
router.post('/signup',(req,res)=>{

  db.User.register(new db.User({username:req.body.username}),req.body.password,(err,user)=>{
    if(err){
      console.log(err);
      res.render('signup');
    }else{
      passport.authenticate("local")(req,res,function(){
               //  res.send("u have succesfully signed up");
                res.redirect('/home');
      })
    };
} )
})

// login auth route

router.post('/login', passport.authenticate("local",{
      successRedirect:'/home',
      failureRedirect : '/login'
}),(req,res)=>{});




//logout 
router.get('/logout',(req,res)=>{
   req.logout();
   res.redirect('/login');
});



module.exports = router;