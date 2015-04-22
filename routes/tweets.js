var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var twitter = require('twitvault-twitter');

/* GET home page. */
router.get('/', function(req, res) {
  // Bypass credential check for quicker development
  if (req.query.hasOwnProperty('noauth') && req.query['noauth']) {
    res.render('tweets', { title: 'Twitvault', screen_name: '' });
  } else {
    var oauth_verifier = req.query['oauth_verifier'];
    var requestToken = global.requestToken;
    var requestTokenSecret = global.requestTokenSecret;

    twitter.getAccessToken(requestToken, requestTokenSecret, oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
      if (error) {
        console.log(error);
      } else {
        twitter.verifyCredentials(accessToken, accessTokenSecret, function(error, data, response) {
          if (error) {
              //something was wrong with either accessToken or accessTokenSecret
              //TODO start over with Step 1
          } else {
            // Successfully verified. Can now make api-calls

            global.accessToken = accessToken;
            global.accessTokenSecret = accessTokenSecret;
            global.userId = data["id"];
            res.render('tweets', { title: 'Twitvault', screen_name: data["screen_name"] });
          }
        });
      }
    });
  }
});

router.get('/load', function(req, res) {
  twitter.getTimeline('user', { user_id: global.userId, count: 30, trim_user: true }
                      , global.accessToken, global.accessTokenSecret
                      , function(error, data, response) {
                      if(error) {
                        console.log('Error loading tweets : ' + error);
                        res.error();
                      } else {
                        res.send(data);
                      }
                     });
});

router.post('/destroy', function(req, res) {
  twitter.statuses('destroy', { id: req.body['id'], trim_user: true }
                   , global.accessToken, global.accessTokenSecret
                   , function(error, data, response) {
    if(error) {
      for (var entry in error) {
        console.log(error[entry]);
      }
      console.log('Error deleting tweets : ' + error);
    } else {
      res.end();
    }
  });
});

module.exports = router;
