(function() {
  'use strict';

  angular
	.module('miApp')
	.controller('DetalleController', DetalleController);
	DetalleController.$inject = ['Shop','$uibModal','$log','$stateParams','$http']; 
	/** @ngInject */
	function DetalleController($Shop, $uibModal, $log, $stateParams, $http) {
		var vm = this;
		vm.class = "";
		if($stateParams.idDetalle === "2"){
			vm.idDetalle = true;	
		}else{
			vm.idDetalle = false;
		}
		if($stateParams.idDetalle === "1"){
			vm.class ="marketing";
		}else{
			vm.class ="marketing2";
		}
		vm.add = add;
		vm.abrir = abrir;
		vm.items = ['item1', 'item2', 'item3'];
		vm.animationsEnabled = true;	
		vm.myInterval = 5000;
		vm.noWrapSlides = false;
		vm.slides = [];
		vm.posters = [];

		vm.status =  {
			isopen: false
		};
		function add(producto){
			var product = {};
			product.id = producto.id;
			product.price = producto.price;
			product.name = producto.name;
			product.category = producto.category;
			product.qty = 1;
			vm.items.push(product);
			$Shop.add(product);
			//ngDialog.open({ template: 'modal.html' });
			//desplegar
			vm.abrir("xs");
		
		}
		function abrir(size) {
			var modalCompra = $uibModal.open({
				animation: vm.animationsEnabled,
				templateUrl: 'app/modal/modal.html',
				controller: 'ModalController',
				controllerAs: 'modal',
				size: size,
				resolve: {
					items: function () {
						return vm.items;
					}
				}
			});

			modalCompra.result.then(function (selectedItem) {
				vm.selected = selectedItem;
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}

		vm.navbarCollapsed  = true; 
		function toggled(open) {
			$log.log('Dropdown is now: ', open);
		}
		function toggleDropdown($event) {
			$event.preventDefault();
			$event.stopPropagation();
			vm.status.isopen = !vm.status.isopen;
		}
		if($stateParams.idDetalle === "1"){ //model
			vm.productosTienda = 
			[
			{"boton":"add to cart", "id": 1, "category": "Detalles", "name": "CHERCAN", "price": 80.00, "imagenes": [{"image":"assets/images/chercan1.jpg"},{"image":"assets/images/chercan2.jpg"},{"image":"assets/images/chercan3.jpg" }], "escala": "Resin model kit, 1/48 scale." , "procedencia": "Made in Chile, 2015", "description": "One of the fastest aircrafts on the Café Air Racer collection. Its large, turboprop engine, two coaxial propellers in contra-rotation and a low profile aerodynamic fuselage make this machine unbeatable on straight lines."},
			{"boton":"notify me when available", "id": 2, "category": "Detalles", "name": "TRICAHUE", "price": 80.00, "imagenes": [{"image":"assets/images/tricahue1.jpg" },{"image":"assets/images/tricahue2.jpg" },{"image":"assets/images/tricahue3.jpg" },{"image":"assets/images/tricahue4.jpg" },{"image":"assets/images/tricahue5.jpg" }],  "escala": "Resin model kit, 1/48 scale." , "procedencia": "Made in Chile, 2015", "description": "One of the fastest aircrafts on the Café Air Racer collection. Its large, turboprop engine, two coaxial propellers in contra-rotation and a low profile aerodynamic fuselage make this machine unbeatable on straight lines."},
			];
		}
		if($stateParams.idDetalle === "2"){ //art
			vm.postCards = 
			[
			{"boton":"add to cart", "id": 1, "category": "Detalles", "name": "POSTCARDS SET", "price": 15.00, "imagenes": [{"image":"assets/images/postales/postales1.jpg"},{"image":"assets/images/postales/postales2.jpg"},{"image":"assets/images/postales/postales3.jpg" }], "escala": "" , "procedencia": "", "description": "Illustrated set of 21 postcards from the “Café Air Racer” series. 43x28 cms., laser print over matte couche, 300grs."},
			];

			vm.posters = 
			[
			{"boton":"add to cart","id": 1, "category": "Detalles", "name": "POSTERS", "price": 15.00, "imagenes": [{"image":"assets/images/posters/1.jpg"}], "escala": "" , "procedencia": "", "description": "Illustrated posters from the “Café Air Racer” series. 43x28 cms., laser print over matte couche, 300grs.  (frame is not included)."},
			{"boton":"add to cart", "id": 2, "category": "Detalles", "name": "POSTERS", "price": 15.00, "imagenes": [{"image":"assets/images/posters/2.jpg"}], "escala": "" , "procedencia": "", "description": "Illustrated posters from the “Café Air Racer” series. 43x28 cms., laser print over matte couche, 300grs.  (frame is not included)."},
			{"boton":"add to cart","id": 3, "category": "Detalles", "name": "POSTERS", "price": 15.00, "imagenes": [{"image":"assets/images/posters/3.jpg"}], "escala": "" , "procedencia": "", "description": "Illustrated posters from the “Café Air Racer” series. 43x28 cms., laser print over matte couche, 300grs.  (frame is not included)."},

			{"boton":"add to cart","id": 4, "category": "Detalles", "name": "POSTERS", "price": 15.00, "imagenes": [{"image":"assets/images/posters/4.jpg"}], "escala": "" , "procedencia": "", "description": "Illustrated posters from the “Café Air Racer” series. 43x28 cms., laser print over matte couche, 300grs.  (frame is not included)."},

			{"boton":"add to cart","id": 5, "category": "Detalles", "name": "POSTERS", "price": 15.00, "imagenes": [{"image":"assets/images/posters/5.jpg"}], "escala": "" , "procedencia": "", "description": "Illustrated posters from the “Café Air Racer” series. 43x28 cms., laser print over matte couche, 300grs.  (frame is not included)."},

			{"boton":"add to cart","id": 6, "category": "Detalles", "name": "POSTERS", "price": 15.00, "imagenes": [{"image":"assets/images/posters/6.jpg"}], "escala": "" , "procedencia": "", "description": "Illustrated posters from the “Café Air Racer” series. 43x28 cms., laser print over matte couche, 300grs.  (frame is not included)."},

			{"boton":"add to cart","id": 7, "category": "Detalles", "name": "POSTERS", "price": 15.00, "imagenes": [{"image":"assets/images/posters/7.jpg"}], "escala": "" , "procedencia": "", "description": "Illustrated posters from the “Café Air Racer” series. 43x28 cms., laser print over matte couche, 300grs.  (frame is not included)."},

			{"boton":"add to cart","id": 8, "category": "Detalles", "name": "POSTERS", "price": 15.00, "imagenes": [{"image":"assets/images/posters/8.jpg"}], "escala": "" , "procedencia": "", "description": "Illustrated posters from the “Café Air Racer” series. 43x28 cms., laser print over matte couche, 300grs.  (frame is not included)."},

			{"boton":"add to cart","id": 9, "category": "Detalles", "name": "POSTERS", "price": 15.00, "imagenes": [{"image":"assets/images/posters/9.jpg"}], "escala": "" , "procedencia": "", "description": "Illustrated posters from the “Café Air Racer” series. 43x28 cms., laser print over matte couche, 300grs.  (frame is not included)."},

			];

		}
		if($stateParams.idDetalle === "3"){ //accessories
			vm.productosTienda = 
			[
			{"boton":"add to cart","id": 1, "category": "Detalles", "name": "PILOTAS", "price": 35.00, "imagenes": [{"image":"assets/images/pilotas/pilotas_1.jpg"},{"image":"assets/images/pilotas/pilotas_2.jpg"},{"image":"assets/images/pilotas/pilotas_3.jpg" },{"image":"assets/images/pilotas/pilotas_conjunto.jpg" },{"image":"assets/images/pilotas/pilotas_conjuntopar.jpg" }], "escala": "4 collectible figure set for your aircraft model kit, scale 1/32." , "procedencia": "", "description": "These girls will have your aircraft ready and set for competition at any moment, always aware of flying conditions, the pilot ready to take-off."},

			];
		}

	}


})();