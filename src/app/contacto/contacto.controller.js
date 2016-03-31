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
		vm.placeHolderMensaje = "message";
		vm.placeHolderEmail ="email";
		vm.isDisabled = false;
		vm.desactivarButton = desactivarButton;
		vm.EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
		vm.validEmail = validEmail;
		vm.clases = {
			warning : false
		}
		function validEmail(email){
			return vm.EMAIL_REGEXP.test(email);     
		}

		function enviarEmail() {
			vm.clases.warning = false;
			if(vm.email != undefined && vm.email.length > 0 && vm.validEmail(vm.email)){

				$http({
					method: 'POST',
					url: "/p6/imaquinariaserver/mail.php",
					data: "nombre=" + "&email=" + vm.email +"&mensaje="+vm.mensaje +"&cliente=0",
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				})
				vm.email 				= "";
				vm.mensaje 				= "";
				vm.placeHolderMensaje 	+= " sent";
				vm.placeHolderEmail  	+=" sent";
				desactivarButton();
			}else{
				vm.clases.warning = true;
			}
		}
		function desactivarButton() {
			vm.clases.warning = false;
			vm.isDisabled = true;
		}
	
	}
})();
