process.env.NODE_ENV='test';

var Browser = require("Zombie");

Browser.localhost('example.com', 3000);

describe('User visits signup page', function(){
  var browser = new Browser();

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

  it('should have a link to sign up on the homepage', function(next){
    browser.visit('/').then(function(err) {
      browser.clickLink("Sign Up", function() {
        expect(browser.location.pathname).toBe("/users/new");
        next();
      });
    });
  });

  it('should have a form to fill in', function(next){
    browser.visit('/users/new', function(err) {
      browser
        .fill('username', 'user66@domain.com')
        .fill('password', 'password')
        .pressButton('Sign Up!', function(){
      expect(browser.html("body")).toContain('Abode sweet Abode!');
      expect(browser.location.pathname).toBe("/listings");
      next();
      });
    });
  });

});
