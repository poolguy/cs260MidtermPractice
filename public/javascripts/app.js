angular.module('comment', [])
.controller('MainCtrl', [
  '$scope','$http'
  function($scope,$http){
    $scope.test = 'Hello world!';
    $scope.comments = [];
    $scope.create = function(comment) {
        return $http.post('/comments', comment).success(function(data){
        $scope.comments.push(data);
      });
    };

    $scope.addComment = function() {
      var newObject = {
        title:$scope.formContent,
        upvotes:0
      };
      $scope.create({
        title: $scope.formContent,
        upvotes: 0,
      });
      $scope.formContent = "";
    };

    $scope.upvote = function(comment) {
      return $http.put('/comments/' + comment._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          comment.upvotes += 1;
        });
    };
    
    
    $scope.incrementUpvotes = function(comment) {
      $scope.upvote(comment);
    };

    $scope.delete = function(comment) {
      $http.delete('/comments/' + comment._id )
        .success(function(data){
          console.log("delete worked");
        });
      $scope.getAll();
    };

    $scope.getAll = function() {
    return $http.get('/comments').success(function(data){
        angular.copy(data, $scope.comments);
      });
    };
    $scope.getAll(); 

  }
]);
