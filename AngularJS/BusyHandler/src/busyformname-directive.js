'use strict';
angular.module('BusyHandler')
  .directive('busyFormName', ['BusyService',
    function(BusyService) {
      return {
        restrict: 'A',
        scope: {
          busyFormName: '@',
          busyFormSubmit: '&'
        },
        link: function($scope, $element, $attrs) {
				  var self = this;
				  $scope.isBusy = false;
				  var setBusy = function(isBusy) {
					$scope.isBusy = isBusy;
				  };
				  var onSubmit = function() {
					  if ($scope.isBusy) return false;

					  BusyService.setBusy($scope.busyFormName, true);
					  var resultSubmit = $scope.busyFormSubmit();
					  if (angular.isDefined(resultSubmit) && angular.isFunction(resultSubmit.then)) {
						resultSubmit.then(function() {
							BusyService.setBusy($scope.busyFormName, false);
						  },
						  function() {
							BusyService.setBusy($scope.busyFormName, false);
						  });
					  }
					}
					
				  BusyService.add($scope.busyFormName, setBusy);
				  $element.bind('submit', onSubmit);
				  $scope.$on('$destroy', function() {
					console.log("destroy");
					BusyService.remove($scope.busyFormName, $scope.setBusy);
				    $element.unbind('submit', onSubmit);
				  });
				}
      };
    }
  ]);