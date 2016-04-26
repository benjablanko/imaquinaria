(function() {
  'use strict';

  angular
	.module('miApp')
	.controller('DetalleController', DetalleController);
	DetalleController.$inject = ['Shop','$uibModal','$log','$stateParams','$http', '$rootScope', '$window']; 
	/** @ngInject */
	function DetalleController($Shop, $uibModal, $log, $stateParams, $http, $rootScope, $window) {
		var vm = this;

		vm.datos = [];
		$http.get('json/tienda.json').success(function (data) {
			vm.datos =   data;
		});

		$window.scrollTo(0,0);
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
		vm.notSorted = notSorted;
		vm.items = ['item1', 'item2', 'item3'];
		vm.animationsEnabled = true;	
		vm.myInterval = 5000;
		vm.noWrapSlides = false;
		$rootScope.imageStatus = false;
		$rootScope.heightDetalle = true;
		vm.slides = [];
		vm.posters = [];
		vm.status =  {
			isopen: false
		};
		function add(producto){
			//$rootScope.showme = false;
			var product = {};
			product.id = producto.id;
			product.price = producto.price;
			product.name = producto.name;
			product.category = producto.category;
			product.qty = 1;
			product.image = producto.imagenes[0].image
			vm.items.push(product);
			if(producto.boton === "notify me when available")
			{
				$rootScope.productoAviso =producto;
				$rootScope.showme = true;
			}else{
				$rootScope.showme = false;
				$Shop.add(product);
			}
			
			$rootScope.imageStatus = true;
			//ngDialog.open({ template: 'modal.html' });
			//desplegar
			vm.abrir("xs");
		
		}

		function notSorted (obj){
			if (!obj) {
				return [];
			}
			return Object.keys(obj);
		}

		function abrir(size) {
			var modalCompra;
			if($rootScope.showme){
				modalCompra = $uibModal.open({
					animation: vm.animationsEnabled,
					templateUrl: 'app/modal/modalAviso.html',
					controller: 'ModalController',
					controllerAs: 'modal',
					backdrop: 'static',
					keyboard: true,
					size: size,
					resolve: {
						items: function () {
							return vm.items;
						}
					}
				});
			}else{
				modalCompra = $uibModal.open({
				animation: vm.animationsEnabled,
				templateUrl: 'app/modal/modal.html',
				controller: 'ModalController',
				controllerAs: 'modal',
				backdrop: 'static',
				keyboard: true,
				size: size,
				resolve: {
					items: function () {
						return vm.items;
					}
				}
			});	
			}


			modalCompra.result.then(function (selectedItem) {
				vm.selected = selectedItem;
			}, function () {
				//$log.info('Modal dismissed at: ' + new Date());
			});
		}

		vm.navbarCollapsed  = true; 
		
		if($stateParams.idDetalle === "1"){ //model
			vm.clases = {
				full: false
			}

		$http.get('json/modelKits.json').success(function (data) {
			vm.productosTienda =  data;
		});
	
		}
		if($stateParams.idDetalle === "2"){ //art
			vm.clases = {
				full: false
			}
			$http.get('json/postCards.json').success(function (data) {
				vm.postCards =  data;
			});

			$http.get('json/posters.json').success(function (data) {
				vm.posters =  data;
			});	

		}
		if($stateParams.idDetalle === "3"){ //accessories
			//para las pilotas esta en true
			vm.clases = {
				full: true
			}
			$http.get('json/accessories.json').success(function (data) {
				vm.productosTienda =   data;
			});
		}

	}


})();