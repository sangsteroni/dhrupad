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

}
