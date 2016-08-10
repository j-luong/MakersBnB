var express = require('express');
var router = express.Router();

var models = require('../server/models/index');
// var listings = require('../server/models/listing');

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

router.post('/users', function(req, res, next) {
  models.User.create({
    email: req.param('email'),
    password: req.param('password')
  }).then(function(user) {
    res.redirect('/listings');
  });
});

module.exports = router;
