var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/new', function(req, res) {
  res.render('signIn');
});

router.post('/new', passport.authenticate("local", {
  failureRedirect: "/sessions/new",
  successRedirect: "/listings"
}));

router.post('/', function(req, res){
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
