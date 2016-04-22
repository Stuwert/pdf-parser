$('#submit').click(function(){
  var data = new FormData();
  data.append('pdf_file', $('#file').prop('files')[0])
  console.log('bing bong');
  $.ajax( {
    url: "https://pdfparserbackend.herokuapp.com/api",
    type: "POST",
    processData: false, // important
    contentType: false, // important
    dataType : "json",
    data: data
  });
})


var app = angular.module('pdfParser', ['angularFileUpload'])

app.controller('PDFController', ['$scope', 'FileUploader', '$http', function($scope, FileUploader, $http){
  var uploader = $scope.uploader = new FileUploader({
    url: 'https://pdfparserbackend.herokuapp.com/api'
  })

  uploader.onSuccessItem = function(fileItem, response, status, headers) {
    if ('message' in response){
      fileItem.message = response.message;
    }else{
      fileItem.message = response;
    }

    console.log(response);
  };

  $scope.getAllData = function(){
    $http.get('https://pdfparserbackend.herokuapp.com/api/all').then(function(response){
      $scope.users = response.data
    })
  }

}])
