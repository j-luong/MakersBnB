var express = require('express');
var router = express.Router();

var models = require('../server/models/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'nodeAbode' });
});

router.get('/users/new', function(req, res) {
  res.render('signUp', { title: 'nodeAbode' });
});

router.post('/users', function(req, res, next) {
  models.User.create({
    email: req.param('email'),
    password: req.param('password')
  }).then(function(user) {
    res.redirect('/');
  });
});

module.exports = router;
