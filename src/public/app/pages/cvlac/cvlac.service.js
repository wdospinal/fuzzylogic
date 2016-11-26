(function () {
  angular.module('app')
    .service('CvLacService', ['$http', CvLacService]);

  function CvLacService($http) {
    return {
      parseTeachers: parseTeachers,
    };

    function parseTeachers(data) {
      return $http({
        method: 'POST',
        url: 'http://localhost:3000/api/cvlac/teachers/parse',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(data),
        timeout: 15000,
      });
    }
  }


})();
