angular
  .module('miApp')
  .controller('CarouselController', CarouselController);

  //CarouselController.$inject = ['$scope'];

  function CarouselController() {
    
    var vm = this;

    vm.myInterval = 5000;
    vm.noWrapSlides = false;
    vm.slides = [];
    
    vm.addSlide = addSlide;

    for (var i=0; i<4; i++) {
      vm.addSlide();
    }

    function addSlide() {
      var newWidth = 600 + vm.slides.length + 1;
      vm.slides.push({
        image: '//placekitten.com/' + newWidth + '/300',
        text: ['More','Extra','Lots of','Surplus'][vm.slides.length % 4] + ' ' +
          ['Cats', 'Kittys', 'Felines', 'Cutes'][vm.slides.length % 4]
      });
    }

  }