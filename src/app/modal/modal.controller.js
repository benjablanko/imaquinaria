(function() {
  'use strict';

  angular
    .module('miApp')
    .controller('ModalController', ModalController);
    ModalController.$inject = ['$uibModalInstance','items','$window']; 
  /** @ngInject */
  function ModalController($uibModalInstance, items, $window) {
    var vm = this;
    vm.items = items;
    vm.cancel = cancel;
    vm.ok = ok;
    vm.selected = {
      item: vm.items[0]
    };

    function ok() {
      $uibModalInstance.close(vm.selected.item);
       $window.location.href = '#/resumen';
    }

    function cancel () {
      $uibModalInstance.dismiss('cancel');
    }
  }
})();

