var express = require('express');
var router = express.Router();
var session = require('express-session');


router.get('/', function(request, res, next) {
    if (request.session.loggedin) {
        request.session.destroy(function(err) {
            
         });
         res.redirect('/');
    }else {
        res.redirect('/');
      }
      res.end();
  });
  
  module.exports = router;