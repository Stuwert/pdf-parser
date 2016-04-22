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
