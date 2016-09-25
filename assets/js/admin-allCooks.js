


var capp=angular.module('allCookApp',['ngTagsInput','ngAnimate','angularUtils.directives.dirPagination']);
    
// ^^^^^^^^^^^^^^^^^^^^^^^^^^ Config^^^^^^^^^^^^^^^^^^^^


// **************************Controllers********************

capp.controller('adminAllCookCtrl',function($scope,$http,$timeout){
        
        $scope.loading=true;
        $scope.notiHide=true;
        var allCooksData = {};
        $http({
            url:'admin/allCooksInfo',
            method:'POST',
            dataType:'JSON'
        }).success(function(data){
            allCooksData=data;
            $scope.cooks = allCooksData;
            $scope.loading=false;
        });

        $scope.pickUpInput=false;
        $scope.homeDeliveryInput=false;
        $scope.sortField='-id';
        $scope.reverse=true;
        $scope.dataNumber=0;

        $scope.fetchEditPanel=function(data){
            var id='editCook'+data.id;
            var element=angular.element(document.getElementById(id));
            element.addClass('is-visible');
            element.find('.fu-modal-container').addClass('is-visible');
            
        }
        $scope.closeModel=function(data){
            var id='editCook'+data;
            var element=angular.element(document.getElementById(id));
            element.removeClass('is-visible');
            element.find('.fu-modal-container').removeClass('is-visible');
        }
        $scope.toggleInput=function(data,cooki){

            if(data=='pickup'){
                for(var i=0;i<allCooksData.length;i++){
                    if(allCooksData[i].id==cooki){
                        allCooksData[i].pickup=!allCooksData[i].pickup;
                        if(allCooksData[i].pickup){
                            allCooksData[i].pickupValue='Pick Up';
                        }
                    }
                }
            }else if(data=='homeDelivery'){
                for(var i=0;i<allCooksData.length;i++){
                    if(allCooksData[i].id==cooki){
                            allCooksData[i].home_delivery=!allCooksData[i].home_delivery;
                            if(allCooksData[i].home_delivery){
                                allCooksData[i].hdValue='Home Delivery';
                            }
                    }
                }
            }

      }

      $scope.cookEditFormSubmit=function(cook){
        $scope.loading=true;
        var data='';
        var log = [];
        var length=cook.serviceTags.length;
        var countLength=1;
            angular.forEach(cook.serviceTags, function(value, key) {
              if(length>countLength){
                data+=value.text+',';
              }else{
                data+=value.text;
              }
              countLength++;
            }, log);
        cook.service_areas=data;
        $http({
            url:'admin/submitCooksInfo',
            dataType:'JSON',
            method:'POST',
            data:cook,
        }).success(function(data){
            if(data=='success'){                
                $scope.loading=false;
                $scope.showNoti('SuccessFully Updated!!');
                $scope.closeModel(cook.id);
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
      $scope.deleteCook=function(cId,uId){
        $http({
            url:'admin/deleteCook/'+cId+'/'+uId,
            method:'POST'
        }).success(function(data){
            for(var i=0;i<allCooksData.length;i++){
                    if(allCooksData[i].id==cId){
                        allCooksData.splice(i, 1);
                    }
                }
            $scope.showNoti(data);
        });
      }



});



// **************************Directives********************

capp.directive('serviceZone',function(){
    return {
        restrict:'E',
        replace:true,
        require:'?ngModel',
        template:'<ul class="blue-list" ><li ng-repeat="sZone in cook.serviceTags">{{sZone.text}}</li></ul>'
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
capp.directive('cookEditForm',function($parse){
    return{
        restrict:'E',
        require:'?ngModel',
        replace:true,
        templateUrl:'admin/getTemplate/cooks-edit-form',
        link:function(scope,element,attr,ctrl){
        }
    }
});


capp.directive('deliveryData',function(){
    return {
        restrict:'A',
        require:'?ngModel',
        link:function(scope,elem,attr,ctrl){
            
            if(elem[0].id=='homeDelivery'&&scope.cook.home_delivery){
                elem.attr('checked','');
                elem.parent('label').addClass('checked');
                
            }
            else if(elem[0].id=='pickUpInput'&&scope.cook.pickup){
                            elem.attr('checked','');
                            elem.parent('label').addClass('checked');
                            
                        }
            scope.$watch('pickUpInput',function(value){
                if(value>0){
                    scope.cook.pickup=!scope.cook.pickup;
                    scope.pickUpInput=0;
                    console.log(scope.pickUpInput);
                }
            });


        }
    };
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










