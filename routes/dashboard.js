var express = require('express');
var router = express.Router();
var connection = require('../config/conn')
var session = require('express-session');



/* GET home page. */
router.get('/', function(request, res, next) {
  if (request.session.loggedin) {
    connection.query("INSERT INTO logs (menu_access,type,username) VALUES ('Home Dashboard','Visit Page','"+request.session.username+"')" , function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
    res.render('pages/index',{
    "title" : "Dashboard | Tensor Security",
    "menu":"Dashboard",
    "submenu": "Main",
    "roles": request.session.roles,
    "fullname":request.session.fullname,
    "id":request.session.user_id,
    "interval":request.session.interval,
    "avatar":request.session.avatar,
    });
  }else {
		res.redirect('/');
	}
	res.end();
});

module.exports = router;