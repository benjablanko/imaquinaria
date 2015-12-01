(function() {
  'use strict';

  angular
    .module('miApp')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        views: {
            // the main template will be placed here (relatively named)
            'nav': {
              templateUrl: 'app/nav/nav.html'
            },
            'carousel': {
              templateUrl: 'app/carousel/carousel.html',
              controller: 'CarouselController',
              controllerAs: 'carousel'
            },
            '': { 
              templateUrl: 'app/main/main.html',
              controller: 'MainController',
              controllerAs: 'main'
            },
            // the child views will be defined here (absolutely named)
            'producto': {
              templateUrl: 'app/producto/producto.html'//,
              //controller: 'ProductoController',
              //controllerAs: 'producto'
            }
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
