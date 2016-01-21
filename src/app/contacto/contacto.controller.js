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
		vm.email = "";
		vm.mensaje = "";
		function enviarEmail(email,mensaje) {
			//event.preventDefault();
			console.log (email,mensaje);
			//$http.post('/someUrl', data, config).then(successCallback, errorCallback);
			$http({
			    method: 'POST',
			    url: "/p6/imaquinariaserver/mail.php",
			    data: "nombre=" + "&email=" + email +"&mensaje="+mensaje,
			    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
		}
  	}
})();
