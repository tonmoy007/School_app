

var app=angular.module('homeApp',['ngMaterial', 'ngMessages','ngRoute','noticeBoard']);

app.config(function($routeProvider){
    $routeProvider.when('/',{
        templateUrl:'index.php/home/getTemplate/home_view'
    }).when('/reports/:type',{
        templateUrl:'index.php/home/getTemplate/report/reports',
        controller:'reportCtrl'
    }).when('/notice-board',{
        templateUrl:'index.php/home/getTemplate/notice/notice-board',
        controller:'noticeCtrl'
    }).when('/submitted_reports',{
        templateUrl:'index.php/home/getTemplate/submitted_reports/reports'
    })
});

app.controller('home',function($scope,$http,$mdDialog,$rootScope,
    $timeout, $mdSidenav,$mdToast){

    $scope.user=[];
    
    $scope.submenu=[];
    for(i=0;i<5;i++){
    $scope.submenu.push(false);
    }
    $rootScope.classes=[];
    $rootScope.ir_students=[];
    $scope.date = new Date();
    
    $http({
        url:'index.php/home/getUser'
    }).success(function(response){
        console.log(response)
        if(response.success){

            $scope.user=response.user
            $scope.app_name=$scope.user.school_name
        }
    }).error(function(response) {
        /* Act on the event */
    });
    $scope.customFullscreen=false;
    $scope.addingClass=false;
    $scope.redirectTo=function(link){
        window.location=link;
    }
}).controller('reportCtrl', function($scope,$routeParams,$http){
    $scope.type=$routeParams.type;
    template=angular.element(document.getElementById('template'));
    
    if($scope.type=='shikhon_poribesh'){
        $scope.form_heading='প্রতিষ্ঠানের শিখন-শেখানো পরিবেশ সংক্রান্ত তথ্য ';
        $scope.school_yard=['পরিষ্কার পরিচ্ছন্ন','মোটামোটি পরিষ্কার পরিচ্ছন্ন','অপরিষ্কার'];
        $scope.toilet=['ব্যবহারযোগ্য','ব্যবহারযোগ্য নয়','ব্যবস্থা নেই'];
        $scope.drinking_water=['পর্যাপ্ত ব্যবস্থা','অপর্যাপ্ত','ব্যবস্থা নেই'];
    }else if($scope.type=='annual_development'){
        $scope.form_heading='পঞ্চবার্ষিক/বার্ষিক উন্নয়ন পরিকল্পনা সংক্রান্ত';

    }else if($scope.type=='meeting_details'){
        $scope.form_heading='সভা সংক্রান্ত তথ্য';
    }else if($scope.type=='result_details'){
        $scope.form_heading='পরীক্ষার ফলাফল সম্পর্কিত তথ্য';
    }
    
})

