  /**
   * Directive used to detect file change on input
   */
  
(function () {
  angular.module('app')
    .directive('customOnChange', function() {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          var onChangeHandler = scope.$eval(attrs.customOnChange);
          element.bind('change', onChangeHandler);
        }
      };
    });  
})();