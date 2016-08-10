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
    browser.visit('/', function(err) {
      browser.clickLink("Sign Up!");
      expect(browser.location.pathname).toBe("/users/new");
      next();
    });
  });

    it('should have a form to fill in', function(next){
      browser.visit('/users/new', function(err) {
        browser.fill('email', 'user@domain.com');
        browser.fill('password', 'password');
        browser.fill('confirm password', 'password');
        browser.pressButton('Sign Up!', function(){
        expect(browser.html("body")).toContain('Abode sweet Abode!');
        expect(browser.location.pathname).toBe("/listings");
        next();
        });
      });
    });


});
