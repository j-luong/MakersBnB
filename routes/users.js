var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var models = require('../server/models/index');
var bcrypt = require('bcrypt-nodejs');


router.get('/new', function(req, res) {
  res.render('signUp');
});

router.post('/', function(req, res, callback) {
  models.User.findOne({
    where: {username: req.param('username')}
  }).then(function(user){
    if(!user){
      models.User.create({
        username: req.param('username'),
        password: bcrypt.hashSync(req.param('password'))
      }).then(function(user){
        passport.authenticate('local', {
          failureRedirect: '/',
          successRedirect: '/listings'
        })(req, res, callback);
      });
    } else {
      res.send("User already exists!");
    }
  });
});

router.get('/:id', function(req, res) {
  models.User.find({
    where: {
      id: req.params.id
    }
  }).then(function(user) {
    listings = models.Listing.findAll({
      where: {
        UserId: user.id
      }
    }).then(function(listings) {
    res.render('profile', { user: user, listings: listings});
  });
  });
});

passport.use(new LocalStrategy(function(username, pass, callback){
  models.User.findOne({
    where: {username: username}
    }).then(function(user, err){
    if(err){
      return callback(err);
    }
    if(!user){
      return callback(null, false);
    }
    if(!bcrypt.compareSync(pass, user.password)){
      return callback(null, false);
    }
    return callback(null, user);
  });
}));

//put users into db
passport.serializeUser(function(user, callback){
  callback(null, user.id);
});

//get users from db
passport.deserializeUser(function(id, callback){
  models.User.findById(id).then(function(user){
    callback(null, user);
  });
});

module.exports = router;
