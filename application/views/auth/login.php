<!DOCTYPE html>
<html lang="en" >
    <!-- BEGIN HEAD -->
    <head>
        <meta charset="utf-8"/>
        <title>School | Login</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
        <meta content="" name="description"/>
        <meta content="" name="author"/>
        <base href="<?php echo $this->config->base_url(); ?>">
  <!--Base tag end-->
        <link rel="shortcut icon" href="assets/img/favicon.png"> 
        <!-- BEGIN GLOBAL MANDATORY STYLES -->
        
        <link href="assets/css/bootstrap.min.css" rel="stylesheet">
        <link href="assets/css/font-awesome.min.css" rel="stylesheet"><link rel="stylesheet" href="assets/css/reset.css">
        <link href="assets/css/flat-ui.css" rel="stylesheet">
        
        <link href="assets/css/roboto.min.css" rel="stylesheet">
        <link href="assets/css/home.css" rel="stylesheet">
        
        <link href="assets/css/login.css" rel="stylesheet">

        <script src="assets/js/home/jquery-2.1.1.js"></script>
        <script src="assets/js/bootstrap.min.js"></script>
        <script src="assets/js/essentials/angular.min.js"></script>
<?php 
if(!empty($l_from)){
  $url="index.php/auth/login?from=".$l_from;
}else{
  $url="index.php/auth/login/".$from;
}
?>
      
    </head>
    <!-- BEGIN BODY -->
    <body class="login-body" ng-app="">
       <div id="fullpage"  class="fullpage-container ">
            <div class="login-container cool-border">
            
              <a href=" " class="">
                <h1 class="text-theme text-center logo">
                  <strong>School Attender</strong>
                </h1>
              </a>
              
               <!--  <p class=" register-link">
                         

                      
                      <a href="social/session/facebook?from=<?php echo $from;?>" id="" class="cool-shadow  loginBtn--facebook loginBtn host-btn ">Signin with facebook</a>
                     
                </p> -->
                <!-- <label class="or"></label> -->
              <div id="infoMessage" class="login-info"><?php echo $message;?></div>

              <?php echo form_open($url,array("class"=>"loginForm"));?>

               
               

                
          <div class="login-form-input">
              <div class="form-group ">
                
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-user"></i></span>
                  <input type="text" class="form-control" name="identity" id="identity" placeholder="Email or Phone Number" >
                  
                </div>
                <span class="help-block"> </span>
                
              
              </div>
               <div class="form-group">
                
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                  <input type="password" placeholder="password" name="password" value="" id="password" class="form-control">
                  
                </div>
                <span class="help-block"> </span>
                
              
              </div>

                    <div class="text-center">
                      <div class="form-group">
                        <label class="checkbox" for="remember">
                        <span class="icons"><span class="first-icon 
            fui-checkbox-unchecked"></span><span class="second-icon
             fui-checkbox-checked"></span></span>
                          <input type="checkbox" name="remember" value="1" id="remember" data-toggle="checkbox"> 
                          Remember me </label>
                    </div>
                      <a href="index.php/auth/forgot_password" class="text-theme forgot">forgot password ? </a>
                    </div>
            </div>
                           
                                 
                        <div class="center login-form-submit">
                            <input type="submit" class=" btn loginBtn text-white host-btn bg-theme cool-shadow " name="submit" value="Login">
                            <span class="icon icon-login"></span>
                        </div>
                        
                       <div class="clearfix"></div>
              <?php echo form_close();?>

              <div class="login-footer">
                
                
<!-- 
                <div class="alert text-center">  
                not a fumontor user? &nbsp;
                        <a href="auth/signup" id="register-link" class="text-theme "><strong>Signup</strong></a>
                </div> -->
                 <div class="page-footer-inner ">
                  &copy; 2016  <a href="http://binarycraft.org"><strong>Binary Craft</strong></a>&nbsp; All Rights Reserved.
                </div>
              </div>
              
              

                     <!-- END COPYRIGHT -->
            </div>
            

       </div>

<script src="assets/js/flat-ui.min.js"></script>
<script src="assets/js/home/flatui-checkbox.js"></script>

    </body>
    <!-- END BODY -->
</html>