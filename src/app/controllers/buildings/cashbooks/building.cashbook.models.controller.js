(function(){
  'use strict';

  angular
    .module('kedron')
    .controller('BuildingCashbookModelsController', BuildingCashbookModelsController );

  function BuildingCashbookModelsController(Model, toastr, QueryConstructor, $stateParams , $scope , $window) {
    var vm = this;
    vm.top = 10;
    //listen to the filter and when the deposit gets successfully added
    $scope.$on('filterUpdate', function (event, arg) {
      vm.lowerBoundaryPrice = arg['lowerBoundary'];
      vm.upperBoundaryPrice = arg['upperBoundary'];
      vm.dateMadeLowerboundary = arg['fromDateMade'];
      vm.dateMadeUpperboundary = arg['toDateMade'];

      loadModels();
    });
    //delete expense
    //todo fix?
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
          upperBoundaryPrice: vm.upperBoundaryPrice , lowerBoundaryPrice: vm.lowerBoundaryPrice, dateMadeUpperBoundary: vm.dateMadeUpperboundary , dateMadeLowerBoundary: vm.dateMadeLowerboundary } ,
        function(response) {
          vm.modelsCollection= response.Items;
          vm.modelsCount = response.Count;
        }, function(response){
          toastr.error("Не успя да се установи връзка с базата данни:" , response );
        });
    };

  }

})();
