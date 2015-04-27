var express = require('express');
var router = express.Router();

//var twitter = require('twitvault-twitter');
var twitter = require('../src/modules/twitvault-twitter');

router.get('/', function(req, res) {
  twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
    if (error) {
      console.log("Error getting OAuth request token : " + error);
    } else {
      console.log("got request token %s\n", requestToken);
      global.requestToken = requestToken;
      global.requestTokenSecret = requestTokenSecret;
      res.redirect('https://twitter.com/oauth/authenticate?oauth_token=' + global.requestToken);
    }
  });
});

module.exports = router;
