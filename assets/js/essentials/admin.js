var app=angular.module('homeApp',['ngMaterial', 'ngMessages','ngRoute','noticeBoard']);

app.config(function($routeProvider){
    $routeProvider.when('/',{
        templateUrl:'index.php/home/getTemplate/admin_home_view',
        controller:'admin_home'
    }).when('/school/:id',{
        templateUrl:'index.php/home/getTemplate/admin_school_view',
        controller:'admin_school'
    }).when('/info/:type',{
        templateUrl:'index.php/home/getTemplate/info/info',
        controller:'infoCtrl'
    }).when('/notice-board',{
        templateUrl:'index.php/home/getTemplate/notice/notice-board',
        controller:'noticeCtrl',
    }).when('/attendance',{
        templateUrl:'index.php/home/getTemplate/attendence-view',
        controller:'attendanceCtrl'
    }).otherwise({
        redirectTo:'/'
    })
});
app.controller('admin_home',function($scope,$http){
    $scope.date = new Date();

}).controller('infoCtrl',function($scope,$http,$routeParams){
    $scope.printDiv = function(divName) {
      var printContents = document.getElementById(divName).innerHTML;
      var popupWin = window.open('', '_blank', 'width=600px,height=400px,fullscreen=yes');
      popupWin.document.open();
      popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="assets/css/component.css" />'+
        '<style>img{display:none} .md-button{display:none} md-content{display:table} .badge{float:right;color:red ;padding-left:40px;}</style>'+
        '</head><body onload="window.print()">' + printContents + '</body></html>');
      popupWin.document.close();
    } 
    $scope.type=$routeParams.type;
    if($scope.type=='infrastructure_data'){
        $scope.form_heading='ভৌতঅবকাঠামোগত সুবিধাবঞ্চিত প্রতিষ্ঠান সমূহের তথ্য'
    }else if($scope.type=='annual_development'){
        $scope.form_heading='পঞ্চবার্ষিক ও বার্ষিক উন্নয়ন পরিকল্পনা সংক্রান্ত তথ্য'
    }else if($scope.type=='meeting_details'){
        $scope.form_heading='সভা সংক্রান্ত তথ্য'
    }else if($scope.type=='result_details'){
        $scope.form_heading='প্রতিষ্ঠানের ফলাফল বিষয়ক তথ্য'
    }else if('total_details'){
        $scope.form_heading='সম্মিলিত তথ্য';
        $scope.form_sub_heading=[];
        $scope.form_sub_heading[0]='ভৌতঅবকাঠামোগত সুবিধাবঞ্চিত প্রতিষ্ঠান সমূহের তথ্য';
        $scope.form_sub_heading[1]='পঞ্চবার্ষিক ও বার্ষিক উন্নয়ন পরিকল্পনা সংক্রান্ত তথ্য';
        $scope.form_sub_heading[2]='সভা সংক্রান্ত তথ্য';
        $scope.form_sub_heading[3]='প্রতিষ্ঠানের ফলাফল বিষয়ক তথ্য';
    }
    console.log($scope.form_heading)

});
app.controller('admin_school',function($scope,$http,$routeParams){
    $scope.school_id=$routeParams.id;
    $scope.schoolLoading=true;
    $http({
        url:'index.php/home/getSchoolAttendence?id='+$scope.school_id,
    }).success(function(response){
        console.log(response);
        if(response.success){
            $scope.schoolLoading=false;
            $scope.school_attendence=response.attendance;
            $scope.school_info=response.school_info;
        }
    }).error(function(response) {
        /* Act on the event */
        console.log(response);
    });
}).controller('attendanceCtrl', function($scope,$http){
       $http.get('index.php/home/getAttendence',{}).then(function(response){
        $scope.attendence=response.data;
        $scope.attendence.total=parseInt($scope.attendence.total);
        $scopr.attendence.present=parseInt($scope.attendence.present);
        $scope.attendence.percent=($scope.attendence.present/$scope.attendence.total)*100;
       },function(response){

       })
});
function DialogController($scope, $mdDialog) {
    $scope.p_type='password';
    $scope.p_text='Show Password';
    $scope.changePassType=function(){
        if($scope.p_type=='password'){
            $scope.p_type='text';
            $scope.p_text='hide password';
        }else{
            $scope.p_type='password';
            $scope.p_text='Show Password'
        }
    }
    $scope.school={
        eiin_number:"czs111",
        email:"czs@gmail.com",
        management:"সরকারী",
        password:"password",
        phone:"০১৯২৯১০৯২৯",
        school_name:"কুমিল্লা জিলা স্কুল",
        type:"বালক",
        upozilla:"কোতোয়ালী",
        website:"",
        zilla:"কুমিল্লা"
    };
    $scope.managements=[
    {name:'সরকারী',value:'govt'},
    {name:'বেসরকারী',value:'non-govt'},
    {name:'অনন্যা',value:'others'}];
    $scope.types=[
    {name:'বালক',value:'boys'},
    {name:'বালিকা',value:'girls'},
    {name:'কো-এডুকেশন',value:'co-education'}
    ]

    // console.log($scope);
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer,form) {
        form.$submitted=true;
        if(form.$invalid&&answer!='cancel'){
            $scope.result='form is invalid please insert all the required information correctly'
            return;
        }
      $mdDialog.hide(answer);
    };
  }

