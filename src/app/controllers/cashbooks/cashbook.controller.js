(function(){
  'use strict';

  angular
    .module('kedron')
    .controller('CashbookController', CashbookController );

  function CashbookController(Expense,toastr, $stateParams) {
    var vm = this;
    vm.buildingId = $stateParams.buildingId;
   Expense.query({id: $stateParams.buildingId} ,
     function(response) {
     vm.expenses= response.Items;
     vm.totalExpenses = response.Count;
   }, function(response){
       toastr.error("Не успя да се установи връзка с базата данни:" , response );
   });
  }

})();
