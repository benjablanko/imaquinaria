(function() {
  'use strict';

  angular
    .module('miApp')
    .directive('carousel', carousel);

  /** @ngInject */
  function carousel($http) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/carousel/carousel.html',
      scope: {
          carouseldata: '@'
      },
      controller: CarouselController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function CarouselController() {
      var vm = this;
      vm.myInterval = 5000;
      vm.noWrapSlides = false;
      vm.slides = [];
      vm.addSlide = addSlide;
      $http.get('json/carousel.json').success(function (data) {
        vm.carouselData =  data;
        for (var i=1; i<5; i++) {
          vm.addSlide(i,vm.carouselData[i]);
        }
      });

      // "vm.creation" is avaible by directive option "bindToController: true"
    
      function addSlide(i, data) {
        vm.slides.push({
          image: 'assets/images/carousel/c' + i + '.png',
          text:  data.mensaje,
          title: data.titulo
        });
      }

    }
  }

})();