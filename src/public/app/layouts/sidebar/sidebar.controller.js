(function () {
  angular.module('app')
    .controller('SidebarCtrl', ['$state', '$mdMedia', '$mdSidenav', SidebarController])

  function SidebarController($state, $mdMedia, $mdSidenav) {
    var vm = this;

    vm.toggleSidenav = function () {
      $mdSidenav('left')
        .toggle();
    }

    vm.goTo = function (name) {
      $state.go('root.' + name);
      vm.toggleSidenav();
    }
  }
})();