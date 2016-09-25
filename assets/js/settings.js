
     var settingsCard=$('#settings-card');
     var userId=$('#userID').attr('data-di');
     var app=angular.module('settingsApp',['jkuri.timepicker','ngTagsInput']);


// ***************** CONTROLERS******************



app.controller('settingsCtrl',function($scope,$http,$q) {
      
    
    $scope.loading=true;
    $scope.kitchenInfo=[];
    $scope.nameError='is-visible';
    $scope.first_name_show=false;
    $scope.email_show=false;
    $scope.phone_show=false;
    $scope.username_show=false;
    $scope.kitename_show=false;
    $scope.address_show=false;
    $scope.service_show=false;
    $scope.location_show=false;
    $scope.deliveryCharg_show=false;
    $scope.deliveryMethod_show=false;
    $scope.kitchenSubShow=false;
    $scope.deliveryChargeFormShow=false;
    var click=0;
      // Initialising the variable.
      $scope.emailCheck=false;
      $scope.users = [];
      // Getting the list of users through ajax call.
      $http({
        url: 'cooks/getProfileInfo/'+userId,
        method: "POST",
      }).success(function (data) {
        
        $scope.userInfo = data.user;
        $scope.kitchenInfo=data.kitchen;
        var serviceAreas=$scope.kitchenInfo[0].service_areas.split(',');
        // var log=[];
        // var serviceList=[];
        // angular.forEach(serviceAreas,function(value,key){
        //   serviceList.push({'text':value});
        // },log);
        $scope.kitchenInfo[0].serviceList=serviceAreas;

        //console.log($scope);
        
        $scope.kitchenInfo[0].min_order=parseInt($scope.kitchenInfo[0].min_order);

        if(data.kitchen[0].pickup=='true'){
            $scope.kitchenInfo[0].pickup=true;
        }else {
            $scope.kitchenInfo[0].pickup=false;
        }
        if(data.kitchen[0].home_delivery=='true'){
            $scope.kitchenInfo[0].home_delivery=true;
        }else{
            $scope.kitchenInfo[0].home_delivery=false;
        }
        $scope.appyDeliverOptions();
        $scope.showDiv=true;
        $scope.loading=false;
        $scope.visible='visible';

      }).error(function(){
        $scope.loading=true;
      });
      
      $scope.toggleInput=function(data,pic){

        if(data=='pickup'){
            $scope.kitchenInfo[0].pickup=!$scope.kitchenInfo[0].pickup;
        }
        
        else if(data=='homeDelivery'){
            $scope.kitchenInfo[0].home_delivery=!$scope.kitchenInfo[0].home_delivery;
        }
        

      }
      $scope.isPickupChecked=function(data){
        if(data){
            return 'checked';
        }
        else{
            return '';
        }
        
      };
      $scope.appyDeliverOptions=function(){
        if($scope.kitchenInfo[0].pickup){
            var elem=angular.element( document.querySelector( '#pickUpInput' ) );
            elem.attr('checked', 'true');
            //console.log(elem);
        }
        if($scope.kitchenInfo[0].home_delivery){
            var elem=angular.element( document.querySelector( '#homeDelivery' ) );
            elem.attr('checked', 'true');
            //console.log(elem);
        }
      }
      
      
      $scope.submitProfile=function(form,model,value) {
          /* Act on the event */
        if(form.$invalid){
            return;
        }
          $http.post('cooks/updateUserData/'+model+'/'+value).success(function(dataa){
            
            if(model!='last_name'){
              $scope.formShowing(form,true);
            }
            
          });


      };
      $scope.submitKitchen=function(form,model,value) {
          /* Act on the event */
        if(form.$invalid){
            return;
        }

        if(model=='service_areas'){
          log=[];
          var areas='';
          length=value.length;
          countLength=1;
          angular.forEach(value,function(val,key){
            if(length>countLength){
                        areas+=val.text+',';
                      }else{
                        areas+=val.text;
                      }
                      countLength++;

          },log);
          value=areas;
        }
        
        var dataSend=JSON.stringify({'model':model,'value':value});
        
          $http({
            url:'cooks/updateKitchenData',
            method:"JSON",
            data:dataSend,
            headers: {'Content-Type': 'application/json'}
             }).success(function(dataa){
            console.log(dataa);
            if(model!='kitchen_end_time'){
              $scope.formShowing(form,true);
            }
          });


      };
      $scope.formShowing=function(data,flag){

        if(data.$name=='nameForm'){
            $scope.first_name_show=!$scope.first_name_show;
        }else if(data.$name=='usernameForm'){
            $scope.username_show=!$scope.username_show;
        }else if(data.$name=='emailForm'){
            $scope.email_show=!$scope.email_show;
        }else if(data.$name=='phoneForm'){
            $scope.phone_show=!$scope.phone_show;
        }else if(data.$name=='kitchenameForm'){
            $scope.kitchename_show=!$scope.kitchename_show;
        }else if(data.$name=='addressForm'){
            $scope.address_show=!$scope.address_show;
        }else if(data.$name=='deliveryOptionsForm'){
            $scope.deliveryOptions_show=!$scope.deliveryOptions_show;
        }else if(data.$name=="deliveryMethodForm"){
            $scope.deliveryMethod_show=flag;
        }else if(data.$name=="locationForm"){
            $scope.location_show=!$scope.location_show;
        }else if(data.$name=='kitchenSubForm'){
          $scope.kitchenSubShow=!$scope.kitchenSubShow;
        }else if(data.$name=='deliveryChargeForm'){
          $scope.deliveryChargeFormShow=!$scope.deliveryChargeFormShow;
        }else if(data.$name=='KitchenStartForm'){
          $scope.kitche_start_form_show=!$scope.kitche_start_form_show;
        }else if(data.$name=='serviceAreaForm'){
          $scope.serviceArea_show=!$scope.serviceArea_show;
        }else if(data.$name=='minOrderForm'){
          $scope.minOrder_show=!$scope.minOrder_show;
        }

      };
    $scope.submitDeliveryOptions=function(form,pickup,homeDelivery){
        
        if(form.$invalid){
            return;
        }
        var dataSend=JSON.stringify({'pickup':pickup,'homeDelivery':homeDelivery});
        $http({
            url:'cooks/updateDeliveryOptions',
            method:"JSON",
            data:dataSend,
            headers: {'Content-Type': 'application/json'}
             }).success(function(dataa){
            
            $scope.formShowing(form,true);
          });
    };
    $scope.fetchAreas=function(query){
      return $http.get('cooks/serviceAreas/'+query);
    }
    

    });