app.directive('classes',function($http,$rootScope){
    return{
        restrict:'EA',
        templateUrl:'index.php/home/getTemplate/classes',

        link:function(scope,elem,attr){
            
            $http({
                url:'index.php/home/getAllClasses'
            }).success(function(response){
                console.log(response);
                if(response.success){
                    $rootScope.classes=response.classes;
                    scope.classLoaded=true;
                }else{
                    scope.showAlert(this,'some error','Some Error in database','')
                }
            }).error(function(response) {
                /* Act on the event */
                console.log(response)
            });
        }
    }
});
app.directive('sideNavRight',function($http,$rootScope){
    return{
        restrict:'EA',
        templateUrl:'index.php/home/getTemplate/sidenav',
        link:function(scope,elem,attr){
            // console.log(scope);
            scope.SubmitEditClassForm=function(form,class_){
                if(form.$invalid)
                    return;
                $rootScope.validForm=true;
                $http({
                    url:'index.php/home/editClass',
                    method:'POST',
                    dataType:'JSON',
                    data:class_
                }).success(function(response){
                    console.log(scope);
                    scope.addingClass=false;
                    if(response.success){
                        scope.close();
                        scope
                        .showSimpleToast('Class Edited Successfully');
                    }
                    
                })
            }
            scope.$watch('ClassEditForm.$invalid',
                function(nvalue,ovalue,scope){
                
                if(nvalue){
                    $rootScope.validForm=false;
                }else{
                    $rootScope.validForm=true;
                }
            },true);
        }
    }
});
app.directive('menu',function(){
    return{
        restrict:'EA',
        templateUrl:'index.php/home/getTemplate/menu',
        link:function(scope,elem,attr){
            elem.ready(function(){
                new gnMenu( document.getElementById( 'gn-menu' ) );
            })
        }
    }
}).directive('reportMenu',function(){
    return{
        restrict:'EA',
        replac:true,
        templateUrl:'index.php/home/getTemplate/report_menu'
    }
}).directive('shikhonPoribesh',function($http,$mdToast){
    return{
        templateUrl:'index.php/home/getTemplate/shikhon_poribesh/reports',
        link:function(scope,elem,attr){
            scope.submit_report=function(form,data){
                // console.log(scope);
                scope.submitting_report=true;
                // console.log(data);
                $http.post('index.php/home/submitReport/shikhon_poribesh', data, {})
                .then(function(response){
                    console.log(response);
                    if(response.data.success){
                        scope.submitting_report=false;
                        scope.showSimpleToast(response.data.msg);
                    }
                }, function(response){
                    console.log(response);
                })
            }
            scope.showSimpleToast = function(text) {
                    $mdToast.show(
                      $mdToast.simple()
                        .textContent(text)
                        .position("bottom right")
                        .hideDelay(3000)
                    );
                  };
                    
        }
    }
}).directive('annualDevelopment',function($http,$mdToast){
    return{
        templateUrl:'index.php/home/getTemplate/annual-development/reports',
        link:function(scope,elem,attr){
            scope.submit_report=function(form,data){
                // console.log(scope);
                if(!data){
                    return;
                }
                scope.submitting_report=true;
                // console.log(data);

                $http.post('index.php/home/submitReport/annual_development', data, {})
                .then(function(response){
                    console.log(response);
                    if(response.data.success){
                        scope.submitting_report=false;
                        scope.showSimpleToast(response.data.msg);
                    }
                }, function(response){
                    console.log(response);
                })
            }
            scope.showSimpleToast = function(text) {
                    $mdToast.show(
                      $mdToast.simple()
                        .textContent(text)
                        .position("bottom right")
                        .hideDelay(3000)
                    );
                  };
                    
        
        }
    }
}).directive('meetingDetails',function($http,$mdToast){
    return{
        templateUrl:'index.php/home/getTemplate/meeting_details/reports',
        link:function(scope,elem,attr){
            scope.submit_report=function(form,data){
                // console.log(scope);
                if(!data){
                    return;
                }
                scope.submitting_report=true;
                // console.log(data);

                $http.post('index.php/home/submitReport/meeting_details', data, {})
                .then(function(response){
                    console.log(response);
                    if(response.data.success){
                        scope.submitting_report=false;
                        scope.showSimpleToast(response.data.msg);
                    }
                }, function(response){
                    console.log(response);
                })
            }
            scope.showSimpleToast = function(text) {
                    $mdToast.show(
                      $mdToast.simple()
                        .textContent(text)
                        .position("bottom right")
                        .hideDelay(3000)
                    );
                  };
                    
        
        }
    }
}).directive('resultDetails',function($http,$mdToast){
    return{
        templateUrl:'index.php/home/getTemplate/result_details/reports',
        link:function(scope,elem,attr){
            scope.submit_report=function(form,data){
                // console.log(scope);
                if(!data){
                    return;
                }
                scope.submitting_report=true;
                // console.log(data);

                $http.post('index.php/home/submitReport/result_details', data, {})
                .then(function(response){
                    console.log(response);
                    if(response.data.success){
                        scope.submitting_report=false;
                        scope.showSimpleToast(response.data.msg);
                    }
                }, function(response){
                    console.log(response);
                })
            }
            scope.showSimpleToast = function(text) {
                    $mdToast.show(
                      $mdToast.simple()
                        .textContent(text)
                        .position("bottom right")
                        .hideDelay(3000)
                    );
                  };
                    
        
        }
    }
}).directive('submittedShikhonPoribesh',function($http){
    return{
        templateUrl:'index.php/home/getTemplate/submitted_shikhon_poribesh/reports',
        scope:{
            type:'@'
        },
        link:function(scope){
            scope.form_heading='প্রতিষ্ঠানের শিখন-শেখানো পরিবেশ সংক্রান্ত তথ্য';
            $http.get('index.php/home/getReport/shikhon_poribesh',{}).then(function(response){
                console.log(response);
                scope.shikhon_poribesh=response.data;
            },function(response){
                console.log(response);
            })
        }
    }
})

function DialogController($scope, $mdDialog) {
    $scope.atClasses=$scope.$root.classes;
    console.log($scope);
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer,form) {
        if(form.$invalid&&answer!='cancel'){
            return;
        }
      $mdDialog.hide(answer);
    };
  }

 function buildToggler(navID,$mdSidenav) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            // $log.debug("toggle " + navID + " is done");
          });
      }
  }
