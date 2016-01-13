(function() {
  'use strict';

  angular
    .module('miApp')
    .controller('NavController', NavController);

  /** @ngInject */
  function NavController() {
    var vm = this;

    vm.navbarCollapsed  = true;
    
  }
})();
