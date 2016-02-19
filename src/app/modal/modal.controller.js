(function() {
  'use strict';

  angular
    .module('miApp')
    .controller('ModalController', ModalController);
    ModalController.$inject = ['$uibModalInstance','items','$window','Shop','$rootScope']; 
  /** @ngInject */
  function ModalController($uibModalInstance, items, $window, $Shop,$rootScope) {
    var vm = this;
    vm.items = items;
    vm.cancel = cancel;
    vm.ok = ok;
    vm.remove = remove;
    vm.placeHolderEmail ="email";
    vm.email = "";
    $rootScope.email = "";
    vm.clases = {
      warning : false
    }
    vm.selected = {
      item: vm.items[0]
    };
    vm.isDisabled = true;

    function ok() {
      if(vm.email != undefined && vm.email.length > 0){
        $rootScope.email = vm.email;
        $uibModalInstance.close(vm.selected.item);
        $window.location.href = '#/resumen';

      }else{
        vm.clases.warning = true;
      }
    }
    function info() {
      if(vm.email != undefined && vm.email.length > 0){
        $rootScope.email = vm.email;
        $uibModalInstance.close(vm.selected.item);
        $window.location.href = '#/resumen';

        //podria enviar un mail desde aqui

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

