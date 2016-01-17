(function() {
  'use strict';

  angular
    .module('kedron')
    .controller('BuildingsController', BuildingsController);

  /** @ngInject */
  function BuildingsController(Building, $modal , $scope, toastr) {
      var vm = this;
       Building.query( function(response) {
        vm.buildings = response;
      }, function(response) {
         toastr.error("Не успя да се установи връзка с базата данни:" , response );
       });

      //Called from on-data-required directive.
      //    vm.onServerSideItemsRequested = function (currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse) {
      //      Building.query({currentPage: currentPage, pageItems: pageItems, filterBy: filterBy, filterByFields: filterByFields, orderBy: orderBy, orderByReverse: orderByReverse},
      //       function(response) {
      //
      //       },
      //      function(response) {
      //
      //      })
      //    };
      //Ajax call for list data.
      //    var loadProductList = function (currentPage, pageItems, orderBy, orderByReverse) {
      //      //Get JSON string for parameters.
      //      var filterJson = getFilterJson();
      //      //Call data service.
      //      ProductList.post(filterJson.json,
      //        function (data) {
      //          $scope.model.productList = data.Products;
      //          $scope.model.totalProductCount = data.TotalCount;
      //        },
      //        function (error) {
      //          alert("Error getting product list data.");
      //        }
      //      );
      //      $scope.showProductList = true;
      //    }




      vm.add= function() {
        $modal.open({
        templateUrl: 'app/views/buildings/addBuilding.html',
        controller: 'AddBuildingController',
        controllerAs: 'adb'
      });


      };


     $scope.$on('building:added' , function(event, data) {

       vm.buildings.push(data);

     });

  }
})();
