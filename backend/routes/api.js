var express = require('express');
var unirest = require('unirest')
var knex = require('../lib/knex')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  unirest.get('http://api.zippopotam.us/us/80210')
    .end(function(response){
      console.log(response.body);
    })
});

module.exports = router;
