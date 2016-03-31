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

	for (var i=1; i<5; i++) {
		vm.addSlide(i);
	}

	function addSlide(i) {
		vm.slides.push({
			image: 'assets/images/carousel/c' + i + '.png',
			text:'Duis eleifend condimentum fermentum. Duis et eros purus. Aliquam eget sodales sem. Pellentesque accumsan suscipit pretium. Suspendisse ac elit eros. Cras arcu risus, facilisis sed porttitor a, semper in ipsum. Aliquam ornare ultrices hendrerit.',
			title: 'TITLE'
		});
	}
}

