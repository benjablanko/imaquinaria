angular
	.module('miApp')
	.controller('CarouselController', CarouselController);

	CarouselController.$inject = ['$http'];

	function CarouselController($http) {
	
		var vm = this;
		vm.myInterval = 5000;
		vm.noWrapSlides = false;
		vm.slides = [];
		
		$http.get('json/carousel.json').success(function (data) {
			vm.carouselData =  data;		
		});
	}