// ***************** Config Routing*************
// 


//********************* DIRECTIVES*****************


app.directive('uniqueEmail', function(isEmailAvailable) {
  return {
    require: 'ngModel',
    link: function($scope, elem, attrs, ctrl) {
        
        if(!ctrl)return;
    
        ctrl.$asyncValidators.checkMail=isEmailAvailable;
    
        }
       
    
  
};
});
app.directive('uniqueUsername', function(isUsernameAvailable) {
  return {
    require: 'ngModel',
    link: function($scope, elem, attrs, ctrl) {
        
        if(!ctrl)return;
    
        ctrl.$asyncValidators.checkUsername=isUsernameAvailable;
    
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
app.directive('deliveryMethods',function(){
    return {
        restrict:'A',
        link:function(scope,elem,attr,ctrl){
            
            if(elem[0].id=='homeDelivery'&&scope.kitn.home_delivery){
                elem.attr('checked','');
                elem.parent('label').addClass('checked');
                //console.log(elem);
            }
            else if(elem[0].id=='pickUpInput'&&scope.kitn.pickup){
                            elem.attr('checked','');
                            elem.parent('label').addClass('checked');
                            //console.log(elem);
                        }


            //console.log(scope);
        }
    };
});


app.directive('loading', function () {
      return {
        restrict: 'E',
        replace:true,
        template: '<div class="spinner"><i class="fa fa-spinner fa-pulse"></i></div>',
        link: function (scope, element, attr) {
              scope.$watch('loading', function (val) {
                  if (val)
                      $(element).show();
                  else
                      $(element).hide();
              });
        }
      }
  });

app.directive('profileSettings',function () {
      return {
        restrict: 'E',
        require:'ngModel',
        templateUrl: 'cooks/getPage/profileSettings.html',
        
      }
  });
app.directive('kitchenSettings',function () {
      return {
        restrict: 'E',
        require:'ngModel',
        templateUrl: 'cooks/getPage/kitchenSettings.html',
        
      }
  });

// ***********************FACTORIES*********************
// 
// 


app.factory('isEmailAvailable', function($q, $http) {
  return function(email) {
    var deferred = $q.defer();

    $http.get('cooks/emailCheck/' + email).success(function(data){

        if(data){
            deferred.reject();
        }else{
            deferred.resolve();
        }
    });

    return deferred.promise;
  }
});

app.factory('isUsernameAvailable', function($q, $http) {
  return function(username) {
    var deferred = $q.defer();

    $http.get('cooks/usernameCheck/' + username).success(function(data){

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
    var deferred = $q.defer();

    $http.get('cooks/phoneCheck/' + phone).success(function(data){

        if(data){
            deferred.reject();
        }else{
            deferred.resolve();
        }
    });

    return deferred.promise;
  }
});



app.filter('secondsToDateTime', [function() {
    return function(seconds) {
        console.log(seconds);
        send='';
        hr_min=seconds.split(':');
        if(parseInt(hr_min[0])>12){
          send+=hr_min[0]-12+':'+hr_min[1]+' pm';
        }else{
          send+=hr_min[0]+':'+hr_min[1]+' am'
        }
        return send;
    };
}])