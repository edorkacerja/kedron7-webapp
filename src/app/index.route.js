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
      //building detail
      .state('buildingDetail', {
        url: '/buildings/:buildingId',
        templateUrl: 'app/views/buildings/buildingDetails.html',
        controller: 'BuildingController',
        controllerAs: 'bdetail'
      })
      .state('buildingDetail.households' ,{
        url:'/buildings/:buildingId/households',
        templateUrl: 'app/views/buildings/households/buildingDetails.households.html',
        controller: 'BuildingHouseholdsController',
        controllerAs: 'bhdetail'

       })
      //cashbook
      .state('buildingDetail.cashbook', {
        url: '/buildings/:buildingId/cashbook',
        templateUrl: 'app/views/buildings/cashbooks/cashbook.html',
        controller: 'BuildingCashbookController',
        controllerAs: 'cb'
      })
      //Expense Types
      .state('addExpense' , {
        url:'/buildings/:buildingId/expenses/new',
        templateUrl:'app/views/cashbooks/expenses/addexpense.html',
        controller: 'addExpenseController',
        controllerAs: 'exp'
      })
      //households
      .state('householdDetail', {
        url: '/households/:householdId',
        templateUrl: 'app/views/households/householdDetails.html',
        controller: 'HouseholdController',
        controllerAs: 'hdetail'
      })


    ;

    $urlRouterProvider.otherwise('/');
  }

})();
