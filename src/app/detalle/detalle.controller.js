(function() {
  'use strict';

  angular
	.module('miApp')
	.controller('DetalleController', DetalleController);
	DetalleController.$inject = ['Shop','$uibModal','$log']; 
	/** @ngInject */
	function DetalleController($Shop, $uibModal, $log) {
		var vm = this;

		vm.add = add;
		vm.abrir = abrir;
		vm.items = ['item1', 'item2', 'item3'];
		vm.animationsEnabled = true;
		function add(producto){
		//alert(producto.total); return;
			console.log("asd");
			console.log(producto);
			var product = {};
			product.id = producto.id;
			product.price = producto.price;
			product.name = producto.name;
			product.category = producto.category;
			product.qty = 1;
			$Shop.add(product);
			//ngDialog.open({ template: 'modal.html' });
			//desplegar
			vm.abrir("xs");
		
		}
		function abrir(size) {

			var modalInstance = $uibModal.open({
				animation: vm.animationsEnabled,
				templateUrl: 'app/modal/modal.html',
				controller: 'ModalCtrl',
				size: size,
				resolve: {
					items: function () {
						return vm.items;
					}
				}
			});

			modalInstance.result.then(function (selectedItem) {
				vm.selected = selectedItem;
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}
	

		vm.productosTienda = 
		[
		{"id": 1, "category": "Detalles", "name": "Campanas", "price": 0.9, "picture": "assets/images/avion1.jpg", "escala": "Kit modelo de resina, escala 1/48" , "procedencia": "Hecho en Chile", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."},
		{"id": 2, "category": "Detalles", "name": "Carrito", "price": 1, "picture": "assets/images/avion1.jpg", "escala": "Kit modelo de resina, escala 1/48" , "procedencia": "Hecho en Chile", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."},
		{"id": 3, "category": "Detalles", "name": "Carrito con chupetes", "price": 1.2, "picture": "assets/images/avion1.jpg", "escala": "Kit modelo de resina, escala 1/48" , "procedencia": "Hecho en Chile", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."},
		{"id": 4, "category": "Detalles", "name": "Cesta", "price": 1.6, "picture": "assets/images/avion1.jpg", "escala": "Kit modelo de resina, escala 1/48" , "procedencia": "Hecho en Chile", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."},
		{"id": 5, "category": "Detalles", "name": "Mini cesta", "price": 2, "picture": "assets/images/avion1.jpg", "escala": "Kit modelo de resina, escala 1/48" , "procedencia": "Hecho en Chile", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."},
		{"id": 6, "category": "Detalles", "name": "Enfermera", "price": 3, "picture": "assets/images/avion1.jpg", "escala": "Kit modelo de resina, escala 1/48" , "procedencia": "Hecho en Chile", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."},
		{"id": 7, "category": "Detalles", "name": "Gatitos", "price": 2.5, "picture": "assets/images/avion1.jpg", "escala": "Kit modelo de resina, escala 1/48" , "procedencia": "Hecho en Chile", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."},
		{"id": 8, "category": "Detalles", "name": "Perritos", "price": 2.5, "picture": "assets/images/avion1.jpg", "escala": "Kit modelo de resina, escala 1/48" , "procedencia": "Hecho en Chile", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."},
		{"id": 9, "category": "Detalles", "name": "Profesoras", "price": 2.5, "picture": "assets/images/avion1.jpg", "escala": "Kit modelo de resina, escala 1/48" , "procedencia": "Hecho en Chile", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."},
		{"id": 10, "category": "Detalles", "name": "Vestido", "price": 1.8, "picture": "assets/images/avion1.jpg", "escala": "Kit modelo de resina, escala 1/48" , "procedencia": "Hecho en Chile", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."},
		{"id": 11, "category": "Detalles", "name": "Otros", "price": 0.5, "picture": "assets/images/avion1.jpg", "escala": "Kit modelo de resina, escala 1/48" , "procedencia": "Hecho en Chile", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."}
		];

	}


})();