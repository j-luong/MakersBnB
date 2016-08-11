var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var models = require('../server/models/index');
var bcrypt = require('bcrypt-nodejs');
var app = express();

app.use(passport.initialize());
app.use(passport.session());

router.use(function(req, res, callback){
  if(req.user){
    // res.locals.currentUser = req.user.username;
    res.locals.currentUser = req.user;
  }
  callback();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'nodeAbode' });
});

router.get('/users/new', function(req, res) {
  res.render('signUp', { title: 'nodeAbode' });
});

router.get('/sessions/new', function(req, res) {
  res.render('signIn');
});

router.post('/sessions/new', passport.authenticate("local", {
  failureRedirect: "/sessions/new",
  successRedirect: "/listings"
}));

router.get('/listings', function(req, res) {
  listings = models.Listing.findAll().then(function(listings) {
     res.render('listings', { allListings: listings, currentUser: res.locals.currentUser.username });
   });
});

router.get('/listings/new', function(req, res) {
  if(res.locals.currentUser){
    res.render('listingsNew', {title: 'nodeAbode' });
  }
  else{
    res.redirect('/');
  }
});

router.post('/listings', function(req, res, next) {
  models.Listing.create({
    title: req.param('title'),
    description: req.param('description'),
    price: req.param('price'),
    UserId: res.locals.currentUser.id
  }).then(function() {
    res.redirect('/listings');
  });
});

router.post('/users', function(req, res, callback) {
  models.User.findOne({
    where: {
      username: req.param('username'),
    }
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

router.post('/sessions', function(req, res){
  req.session.destroy();
  res.redirect("/");
});

passport.use(new LocalStrategy(function(username, pass, callback){
  // var hashedPass = bcrypt.hashSync(pass)
  models.User.findOne({
    where: {
      username: username
    }
  }).then(function(user, err){
    if(err){ //if there is an error
      return callback(err);
    }
    if(!user){ //if user does not exist
      return callback(null, false);
    }
    if(!bcrypt.compareSync(pass, user.password)){ //if password do not match with db password
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
