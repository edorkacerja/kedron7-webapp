(function(){
  'use strict';

  angular
    .module('kedron')
    .controller('BuildingCashbookModelsController', BuildingCashbookModelsController );

  function BuildingCashbookModelsController(Model, toastr, QueryConstructor, $stateParams , $scope , $timeout, $window) {
    var vm = this;
    vm.top = 10 ; //number of items per page -> 10;
    // set available range
    vm.minLowerBoundaryPrice = 0;
    vm.maxUpperBoundaryPrice = 1000;

    // default the user's values to the available range
    vm.lowerBoundaryPrice = vm.minLowerBoundaryPrice;
    vm.upperBoundaryPrice = vm.maxUpperBoundaryPrice;

    var timeoutPromise;
    $scope.$watchGroup(['cbm.lowerBoundaryPrice','cbm.upperBoundaryPrice' ], function() {
      $timeout.cancel(timeoutPromise);
      var timeoutPromise = $timeout(function() {
        loadModels();
      }, 500);

    });

    //delete expense
    vm.deleteBuildingExpense = function(expense_id) {

      if($window.confirm('Сигурни ли сте, че искате да изтриете това жилище?')) {
        Model.delete({ExpenseId: expense_id}, function () {
          loadModels();
          toastr.success('Заплащането протече успешно.');
        }, function(response){
          toastr.error("Не успя да се установи връзка с базата данни:" , response);
        });
      }
    };


    vm.buildingId = $stateParams.buildingId;
    vm.onServerSideItemsRequested = function(currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse) {
      vm.currentPage = currentPage;
      loadModels(currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse);
    };

    var loadModels = function(currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse) {
      Model.query({building_id: $stateParams.buildingId ,top: vm.top, skip: QueryConstructor.skip(vm.currentPage, vm.top), filter:QueryConstructor.filter(filterByFields), orderBy: QueryConstructor.order(orderBy, orderByReverse),
          upperBoundaryPrice: vm.upperBoundaryPrice , lowerBoundaryPrice: vm.lowerBoundaryPrice } ,
        function(response) {
          vm.modelsCollection= response.Items;
          console.log(response.Items);
          vm.modelsCount = response.Count;
        }, function(response){
          toastr.error("Не успя да се установи връзка с базата данни:" , response );
        });
    };

  }

})();
