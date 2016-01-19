(function() {
  'use strict';

  angular
    .module('miApp')
    .controller('NavController', NavController);

  /** @ngInject */
  function NavController($location) {
    var vm = this;
    vm.navbarCollapsed  = true;  
  }
})();


