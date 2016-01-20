(function(){
  'use strict';

  angular
    .module('kedron')
    .controller('CashbookController', CashbookController );

  function CashbookController(Expense,toastr, $stateParams) {
    var vm = this;
   Expense.query({id: $stateParams.buildingId} ,
     function(response) {
     vm.expenses= response;
   }, function(error){
      //todo add error logging
   });
  }

})();
