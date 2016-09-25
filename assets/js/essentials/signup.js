 var app=angular.module('signup',['ngRoute']);

          app.controller('signupCtrl',function($scope,$http,$location){
            
            $scope.tabs=[{name:'foodie',checked:false},{name:'cook',checked:false}];
            console.log($location);
            if($location.$$path){
                gpath=$location.$$path.split('/');
                if(gpath[1]=='foodie'){
                    $scope.tabs[0].checked=true;
                }else if(gpath[1]=='cook'){
                    $scope.tabs[1].checked=true;
                }
            }
            $scope.phoneNumber='880';
            $scope.cook={};
            $scope.cook.phone='880';
            $scope.cook.email='';
            $scope.cook.location='';
            $scope.cook.address='';
            
            $scope.show=function(index){
              angular.forEach($scope.tabs,function(value,key){
                if(key==index){
                  value.checked=true;
                }else{
                  value.checked=false;
                }
              });
            }
            model=angular.element(document.getElementById('cook-signup-model'));
            container=model.find('.home-signup-modal-container');
            loader=angular.element(document.getElementById('home-signup-loader'));
            $scope.showpass='Show';
            $scope.passwordType='password';
            $scope.toggleShow=function(){
                if($scope.passwordType=='password'){
                    $scope.passwordType='text';
                    $scope.showpass='Hide'
                }else{
                    $scope.passwordType='password';
                    $scope.showpass='Show';
                }
            }
            $scope.signupCook=function(form){
                if(form.$invalid){
                    return;
                }
                $scope.showModel();
            }
            $scope.showModel=function(){
                
                model.addClass('is-visible');
                loader.addClass('is-visible');
                $http({
                    url:'users/insertTempData?name='+$scope.cook.name+'&phone='+$scope.cook.phone,
                    type:'POST',
                    async:false,
                }).success(function(response){
                    loader.removeClass('is-visible');
                    container.addClass('is-visible');
                });
            }
            $scope.closeModel=function(){
                container.removeClass('is-visible');
                model.removeClass('is-visible');
              }

            $scope.registerCook=function(form){
                console.log(form)
                if(form.$invalid||$scope.cook.password!=$scope.cook.confirmpassword){
                    return;
                }else{
                    $scope.loading=true;
                    console.log($scope.cook);
                    $http({
                        url:'users/ajaxRegAsCook',
                        dataType:'JSON',
                        method:'POST',
                        data:$scope.cook
                    }).success(function(response){
                        // console.log(response);
                        if(response[0].status){
                            window.location="cooks"
                        }
                        $scope.loading=false;
                    });

                }
            }



          });




app.directive('phoneInput', function($filter, $browser) {
    return {
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModelCtrl) {
            // console.log(ngModelCtrl);
            var listener = function() {
                var value = $element.val().replace(/[^0-9]/g, '');
                $element.val($filter('tel')(value, false));
            };

            // This runs when we update the text field
            ngModelCtrl.$parsers.push(function(viewValue) {
                return viewValue.replace(/[^0-9]/g, '').slice(0,13);
            });

            // This runs when the model gets updated on the scope directly and keeps our view in sync
            ngModelCtrl.$render = function() {
                $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
            };

            $element.bind('change', listener);
            $element.bind('keydown', function(event) {
                var key = event.keyCode;
                // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                // This lets us support copy and paste too
                if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)){
                    return;
                }
                $browser.defer(listener); // Have to do this or changes don't get picked up properly
            });

            $element.bind('paste cut', function() {
                $browser.defer(listener);
            });
        }

    };
});
app.filter('tel', function () {
    return function (tel) {
        // console.log(tel);
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, number;

        switch (value.length) {
            case 1:
            case 2:
            case 3:
                country = value;
                break;

            default:
                country = value.slice(0, 3);
                number = value.slice(3);
        }

        if(number){
            if(number.length>4){
                if(number.length>7){
                    number = number.slice(0, 4) + '-' + number.slice(4,7)+'-'+number.slice(7,10);
                }else
                number = number.slice(0, 4) + '-' + number.slice(4,7);
            }
            else{
                number = number;
            }

            return ("(" + country + ") " + number).trim();
        }
        else{
            return "(" + country+")";
        }

    };
});


app.directive('uniqueEmail', function(isEmailAvailable) {
  return {
    require: 'ngModel',
    link: function($scope, elem, attrs, ctrl) {
        
        if(!ctrl)return;
    
        ctrl.$asyncValidators.checkMail=isEmailAvailable;
    
        }
       
    
  
};
});


app.directive('uniquePhone', function(isPhoneAvailable) {
  return {
    require: 'ngModel',
    link: function($scope, elem, attrs, ctrl) {
        
        if(!ctrl)return;
    
        ctrl.$asyncValidators.checkPhone=isPhoneAvailable;
    
        }
       
    
  
};
});
// ***********************FACTORIES*********************
// 
// 


app.factory('isEmailAvailable', function($q, $http) {
  return function(email) {
    var deferred = $q.defer();

    $http.get('users/emailCheck/' + email).success(function(data){

        if(data){
            deferred.reject();
        }else{
            deferred.resolve();
        }
    });

    return deferred.promise;
  }
});



app.factory('isPhoneAvailable', function($q, $http) {
  return function(phone) {
// console.log(phone)
    var deferred = $q.defer();

    $http.get('users/phoneCheck/' + phone).success(function(data){
// console.log(data);
        if(data){
            deferred.reject();
        }else{
            deferred.resolve();
        }
    });

    return deferred.promise;
  }
});