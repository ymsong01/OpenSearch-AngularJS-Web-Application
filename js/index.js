var app = angular.module('WikipediaAngularApp',['ngAnimate']);

app.controller('Controller', ['$scope', '$http', function($scope, $http){
  
  $scope.titles =[];
  
  $scope.links = [];
  $scope.details = [];
  $scope.search = function () {
    
    var inputvalue = document.getElementById("Wikisearch").value;
    $('.title').addClass('hide');
    var url='https://en.wikipedia.org/w/api.php?action=opensearch&search=' + inputvalue + '&limit=10&format=json&callback=JSON_CALLBACK';
  
  $http.jsonp(url).then(function(rsp){
      $scope.rsp = rsp;
      $scope.titles.length = 0;
      $scope.details.length = 0;
      $scope.links.length = 0;
      // When response is successfully executed
      if (rsp.status == 200){
        for (var i=0; i<10; i++){
          $scope.titles.push(rsp.data[1][i]);
          $scope.details.push(rsp.data[2][i]);
          $scope.links.push(rsp.data[3][i]);
        }
        $('.content').slideDown("slow");
      } 
    }, function error(rsp){
      $scope.titles.length = 0;
      $scope.details.length = 0;
      $scope.links.length = 0;
      $scope.titles.push("Not Available. Either there is no internet connection or there is an error with Wikipedia OpenSearch API");
        $scope.details.push("clicking this will reload the page");
        $scope.links.push("");
    });

  }

}]);