app.directive('menu',function($http){
    return{
        restrict:'EA',
        templateUrl:'index.php/home/getTemplate/menu',
        link:function($scope,elem,attr){
            $scope.user=[];
            $scope.app_name='Admin';
            $scope.submenu=[];
            for(i=0;i<5;i++){
            $scope.submenu.push(false);
            }
            elem.ready(function(){
               $scope.menu=new gnMenu( document.getElementById( 'gn-menu' ) );
            })
            $scope.closeMenu=function(){
                // console.log($scope.menu);
                $scope.menu.closeMenu();
            }
            $http({
                url:'index.php/home/getUser'
            }).success(function(response){
                console.log(response)
                if(response.success){
                    $scope.user=response.user
                }
            }).error(function(response) {
                /* Act on the event */
            });

            $scope.redirectTo=function(link){
                window.location=link;
            }
            
            
        }
    }
}).directive('infoMenu',function(){
    return{
        templateUrl:'index.php/home/getTemplate/info_menu'
    }
}).directive('lessInfrastructure',function($http){
    return{
        templateUrl:'index.php/home/getTemplate/less_infrastructure/info',
        link:function(scope,elem,attr){
            $http.get('index.php/home/getInfrastructure_data', {}).then(function(response){
                console.log(response);
                if(response.data.success=true){
                    scope.info=response.data.info;
                }
            } , function(response){

            })
        }
    }
}).directive('annualDevelopment',function($http){
    return{
        templateUrl:'index.php/home/getTemplate/annual_development/info',
        link:function(scope,elem,attr){
            $http.get('index.php/home/getAnnualInfo', {}).then(function(response){
                console.log(response);
                scope.info=response.data.info;

            }, function(response){

            })
        }
    }
}).directive('meetingDetails',function($http){
    return{
        templateUrl:'index.php/home/getTemplate/meeting_details/info',
        link:function(scope){
            $http.get('index.php/home/getMeetingInfo', {}).then(function(response){
                console.log(response);
                scope.info=response.data.info;

            }, function(response){

            })
        }
    }
}).directive('resultDetails',function($http){
    return{
        templateUrl:'index.php/home/getTemplate/result_details/info',
        link:function(scope){
            $http.get('index.php/home/getResultDetails',{}).then(function(response){
                console.log(response);
                scope.info=response.data.info;
            } , function(response){
                console.log(response);
            })
        }
    }
})

app.directive('allSchools',function($http,$mdDialog,$rootScope,
    $timeout, $mdSidenav,$mdToast){
    return{
        restrict:'EA',
        replace:true,
        templateUrl:'index.php/home/getTemplate/allSchools',
        link:function($scope,elem,attr){

            $http({
                url:'index.php/home/getAllSchools',
            }).success(function(response){
                console.log(response)
                if(response.success){
                    $scope.schools=response.schools;
                    $scope.schoolLoaded=true;
                }
            });
            $scope.addClassDialoge=function(ev){
            $mdDialog.show({
              controller: DialogController,
              templateUrl: 'index.php/home/getTemplate/addSchool',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:false,
              fullscreen: true // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
                // console.log(answer);
               
              if(answer!='cancel'){
                $scope.addingSchool=true; 
                $http.post('index.php/home/addSchool',answer,{}).then(function(response){
                    console.log(response);
                    $scope.addingSchool=false;
                    if(response.data.success){
                        answer['id']=response.data.id;
                        $scope.schools.push(answer);

                    }
                    
                    },function(response){
                        console.log(response);
                    })
                  }
                  

                      
                    }, function() {
                      $scope.status = 'You cancelled the dialog.';
                });
            }
        }
    }
}).directive('totalInfo',function(){
    return{
        templateUrl:'index.php/home/getTemplate/total-info/info'
    }
})


