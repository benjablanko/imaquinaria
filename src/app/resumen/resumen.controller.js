(function() {
	'use strict';

	angular
		.module('miApp')
		.controller('ResumenController', ResumenController);
		ResumenController.$inject = ['$rootScope','$http', '$uibModal','Shop', '$window']; 
	/** @ngInject */
	function ResumenController($rootScope, $http, $uibModal, $Shop, $window) {
		var vm = this;
		if(!$(".detalleAltura")){
			$(".detalleAltura").addClass("detalleAltura");
		}
		vm.userDataPayPal = userDataPayPal;
		vm.paypalData = paypalData;
		vm.enviarEmail = enviarEmail;
		vm.remove = remove;
		vm.roundCurrency = roundCurrency;
		vm.continueShoping = continueShoping;
		vm.validEmail = validEmail;
		vm.errorForm = false;
		vm.getTotal = getTotal;
		vm.select = select;
		vm.EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
		vm.animationsEnabled = true;
		
		vm.costoEnvio = 0;
		$http.get('json/envio.json').success(function (data) {
				vm.envio =  data;

		});
		function select (){
					vm.costoEnvio = 0;

		}    
		function getTotal(){
			if(vm.costoEnvio == "$ 4 - 8 mil pesos nacional"){
				return vm.roundCurrency($rootScope.udpShopTotalPrice);
			}
			else{
				return parseFloat(vm.roundCurrency($rootScope.udpShopTotalPrice))+parseFloat(vm.costoEnvio);
			}
		}
		function roundCurrency (total){
			return total.toFixed(2);
		}
		function validEmail(email){
			return vm.EMAIL_REGEXP.test(email);     
		}
		function enviarEmail (){
			if(vm.persona && vm.persona.name && vm.persona.email && validEmail(vm.persona.email) && vm.persona.adress && vm.persona.country && vm.persona.city  && vm.persona.zipcode && vm.persona.region){
				vm.errorForm = false;
				vm.email = $rootScope.email;
				vm.mensaje = '';
		
  
				vm.mensaje += "<html><body>";
				vm.mensaje += " <h2 align='center'>SHIPPING DETAIL</h2> ";
				vm.mensaje += " <img  style ='display: block;margin-left: auto;margin-right: auto' src='http://imaquinariatoys.cl/p6/dist/assets/images/underline-red.png'>";
				vm.mensaje += "<br><Information br><br> <strong>Name: </strong>";
				vm.mensaje +=   vm.persona.name  ;
				vm.mensaje += "  <br> <br> <br> <strong> Email:</strong> " +vm.persona.email + " <br> <br> <br> ";
				vm.mensaje += "  <strong> Adress:</strong> "+ vm.persona.adress+ " <br> <br> <br> ";
				if(vm.persona.block){
					vm.mensaje += "  <strong> Block N°: </strong>"+ vm.persona.block +" <br> <br> <br> ";
				}
				vm.mensaje += "  <strong> City: </strong>" + vm.persona.city + " <br> <br> <br>";
				vm.mensaje += "  <strong> Country:</strong>" + vm.persona.country + " <br> <br> <br> ";
				vm.mensaje += " <strong> Region: </strong>" + vm.persona.region + " <br> <br> <br> ";
				vm.mensaje += " <strong> Zip Code: </strong>" + vm.persona.zipcode +"<br> <br> <br>";
				if(vm.persona.comments){
					vm.mensaje += "<strong> Comments:  </strong> " + vm.persona.comments +"<br> <br> <br>";
				}
				vm.mensaje = vm.mensaje + 
				"<table width='100%' border='0' cellspacing='0' cellpadding='0'>" +
					"<thead>" +
						"<tr style='height:50px'>" +
							"<th style='border-bottom: 1px solid #C82C3B;'>Id</th>" +
							"<th style='border-bottom: 1px solid #C82C3B;'>Product</th>" +
							"<th style='border-bottom: 1px solid #C82C3B;'>Quantity</th>" +
							"<th style='border-bottom: 1px solid #C82C3B;'>Unit Price</th>" +
							"<th style='border-bottom: 1px solid #C82C3B;'>Sub total</th>" +
						"</tr>" +
					"</thead>" +
					"<tbody>";
 
				for (var i = 0; i < $rootScope.udpShopContent.length; i++) {
					vm.mensaje = vm.mensaje + "<tr style='height:50px'>"+ "<td align='center' style='border-bottom: 1px solid #C82C3B;'>" + $rootScope.udpShopContent[i].id + "</td>"+ "<td style='border-bottom: 1px solid #C82C3B;'>" + $rootScope.udpShopContent[i].name + "</td>"+"<td style='border-bottom: 1px solid #C82C3B;'>" +$rootScope.udpShopContent[i].qty + "</td>"+"<td style='border-bottom: 1px solid #C82C3B;'>" + $rootScope.udpShopContent[i].price + "</td>" +"<td style='border-bottom: 1px solid #C82C3B;'>"+ $rootScope.udpShopContent[i].price * $rootScope.udpShopContent[i].qty + "</td>" +"</tr>";
				}
				vm.mensaje += "<tr style='height:50px'>";
				vm.mensaje += "<td style='border-bottom: 1px solid #C82C3B;' colspan='6'>Shipping cost: " + vm.costoEnvio + "</td>" +" <tr>" +" <tr style='height:50px'>" +
				"<td style='border-bottom: 1px solid #C82C3B;' colspan='6'>Total price: " + vm.getTotal() + "</td>" +" <tr>" +" <tr style='height:50px'>" +
				" <td style='border-bottom: 1px solid #C82C3B;' colspan='6'>Number of products: " + roundCurrency($rootScope.udpShopTotalProducts) + "</td> " +
				" <tr>" +
				" <tr>" +
				" <tr>" +  
				"</tbody>"+
				"</table>";
				
				$http({
						method: 'POST',
						url: "/imaquinariaserver/mail.php",
						data: "nombre=" + "&email=" + vm.persona.email +"&mensaje="+vm.mensaje+"&cliente=0",
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				})

			//email para el cliente
			$http({
					method: 'POST',
					url: "/imaquinariaserver/mail.php",
					data: "nombre=" + "&email=" + vm.persona.email +"&mensaje="+vm.mensaje +"&cliente=1",
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				})     
				vm.persona ="";
				$Shop.destroy();
				$window.location.href = '#/cancel';
			}
			else{
				vm.errorForm = true;
			}  
		}
		/**
	* @desc - establecemos los datos para el formulario de paypal
	* @return - object
	*/
	function paypalData(){

		$Shop.dataPayPal(vm.userDataPayPal(), vm.costoEnvio);
	}
	function userDataPayPal(){
		var userData = {};
		userData.cmd = "_cart";
		userData.upload = "1";
		//userData.business = "benjanegocio@gmail.com";
		userData.business = "sales@imaquinariatoys.cl";
		userData.currencyCode = "USD";
		userData.lc = "US";
		userData.rm = 2;
		//url retorno paypal lado server, envia data post
		userData.successUrl = "http://imaquinariatoys.cl/#/success";
		userData.cancelUrl = "http://imaquinariatoys.cl/";
		userData.cbt = "return to store";
		userData.formClass = "#formPaypal";
		return userData;
	}
 
		function remove(id){
			$Shop.remove(id);
		}
		function continueShoping(){
			$window.location.href = '#/detalle/1';
		}
	}
})();

