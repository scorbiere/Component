'use strict';
angular.module('BusyHandler')
  .factory('BusyService', [
    function() {
      var callList = {};
      return {
        add: function(name, func) {
          if (!callList[name]) {
            callList[name] = {
              toCall: []
            };
          }
          callList[name].toCall.push(func);
        },
        remove: function(name, func) {
          if (callList[name]) {
            position = $.inArray(func, callList[name].toCall);
            if (~position)
              callList[name].toCall.splice(position, 1);
          }
        },
        setBusy: function(name, isBusy) {
          if (callList[name]) {
            angular.forEach(callList[name].toCall, function(func) {
              if (func) {
                func(isBusy);
              }
            });
          }
        }
      };
    }
  ]);