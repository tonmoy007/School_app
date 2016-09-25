<!DOCTYPE html>
<html lang="en" >
    <!-- BEGIN HEAD -->
    <head>
        <meta charset="utf-8"/>
        <title>Fumontor|Signup</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
        <meta content="" name="description"/>
        <meta content="" name="author"/>
        <base href="<?php echo $this->config->base_url(); ?>">
  <!--Base tag end-->
        
        <link rel="shortcut icon" href="assets/img/favicon.png">
        <!-- BEGIN GLOBAL MANDATORY STYLES -->
        
        <link href="assets/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="assets/css/flat-ui.css">

        <link rel="stylesheet" href="assets/css/animate.css">
        <link href="assets/css/font-awesome.min.css" rel="stylesheet">
        <link href="assets/css/roboto.min.css" rel="stylesheet">
        <link rel="stylesheet" href="assets/css/home.css">
        <link href="assets/css/login.css" rel="stylesheet">
        <link rel="stylesheet" href="assets/css/home-signup-modal.css">
        <script src="assets/js/jquery.js"></script>
        <script src="assets/js/bootstrap.min.js"></script>
    
        <script src="assets/js/essentials/angular.min.js"></script>
        <script src="assets/js/essentials/angular.mask.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.4/angular-route.js"></script>
        <script src="assets/js/essentials/signup.js">
        </script>

      
    </head>
    <!-- BEGIN BODY -->
   <?php 
   if(!empty($from)){
    $location='?from='+$location;
   }else{
    $location='';
   }
   $name=(!empty($name))?$name:'';

   ?>
    <body class="login-body">
       <div id="fullpage" ng-app="signup" ng-controller="signupCtrl" class="fullpage-container">
          
                <div class="login-container">
                   <a href=" " class="">
                    <div class="logo">
                      <img class="img-responsive" src="assets/img/home-logo-black.png" alt="fumontor logo">
                    </div>
                  </a>
                  <?php if(!empty($message)){?>
                    <div class="alert text-danger">
                      <?php echo $message;?>
                    </div>

                    <?php }?>
                  <div class="user-signup">
                    
                       <div class="center login-form-submit " ng-if="!tabs[0].checked">
                            <a href="" class=" loginBtn loginBtn--email host-btn text-white bg-theme cool-shadow " name="submit"  ng-click="show(0)">Signup as foodie</a>
                            <span class="icon foodie-icon"></span>
                        </div>
                        
                        <div class="signup-form text-left " ng-class="{'is-visible':tabs[0].checked}">
                          <p class=" register-link">
                          <a href="social/session/facebook" id="" class="cool-shadow  loginBtn--facebook loginBtn host-btn ">Signup with facebook</a>
                          <span class="or"></span>
                          </p>
                          <form action="auth/signup<?php echo $location;?>" method="post" name="signupUserForm" accept-charset="utf-8" novalidate="true">
                            <div class="form-group" ng-form="userName">
                              <label class="form-label">Full Name</label>
                              <input type="text" name="name" required="true" minlength="4" maxlength="100" class="form-control" ng-model="name" ng-value="<?php echo $name;?>" placeholder="Saddam Hossain">
                              <span ng-class="{nameError:userName.name.$dirty&&userName.name.$error.required}" class="form-error-message" >Your name is required.</span>
                              <span ng-class="{nameError:userName.name.$dirty&&userName.name.$error.minlength}" class="form-error-message" >Your name must contain atleast 4 character.</span>
                              <span ng-class="{nameError:userName.name.$dirty&&userName.name.$error.maxlength}" class="form-error-message" >Your name must not have more than 100 character.</span>
                              
                            </div>
                            <div class="form-group" ng-form="phoneForm">
                              <label class="form-label">Phone</label>
                              <input type="text" name="phoneNumber" minlength="18" maxlength="18" required  ng-model="phoneNumber" class="form-control" phone-input placeholder="Phone Number">
                              
                              <span class=" nameError form-error-message" ng-if="phoneForm.phoneNumber.$error.required">Phone Number is required</span>
                              <span ng-class="{nameError:phoneForm.phoneNumber.$dirty&&phoneForm.phone.$error.checkPhone}"  class="form-error-message" ng-if="phoneForm.phone.$error.checkPhone">This Phone Number is used try a different one</span>
                              <span ng-class="{nameError:phoneForm.phoneNumber.$dirty&&phoneForm.phone.$error.minlength}"  class="form-error-message" ng-if="phoneForm.phone.$error.minlength">Invalid Phone Number</span>
                              <span ng-class="{nameError:phoneForm.phoneNumber.$dirty&&phoneForm.phone.$error.maxlength}"  class="form-error-message" ng-if="phoneForm.phone.$error.maxlength">Invalid Phone Number</span>
                              <input type="hidden" unique-phone minlength="13" maxlength="13" ng-model="phoneNumber" name="phone" value="{{phoneNumber}}">
                              
                            </div>
                            
                            <div class="form-group" ng-form="emailForm">
                              <label class="form-label">Email</label>
                              <input type="email" unique-email name="email" ng-model="email" class="form-control"  placeholder="saddam.hossain@yahoo.com">
                              <span ng-class="{nameError:emailForm.email.$dirty&&emailForm.email.$error.email}"  class="form-error-message" ng-if="emailForm.email.$error.email">Invalid Email address</span>
                              <span ng-class="{nameError:emailForm.email.$dirty&&emailForm.email.$error.checkMail}"  class="form-error-message" ng-if="emailForm.email.$error.checkMail">This Email is used try a different one</span>
                            </div>
                            <div class="form-group">
                              <label class="form-label">Password</label>
                              <div class="input-group">
                                <input type="{{passwordType}}" name="password" ng-model="password" class="form-control"  placeholder="Password">
                                <span  class="input-group-addon  bg-white text-theme show-pass" ng-click="toggleShow()">{{showpass}}</span>
                              </div>
                            </div>
                          <div class="center login-form-submit">
                              <input type="submit" ng-disabled="signupUserForm.$invalid" class=" loginBtn bg-red host-btn bg-theme text-white cool-shadow " name="submit" value="Signup with email">
                              <span class="icon mail-icon"></span>
                          </div>
                  
                          </form>
                        </div>
                     
                  
                  </div>
                  <span class="or"></span>
                  <div class="cook-signup">
                    <div class="center login-form-submit" ng-if="!tabs[1].checked">
                            <a href="" class=" loginBtn loginBtn--email host-btn bg-theme text-white cool-shadow " name="submit" ng-click="show(1)" >Signup as cook</a>
                            <span class="icon cook-icon"></span>
                    </div>
                    <div class="signup-form" ng-class="{'is-visible':tabs[1].checked}">
                      <form name="cookSignupForm" ng-submit="signupCook(cookSignupForm)" method="get" accept-charset="utf-8">
                        <div class="form-group" ng-form="cookNameForm">
                            <label class="form-label">Full Name</label>
                            <input type="text" name="name" required minlength="4" maxlength="100" class="form-control" ng-model="cook.name" value="" placeholder="Saddam Hossain">

                              <span ng-class="{nameError:cookNameForm.name.$dirty&&cookNameForm.name.$error.required}" class="form-error-message" >Your name is required.</span>
                              <span ng-class="{nameError:cookNameForm.name.$dirty&&cookNameForm.name.$error.minlength}" class="form-error-message" >Your name must contain atleast 4 character.</span>
                              <span ng-class="{nameError:cookNameForm.name.$dirty&&cookNameForm.name.$error.maxlength}" class="form-error-message" >Your name must not have more than 100 character.</span>
                          </div>
                          <div class="form-group" ng-form="cookPhoneForm">
                            <label class="form-label">Phone Number</label>
                            <input type="text" name="cooksPhone" minlength="13" maxlength="18"  ng-model="cook.phone" class="form-control" phone-input placeholder="Phone Number" value="">
                            
                            <span class=" nameError form-error-message" ng-if="cookPhoneForm.cooksPhone.$error.required">Phone Number is required</span>
                              <span ng-class="{nameError:cookPhoneForm.cooksPhone.$dirty&&cookPhoneForm.cookphone.$error.checkPhone}"  class="form-error-message" ng-if="cookPhoneForm.cookphone.$error.checkPhone">This Phone Number is used try a different one</span>
                              <span ng-class="{nameError:cookPhoneForm.cooksPhone.$dirty&&cookPhoneForm.cookphone.$error.minlength}"  class="form-error-message" ng-if="cookPhoneForm.cookphone.$error.minlength">Invalid Phone Number</span>
                              <span ng-class="{nameError:cookPhoneForm.cooksPhone.$dirty&&cookPhoneForm.cookphone.$error.maxlength}"  class="form-error-message" ng-if="cookPhoneForm.cookphone.$error.maxlength">Invalid Phone Number</span>
                              <input type="hidden" unique-phone minlength="13" maxlength="13" ng-model="cook.phone" name="cookphone" value="{{cook.phone}}">

                          </div>
                          <div class="center login-form-submit">
                            <input type="submit" ng-disabled="cookSignupForm.$invalid" class=" loginBtn bg-red host-btn bg-theme text-white cool-shadow " name="submit" value="Signup as Cook">
                            <span class="icon mail-icon"></span>
                        </div>
              
                      </form>
                    </div>
                  </div>
            

           <div class="alert text-center">  
                already have an account? &nbsp;
                        <a href="auth/login" id="register-link" class="text-theme "><strong>lognin</strong></a>
                </div>
              
              <div class="login-footer">
                 <div class="page-footer-inner ">
                  &copy; 2016  <a href="http://fumontor.com"><strong>Fumontor</strong></a>&nbsp; All Rights Reserved.
                </div>
                          </div>
              
                </div>
