(function(){
  'use strict';

  angular
    .module('kedron')
    .controller('HouseholdController', HouseholdController );

    function HouseholdController(Household , Debt, Payment, QueryConstructor, $stateParams , toastr, $state, $window) {
      var vm = this;
      vm.top = 10;
      vm.editMode = false;

      //household
      Household.get({id: $stateParams.householdId},
        function (response) {
          vm.household = response;
        }, function() {
          //todo add error
        });
       //household debts
        vm.onServerSideDebtsReq = function(currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse) {
          Debt.query({id: $stateParams.householdId ,top: vm.top, skip: QueryConstructor.skip(currentPage, vm.top), filter:QueryConstructor.filter(filterByFields), orderBy: QueryConstructor.order(orderBy, orderByReverse)},
            function(response) {
              vm.debts = response.Items;
              vm.totalHouseholds = response.Count;
            },
            function(response) {
              toastr.error("Не успя да се установи връзка с базата данни:" , response );
            })
        };
       //household payments
        vm.onServerSidePaymentsReq = function(currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse) {
          Payment.query({id: $stateParams.householdId ,top: vm.top, skip: QueryConstructor.skip(currentPage, vm.top), filter:QueryConstructor.filter(filterByFields), orderBy: QueryConstructor.order(orderBy, orderByReverse)},
            function(response) {
              vm.payments = response.Items;
              vm.totalPayments = response.Count;
            },
            function(response) {
              toastr.error("Не успя да се установи връзка с базата данни:" , response );
            })
        };


      vm.edit = function () {
        vm.editMode = true;
        //if(!vm.floorsCount) {
        //  vm.editMode = false;
        //}

      };

      vm.update = function () {
        Household.update({id: vm.household.Id}, vm.household, function () {
          vm.editMode = false;
          vm.editForm.$setPristine();
          toastr.success('Жилището бе актуализирано успешно.');
        })
      };

      vm.delete = function() {
        if($window.confirm('Сигурни ли сте, че искате да изтриете това жилище?')) {
          Household.delete({id: vm.household.Id},function() {
            $state.go('buildingDetail', {buildingId: vm.household.BuildingId});//todo go to building detail with ID
            toastr.warning('Жилището бе изтрито успешно.');
          }, function(error){
            toastr.warning(error);
          });
        }
      }


  }

})();
