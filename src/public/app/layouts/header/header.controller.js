(function (){
  angular.module('app')
    .controller('HeaderCtrl', ['$state', '$mdSidenav', HeaderCtrl]);

  function HeaderCtrl($state, $mdSidenav) {
    var vm = this;
    vm.currentNavItem = 'page1';

    vm.toggleSidenav = function () {
      $mdSidenav('left')
        .toggle();
    }
  }

})();