<div class="home-signup-modal " id="cook-signup-model">
<div class="overlay"></div>
<div id="home-signup-loader" class="text-theme"><i class="fa fa-spinner fa-pulse"></i></div>
    <div class="home-signup-modal-container ">
    <a href="" ng-click="closeModel()" title="" class="home-signup-modal-close">Close</a>
        <div class="home-signip-modal-header bg-theme">
            <h2 class="modal-header"><strong>Fumontor Kitchen Registration</strong></h2>
        </div>
        <div class="home-signup-modal-body">
            <div class="modal-form-container">
                <form name="cookRegForm" method="post" ng-submit="registerCook(cookRegForm)" accept-charset="utf-8">
                                  
                
                    <div class="form-message">Hello <strong class="text-theme">{{cook.name}}</strong> you are about to register into <span class="modal-strong">fumontor</span> as a cook<br> We need the following information to make your kitchen ready. <span class="text-red">*</span> marked fields are required!!</div>

                    <div class="form-body">
                    <input type="hidden" name="username" value="" id="username">
                      <div class="form-group " >
                        
                        <div class="input-group" ng-form="kithcenNameForm" >
                          <span class="input-group-addon"><i class="fa fa-home"></i></span>
                          <input type="text" class="form-control" required name="kitchenName" ng-model="cook.kitchenName" id="kitchenName" minlength="4" maxlength="100" placeholder="Kitchen Name ( This will be shown to the user )" >
                          <span ng-class="{nameError:kithcenNameForm.kitchenName.$dirty&&kithcenNameForm.kitchenName.$error.required}"  class="form-error-message" ng-if="kithcenNameForm.kitchenName.$error.required">Kithcne Name is required</span>
                          <span ng-class="{nameError:kithcenNameForm.kitchenName.$dirty&&kithcenNameForm.kitchenName.$error.minlength}"  class="form-error-message" ng-if="kithcenNameForm.kitchenName.$error.minlength">Kitchen name must have atleast 4 character</span>
                          <span ng-class="{nameError:kithcenNameForm.kitchenName.$dirty&&kithcenNameForm.kitchenName.$error.maxlength}"  class="form-error-message" ng-if="kithcenNameForm.kitchenName.$error.maxlength">Kitchen Name must not have more than 100 character</span>
                        </div>
                        <span class="required-mark"><i class="fa fa-asterisk"></i></span>
                        
                        
                    </div>
                    <div class="form-group ">
                        
                        <div class="input-group" ng-form="cookEmailForm">
                          <span class="input-group-addon"><i class="fa fa-envelope-o"></i></span>
                          <input type="email" unique-email name="email" ng-model="cook.email" class="form-control"  placeholder="saddam.hossain@yahoo.com">
                              <span ng-class="{nameError:cookEmailForm.email.$dirty&&cookEmailForm.email.$error.email}"  class="form-error-message" ng-if="cookEmailForm.email.$error.email">Invalid Email address</span>
                              <span ng-class="{nameError:cookEmailForm.email.$dirty&&cookEmailForm.email.$error.checkMail}"  class="form-error-message" ng-if="cookEmailForm.email.$error.checkMail">This Email is used try a different one</span>
                        </div>
                       
                        
                    </div>
                    <div class="form-group ">
                        
                        <div class="input-group" ng-form="cookRegFormPassword">
                          <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                          <input type="password" class="form-control" reqired minlength="8" maxlength="20" name="cookPassword" ng-model="cook.password" id="userpassword" placeholder="Password ( minimum 8 to 20 character)" >
                          <span ng-class="{nameError:cookRegFormPassword.cookPassword.$dirty&&cookRegFormPassword.cookPassword.$error.required}"  class="form-error-message" ng-if="cookRegFormPassword.cookPassword.$error.required">Password is required</span>
                          <span ng-class="{nameError:cookRegFormPassword.cookPassword.$dirty&&cookRegFormPassword.cookPassword.$error.minlength}"  class="form-error-message" ng-if="cookRegFormPassword.cookPassword.$error.minlength">Minimum 8 character required</span>
                        </div>
        
                          
                          <span class="required-mark"><i class="fa fa-asterisk"></i></span>
                        
                    </div>
                    <div class="form-group ">
                        
                        <div class="input-group" ng-form="confirmPassForm">
                          <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                          <input type="password" class="form-control" required name="confirmpassword" id="confirmpassword" ng-model="cook.confirmpassword" placeholder="Confirm Password" >
                          <span ng-class="{nameError:cook.password!=cook.confirmpassword}"  class="form-error-message" ng-if="confirmPassForm.confirmpassword.$dirty &&cook.password!=cook.confirmpassword">Do no matche</span>
                          <span ng-class="{nameError:confirmPassForm.confirmpassword.$dirty&&confirmPassForm.confirmpassword.$error.required}"  class="form-error-message" ng-if="confirmPassForm.confirmpassword.$error.required">Password match is required</span>
                        </div>
                          <span class="form-error-message"></span>
                          <span class="required-mark"><i class="fa fa-asterisk"></i></span>
                        
                    </div>
                    <div class="form-group ">
                        
                        <div class="input-group" ng-form="PhoneNumberForm">
                          <span class="input-group-addon"><i class="fa fa-mobile"></i></span>
                          <input type="text" class="form-control" minlength="13" maxlength="18" name="phoneCook" id="phone" placeholder="Phone Number" ng-model="cook.phone" phone-input >
                          <span class=" nameError form-error-message" ng-if="PhoneNumberForm.phoneCook.$error.required">Phone Number is required</span>
                              <span ng-class="{nameError:PhoneNumberForm.phoneCook.$dirty&&PhoneNumberForm.cookPhoned.$error.checkPhone}"  class="form-error-message" ng-if="PhoneNumberForm.cookPhoned.$error.checkPhone">This Phone Number is used try a different one</span>
                              <span ng-class="{nameError:PhoneNumberForm.phoneCook.$dirty&&PhoneNumberForm.cookPhoned.$error.minlength}"  class="form-error-message" ng-if="PhoneNumberForm.cookPhoned.$error.minlength">Invalid Phone Number</span>
                              <span ng-class="{nameError:PhoneNumberForm.phoneCook.$dirty&&PhoneNumberForm.cookPhoned.$error.maxlength}"  class="form-error-message" ng-if="PhoneNumberForm.cookPhoned.$error.maxlength">Invalid Phone Number</span>
                              <input type="hidden" unique-phone minlength="13" maxlength="13" ng-model="cook.phone" name="cookPhoned" value="{{cook.phone}}">
                        </div>

                          
                          <span class="required-mark"><i class="fa fa-asterisk"></i></span>
                        
                    </div>
                    <div class="form-group ">
                        
                        <div class="input-group">
                          <span class="input-group-addon"><i class="fa fa-map-marker"></i></span>
                          <input type="text" class="form-control" ng-model="cook.location" name="location" id="location" placeholder="Location (i.e. Mirpur,Dhanmondi)" >
                        </div>

                          <span class="form-error-message"></span>
                        
                    </div>
                    <div class="form-group ">
                        
                        <div class="input-group">
                          <span class="input-group-addon"><i class="fa fa-map-marker"></i></span>
                          <input type="text" class="form-control " ng-model="cook.address" name="address" id="address" placeholder="Address (Your full address here)" >
                        </div>

                          <span class="form-error-message"></span>
                        
                    </div>
                    <div class="form-bottom no-bottom">
                        <div class="center">
                            <input type="submit" ng-disabled="cookRegForm.$invalid||cook.password!=cook.confirmpassword" class="btn btn-danger btn-wide cool-shadow submit" value="Create   Kitchen" id="submit">
                            <div id="spinner" ng-if="loading"><i class="fa fa-spinner fa-pulse"></i></div>
                        </div>
                    </div>
                    </div>
                    
                </form>
            </div>
        </div>
        <div class="home-signup-modal-footer">&copy; 2016 fumontor all rights resurved</div>
    </div>
</div>

       </div>
    
    </body>
    <!-- END BODY -->
</html>