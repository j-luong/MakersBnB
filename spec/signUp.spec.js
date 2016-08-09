var Browser = require("Zombie");

Browser.localhost('example.com', 3000);

describe('User visits signup page', function(){
  var browser = new Browser();

  // before(function(done) {
  //   browser.visit('/users/new', done);
  // });

  describe('signUp form', function(){

  });

  it('should be able to visit sign up page', function(next){
    browser.visit('/users/new', function(err) {
      expect(browser.success).toBe(true);
      next();
    });
  });

  it('should see sign up message', function(next){
    browser.visit('/users/new', function(err) {
      expect(browser.html("body")).toContain('Please sign up!');
      next();
    });
  });
});
