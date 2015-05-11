'use strict';
angular.module('BusyHandler')
  .directive('busyAreaName', ['BusyService',
    function(BusyService) {
      return {
        restrict: 'A',
        scope: {
          busyAreaName: '@',
        },
        link: function($scope, $element, $attrs) {
				  var setBusy = function(isBusy) {
					if (isBusy) {
					  //Custom overlay here !!!
					  $element.block({ message: null, overlayCSS: { backgroundColor: '#707070' } });
					}
					else {
					  $element.unblock();
					}
				  };
				  BusyService.add($scope.busyAreaName, setBusy);
				  $scope.$on('$destroy', function() {
					console.log("destroy");
					BusyService.remove($scope.busyAreaName, $scope.setBusy);
				  });
				}
      };
    }
  ]);