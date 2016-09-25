angular.module('noticeBoard',['ngMaterial', 'ngMessages','ngAnimate','ngFileUpload'])

.controller('noticeCtrl',  function($scope){
   $scope.form_heading='নোটিশ বোর্ড';
})



.directive('noticeLists',function($http,$rootScope){
    return{
        templateUrl:'index.php/home/getTemplate/notice-list/notice-board',
        scope: true,
        link:function(scope,elem,attr){
            $http.get('index.php/home/getAllNotice',{}).then(function(response){
                console.log(response);
                $rootScope.notices=response.data.notices;
            } , function(response){
                console.log(response);
            })
        }
    }
}).directive('addNotice',function($http,$mdDialog,$rootScope,
    $timeout, $mdSidenav,$mdToast,Upload){
    return{
        templateUrl:'index.php/home/getTemplate/add-notice/notice-board',
        link:function($scope,elem,attr){
           $scope.addNotice=function(ev){ 

            $mdDialog.show({
                  controller: NoticeFormCtrl,
                  templateUrl: 'index.php/home/getTemplate/add-notice-form/notice-board',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose:false,
                  fullscreen: true // Only for -xs, -sm breakpoints.
                })
                .then(function(answer) {


                 }, function() {
                          $scope.status = 'You cancelled the dialog.';
                    });

                }

        }
    }
});


function NoticeFormCtrl($scope, $mdDialog,Upload,$rootScope) {
    $scope.setFile=function($files, $file, $newFiles, $duplicateFiles, $invalidFiles, $event){
        console.log($file);
        if($file!=null){
            file_type=$file.type.split('/');
            $scope.file_name=$file.name;
            $scope.type=file_type[1];
            console.log($scope.type)
            if($scope.type=='pdf'){
                $scope.thumb='assets/img/accessories/pdf-document-blue.svg';
            }else if($scope.type=='jpeg'){
                $scope.thumb='assets/img/accessories/jpg.svg'
            }else if($scope.type=='png'){
                $scope.thumb='assets/img/accessories/png.svg'
            }
        }

    }
    $scope.cancelImg=function(){
        $scope.newNotice.notice_file='';
        $scope.file_name='';
    }
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


                   
        if(answer!='cancel'){
            $scope.file_uploading=[];
            answer.file_name='notice_file';
            answer.file_type=$scope.type;
            $scope.file_uploading.processing=true; 
            console.log(answer);
            var upMe=Upload.upload({
                url:'index.php/home/addNotice',
                data:answer
            });
            upMe.then(function(response){
            
                    console.log(response);
                    if(response.data.success){
                        $rootScope.notices=response.data.notices;
                        $mdDialog.hide();
                        
                    }else{
                       $mdDialog.hide();
                    }
            }, function (response) {
                console.log(response);
                  if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                  // Math.min is to fix IE which reports 200% sometimes
                  $scope.file_uploading.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });


        }   
                       

      
    };
}