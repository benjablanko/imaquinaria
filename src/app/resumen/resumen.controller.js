(function() {
  'use strict';

  angular
    .module('miApp')
    .controller('ResumenController', ResumenController);
    ResumenController.$inject = ['$rootScope','$http']; 
  /** @ngInject */
  function ResumenController($rootScope, $http) {
    var vm = this;
    vm.enviarEmail = enviarEmail;
    enviarEmail();
    vm.roundCurrency = roundCurrency;
    function roundCurrency (total)
    {
      return total.toFixed(2);
    }
    function enviarEmail() {
      //console.log($rootScope.udpShopContent[0]);
      //debugger;
      //console.log(JSON.stringify($rootScope.udpShopContent));
      //console.log($('#tabla-resumen').html().toString());
      vm.email = $rootScope.email;
      vm.mensaje = "" 
      if($rootScope.showme){
        vm.mensaje = "<h1>NOTIFICAR <H1>";
      }
      vm.mensaje = vm.mensaje + '<table><thead><tr><th>Id</th><th>Nombre</th><th>Cantidad</th><th>Precio unidad</th><th>Total producto</th></tr></thead><tbody>';
      for (var i = 0; i < $rootScope.udpShopContent.length; i++) {
        vm.mensaje = vm.mensaje + "<tr>"+ "<td>" + $rootScope.udpShopContent[i].id + "</td>"+ "<td>" + $rootScope.udpShopContent[i].name + "</td>"+"<td>" +$rootScope.udpShopContent[i].qty + "</td>"+"<td>" + $rootScope.udpShopContent[i].price + "</td>" +"<td>"+ $rootScope.udpShopContent[i].price * $rootScope.udpShopContent[i].qty + "</td>" +"</tr>";
      }
       vm.mensaje = vm.mensaje + "<tr>" +
       "<td colspan='6'>Precio total del carrito: " + roundCurrency($rootScope.udpShopTotalPrice) + "</td>" +" <tr>" +" <tr>" +
      " <td colspan='6'>Número total de artículos: " + roundCurrency($rootScope.udpShopTotalProducts) + "</td> " +
       " <tr>" +
       " <tr>" +
       " <tr>" +  
      "</tbody>"+
    "</table>";

      $http({
          method: 'POST',
          url: "/p6/imaquinariaserver/mail.php",
          data: "nombre=" + "&email=" + vm.email +"&mensaje="+vm.mensaje,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      
      //console.log($Shop.get());

    } 
   
  }
})();

