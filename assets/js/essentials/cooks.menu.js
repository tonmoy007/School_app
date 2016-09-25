
   
   var app=angular.module('cooksMenu',['ngTagsInput','ngFileUpload','jkuri.timepicker']);
   
   // ********************* Config
   // 
   // ((((((((((((((((((Config))))))))))))))))))
   

// (((((((((((((((((((((((Controllers)))))))))))))))))))))))

   app.controller('menuCtrl',function($scope,$http,Upload,$timeout,$document,$animate){
            // (((((((((Scope Variables)))))))))
            
            $scope.loading=true;
            $scope.productFound=false;
            $scope.menuItems=[];
            $scope.servicezones=[];
            $scope.newItem=newItem;
            $scope.notiHide=true;

            // ((((((((((((((((((Loading the page data))))))))))))))))))))
            

            $http({
                url:'cooks/getMenuPageData',
                method:'POST',
                dataType:'JSON'
            }).success(function(response){
                console.log(response);
                $scope.user=true;
                $scope.userid=response.userid;
                //console.log(response);
                $scope.newItem.cooksID=response.userid;
                //console.log($scope.newItem);
                $scope.menuItems=(response.menuItems)?response.menuItems:[];
                $scope.productFound=true;
                $scope.loading=false;
            });


            // ((((((((((((((((((Scope Functions))))))))))))))))))
            
            $scope.showNoti=function(data){

                $scope.notiMessage=data;
                $scope.notiOpen();
                $timeout(function(){$scope.notiClose();},3000);
            }
            $scope.notiClose=function(){
                $scope.notiVisibility='ns-hide';
                $timeout(function(){$scope.notiHide=true;},290);
            }
            $scope.notiOpen=function(){
                $scope.notiVisibility='ns-show';
                $scope.notiHide=false;
            }
   
            $scope.closeModel=function(data){
                var item=angular.element(document.getElementById(data));
                item.children('.fu-modal-container').removeClass('is-visible');
                item.removeClass('is-visible');
            }
            $scope.singleItemDisplay=function(data){
                console.log(data)
                var item=angular.element(document.getElementById(data));
                item.addClass('is-visible');
                //console.log(item);
                item.children('.fu-modal-container').addClass('is-visible');
            }
            $scope.AddNewFormSubmit=function(data,form){
                // console.log(data);
                if(form.$invalid){
                    return;
                }
                var log=[];
                var length=data.catagoryList.length;
                var countLength=1;
                var catagory='';
                    angular.forEach(data.catagoryList, function(value, key) {
                      if(length>countLength){
                        catagory+=value.text+',';
                      }else{
                        catagory+=value.text;
                      }
                      countLength++;
                    }, log);
                data.catagories=catagory;
                //console.log(data);
                //return;
                data.upload=Upload.upload({
                    url:'cooks/submitNewMenuItem',
                    method:'POST',
                    dataType:'JSON',
                    data:data
                });
                data.upload.then(function(response){
                    
                        console.log(response);
                        if(response.data){
                            // data.feature_img=response.data.name;
                            $scope.menuItems.push(response.data.item[0]);
                            $scope.resetNewForm();
                            $scope.showNoti('Item Successfully Added ');
                            $scope.closeModel('addNewItem');
                        }else{
                           $scope.showNoti('<div class="alert aler-danger">Problem Adding Item</div>');
                            $scope.closeModel('addNewItem'); 
                        }
                }, function (response) {

                      if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                    }, function (evt) {
                      // Math.min is to fix IE which reports 200% sometimes
                      data.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    });
            }
            $scope.setAsTodaysMenu=function(data){
                //console.log(newItem);
                $http({
                    url:'cooks/setAsTodaysMenu',
                    method:'POST',
                    dataType:'JSON',
                    data:{todays_menu:!data.todays_menu,id:data.id,stock_quantity:data.stock_quantity}
                }).success(function(response){
                    if(response=='success'){
                        $scope.closeModel('setQuantity'+data.id);
                    }
                }).error(function(response){
                    console.log(response);
                });
                data.todays_menu=!data.todays_menu;

            }
            $scope.resetNewForm=function(){
                
                $scope.newItem={
                    title:'',
                    catagories:{},
                    description:'',
                    feature_img:'',
                    cooksID:'',
                    price:'',
                    min_quantity:'',
                    cusines:'',
                    todays_menu:''

                }
                $scope.newItem.cooksID=$scope.userid;
                
            }
            $scope.deleteItem=function(data,key){
                //console.log(data);
                //console.log(key);
                $http({
                    url:'cooks/deleteItem/'+data,
                    method:'GET',

                }).success(function(response){
                    
                    if(response=='success'){
                        for(var i=0;i<$scope.menuItems.length;i++){
                            if($scope.menuItems[i].id==data){
                                $scope.menuItems.splice(i, 1);
                                $scope.showNoti('Item Successfully Deleted !!');
                            }
                        }
                }
                    
                });
            }
            $scope.deleteItemPopup=function(id,key,title){
                var r=confirm('Are you sure you want to delete '+title+'  ??');
                if(r==true){
                    $scope.deleteItem(id,key);
                }
            }


   });

