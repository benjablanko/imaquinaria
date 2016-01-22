(function() {
  'use strict';

  angular
    .module('miApp')
    .controller('ModalCtrl', ModalCtrl);
    ModalCtrl.$inject = ['$uibModalInstance','items']; 
  /** @ngInject */
  function ModalCtrl($uibModalInstance, items) {
    var vm = this;
    vm.items = items;
    vm.selected = {
      item: vm.items[0]
    };

    function ok() {
      $uibModalInstance.close(vm.selected.item);
    }

    function cancel () {
      $uibModalInstance.dismiss('cancel');
    }
  }
})();

