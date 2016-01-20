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

	for (var i=4; i>2; i--) {
		vm.addSlide(i);
	}

		function addSlide(i) {
			vm.slides.push({
				image: 'assets/images/c' + i + '.png',
				text:'Creamos y diseñamos nuestras propias maquinas y personajes y los convertimos en modelos armables para que los ensambles, los pintes y los colecciones, diviértete!'
			});
		}
	}

