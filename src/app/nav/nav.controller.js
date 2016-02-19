(function() {
  'use strict';

  angular
	.module('miApp')
	.controller('NavController', NavController);
	NavController.$inject = ['$log','Shop']; 

  /** @ngInject */
  function NavController($location, $Shop, $log) {
	var vm = this;
	vm.remove = remove;
	vm.status =  {
		isopen: false
	};
	vm.navbarCollapsed  = true; 
	function toggled(open) {
		$log.log('Dropdown is now: ', open);
	}
	function toggleDropdown($event) {
		$event.preventDefault();
		$event.stopPropagation();
		vm.status.isopen = !vm.status.isopen;
	}
	function remove(id){
		$Shop.remove(id);
	}
	//vm.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));

  }
})();

