(function() {
  'use strict';

  angular
    .module('miApp')
    .controller('ProductoController', ProductoController);

  /** @ngInject */
  function ProductoController() {
    var vm = this;
    carousel();
    function carousel(){
      vm.myInterval = 3000;
      vm.slides = [
        {
          image: 'http://lorempixel.com/400/200/'
        },
        {
          image: 'http://lorempixel.com/400/200/food'
        },
        {
          image: 'http://lorempixel.com/400/200/sports'
        },
        {
          image: 'http://lorempixel.com/400/200/people'
        }
      ];
    }
  }
})();
