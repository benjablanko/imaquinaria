(function() {
  'use strict';

  angular
	.module('miApp')
	.controller('DetalleController', DetalleController);
	DetalleController.$inject = ['Shop']; 
	/** @ngInject */
	function DetalleController($Shop) {
		var vm = this;


		function add(producto){
		//alert(producto.total); return;
			var product = {};
			product.id = producto.id;
			product.price = producto.price;
			product.name = producto.name;
			product.category = producto.category;
			product.qty = parseInt(producto.total || 1,10);
			$Shop.add(product);
		}

		vm.productosTienda = 
		[
		{"id": 1, "category": "Detalles", "name": "Campanas", "price": 0.9, "picture": "imgs/campanas.jpg"},
		{"id": 2, "category": "Detalles", "name": "Carrito", "price": 1, "picture": "imgs/carrito.jpg"},
		{"id": 3, "category": "Detalles", "name": "Carrito con chupetes", "price": 1.2, "picture": "imgs/carrito_chupetes.jpg"},
		{"id": 4, "category": "Detalles", "name": "Cesta", "price": 1.6, "picture": "imgs/cesta.jpg"},
		{"id": 5, "category": "Detalles", "name": "Mini cesta", "price": 2, "picture": "imgs/cestita.jpg"},
		{"id": 6, "category": "Detalles", "name": "Enfermera", "price": 3, "picture": "imgs/enfermera.jpg"},
		{"id": 7, "category": "Detalles", "name": "Gatitos", "price": 2.5, "picture": "imgs/gatitos.jpg"},
		{"id": 8, "category": "Detalles", "name": "Perritos", "price": 2.5, "picture": "imgs/perritos.jpg"},
		{"id": 9, "category": "Detalles", "name": "Profesoras", "price": 2.5, "picture": "imgs/profesora.jpg"},
		{"id": 10, "category": "Detalles", "name": "Vestido", "price": 1.8, "picture": "imgs/vestido.jpg"},
		{"id": 11, "category": "Detalles", "name": "Otros", "price": 0.5, "picture": "imgs/otros.jpg"}
		];

	}
})();