app.directive('allClasses',function($http,$mdDialog,$rootScope,
    $timeout, $mdSidenav,$mdToast){
    return{
    
        restrict:'EA',
        replace:true,
        templateUrl:'index.php/home/getTemplate/allClasses',
        link:function($scope,elem,attr){

            

    $scope.showAdvanced = function(ev) {
    $mdDialog.show({
          controller: DialogController,
          templateUrl: 'index.php/home/getTemplate/addClass',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:false,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function(answer) {
            console.log(answer);
           
          if(answer!='cancel'){
            $scope.addingClass=true; 
            $http({
                url:'index.php/home/addClass',
                method:'POST',
                dataType:'JSON',
                data:answer
            }).success(function(response){
                console.log(response);
                $scope.addingClass=false;
                if(response.success){
                    answer['id']=response.id;
                    $rootScope.classes.push(answer);

                }
                
            })
          }
          

          
        }, function() {
          $scope.status = 'You cancelled the dialog.';
    });
  };
   $scope.showAlert = function(ev,title,description,arealabel) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title(title)
        .textContent(description)
        .ariaLabel(arealabel)
        .ok('Ok')
        .targetEvent(ev)
    );
  };
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      if(!$rootScope.validForm){
        return;
      }
      $mdSidenav('right').close()
        .then(function () {
          
        });

    };
    $scope.toggleRight = buildToggler('right',$mdSidenav);
    $scope.editCLass=function(index){
        $scope.editingClass=$rootScope.classes[index];
        $scope.toggleRight();
    }
    $scope.takeAttendence=function(ev){

        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'index.php/home/getTemplate/takeAttendence',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:false,
          fullscreen: true // Only for -xs, -sm breakpoints.
        })
        .then(function(answer) {
            console.log(answer);
           
          if(answer!='cancel'){
            $scope.takingAttendence=true; 
            $http({
                url:'index.php/home/submitAttendence',
                method:'POST',
                dataType:'JSON',
                data:answer
            }).success(function(response){
                console.log(response);
                $scope.takingAttendence=false;
                if(response.success){
                    $rootScope.attendenceSubmitted=true
                    $scope.
                    showSimpleToast('Attendence Submitted Successfully');
                }
                
            })
          }
          

          
        }, function() {
          $scope.status = 'You cancelled the dialog.';
    });
    }

    $scope.showSimpleToast = function(text) {
        $mdToast.show(
          $mdToast.simple()
            .textContent(text)
            .position("bottom right")
            .hideDelay(3000)
        );
      };
        }
    }
});

app.directive('irregularStudents',function($http,$mdDialog,$rootScope,
    $timeout, $mdSidenav,$mdToast){
    return{
        restrict:'EA',
        replace:'true',
        templateUrl:'index.php/home/getTemplate/irregularStudents',
        link:function($scope,elem,attr){
        classes=$rootScope.classes

        

        $scope.showAdvancedIrregular=function(ev){

        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'index.php/home/getTemplate/addIrregularStudent',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:false,
          fullscreen: false // Only for -xs, -sm breakpoints.
        })
        .then(function(answer) {
            console.log(answer);
           
          if(answer!='cancel'){
            $scope.addingStudent=true; 
            $http({
                url:'index.php/home/addIrregularStudent',
                method:'POST',
                dataType:'JSON',
                data:answer
            }).success(function(response){
                console.log(response);
                
                if(response.success){
                    $scope.addingStudent=false; 
                    answer['id']=response.id;
                    $rootScope.ir_students.push(answer);
                }
                
            })
          }
          

          
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
            }
        }
    };
})

app.directive('students',function($rootScope,$http){
    return{
        restrict:'EA',
        templateUrl:'index.php/home/getTemplate/students',

        link:function(scope,elem,attr){
            scope.studentLoaded=false;
            $http({
                url:'index.php/home/getAllIRStudents'
            }).success(function(response){
                console.log(response);
                if(response.success){
                    $rootScope.ir_students=setDateFormate(response.students);
                    scope.studentLoaded=true;
                }else{
                    scope.showAlert(this,'some error','Some Error in database','')
                }
            }).error(function(response) {
                /* Act on the event */
                console.log(response)
            });
        }
    }
});

function setDateFormate(students){
    send_=[];
    i=0;
    angular.forEach(students,function(value,key){
        
        value.d_from=new Date(value.d_from);
        value.d_to=new Date(value.d_to);
        send_.push(value);
    });
    return send_;
}
