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
        url:'/households',
        templateUrl: 'app/views/buildings/households/buildingDetails.households.html',
        controller: 'BuildingHouseholdsController',
        controllerAs: 'bhdetail'

       })
      //cashbook
      .state('buildingDetail.cashbook', {
        url: '/cashbook',
        templateUrl: 'app/views/buildings/cashbooks/cashbook.html',
        controller: 'BuildingCashbookController',
        controllerAs: 'cb'
      })
      //Expense Types
      .state('addExpense' , {
        url:'/buildings/:buildingId/expenses/new',
        templateUrl:'app/views/buildings/cashbooks/expenses/addexpense.html',
        controller: 'addExpenseController',
        controllerAs: 'exp',
        resolve: {
          households: ['Expense', '$stateParams', function(Expense, $stateParams) {
            return Expense.payers({building_id: $stateParams.buildingId});
          }]
        }
      })
      //households
      .state('householdDetail', {
        url: '/households/:householdId',
        templateUrl: 'app/views/households/householdDetails.html',
        controller: 'HouseholdController',
        controllerAs: 'hdetail',
        resolve: {
          household: ['Household', '$stateParams', function(Household , $stateParams) {
            return Household.get({id: $stateParams.householdId});
          }]
        }
      })
      .state('householdDetail.payments', {
        url:'/payments',
        views:{
          "":{
            templateUrl: 'app/views/households/householdDetails.payments.html',
            controller: 'HouseholdPaymentsController',
            controllerAs: 'hpdetail'
          },
          "filters": {
            templateUrl: 'app/views/households/householdDetails.filters.html',
            controller: 'HouseholdFilterController',
            controllerAs: 'hfdetail'
          }
        }
      })
      .state('householdDetail.debts', {
        url: '/debts',
        views: {
          "": {
            templateUrl: 'app/views/households/householdDetails.debts.html',
            controller: 'HouseholdDebtsController',
            controllerAs: 'hddetail'
          },
          "filters": {
            templateUrl: 'app/views/households/householdDetails.filters.html',
            controller: 'HouseholdFilterController',
            controllerAs: 'hfdetail'
          }
        }

      })

    ;

    $urlRouterProvider.otherwise('/');
  }

})();
