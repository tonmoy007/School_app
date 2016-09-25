



var app=angular.module('recipes',['ngRoute','ngFileUpload']);

// (((((((((((((((((((((((((((((((Recipe Routing)))))))))))))))))))))))))))))))
// 
// ****************************************************************************
app.config(function($routeProvider){
    $routeProvider.when('/s/:recipe_id',{
        templateUrl:'recipes/getTemplate/single-recipe',
        controller:'singleRecipe'
    }).when('/:username',{
        templateUrl:'recipes/getTemplate/my-recipes',
        controller:'myRecipe',
    }).otherwise({
        templateUrl:'recipes/getTemplate/recipes',
        controller:'recipeHome'
    });
});

// (((((((((((((((((((((((((((((((((Recipe Controllers)))))))))))))))))))))))))))))))))
// 
// ************************************************************************************

app.controller('recipes',function($scope,$http,$timeout,$window){
    $scope.loading=true;
    $scope.notiHide=true;
    $scope.facebook=[];
    $scope.facebook.places=[];
    $scope.google=[];
    $http({
        url:'home/getUserInfo'
    }).success(function(response){
        console.log(response);
        if(response!='false'){
            $scope.loggedin=true;
            $scope.user=response;
            $scope.loading=false;

        }else{
            $scope.loggedin=false;
            $scope.loading=false;
        }
        $scope.userLoaded=true;
    }).error(function(response) {
        /* Act on the event */
        console.log(response);
    });
    $scope.gotop=function(){

        $('body,html').animate({
            scrollTop: 0 ,
            }, 800
        );
    }
    $scope.gotop();
    $scope.showNoti=function(data){

        $scope.notiMessage=data;
        elem=angular.element(document.getElementById('notiMessage')).html(data);
        $scope.notiOpen();
        $timeout(function(){$scope.notiClose();},5000);
    }
    $scope.notiClose=function(){
        $scope.notiVisibility='ns-hide';
        $timeout(function(){$scope.notiHide=true;},300);
    }
    $scope.notiOpen=function(){
        $scope.notiVisibility='ns-show';
        $scope.notiHide=false;
    }
    
    $scope.shareLink=function(href,name,caption,imgurl,description){
        console.log(imgurl);
        // return;
        href=(typeof href!='undefined')?href:'http://fumontor.com';
        name=(typeof name!='undefined')?name:'Fumontor';
        caption=(typeof caption!='undefined')?caption:'a yammy relationship';
        imgurl=(typeof imgurl!='undefined')?imgurl:'http://fumontor.com/assets/img/home-logo-sm.png';
        description=(typeof description!='undefined')?description:'Search and order home food Share Recipes';
        
        FB.ui({
              method: 'share',
              href: href,
              title:name,
              picture:imgurl,
              caption: caption,
              description:description,
          }, function(response){});
    }
$scope.searchRecipe=function(query){
    href='https://graph.facebook.com/search?q='+query+'&type=places&access_token='+$scope.user.access_token;
    console.log (href);
    FB.api(href,function(response){
        console.log(response);
        $scope.facebook.places.data=response.data;
        $scope.facebook.places.paging=response.paging;
    });
    $http({
        url:'mobile/googleSearch/'+query
    }).success(function(response){
        console.log(response);
    });
}
    $scope.sendMail=function(form){
        if(form.$invalid){
            return;
        }else{
            $scope.mailSending=true;
            send={};
            send.name=$scope.user.name;
            send.email=$scope.user.email;
            send.message=$scope.message;
            $http({
                url:'users/sendMail',
                method:'POST',
                dataType:'JSON',
                data:send
            }).success(function(response){
                if(response=='true'){
                    $scope.mailSending=false;
                    $scope.showNoti('Your message is successfully sent we will respond to your query within <strong>1</strong> hour');
                    $scope.showSupport=false;
                }else{
                    $scope.mailSending=false;
                    $scope.showNoti('<strong class="text-danger">Sorry message can not be sent !!</strong>');
                }
            }).error(function(response) {
                /* Act on the event */
                console.log(response);
            });
        }
    }

});
app.controller('recipeHome',function($scope,$http){
    $scope.$parent.gotop();
    $scope.recipeItems=[];
    $scope.recipeLoading=true;
    $scope.showAddRecipe=false;
    recipemodel=angular.element(document.getElementById('addRecipe'));
    $http({
        url:'recipes/getAllRecipes'
    }).success(function(response){
        console.log(response);
        if(response!='false'){
            $scope.recipeItems=response;
            $scope.recipeLoading=false;
        }
    }).error(function(response) {
        /* Act on the event */
        console.log(response);
    });
    $scope.showAddModel=function(value){
            console.log(value);
            if(value){
                $(recipemodel).addClass('is-visible');
                $(recipemodel).find('.fu-modal-container').addClass('is-visible');
            }else{

                $(recipemodel).removeClass('is-visible');
                $(recipemodel).find('.fu-modal-container').removeClass('is-visible');
            }
        }
    });

