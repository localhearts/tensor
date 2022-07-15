
var express = require('express');
var cors = require('cors');
var path = require('path');
var router = express.Router();
// var crypto = require('crypto');

const sensorController = require('../controllers').sensor;

router.use(cors());
router.options('*', cors());


router.get('/sensor/:type/:gte/:lte/:keyword'
, function (req, res, next) {
    sensorController.list(req, res);
});
router.post('/sensor/search'
, function (req, res, next) {
    sensorController.filterByRisk(req, res);
});

module.exports = router;