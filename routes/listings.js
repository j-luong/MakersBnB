var express = require('express');
var router = express.Router();
var models = require('../server/models/index');

router.get('/', function(req, res) {
  listings = models.Listing.findAll().then(function(listings) {
      res.render('listings', { allListings: listings, currentUser: res.locals.currentUser });
  });
});

router.get('/new', function(req, res) {
  if(res.locals.currentUser){
    res.render('listingsNew');
  }
  else{
    res.redirect('/');
  }
});

router.post('/', function(req, res, next) {
  models.Listing.create({
    title: req.param('title'),
    description: req.param('description'),
    price: req.param('price')
  }).then(function(listing) {
    res.locals.currentUser.addListing(listing);
  }).then(function() {
    res.redirect('/listings');
  });
});

router.get('/:id', function(req, res) {
  models.Listing.find({
    where: {
      id: req.params.id
    }
  }).then(function(listing) {
    listing.getUser().then(function(user) {
    res.render('onelisting', { listing: listing, parent: user });
  });
  });
});

module.exports = router;
