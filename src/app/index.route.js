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
        controllerAs: 'bdetail',
        resolve: {
          building: ['Building' , '$stateParams' , function(Building , $stateParams) {
            return Building.get({ id: $stateParams.buildingId});
          }]
        }
      })
      .state('buildingDetail.households' ,{
        url:'/households',
        templateUrl: 'app/views/buildings/households/buildingDetails.households.html',
        controller: 'BuildingHouseholdsController',
        controllerAs: 'bhdetail'

       })
      //building detail cashbook
      .state('buildingDetail.cashbook', {
        url: '/cashbook',
        templateUrl: 'app/views/buildings/cashbooks/cashbook.html',
        controller: 'BuildingCashbookController',
        controllerAs: 'cb'
      })
      //cashbook expenses
      .state('buildingDetail.cashbook.expenses' , {
        url: '/expenses',
        views:{
          "":{
            templateUrl: 'app/views/buildings/cashbooks/cashbook.expenses.html',
            controller: 'BuildingCashbookModelsController',
            controllerAs: 'cbm',
            resolve: {
              Model: ['Expense', function(Expense) {
                return Expense;
              }]
            }
          },
          //todo implement filter
          //"filters": {
          //  templateUrl: 'app/views/households/householdDetails.filters.html',
          //  controller: 'HouseholdFilterController',
          //  controllerAs: 'hfdetail'
          //}
        }

      })
      .state('buildingDetail.cashbook.deposits' , {
        url: '/deposits',
        views:{
          "":{
            templateUrl: 'app/views/buildings/cashbooks/cashbook.deposits.html',
            controller: 'BuildingCashbookModelsController',
            controllerAs: 'cbm',
            resolve: {
              Model: ['BuildingDeposit', function(BuildingDeposit) {
                return BuildingDeposit;
              }]
            }
          },
          //todo implement filter
          //"filters": {
          //  templateUrl: 'app/views/households/householdDetails.filters.html',
          //  controller: 'HouseholdFilterController',
          //  controllerAs: 'hfdetail'
          //}
        }

      })

      //cashbook expense
      //Expense Types
      .state('addExpense' , {
        url:'/buildings/:buildingId/expenses/new',
        templateUrl:'app/views/buildings/cashbooks/expenses/addexpense.html',
        controller: 'addExpenseController',
        controllerAs: 'exp'
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

      .state('householdDetail.deposits',{
        url:'/deposits',
        views: {
          "": {
            templateUrl: 'app/views/households/householdDetails.deposits.html',
            controller:'HouseholdDepositsController',
            controllerAs:'hdpdetail'
          },
          "filters":{
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
