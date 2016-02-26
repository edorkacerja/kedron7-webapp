(function(){
  'use strict';

  angular
    .module('kedron')
    .controller('HouseholdController', HouseholdController );

  function HouseholdController(Household , household, toastr, $state, $window , $modal, $scope , $stateParams) {
    var vm = this;
    vm.editMode = false;

    //household
    vm.household = household;


    vm.edit = function () {
      vm.editMode = true;
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
          $state.go('buildingDetail', {buildingId: vm.household.BuildingId});
          toastr.warning('Жилището бе изтрито успешно.');
        }, function(error){
          toastr.warning(error);
        });
      }
    };

    vm.addDeposit = function() {
      $modal.open({
        templateUrl: 'app/views/households/addDeposit.html',
        controller: 'AddDepositController',
        controllerAs: 'adp',
        size: 'sm',
        resolve: {
          householdId: function() {
            return  vm.household.Id;
          }
        }
      });
    };

    ////listen  when the deposit gets successfully added
    //$scope.$on("deposit:added" , function( event , data) {
    //  console.log('asd');
    //  Household.getBalance({id: vm.household.Id} , function(response){
    //    console.log(response);
    //    vm.household.Balance = response;
    //
    //  }, function(error){
    //    //todo log this error somehow.
    //  });
    //})

    $scope.$on("deposit:added" , function( event , data) {
        Household.getBalance({id: vm.household.Id}).$promise.then(function(response){
          console.log(response.toJSON().Value);

          vm.household.Balance = response.toJSON().Value;

        }, function(error){
          //todo log this error somehow.
        });
      });




  }

})();
