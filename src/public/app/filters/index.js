/**
 * General filter used in the application
 */

(function () {
  angular.module('app')
    .filter('removeNonBreakingSpaces', function () {
      return  function (text) {
        return text ? text.replace(/&nbsp;/g, ' ') : '';
      }
  });  
})();