app.controller('addRecipeCtrl',function($scope,$http){

});
app.controller('singleRecipe',function($scope,$http,$routeParams){
    // console.log($routeParams);
    $scope.recipeLoading=true;
    $scope.mainImage=null;
    $scope.slider=[];
    $scope.slider.index=0;
    // console.log(window.location);
    $scope.$parent.gotop();
    $scope.fbLink=window.location.href;
    $scope.item=[];
    $http({
        url:'recipes/getRecipe/'+$routeParams.recipe_id,
    }).success(function(response){
        console.log(response);
        if(response!=false){
            angular.forEach(response[0].all_images,function(value,key){
                console.log(value);
                if(value.name!='thumb'&&$scope.slider.index==0){
                    $scope.slider.index=value.name;

                }
            });
            $('head').append(getfacebookMeta('http://fumontor.com/recipes/#/s/'+
                response[0].id,'Recipe',response[0].title,response[0].directions[0],
                'http://fumontor.com/assets/recipe/'+response[0].id+'/'+response[0].image));
            $scope.item=response;
            $scope.recipeLoading=false;
        }
    }).error(function(response) {
        /* Act on the event */
        console.log(response)
    });;
    $scope.setImage=function(image){
        console.log(image);
        $scope.mainImage=image;
    }

});
app.controller('myRecipe',function($scope,$http){
    $scope.recipeLoading=true;
    $scope.$parent.gotop();
    $scope.myrecipeItems=[];
    console.log($scope.$parent.loggedin);
    
        $http({
            url:'recipes/getmyRecipes',
        }).success(function(response){
            console.log(response);
            if(response.success){
                $scope.myrecipeItems=response.recipes;
                
            }else{
                if(response.status=='nologin'){
                    $scope.$parent.loggedin=false;
                }
            }
            $scope.recipeLoading=false;

        }).error(function(response) {
            /* Act on the event */
            console.log(response);
        });
        $scope.showLoginFrom=function(){
            console.log($scope);
            ($scope.$$nextSibling)?$scope.$$nextSibling.showLogin=true:$scope.$$prevSibling.showLogin=true;
        }
    
});


// ((((((((((((((((((((((((((((((((((((((Recipe Directivea))))))))))))))))))))))))))))))))))))))
// 
// ********************************************************************************************

app.directive('recipeNavigation',function(){
    return{
        restrict:'EA',
        templateUrl:'recipes/getTemplate/recipe-navigation',
        link:function($scope,elem,attr){
            transparency=0;
            windowHeight=$(window).height()/4;
            angular.element(document).scroll(function(event) {
                /* Act on the event */
                // a=0.0;
                
                transparency+=0.5;
                if($(this).scrollTop()>30){
                    if($(this).scrollTop()>windowHeight){
                    
                    angular.element(document.getElementById('go-top')).addClass('visible');
                    }else{

                        angular.element(document.getElementById('go-top')).removeClass('visible');
                    }
                
                    angular.element(document.getElementById('catagoryBar')).addClass('moveUp');
                    angular.element(document.getElementById('main-header')).addClass('fixed-top');
                    angular.element(document.getElementById('filter-icon')).addClass('top-me');
                    angular.element(document.getElementById('topme-btn')).addClass('top-me');
                    $scope.$parent.slideNav=true;
                }else{
                    $scope.$parent.slideNav=false;
                    angular.element(document.getElementById('catagoryBar')).removeClass('moveUp');
                    angular.element(document.getElementById('main-header')).removeClass('fixed-top');
                    angular.element(document.getElementById('filter-icon')).removeClass('top-me');
                    angular.element(document.getElementById('topme-btn')).removeClass('top-me');
                }

            });
            $scope.clearSearch=function(){
                $('#search').focus();
                $scope.searchquery='';
            }
                
                
        }
    
    }
});

