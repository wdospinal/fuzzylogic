(function () {
  angular.module('app')
    .config(['$stateProvider', '$mdThemingProvider', initialConfig]); 

  function initialConfig($stateProvider, $mdThemingProvider) {
    $stateProvider
      .state('root', {
        url: '',
        abstract: true,
        views: {
          'header@': {
            templateUrl: 'app/layouts/header/header.html',
            controller: 'HeaderCtrl as vm',
          },
          'footer@': {
            templateUrl: 'app/layouts/footer/footer.html',
            controller: 'FooterCtrl as vm',
          },
          'sidebar@': {
            templateUrl: 'app/layouts/sidebar/sidebar.html',
            controller: 'SidebarCtrl as vm',
          }
        },
      })
      .state('root.upload', {
        name: 'upload',
        url: '/upload',
        views: {
          'container@': {
            templateUrl: 'app/pages/cvlac/upload-csv.html',
            controller: 'UploadCSVCtrl as vm',
          }
        }
      })
      .state('root.academic-events', {
        name: 'academic-events',
        url: '/academic-events',
        views: {
          'container@': {
            templateUrl: 'app/pages/academic-events/academic-events.html',
            controller: 'AcademicEventsCtrl as vm',
          }
        }
      })
      .state('root.academic-products', {
        name: 'academic-products',
        url: '/academic-products',
        views: {
          'container@': {
            templateUrl: 'app/pages/academic-products/academic-products.html',
            controller: 'AcademicProductsCtrl as vm',
          }
        }
      })
      .state('root.awards', {
        name: 'awards',
        url: '/awards',
        views: {
          'container@': {
            templateUrl: 'app/pages/awards/awards.html',
            controller: 'AwardsCtrl as vm',
          }
        }
      })
      .state('root.courses-degrees', {
        name: 'courses-degrees',
        url: '/courses-degrees',
        views: {
          'container@': {
            templateUrl: 'app/pages/courses-degrees/courses-degrees.html',
            controller: 'CoursesAndDegreesCtrl as vm',
          }
        }
      })
      .state('root.minor-thesis-projects', {
        name: 'minor-thesis-projects',
        url: '/minor-thesis-projects',
        views: {
          'container@': {
            templateUrl: 'app/pages/minor-thesis-projects/minor-thesis-projects.html',
            controller: 'MinorThesisProjectsCtrl as vm',
          }
        }
      })
      .state('root.technology-products', {
        name: 'technology-products',
        url: '/technology-products',
        views: {
          'container@': {
            templateUrl: 'app/pages/technology-products/technology-products.html',
            controller: 'TechnologyProductsCtrl as vm',
          }
        }
      })

    $mdThemingProvider.theme('default')
      .primaryPalette('purple')
      .accentPalette('yellow')
      .warnPalette('red');
  }
})();  
