var express = require('express');
var unirest = require('unirest')
var knex = require('../lib/knex')
var multiparty = require('connect-multiparty')
var multipartyMiddleWare = multiparty({ uploadDir: '../tmp' })
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  unirest.get('http://api.zippopotam.us/us/80210')
    .end(function(response){
      console.log(response.body);
    })
});

router.post('/', function(req, res){
  console.log('bing bong');
})

module.exports = router;
