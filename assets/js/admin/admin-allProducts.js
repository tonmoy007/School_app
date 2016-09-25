

var capp=angular.module('allProductsApp',['ngTagsInput','ngAnimate','angularUtils.directives.dirPagination']);
    
// ^^^^^^^^^^^^^^^^^^^^^^^^^^ Config^^^^^^^^^^^^^^^^^^^^


// **************************Controllers********************

capp.controller('adminAllProductCtrl',function($scope,$http,$timeout){
        
        $scope.loading=true;
        $scope.notiHide=true;
        var allProductsData = {};
        $http({
            url:'admin/allProductsInfo',
            method:'POST',
            dataType:'JSON'
        }).success(function(data){
            allProductsData=data;
            $scope.products = allProductsData;
            $scope.loading=false;
        });

        $scope.sortField='-id';
        $scope.reverse=true;
        $scope.dataNumber=0;

        $scope.fetchEditPanel=function(data){
            var id='editProduct'+data;
            var element=angular.element(document.getElementById(id));
            element.addClass('is-visible');
            element.find('.fu-modal-container').addClass('is-visible');
            
        }
        $scope.closeModel=function(data){
            var id='editProduct'+data;
            var element=angular.element(document.getElementById(id));
            element.removeClass('is-visible');
            element.find('.fu-modal-container').removeClass('is-visible');
        }
      $scope.productEditFormSubmit=function(item,form){
        if(form.$invalid){
            return;
        }
        $scope.loading=true;
        var data='';
        var log = [];
        var length=item.catagoryList.length;
        var countLength=1;
            angular.forEach(item.catagoryList, function(value, key) {
              if(length>countLength){
                data+=value.text+',';
              }else{
                data+=value.text;
              }
              countLength++;
            }, log);
        item.catagories=data;
        $http({
            url:'admin/submitProductInfo',
            dataType:'JSON',
            method:'POST',
            data:item,
        }).success(function(data){
            console.log(data);
            if(data=='success'){                
                $scope.loading=false;
                $scope.showNoti('SuccessFully Updated!!');
                $scope.closeModel(item.id);
            }
        }).error(function(response){
            console.log(response);
        });
      }
      $scope.showNoti=function(data){

        $scope.notiMessage=data;
        $scope.notiOpen();
        $timeout(function(){$scope.notiClose();},5000);
      }
      $scope.notiClose=function(){
        $scope.notiVisibility='ns-hide';
        $scope.notiHide=true;
      }
      $scope.notiOpen=function(){
        $scope.notiVisibility='ns-show';
        $scope.notiHide=false;
      }
      $scope.deleteCook=function(cId){
        $http({
            url:'admin/deleteProduct/'+cId,
            method:'POST'
        }).success(function(data){
            for(var i=0;i<allProductsData.length;i++){
                    if(allProductsData[i].id==cId){
                        allProductsData.splice(i, 1);
                    }
                }
            $scope.showNoti(data);
        });
      }



});



// **************************Directives********************

capp.directive('catagories',function(){
    return {
        restrict:'E',
        replace:true,
        require:'?ngModel',
        template:'<ul class="blue-list" ><li ng-repeat="cList in item.catagoryList">{{cList.text}}</li></ul>'
    };
});

capp.directive('deliveryOptions',function(){
    return {
        restrict:'E',
        replace:true,
        require:'?ngModel',
        template:'<ul class="blue-list" > <li ng-show="cook.pickup" >{{cook.pickupValue}}</li><li ng-show="cook.home_delivery">{{cook.hdValue}} </li></ul>'
    };
});

capp.directive('loading', function () {
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
capp.directive('productEditForm',function($parse){
    return{
        restrict:'E',
        require:'?ngModel',
        replace:true,
        templateUrl:'admin/getTemplate/product-edit-form',
        link:function(scope,element,attr,ctrl){
        }
    }
});





capp.directive('fuNotification',function(){
    return {
        restrict:'E',
        replace:true,
        template:'<div class="ns-box ns-attached ns-effect-flip ns-type-error {{notiVisibility}}"><div class="ns-box-inner">{{notiMessage}}</div><span ng-click="notiClose()" class="ns-close"></span></div>',
        link:function(scope,elem,attr){
            elem.hide();
            scope.$watch('notiHide',function(value){
                if(!value){
                    elem.show();
                }else{
                    elem.hide();
                }
            });
        }
    };
});










