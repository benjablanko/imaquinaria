(function() {
  'use strict';

  angular
	.module('miApp')
	.controller('NavController', NavController);
	NavController.$inject = ['$location','Shop']; 

  /** @ngInject */
  function NavController($location, $Shop) {
	var vm = this;
	vm.remove = remove;
	vm.toggleDropdown = toggleDropdown;
	vm.hasPicture = hasPicture;
	
	vm.status =  {
		isopen: false
	};
	vm.navbarCollapsed  = true; 
	function hasPicture(item){
        //return (item.length > 0) ;
        if(item.length > 0){
            return true
        }
        else return false
    }

	function toggleDropdown() {
		vm.status.isopen = !vm.status.isopen;
	}
	function remove(id){
		$Shop.remove(id);
	}
	vm.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));

  }
})();