app.controller('productEditCtrl',function($scope,$http,Upload){
    $scope.titleEditFormShow=false;
    $scope.scedule=[];
    $scope.scedule.hours=hours;
    $scope.scedule.munites=munites;
    


    $scope.changeFeatureImage=function(data){

        send={feature_img:data.feature_img_temp,id:data.id};
        var fUpload=Upload.upload({
            url:'cooks/changeFeatureImage',
            method:'POST',
            dataType:'JSON',
            data:send
        });
        fUpload.then(function(response){
            //console.log(response);
            if(response!='false'){
                data.feature_img=response.data.name;
                data.feature_img_temp='';
                $scope.fimage_progress=0;
            }
        },function(response){

        },function(evt){
             $scope.fimage_progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });

    }
    $scope.changeItem=function(id,key,value){
        

        if(key=='catagories'){
            var log=[];
            var catagory='';
            length=value.length;
            countLength=1;
            angular.forEach(value,function(val,k){
                if(length>countLength){
                        catagory+=val.text+',';
                      }else{
                        catagory+=val.text;
                      }
                      countLength++;
            },log);
            value=catagory;
        }
        send={id:id,key:key,value:value};
        $http({
            url:'cooks/changeItem',
            dataType:'JSON',
            method:'POST',
            data:send
        }).success(function(response){
            console.log(response);
        }).error(function(response){
            console.log(response);
        });
    }


    $scope.changeItemScedule=function(item){
        // console.log(id);
        // console.log(ordernowtime);
        // console.log(preordertime);
        send={id:item.id,preordertime:item.preorder_time_for};
        $http({
            url:'cooks/changeItemScedule',
            method:'POST',
            dataType:'JSON',
            data:send

        }).success(function(response){
            //console.log(response);
            if(response){
                item.preorder_time_text=response.preorder_time_text;
                // item.ordernow_time_text=response.ordernow_time_text;
            }
        }).error(function(response){
            console.log(response);
        });
    }





});


// (((((((((((((((((((((((Directives)))))))))))))))))))))))


app.directive('productLoading', function () {
      return {
        restrict: 'E',
        replace:true,
        template: '<div class="center productLoading" style="font-size:2em"><div class="spinner"><i class="fa fa-spinner fa-pulse"></i></div></div>',
        link: function (scope, element, attr) {
            $(element).show();
              scope.$watch('loading', function (val) {  
                  if (!val)
                    $(element).hide();
                  else
                    $(element).show();
              });
        }
      }
  });



