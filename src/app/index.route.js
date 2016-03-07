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
      //building households
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
          "filters": {
            templateUrl: 'app/views/filter/filter.html',
            controller: 'FilterController',
            controllerAs: 'filter'
          }
        }

      })
      //cashbook deposits
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
          "filters": {
            templateUrl: 'app/views/filter/filter.html',
            controller: 'FilterController',
            controllerAs: 'filter'
          }
        }

      })
      //cashbook reports
      .state('buildingDetail.cashbook.reports', {
        url: '/reports',
        views: {
          "": {
            templateUrl: 'app/views/buildings/cashbooks/cashbook.reports.html',
            controller: 'BuildingCashbookReportsController',
            controllerAs: 'cbr',
            resolve: {
              Expense: ['Expense', function (Expense) {
                return Expense;
              }],
              Deposit: ['BuildingDeposit' , function(BuildingDeposit) {
                return BuildingDeposit
              }]
            }
          }
        }
      })
      //cashbook notices
      .state('buildingDetail.cashbook.notices', {
        url:'/notices',
        views: {
          "": {
            templateUrl: 'app/views/buildings/cashbooks/cashbook.notices.html',
            controller: 'BuildingCashbookNoticesController',
            controllerAs: 'cbn',
            resolve: {
              Households: ['$stateParams' ,'Household' , function($stateParams, Household) {
                return Household.query({building_id: $stateParams.buildingId});
              }]
            }
          }
        }
      })
      //cashbook expenses
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
            templateUrl: 'app/views/filter/filter.html',
            controller: 'FilterController',
            controllerAs: 'filter'
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
            templateUrl: 'app/views/filter/filter.html',
            controller: 'FilterController',
            controllerAs: 'filter'
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
            templateUrl: 'app/views/filter/filter.html',
            controller: 'FilterController',
            controllerAs: 'filter'
          }
        }

      })
    ;

    $urlRouterProvider.otherwise('/');
  }

})();
