(function() {
  'use strict';

  angular
    .module('miApp')
    .controller('ContactoController', ContactoController);

  /** @ngInject */
	function ContactoController() {
		var vm = this;
		vm.enviarEmail = enviarEmail;
		vm.email = "";
		vm.mensaje = "";
		function enviarEmail(email,mensaje) {
			//event.preventDefault();
			console.log (email,mensaje);
			//$http.post('/someUrl', data, config).then(successCallback, errorCallback);

		}
  	}
})();
