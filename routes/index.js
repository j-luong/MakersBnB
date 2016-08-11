var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy
var models = require('../server/models/index');
var bcrypt = require('bcrypt-nodejs');
var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'nodeAbode' });
});

router.get('/users/new', function(req, res) {
  res.render('signUp', { title: 'nodeAbode' });
});

router.get('/listings', function(req, res) {
  listings = models.Listing.findAll().then(function(listings) {
     res.render('listings', { allListings: listings });
   });
});

router.get('/listings/new', function(req, res) {
  res.render('listingsNew', {title: 'nodeAbode' });
});

router.post('/listings', function(req, res, next) {
  models.Listing.create({
    title: req.param('title'),
    description: req.param('description'),
    price: req.param('price')
  }).then(function() {
    res.redirect('/listings');
  });
});

router.post('/users', function(req, res, callback) {
  models.User.findOne({
    where: {
      email: req.param('email'),
    }
  }).then(function(user){
    if(!user){
      models.User.create({
        email: req.param('email'),
        password: bcrypt.hashSync(req.param('password'))
      }).then(function(user){
        passport.authenticate('local', {
          failureRedirect: '/users/new',
          successfulRedirect: '/listings'
        })(req, res, callback);
      })
    } else {
      res.send("User already exists!");
    }
  })
});

// router.post('/users', function(req, res, next) {
//   models.User.create({
//     email: req.param('email'),
//     password: req.param('password')
//   }).then(function(user) {
//     res.redirect('/listings');
//   });
// });

passport.use(new LocalStrategy(function(email, pass, callback){
  var hashedPass = bcrypt.hashSync(pass)
  models.User.findOne({
    where: {
      email: email
    }
  }).then(function(user,err){
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
  })
}))

//put users into db
passport.serializeUser(function(user, callback){
  callback(null, user.id);
})

//get users from db
passport.deserializeUser(function(id, callback){
  models.User.findById(id).then(function(user){
    callback(null, user);
  })
})

app.use(passport.initialize());
app.use(passport.session());

module.exports = router;
