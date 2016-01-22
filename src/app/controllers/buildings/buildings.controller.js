(function() {
  'use strict';

  angular
    .module('kedron')
    .controller('BuildingsController', BuildingsController);

  /** @ngInject */
  function BuildingsController(Building, $modal , $scope, toastr) {
      var vm = this;
        vm.top = 10 ; //number of items per page -> 10;
       Building.query( function(response) {
        vm.buildings = response;
        vm.totalBuildings = response.Count;
      }, function(response) {
         toastr.error("Не успя да се установи връзка с базата данни:" , response );
       });

      //Called from on-data-required directive.
          vm.onServerSideItemsRequested = function (currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse) {
            if(currentPage == 0 ){
              vm.skip = 0;
            } else {
              vm.skip = currentPage*vm.top;
            }

            Building.query({top: vm.top, skip: vm.skip, filterBy: filterBy, filterByFields: filterByFields, orderBy: orderBy, orderByReverse: orderByReverse},
             function(response) {
               vm.buildings = response;
               vm.totalBuildings = response.Count;
             },
            function(response) {

            })
          };
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

       Building.query( function(response) {
         vm.buildings = response;
         vm.totalBuildings = response.Count;
       }, function(response) {
         toastr.error("Не успя да се установи връзка с базата данни:" , response );
       });

     });

  }
})();
