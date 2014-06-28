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
        $('body, html').animate({scrollTop: $target.offset().top-50}, "slow");
      });
    }
  }
});


function RSVPCtrl($scope, $http) {
  /*
   * On startup...
   */
  $scope.rsvps = [];
  $scope.submitted = false;

  Parse.initialize("fUijf067YybdiQB7Io13VP66kDjkMQBASOXx16Yo", "338NN4cSdTPNZX3gbJ9YVDGoLxsDnEVnPev83w06");

  // Get all RSVPs
  $scope.getRsvps = function() {
    $http({
	method : 'GET', 
	url : 'https://api.parse.com/1/classes/Rsvp', 
	headers: { 'X-Parse-Application-Id':'fUijf067YybdiQB7Io13VP66kDjkMQBASOXx16Yo', 'X-Parse-REST-API-Key':'hezqkxVrcfc5BuaCCqkcOw4lNpmVSmmqxWbbFOE6'}}).
            success(function(data, status) {
                $scope.rsvps = data;
            }).
            error(function(data, status) {
                alert("Error");
            });
  };


  $scope.addRsvp = function() {
    if ($scope.myForm.$valid) {
      // Submit as normal
      $http({
	method : 'POST',
	url : 'https://api.parse.com/1/classes/Rsvp',
	data : JSON.stringify({name: $scope.name, attendees: $scope.attendees, invitedby: $scope.invitedby}),
        headers: { 'X-Parse-Application-Id':'fUijf067YybdiQB7Io13VP66kDjkMQBASOXx16Yo', 
		   'X-Parse-REST-API-Key':'hezqkxVrcfc5BuaCCqkcOw4lNpmVSmmqxWbbFOE6'}}).
            success(function(data, status) {
		$scope.getRsvps();
		$scope.message = "Thank you. Your RSVP has been recorded. Please make the payment to "+$scope.invitedby+" to confirm your spot.";
                alert($scope.message);
		$scope.name="";
		$scope.attendees="";
		$scope.invitedby="";
            }).
            error(function(data, status) {
		$scope.message = "Sorry, there seems to be some problem. We couldn't record your RSVP. Please contact "+$scope.invitedby+" to confirm your presence and to make the payment.";
                alert("Error");
            });
    } else {
      $scope.myForm.submitted = true;
    }
  };


  // Count total guests
  $scope.total_guests = function() {
    var count = 0;
    angular.forEach($scope.rsvps.results, function(rsvp) {
      count += rsvp.attendees;
    });
    return count;
  };


}
