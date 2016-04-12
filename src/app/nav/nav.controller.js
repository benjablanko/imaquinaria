(function() {
  'use strict';

  angular
	.module('miApp')
	.controller('NavController', NavController);
	NavController.$inject = ['$location','Shop', '$log']; 

  /** @ngInject */
  function NavController($location, $Shop, $log) {
	var vm = this;
	vm.remove = remove;
	vm.toggled = toggled;
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

	function toggled(open) {
		//$log.log('Dropdown is now: ', open);
	}
	function toggleDropdown(event) {
		event.preventDefault();
		event.stopPropagation();
		vm.status.isopen = !vm.status.isopen;
	}
	function remove(id){
		$Shop.remove(id);
	}
	vm.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));

  }
})();

