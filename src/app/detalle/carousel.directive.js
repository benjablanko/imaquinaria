angular
  .module('miApp')
  .directive('miDirective', MiDirectiveFn);

    function MiDirectiveFn(){
	  var ddo = {
	        restrict: 'EA',
	        scope: { },
	        template: 	'<div class ="row">'+
						'<uib-carousel interval="detalle.myInterval" no-wrap="noWrapSlides" style ="background-color: #ffffff !important;">'+
						'<uib-slide ng-repeat="slide in productoTienda.imagenes"  index="slide.id">'+
						'<img ng-src="{{slide.image}}" width="400" height="300">'+
						'</uib-slide>'+
						'</uib-carousel>'+
						'</div>',
	        controller: 'DetalleController',
            controllerAs: 'detalle',
	        blindToController: true,
	    };
	  return ddo;
}

