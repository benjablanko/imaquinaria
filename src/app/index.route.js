(function() {
  'use strict';

  angular
    .module('miApp')
    .config(routerConfig);

  var nav = 
  {
    templateUrl: 'app/nav/nav.html',
    controller: 'NavController',
    controllerAs: 'nav'
  }
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
            
            // the child views will be defined here (absolutely named)
            'tienda': {
              templateUrl: 'app/tienda/tienda.html'
            },
            'contacto':{
              templateUrl: 'app/contacto/contacto.html'
            },
            'footer':{
              templateUrl: 'app/footer/footer.html'
            }
        }
      })
      .state('detalle', {
        url: '/detalle',
        views:{
                      // the main template will be placed here (relatively named)
            'nav': nav,
            'detalle': {       
              templateUrl: 'app/detalle/detalle.html',
              controller: 'DetalleController',
              controllerAs: 'detalle'
            },
            'footer':{
              templateUrl: 'app/footer/footer.html'
            }
        }

      })
      .state('resumen', {
        url: '/resumen',
        views:{
                      // the main template will be placed here (relatively named)
            'nav': nav,
            'resumen': {       
              templateUrl: 'app/resumen/resumen.html',
              controller: 'DetalleController',
              controllerAs: 'resumen'
            },
            'footer':{
              templateUrl: 'app/footer/footer.html'
            }
        }

      });

    $urlRouterProvider.otherwise('/');
  }

})();
  