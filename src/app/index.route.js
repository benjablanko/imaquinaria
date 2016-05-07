(function() {
  'use strict';

  angular
    .module('miApp')
    .config(routerConfig)
    .run(run);

  var nav = {
    templateUrl: 'app/nav/nav.html',
    controller: 'NavController',
    controllerAs: 'nav'
  };
    var navInter = {
    templateUrl: 'app/nav/navInter.html',
    controller: 'NavController',
    controllerAs: 'nav'
  };
  var navDetalle = {
      templateUrl: 'app/detalle/navDetalle.html',
      controller: 'DetalleController',
      controllerAs: 'detalle'         
  };
  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        views: {
            // the main template will be placed here (relatively named)
            'nav': nav,
            'carousel': {
              templateUrl: 'app/carousel/carousel.html',
              controller: 'CarouselController',
              controllerAs: 'carousel'
            },
            'tienda': {
              templateUrl: 'app/tienda/tienda.html',
              controller: 'TiendaController',
              controllerAs: 'tienda'
            },
            'contacto':{
              templateUrl: 'app/contacto/contacto.html',
              controller: 'ContactoController',
              controllerAs: 'contacto'
            },
            'footer':{
              templateUrl: 'app/footer/footer.html'
            }
        }
      })
      .state('detalle', {
        url: '/detalle/:idDetalle',
        views:{
            'nav': navInter,
            'detalle': {       
              templateUrl: 'app/detalle/detalle.html',
              controller: 'DetalleController',
              controllerAs: 'detalle'
            },
            'navdetalle': navDetalle,
            'footer':{
              templateUrl: 'app/footer/footer.html'
            }
        }

      })
      .state('resumen', {
        url: '/resumen',
        views:{
            'nav': navInter,
            'resumen': {       
              templateUrl: 'app/resumen/resumen.html',
              controller: 'ResumenController',
              controllerAs: 'resumen'
            },
            'navdetalle': navDetalle,
            'footer':{
              templateUrl: 'app/footer/footer.html'
            }
        }

      })
      .state('success', {
        url: '/success',
        views:{
            'nav': navInter,
            'success': {       
              templateUrl: 'app/success/success.html'
            },
            'navdetalle': navDetalle,
            'footer':{
              templateUrl: 'app/footer/footer.html'
            }
        }

      })
      .state('cancel', {
        url: '/cancel',
        views:{
            'nav': navInter,
            'navdetalle': navDetalle,
            'cancel': {       
              templateUrl: 'app/cancel/cancel.html'
            },
            'footer':{
              templateUrl: 'app/footer/footer.html'
            }
        }

      });

    $urlRouterProvider.otherwise('/');
  }
  run.$inject = ['$rootScope', '$location', '$window'];
    function run($rootScope, $location, $window) {
        // initialise google analytics
        $window.ga('create', 'UA-XXXXXXXX-X', 'auto');
 
        // track pageview on state change
        $rootScope.$on('$stateChangeSuccess', function (event) {
          if (!$window.ga)
            return;
          $window.ga('send', 'pageview', $location.path());
        });
    }
})();
  