(function() {
  'use strict';
  angular
  .module('miApp')
  .controller('TiendaController', TiendaController);
  TiendaController.$inject = ['$http']; 
  /** @ngInject */
  function TiendaController($http) {
    var vm = this;
    vm.datos = [];
    $http.get('json/tienda.json').success(function (data) {
      vm.datos =   data;
    });
  }
})();