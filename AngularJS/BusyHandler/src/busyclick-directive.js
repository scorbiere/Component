'use strict';
angular.module('BusyHandler')
  .directive('busyClick', ['BusyService',
    function(BusyService) {
      return {
        restrict: 'A',
        scope: {
          busyName: '@',
          busyClick: '&'
        },
        link: function($scope, $element, $attrs) {
				  var self = this;
				  $scope.isBusy = false;
				  var setBusy = function(isBusy) {
					$scope.isBusy = isBusy;
				  };
				  var onClick = function() {
					  if ($scope.isBusy) return false;

					  BusyService.setBusy($scope.busyName, true);
					  var resultClick = $scope.busyClick();
					  if (angular.isDefined(resultClick) && angular.isFunction(resultClick.then)) {
						resultClick.then(function() {
							BusyService.setBusy($scope.busyName, false);
						  },
						  function() {
							BusyService.setBusy($scope.busyName, false);
						  });
					  } else {
						BusyService.setBusy($scope.busyName, false);
					  }
					}

				  BusyService.add($scope.busyName, setBusy);
				  $element.bind('click', onClick);
				  $scope.$on('$destroy', function() {
					console.log("destroy");
					BusyService.remove($scope.busyName, $scope.setBusy);
					$element.unbind('click', onClick);
				  });
				}
      };
    }
  ]);