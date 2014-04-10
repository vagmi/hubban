var express = require('express');
var router = express.Router();
var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;
var User = require('../models/user');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GithubStrategy({
    clientID: process.env.GHCLIENTID,
    clientSecret: process.env.GHCLIENTSECRET,
    callbackURL: (process.env.CALLBACKURL ||  "http://localhost:3000/auth/github/callback")
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      console.log(profile);
      var user = User.forge({github_user_name: profile.username, github_user_id: profile.id, access_token: accessToken}).save();
      // To keep the example simple, the user's GitHub profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the GitHub account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));
/* GET home page. */
router.get('/github',passport.authenticate('github'), function(req, res) {
});
router.get('/github/callback',passport.authenticate('github'),function(req,res){
  res.end("<h1>Authenticated as " + req.user.username+ "</h1>")
});

module.exports.passport=passport;
module.exports.router=router;
