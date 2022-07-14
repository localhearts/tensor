var express = require('express');
var router = express.Router();
var connection = require('../config/conn')
var session = require('express-session');



/* GET home page. */
router.get('/table-view', function (request, res, next) {
    if (request.session.loggedin) {
        connection.query("INSERT INTO logs (menu_access,type,username) VALUES ('Tables Views','Visit Page','" + request.session.username + "')", function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
        res.render('pages/table-view',{
            "title" : "Table View | Tensor Security",
            "menu":"Table View",
            "submenu": "Main",
            "roles": request.session.roles,
            "fullname":request.session.fullname,
            "id":request.session.user_id,
            "interval":request.session.interval,
            "avatar":request.session.avatar,
            });
    } else {
        res.redirect('/');
    }
    res.end();
});

module.exports = router;