app.directive('addRecipe',function(Upload,$location){
    return{
        restrict:'EA',
        templateUrl:'recipes/getTemplate/add-recipe',
        controller:'addRecipeCtrl',
        controllerAs:'addRecipeas',
        link:function(scope,elem,attr,ctrl){
            scope.newrecipe=[];
            scope.newrecipe.title='';
            scope.newrecipe.time='';
            scope.newrecipe.person='';
            scope.newrecipe.cusine='';
            scope.newrecipe.price='';
            scope.newrecipe.feature_img_temp='';
            scope.ingredient=[];
            scope.name='';
            // console.log($location);
            scope.quantity='';
            // console.log(scope);
            scope.addNewRecipe=function(form,recipe){
                console.log(recipe);
                if(form.$invalid||!recipe.ingredients.length||!recipe.directions.length){
                    return;
                }
                recipe.upload=Upload.upload({
                    url:'recipes/addNewRecipe',
                    method:'POST',
                    dataType:'JSON',
                    data:recipe
                });
                recipe.upload.then(function(response){

                        console.log(response);
                        if(response.data!='false'){
                            window.location='recipes/#/s/'+response.data.id;
                              scope.showAddRecipe=false;  
                        }
                    
                }, function (response) {
                    console.log(response);
                  if (response.status > 0)
                    scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                  // Math.min is to fix IE which reports 200% sometimes
                  scope.newrecipe.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            }
            
           
            scope.addIngredients=function(form,name,quantity){
                if(form.$invalid){
                    return;
                }
                if(!scope.newrecipe.ingredients){

                scope.newrecipe.ingredients=[];
                }
                scope.newrecipe.ingredients.push({name,quantity});
                scope.name='';
                scope.quantity='';
                $('#ingredient').focus();
                
            }
            scope.addDirections=function(form,steps){
                console.log(form);
                if(form.$invalid){
                    return;
                }
                if(!scope.newrecipe.directions){
                    scope.newrecipe.directions=[];
                }
                scope.newrecipe.directions.push(steps);
                scope.steps='';
                $('#steps').focus();
            }
            scope.removeFeatureImage=function(images,index){
                // console.log(scope.newrecipe);
                // console.log(index);
                delete scope.newrecipe.feature_img_temp[index];
            }
        }
    }
});

app.directive('recipeItems',function($http){
    return{
        restrict:'EA',
        scope:{
            items:'=',
        },
        templateUrl:'recipes/getTemplate/recipe-items',
        link:function(scope,elem,attr){}
    }
});


app.directive('recipeLogin',function(){
    return{
        restrict:'EA',
        templateUrl:'recipes/getTemplate/recipe-login',
    }
});

app.directive('recipeCover',function(){
    return{
        restrict:'EA',
        templateUrl:'recipes/getTemplate/recipe-cover',
    }
});


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
app.directive('fuNotification',function(){
    return {
        restrict:'E',
        replace:true,
        template:'<div class="ns-box ns-bar ns-effect-slidetop ns-type-notice '+
        '{{notiVisibility}}"><div class="ns-box-inner"><span class="fa fa-bullhorn">'+
        '</span><p id="notiMessage"></p></div><span class="ns-close" '+
        'ng-click="notiClose()"></span></div>',
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


app.directive('fbCommentBox', function($interval) {
  function createHTML(href, numposts, colorscheme, width) {
    return '<div class="fb-comments" ' +
      'data-href="' + href + '" ' +
      'data-numposts="' + numposts + '" ' +
      'data-colorsheme="' + colorscheme + '" ' +
      'data-width="' + width + '">' +
      '</div>';
  }

  return {
    restrict: 'A',
    scope: {},
    link: function postLink(scope, elem, attrs) {
        scope.$parent.commentLoading=true;

      attrs.$observe('pageHref', function(newValue) {
        var href = newValue;
        var numposts = attrs.numposts || 5;
        var colorscheme = attrs.colorscheme || 'light';
        var width = attrs.width || '100%';
        elem.html(createHTML(href, numposts, colorscheme, width));
        var search_FB=$interval(function(){
            if(typeof FB !='undifined'){
                FB.XFBML.parse(elem[0])
            };
            $interval.cancel(search_FB)
        },200);
        scope.$parent.commentLoading=false;
      });
    }
  };
});

app.directive('fbShareButton',function($interval){
    function createHTML(href,layout){
        return '<div class="fb-share-button"'+
            'data-href="'+href+'" '+
            'data-layout="'+layout+'">';
    }
    return{
        restrict:'A',
        scope:{},
        link:function (scope,elem,attrs){
            
            scope.shareLoading=true;
            attrs.$observe('pageHref',function(newValue){
                var href=newValue;
                console.log(newValue);
                var layout=attrs.layout;
                elem.html(createHTML(href,layout));
                var search_FB=$interval(function(){
                    if(typeof FB !='undifined'){
                        FB.XFBML.parse(elem[0])
                    };
                    $interval.cancel(search_FB)
                },200);
                    
               
                scope.shareLoading=false;
            });
        }
    }
})
 app.directive('cookSignupForm',function($http){
        return{
            restrict:'EA',
            templateUrl:'home/getTamplate/user-cook-signupModel',
            link:function(scope,elem,attr){
                scope.registerUserAsCook=function(cookRegForm,cook){
                    scope.formSubmitting=true;
                    $http({
                        url:'users/ajaxRegUserAsCook',
                        method:'POST',
                        dataType:'JSON',
                        data:cook,
                    }).success(function(response){
                        console.log(response);
                        if(response[0].status){
                            window.location='cooks';
                        }else{
                            scope.$parent.$parent.showNoti(response.message);
                        }
                    })
                }
            }
        }
    });
var getfacebookMeta=function(href,type,title,description,image){

    href=(typeof href!='undifined')?href:'http://fumontor.com';
    type=(typeof type!='undifined')?type:'A homefood marketplace';
    title=(typeof title!='undifined')?title:'FUMONTOR';
    description=(typeof description!='undifined')?description:'Delicious homefood at your doorstep';
    sitename='fumontor';
    
return  '<meta property="og:url"           content="'+href+'" />'+
        '<meta property="og:type"               content="'+type+'" />'+
        '<meta property="og:title"              content="'+title+'" />'+
        '<meta property="og:description"        content="'+description+'" />'+
        '<meta property="og:image"              content="'+image+'" />';
}