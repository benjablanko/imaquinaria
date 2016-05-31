(function() {
  'use strict';

  angular
	.module('miApp')
	.controller('NavDetalleController', NavDetalleController);
	NavDetalleController.$inject = ['$http']; 
	/** @ngInject */
	function NavDetalleController($http) {
		var vm = this;
		debugger;
		vm.datos = [];
		$http.get('json/tienda.json').success(function (data) {
			vm.datos =   data;

		});
	}

})();