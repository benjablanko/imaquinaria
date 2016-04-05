angular
  .module('miApp')
  .controller('CarouselController', CarouselController);

  CarouselController.$inject = ['$http'];

  function CarouselController($http) {
	
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


	function addSlide(i, data) {
		vm.slides.push({
			image: 'assets/images/carousel/c' + i + '.png',
			text:  data.mensaje,
			title: data.titulo
		});
	}
}

