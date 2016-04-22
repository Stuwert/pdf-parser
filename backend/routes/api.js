"use strict"
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
var PDFparser = require('../../node_modules/pdf2json/pdfparser')
var parser = require('../lib/parser')





/* GET users listing. */
router.get('/all', function(req, res, next) {
  Users().then(function(users){
    res.json(users);
  })
});

router.post('/', multipartyMiddleware, function(req, res){
  var pdfParser = new PDFparser();

  pdfParser.on("pdf_dataError", function(errData){
    console.log(errData.parserError)
  })
  pdfParser.on("pdfParser_dataReady", function(pdfData){
    var pdfObj = parser(pdfData)
    console.log(pdfObj);
    // console.log(pdfObj.Postcode);
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
          res.status(200).json(dataObj)
        })
      }else{
        res.status(206).json({message : 'Please input a correct zip code'})
      }
      rimraf(pathToPDF, function(){
        console.log('finished');
        fs.mkdir(pathToPDF, function(err){
          console.log('bing bong');
          if(err) throw err;
        })
      })
    })
  })

  var findPDF = req.files.file.path;
  pdfParser.loadPDF(findPDF)
})

module.exports = router;

function Users(){
  return knex('users')
}
