var express = require('express');
var router = express.Router();
var models = require('../server/models/index');

router.get('/', function(req, res) {
  listings = models.Listing.findAll().then(function(listings) {
      res.render('listings', { allListings: listings, currentUser: res.locals.currentUsername });
  });
});

router.get('/new', function(req, res) {
  if(res.locals.currentUser){
    res.render('listingsNew', {title: 'nodeAbode' });
  }
  else{
    res.redirect('/');
  }
});

router.post('/', function(req, res, next) {
  models.Listing.create({
    title: req.param('title'),
    description: req.param('description'),
    price: req.param('price'),
    UserId: res.locals.currentUser.id
  }).then(function() {
    res.redirect('/listings');
  });
});


module.exports = router;
