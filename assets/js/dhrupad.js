var dhApp = angular.module('dhrupad', []);

dhApp.directive('scrollOnClick', function() {
  return {
    restrict: 'A',
    link: function(scope, $elm, attrs) {
      var idToScroll = attrs.href;
      $elm.on('click', function() {
        var $target;
        if (idToScroll) {
          $target = $(idToScroll);
        } else {
          $target = $elm;
        }
        $("body").animate({scrollTop: $target.offset().top-50}, "slow");
      });
    }
  }
});


function RSVPCtrl($scope, $http) {
  /*
  $http.get('./rsvp.json').then(function(data) {
    $scope.rsvps = data;
  });
  */

  $scope.rsvps = [
	{id: 1, gname: 'Sangeetha Narasimhan', gnum: 2, iname: 'Sangeetha Narasimhan'}];

  $scope.addRSVP = function() {
    $scope.id = $scope.next_id();
    $scope.rsvps.push({id:$scope.id, gname:$scope.gname, gnum:$scope.gnum, iname:$scope.iname});
    $scope.gname = '';
    $scope.gnum = '';
    $scope.iname = '';

    /*
    $http.post('./rsvp.json', JSON.stringify($scope.rsvps)).then(function(data) {
      $scope.msg = 'Data saved' + JSON.stringify($scope.rsvps);;
    });
    */
  };
 
  $scope.total_guests = function() {
    var count = 0;
    angular.forEach($scope.rsvps, function(rsvp) {
      count += rsvp.gnum;
    });
    return count;
  };

  $scope.next_id = function() {
    var count = 0;
    angular.forEach($scope.rsvps, function(rsvp) {
      count += 1;
    });
    return (count+1);
  }
}
