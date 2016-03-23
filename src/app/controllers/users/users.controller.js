(function() {
  'use strict';

  angular
    .module('kedron')
    .controller('UsersController', UsersController );

  /** @ngInject */
  function UsersController( QueryConstructor, User, $scope, $modal) {
    var vm = this;
    vm.top = 10;

//Called from on-data-required directive.
    vm.onServerSideItemsRequested = function(currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse) {
      User.query(
        {top: vm.top,
          skip: QueryConstructor.skip(currentPage, vm.top),
          filter:QueryConstructor.filter(filterByFields),
          orderBy: QueryConstructor.order(orderBy, orderByReverse)},

        function(response) {
          vm.users = response;
          vm.totalUsers = response.Count;
          //console.log(response);
        },


        function(response) {
          toastr.error("Не успя да се установи връзка с базата данни:" , response );
        })
    };


    //add a new user
    vm.add= function() {
      $modal.open({
        templateUrl: 'app/views/auth/register.html',
        controller: 'RegistrationController',
        controllerAs: 'reg'
      });
    };




  }
})();