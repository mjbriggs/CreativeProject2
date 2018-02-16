var apiKey = '9HbwToTX9k46LR0QlaUrJN816UYtC485IPoRTrNq';
//access.control.allow.origin=* ;
window.onload = function(){
  document.getElementById('search').value = '';
}
$(document).ready(function(){
  $('#searchBtn').click(function(e){
    e.preventDefault();
    var food = document.getElementById('search').value;
    //alert(city);
    var myurl = 'https://api.nal.usda.gov/ndb/search/?format=json&q=' + food + '&sort=n&max=25&offset=0&api_key=' + apiKey;
    $.ajax({
      url : myurl,
      dataType : 'json',
      success : function(json){
        //console.log('bofa');
        //success = true;
        var length = json.list.item.length;
        if(length > 10){
            length = 10;
        }
        var results = '';
        var foodList = [];
        //var href = ''
        results += '<h2>Searching for ' + food+ '</h2>';
        results += '<ul>';
        for(var i = 0; i < length; i++){
          //results += '<li><a id = \'' + i +  '\' href = \'/foodInfo.html\'>' + json.list.item[i].name + '</a></li>';
        //  console.log(json.list.item[i].name);
          //results += '<button id = \'' + i + '\'>' + json.list.item[i].name + '</button>';
          results += '<li><a id = \'' + i +  '\' href = \'#\'>' + json.list.item[i].name + '</a></li>';
          if(i !== length -1)
            results += '<div class=\"hr-line-dashed\"></div>';
          foodList.push(json.list.item[i].ndbno);
        }
        results += '</ul>';
        $("#results").html(results);
        $('ul').css({'list-style' : 'none'});
        $('h2').css({'text-align' : 'center',
        'padding-bottom' : '10px',
        'padding-top' : '10px'});
        //getFoodReport(foodList);
        //creating evenr handler for each food list link
        foodList.forEach(function(element, index, array){
          document.getElementById(index).addEventListener("click", function(){
            //alert('added eventListener');
            //$('#results').empty();
            var html = '';
            var name = array[index];
            var foodReportUrl = 'https://api.nal.usda.gov/ndb/reports/?ndbno=' + name + '&type=b&format=json&api_key=' + apiKey;
            $.ajax({
              url : foodReportUrl,
              dataType : 'json',
              success : function(json){
                var length = json.report.food.nutrients.length;
                html += '<h3>' + json.report.food.name + '</h3>';//<ul>';
                html +='<table class = \'table table-striped\'><thead>'+
                '<tr><th>Nutrient</th>'+
                '<th>Unit</th>' +
                '<th>Value</th></tr></thead><tbody>';
                for(var i = 0; i < length; i++){
                  html += '<tr><td>' + json.report.food.nutrients[i].name + '</td><td>' +
                  json.report.food.nutrients[i].value + '</td><td>' +
                   json.report.food.nutrients[i].unit + '</td></tr>';
                }
                //html += '</ul>';
                html += '</tbody></table>';
                $('#foodInfo').html(html);
                $('#foodInfo ul li').css({"float":"left",
                'display':'inline-block',
                'border-right' : '1px solid black'
                });
                $('ul').css({'list-style' : 'none'});
                console.log(json);
              },
              error : function(xhr, error, errorThrown){
                console.log(error);
              }
            });
          });
        });
        console.log(json);

      },
      error : function(xhr, error, errorThrown){
        console.log(error);
        console.log(errorThrown);
      }
    });
  });
  $('#Reset').click(function(){
      document.getElementById('search').value = '';
      $('#results').empty();
  });
});
function getFoodReport(array){
  var foodReport = [];
  var name = array[0];
  var foodReportUrl = 'https://api.nal.usda.gov/ndb/reports/?ndbno=' + name + '&type=b&format=json&api_key=' + apiKey;
  $.ajax({
    url : foodReportUrl,
    dataType : 'json',
    success : function(json){
      console.log(json);
    },
    error : function(xhr, error, errorThrown){
      console.log(error);
    }
  });
  array.forEach(function(element) {
    console.log(element);
  });
};
$('#0').click(function(){
    alert(0);
});
