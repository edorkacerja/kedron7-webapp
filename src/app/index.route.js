(function() {
  'use strict';

  angular
    .module('kedron')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider ) {

    $stateProvider
      //auth
      .state('login', {
        url: '/',
        templateUrl: 'app/views/auth/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })

      //buildings
      .state('buildings', {
        url: '/buildings',
        templateUrl: 'app/views/buildings/buildings.html',
        controller: 'BuildingsController',
        controllerAs: 'bd'
      })
      .state('buildingDetail', {
        url: '/buildings/:buildingId',
        templateUrl: 'app/views/buildings/buildingDetails.html',
        controller: 'BuildingController',
        controllerAs: 'bdetail'
      })
      //households
      .state('householdDetail', {
        url: '/households/:householdId',
        templateUrl: 'app/views/households/householdDetails.html',
        controller: 'HouseholdController',
        controllerAs: 'hdetail'
      })
     //cashbook
     .state('cashbook', {
      url: '/buildings/:buildingId/cashbook',
      templateUrl: 'app/views/cashbooks/cashbook.html',
      controller: 'CashbookController',
      controllerAs: 'cb'
    })
      //Expense Types
      .state('addExpense' , {
        url:'/buildings/:buildingId/expenses/new',
        templateUrl:'app/views/cashbooks/expenses/addexpense.html',
        controller: 'addExpenseController',
        controllerAs: 'exp'
      })
    ;

    $urlRouterProvider.otherwise('/');
  }

})();
