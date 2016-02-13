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
	vm.name = "juan";
	for (var i=1; i<5; i++) {
		vm.addSlide(i);
	}

		function addSlide(i) {
			vm.slides.push({
				image: 'assets/images/c' + i + '.png',
				text:''
			});
		}
	}

