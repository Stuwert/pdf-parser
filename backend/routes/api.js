var express = require('express');
var unirest = require('unirest')
var rimraf = require('rimraf')
var knex = require('../lib/knex')
var fs = require('fs')
var path = require('path');
var pathToPDF = path.join(__dirname, '../tmp')
var multiparty = require('connect-multiparty')
var multipartyMiddleware = multiparty({ uploadDir: pathToPDF })
var router = express.Router();
var PDFparser = require('../../node_modules/pdf2json/PDFParser')
var parser = require('../lib/parser')

var pdfParser = new PDFparser();

pdfParser.on("pdf_dataError", function(errData){
  console.log(errData.parserError)
})
pdfParser.on("pdfParser_dataReady", function(pdfData){
  var pdfObj = parser(pdfData)
  unirest.get('https://api.zippopotam.us/us/' + pdfObj.Postcode)
  .end(function(response){
    var responseObj = response.body;
    if(responseObj.places){
      var places = responseObj.places[0]
      var dataObj = {
        first_name : pdfObj['Forename(s)'],
        last_name: pdfObj.Surname,
        zip_code : pdfObj.Postcode,
        city: places['place name'],
        state: places.state,
        latitude: places.latitude,
        longitude : places.longitude
      }
      Users().insert(dataObj).then(function(){
        console.log('it worked!');
      })
    }
    // rimraf(pathToPDF, function(){
    //   console.log('finished');
    //   fs.mkdir(pathToPDF, function(err){
    //     if(err) throw err;
    //   })
    // })
  })
})


/* GET users listing. */
router.get('/', function(req, res, next) {
  // unirest.get('http://api.zippopotam.us/us/82020').end(function(response){
  //   console.log(response.body);
  // })
});

router.post('/', multipartyMiddleware, function(req, res){
  var findPDF = req.files.pdf_file.path;
  pdfParser.loadPDF(findPDF)

})

module.exports = router;

function Users(){
  return knex('users')
}