app.directive('addNewItemBlock',function(){
    return{
        restrict:'EA',
        templateUrl:'cooks/getpage/addNewItemBlock',
        scope:{
            type:'=?'
        },
        link:function(scope,elem,attr){
            scope.singleItemDisplay=scope.$parent.singleItemDisplay;
            scope.closeModel=scope.$parent.closeModel;
        }
    };
});
app.directive('menuItem',function($http,$timeout){
    return {
        restrict:'E',
        replace:true,
        templateUrl:'cooks/getpage/menuItem',
        link:function(scope,elem,attr){
            
                scope.$watch('menuItems',function(val){
                    
                    if(!val.length){
                        scope.notFound=true
                    }else{
                        scope.NotFound=false;
                    }
                });
            
        }
    }
 });


app.directive('addNewItemPopup',function(){
    return{
        restrict:'EA',
        replace:true,
        templateUrl:'cooks/getpage/addNewItemPopup'
    }
});
app.directive('addWeeklyItemPopup',function(){
    return{
        restrict:'EA',
        replace:true,
        templateUrl:'cooks/getpage/addWeeklyItemPopup',
        link:function(scope,elem,attr){

        }
    }
});
app.directive('addNewItemForm',function(){
    return{
        restrict:'EA',
        replace:true,
        templateUrl:'cooks/getpage/addMenu'
    }
});
app.directive('addWeeklyItemForm',function($http,$timeout){
    return{
        restrict:'EA',
        templateUrl:'cooks/getpage/addWeeklyItemForm',
        link:function(scope,elem,attr){
            scope.lunchitem=[];
            scope.dinneritem=[];
            scope.days=[
            {name:"Sunday",lunchMenuItems:[],dinnerMenuItems:[],lunchitem:[],dinneritem:[],visible:true,},
            {name:"Monday",lunchMenuItems:[],dinnerMenuItems:[],lunchitem:[],dinneritem:[],visible:false,},
            {name:"Tuesday",lunchMenuItems:[],dinnerMenuItems:[],lunchitem:[],dinneritem:[],visible:false,},
            {name:"Wednesday",lunchMenuItems:[],dinnerMenuItems:[],lunchitem:[],dinneritem:[],visible:false,},
            {name:"Thursday",lunchMenuItems:[],dinnerMenuItems:[],lunchitem:[],dinneritem:[],visible:false,},
            {name:"Friday",lunchMenuItems:[],dinnerMenuItems:[],lunchitem:[],dinneritem:[],visible:false,},
            {name:"Saturday",lunchMenuItems:[],dinnerMenuItems:[],lunchitem:[],dinneritem:[],visible:false,}
            ];
            scope.addToDay=function(key,item,type){
                console.log(item);
                if(!item.name||item.name==''){
                    return;
                }
                data=item;

                if(type=='lunch'){
                    scope.days[key].lunchMenuItems.push({name:item.name});
                    scope.days[key].lunchitem=[];
                }else{
                    scope.days[key].dinnerMenuItems.push({name:data.name});
                    scope.days[key].dinneritem=[];
                }
            }
            scope.setVisible=function(setKey,item){
                angular.forEach(item,function(value,key){
                    if(setKey==key){
                        item[key].visible=true;
                    }else{
                        item[key].visible=false;
                    }
                })
            }
            scope.submitWeeklyForm=function(menu,price,title,min){
                console.log(menu);
                scope.formSubmitting=true;
               var send={
                    'menu':menu,
                    'title':title,
                    'price':price,
                    'min':min
                }
                $http({
                    url:'cooks/addWeeklyMenu',
                    dataType:'JSON',
                    method:'POST',
                    data:send,
                }).success(function(response){
                    console.log(response);
                    if(response.success){
                        scope.formSubmitting=false;
                    }
                    window.location.reload();
                }).error(function(response) {
                    /* Act on the event */
                    console.log(response)
                });
            }
            scope.deleteWeeklyItem=function(key,index,type){
                if(scope.days[key][type].length){
                    console.log(scope.days[key][type]);
                    console.log(index);
                    delete scope.days[key][type].splice(index, 1);
                }
            }
            scope.addToItemsDay=function(key,item,type){
                console.log(item)
                if(type=='lunch'){
                    item.lunchMenuItems.push(item.lunchitem.name+'');
                    item.lunchitem.name='';
                }else{
                    item.dinnerMenuItems.push(item.dinneritem.name+'');
                    item.dinneritem.name='';
                }
            }
           scope.deleteEditItems=function(index,item){
            console.log(item[index]);
            delete item.splice(index,1);
           }
           scope.editItems=function(item){
            console.log(item);
            item.formUpdating=true;
            $http({
                url:'cooks/updateWeeklyMenu',
                method:'POST',
                dataType:'JSON',
                data:item,
            }).success(function(response){
                console.log(response);
                if(response.success){
                    item.formUpdating=false;
                    item.message='Item Successfully Updated';
                    $timeout(function(){
                        item.message='';
                    },3000);
                }
            }).error(function(response) {
                /* Act on the event */
                console.log(response);
            });
           } 
        }

    }
});
app.directive('fuNotification',function(){
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

app.directive('editMenuItemPopup',function(){
    return{
        restrict:'EA',
        replace:true,
        templateUrl:'cooks/getpage/EditItemPopup',
        controller:'productEditCtrl'
    }
});
app.directive('quantityPop',function(){
    return{
        restrict:'EA',
        replace:true,
        template:'<div id="setQuantity{{item.id}}" class="fu-modal">'+
        '<div class="overlay"></div>'+
        '<div id="fu-loader"><i class="fa fa-spinner fa-pulse"></i></div>'+
        '<div class="fu-modal-container">'+
        '<a href="" title="" ng-click="closeModel(\'setQuantity\'+item.id)" class="fu-modal-close alter">Close</a>'+
        '<div class="fu-modal-body" style="padding-top:24px;">'+
        '<form name="minQuantityForm" ng-submit="setAsTodaysMenu(item)"><label>Stock Quantity of {{item.title}}</label>'+
        '<div class="clearfix"></div>'+
        '<div class="form-group col-md-6 col-md-offset-3"><input class="form-control " type="number" required ng-model="item.stock_quantity" placeholder="Stock Quantity"/></div>'+
        '<div class="clearfix"></div>'+
        '<div class=" text-center"><input type="submit" style="margin:0;" class="btn btn-danger btn-emboshed" value="Set As Today\'s Menu" /><div>'+
        '</form>'+
        '</div></div><div class="home-signup-modal-footer"></div></div>'    

    }
});
app.directive('weeklyMenuItem',function($http){
    return{
        restrict:'EA',
        templateUrl:'cooks/getpage/weekly-menu-item',
        link:function(scope,elem,attr){
            scope.weeklyMenuItems=[];
            $http({
                url:'cooks/getWeeklyMenuItems/cook'
            }).success(function(response){
              console.log(response)
              if(response){
                scope.weeklyMenuItems=response;
                scope.weeklyMenuFound=true;
                
              }  
            }).error(function(response) {
                /* Act on the event */
                console.log(response)
            });
        }
    }
});
app.directive('editWeeklyItemPopup',function(){
    return{
        restrict:'EA',
        templateUrl:'cooks/getpage/edit-weekly-item-popup'
    }
});
var newItem={
title:'',
catagories:{},
description:'',
feature_img:'',
cooksID:'',
price:'',
min_quantity:1,
cusines:'',
todays_menu:''
};
var catagories={};

var hours=[
    {value:'00'},
    {value:"01"},
    {value:"02"},
    {value:"03"},
    {value:"04"},
    {value:"05"},
    {value:"06"},
    {value:"07"},
    {value:"08"},
    {value:"09"},
    {value:"10"},
    {value:"11"},
    {value:"12"},
    {value:"13"},
    {value:"14"},
    {value:"15"},
    {value:"16"},
    {value:"17"},
    {value:"18"},
    {value:"19"},
    {value:"20"},
    {value:"21"},
    {value:"22"},
    {value:"23"},
    {value:'24'}
];
var munites=[
    {value:'00'},
    {value:'15'},
    {value:'30'},
    {value:'45'}
];
















































