var express = require('express');
var router = express.Router();
var models = require('../server/models/index');
var app = express();

router.use(function(req, res, callback){
  if(req.user){
    res.locals.currentUsername = req.user.username;
    res.locals.currentUser = req.user;
  }
  callback();
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'nodeAbode' });
});

module.exports = router;
