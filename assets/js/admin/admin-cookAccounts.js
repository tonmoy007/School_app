var aapp=angular.module('ManageOrderTransactions',[]);

// ***************** Config*********************//


// ******************Controllers***************//


aapp.controller('deliverdOrder',function($scope,$http){
    $scope.loading=true;
    $scope.order={};
    $scope.orderStatus='delivered';
    var orderData={};
    $http({
        url:'admin/getAllOrderInfo?orderStatus='+$scope.orderStatus,
        method:'POST',
    }).success(function(data){
        if(data!='false'){
            $scope.loading=false;
            $scope.orders=data;
            console.log(data);
            orderData=$scope.orders;
            initializeOrders();
        }
    });
    $scope.showDetails=function(key){
        orderData[key].detailsShow=!orderData[key].detailsShow;
    }
    function initializeOrders(){
        var log = [];
            angular.forEach(orderData, function(value, key) {
                value.detailsShow=false;
            }, log);
    }
});


// ******************Directives***************//


aapp.directive('loading', function () {
      return {
        restrict: 'E',
        replace:true,
        template: '<div class="spinner"><i class="fa fa-spinner fa-pulse"></i></div>',
        link: function (scope, element, attr) {
              scope.$watch('loading', function (val) {
                  if (val){
                            $(element).show();
      
                         scope.visible='visible';}
                  else{
                        $(element).hide();}
              });
        }
      }
  });
aapp.directive('orderCards', function () {
      return {
        restrict: 'E',
        replace:true,
        require:'?ngModel',
        templateUrl:'admin/getTemplate/orderCard',
        
        
      }
  });