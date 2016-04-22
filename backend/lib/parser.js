"use strict"
var fs = require('fs')
module.exports = function(data){
  var finalObj = {}
  var newData = data["formImage"]["Pages"].map(function(page){
    return page["Texts"].map(function(text){
      return text["R"].map(function(r){
        return r["T"].split("%20").join(" ").split("%3A").join("")
      })
    })
  })
  var finalObj = {};
  newData[0].forEach((item, i, arr) => {
    if(item[0] === "Surname" || item[0] === 'Forename(s)' || item[0] === 'Postcode'){
      if(!(item[0] in finalObj)){
        finalObj[item] = arr[i+1][0]
      }
    }
  })
  return finalObj
}

// data["formImage"]["Pages"][0]["Texts"][24]["R"][0]["T"]
