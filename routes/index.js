var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var toastr = require('toastr');
// var bodyParser = require('body-parser');
// var path = require('path');
var session = require('express-session');
var bcrypt = require('bcrypt');

var connection = require('../config/conn');
var salt = bcrypt.genSaltSync(12);

router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
	cookie:{maxAge: Date.now() + (30 * 86400 * 1000)}
}));

var sql_queries = "SELECT * FROM accounts WHERE username = ? AND status = 1 LIMIT 1";

router.post('/auth', function (request, res) {
	var username = request.body.username;
	var password = request.body.password;
	//console.log("username and password: " + username + ' ' + password);
	if (username && password) {
			connection.query(sql_queries, [username], function (err, result) {
				if (result.length > 0) {
					var password_hash = result[0].password;
					var check_valid = bcrypt.compareSync(password, password_hash);
					if (check_valid){
						request.session.loggedin = true;
						request.session.username = username;
						request.session.roles = result[0].roles;
						request.session.fullname = result[0].fullname;
						request.session.user_id = result[0].id;
						request.session.interval = result[0].interval;
						request.session.avatar = result[0].avatar;
						res.redirect('/dashboard');
						
					}else{
						res.render('pages/login',{"title" : "Login Page","status":"invalid"});
					}
				}else {
					res.render('pages/login',{"title" : "Login Page","status":"invalid"});
				}
			res.end();
			});
		}else {
			res.render('pages/login',{"title" : "Login Page","status":"invalid"});
			res.end();
	}
});

/* GET users listing. */
router.get('/', function(req, res, next) {
	if (req.session.loggedin) {
		res.redirect('/dashboard');
	}else{
		res.render('pages/login',{"title" : "Login Page","status":""});
	}
});
router.get('/auth', function(req, res, next) {
	if (req.session.loggedin) {
		res.redirect('/dashboard');
	}else{
		res.render('pages/login',{"title" : "Login Page","status":"invalid"});
	}
  });

module.exports = router;