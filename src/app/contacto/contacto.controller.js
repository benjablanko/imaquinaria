(function() {
  'use strict';

  angular
    .module('miApp')
    .controller('ContactoController', ContactoController);
	ContactoController.$inject = ['$http']; 
  /** @ngInject */
	function ContactoController($http) {
		var vm = this;
		vm.enviarEmail = enviarEmail;
		vm.placeHolderMensaje = "Mensjae";
		vm.placeHolderEmail ="Email";
		vm.isDisabled = false;
		vm.desactivarButton = desactivarButton;
		function enviarEmail() {
			$http({
			    method: 'POST',
			    url: "/p6/imaquinariaserver/mail.php",
			    data: "nombre=" + "&email=" + vm.email +"&mensaje="+vm.mensaje,
			    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			vm.email 				= "";
			vm.mensaje 				= "";
			vm.placeHolderMensaje 	+= " enviado";
			vm.placeHolderEmail  	+=" enviado";
			desactivarButton();

		}
		function desactivarButton() {
			vm.isDisabled = true;
		}
	
  	}
})();
