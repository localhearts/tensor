
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

router.post('/sensor/tables/search'
, function (req, res, next) {
    sensorController.filterByRisk(req, res);
});

router.post('/sensor/service/search'
, function (req, res, next) {
    sensorController.filterByService(req, res);
});

router.post('/sensor/direction/search'
, function (req, res, next) {
    sensorController.filterByDirection(req, res);
});

router.post('/sensor/dst-country/search'
, function (req, res, next) {
    sensorController.filterBydstCountry(req, res);
});

router.post('/sensor/src-country/search'
, function (req, res, next) {
    sensorController.filterBysrcCountry(req, res);
});

router.post('/sensor/table-view/search'
, function (req, res, next) {
    sensorController.search(req, res);
});

module.exports = router;