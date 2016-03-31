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
    vm.EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    vm.validEmail = validEmail;

    function validEmail(email){
       return vm.EMAIL_REGEXP.test(email);     
    }

    function ok() {
      if($rootScope.showme){
        if(vm.email != undefined && vm.email.length > 0 && vm.validEmail(vm.email)){
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
      if(vm.email != undefined && vm.email.length > 0 && vm.validEmail(vm.email)){
          $rootScope.email = vm.email;
          var mensaje = "<h1>Notificar a " + vm.email + " por el producto: " + $rootScope.productoAviso.name + "</h1>";
          $http({
            method: 'POST',
            url: "/p6/imaquinariaserver/mail.php",
            data: "nombre=" + "&email=" + vm.email +"&mensaje=" + mensaje +"&cliente=0",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          })
          vm.cancel();
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

