$('#submit').click(function(){
  var data = new FormData();
  data.append('pdf_file', $('#file').prop('files')[0])
  console.log('bing bong');
  $.ajax( {
    url: "http://localhost:3000/api",
    type: "POST",
    processData: false, // important
    contentType: false, // important
    dataType : "json",
    data: data
  });
})


var app = angular.module('pdfParser', ['angularFileUpload'])

app.controller('PDFController', ['$scope', 'FileUploader', function($scope, FileUploader){
  var uploader = $scope.uploader = new FileUploader({
    url: 'http://localhost:3000/api'
  })

  uploader.onSuccessItem = function(fileItem, response, status, headers) {
    if ('message' in response){
      fileItem.message = response.message;
    }else{
      fileItem.message = response;
    }

    console.log(response);
  };

}])
