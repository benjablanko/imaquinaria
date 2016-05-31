(function() {
  'use strict';

  angular
    .module('miApp')
    .config(routerConfig)
    .run(run);

  angular
    .module('miApp')
    .constant('footerConfig',{
      templateUrl: 'app/footer/footer.html'    
    })
    .constant('navDetalleConfig',{
      templateUrl: 'app/navDetalle/navDetalle.html',
      controller: 'NavDetalleController',
      controllerAs: 'navDetalle'    
    });

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
      templateUrl: 'app/navDetalle/navDetalle.html',
      controller: 'NavDetalleController',
      controllerAs: 'navDetalle'         
  };
  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, footerConfig, navDetalleConfig) {

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
            'footer':footerConfig
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
            'navdetalle': navDetalleConfig,
            'footer':footerConfig
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
            'navdetalle': navDetalleConfig,
            'footer':footerConfig
        }

      })
      .state('success', {
        url: '/success',
        views:{
            'nav': navInter,
            'success': {       
              templateUrl: 'app/success/success.html',
              controller: 'SuccessController',
              controllerAs: 'success'
            },
            'navdetalle': navDetalleConfig,
            'footer':footerConfig
        }

      })
      .state('cancel', {
        url: '/cancel',
        views:{
            'nav': navInter,
            'navdetalle': navDetalleConfig,
            'cancel': {       
              templateUrl: 'app/cancel/cancel.html',
              controller: 'CancelController',
              controllerAs: 'cancel'
            },
            'footer':footerConfig
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
  