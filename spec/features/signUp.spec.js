var Browser = require("Zombie");

Browser.localhost('example.com', 3000);

describe('User visits signup page', function(){
  var browser = new Browser();

  // before(function(done) {
  //   browser.visit('/users/new', done);
  // });

  describe('signUp form', function(){

  });

  it('should see sign up message', function(){
    browser.visit('/users/new');
    browser.assert.text('Please sign up!');
  });
});
