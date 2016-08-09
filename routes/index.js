var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'nodeAbode' });
});

router.get('/users/new', function(req, res) {
  res.render('signUp', { title: 'nodeAbode' });
});

module.exports = router;
