(function(){
  'use strict';

  angular
    .module('kedron')
    .controller('CashbookController', CashbookController );

  function CashbookController(Expense,toastr, $stateParams) {
    var vm = this;
   Expense.query({id: $stateParams.buildingId} ,
     function(response) {
     vm.expenses= response.Expenses;
     vm.totalExpenses = response.Count;
   }, function(error){
      //todo add error logging
   });
  }

})();
