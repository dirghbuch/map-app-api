var express = require('express');
var router = express.Router();
var data = require('../data/permits.json');

/* GET Permits listing. */
router.get('/', function(req, res, next) {
  var count = req.query.count ? req.query.count : 10;
  var searchFilteredData;
  var statusFilteredData;
  // if seach param is set
  if(req.query.search && req.query.search != '') {
    let searchString = req.query.search.toLowerCase();
    searchFilteredData = data.filter(item => item.Applicant.toLowerCase().indexOf(searchString) !== -1);
  } else {
    searchFilteredData = data;
  }
  
  if(req.query.status && req.query.status != '') {
    statusFilteredData = searchFilteredData.filter(item => req.query.status.indexOf(item.Status) !== -1);
  } else {
    statusFilteredData = searchFilteredData;
  }
  

  statusFilteredData.forEach(element => {
    element.coordinates = [parseFloat(element.Longitude), parseFloat(element.Latitude)];
  });
  res.setHeader('Content-Type', 'application/json');
  res.send(statusFilteredData.slice(0, count));
});

module.exports = router;
