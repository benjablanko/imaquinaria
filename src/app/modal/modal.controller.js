(function() {
  'use strict';

  angular
    .module('miApp')
    .controller('ModalController', ModalController);
    ModalController.$inject = ['$uibModalInstance','items','$window','Shop','$rootScope','$http']; 
  /** @ngInject */
  function ModalController($uibModalInstance, items, $window, $Shop,$rootScope, $http) {
    var vm = this;
    vm.items = items;
    vm.cancel = cancel;
    vm.ok = ok;
    vm.remove = remove;
    vm.enviarDatosEmail = enviarDatosEmail;

    vm.placeHolderEmail ="Email Adress";
    vm.email = "";
    $rootScope.email = "";
    vm.clases = {
      warning : false
    }
    vm.selected = {
      item: "item"
    };
    vm.isDisabled = true;

    function ok() {
      if($rootScope.showme){
        if(vm.email != undefined && vm.email.length > 0){
          $rootScope.email = vm.email;
          $uibModalInstance.close(vm.selected.item);
        }else{
          vm.clases.warning = true;
        }
      }
      else{
        $uibModalInstance.close(vm.selected.item);
        $window.location.href = '#/resumen';
      }
    }

    function enviarDatosEmail(){
      vm.clases.warning = false;
      if(vm.email != undefined && vm.email.length > 0){
          $rootScope.email = vm.email;

          var mensaje = "<h1>Notificar a " + vm.email + " por el producto: " + $rootScope.productoAviso.name + "</h1>";
          $http({
            method: 'POST',
            url: "/p6/imaquinariaserver/mail.php",
            data: "nombre=" + "&email=" + vm.email +"&mensaje=" + mensaje +"&cliente=0",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          })
          vm.cancel();

          //$uibModalInstance.close(vm.selected.item);
        }else{
          vm.clases.warning = true;
        }



    }
    function cancel () {
      $uibModalInstance.dismiss('cancel');
    }
    function remove(id){
      $Shop.remove(id);
    }

  }
})();

