
<!DOCTYPE html>
<html lang="en" >
    <!-- BEGIN HEAD -->
    <head>
        <meta charset="utf-8"/>
        <title>Fumontor</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
        <meta content="" name="description"/>
        <meta content="" name="author"/>
        <base href="<?php echo $this->config->base_url(); ?>">
  <!--Base tag end-->
        <link rel="shortcut icon" href="assets/img/favicon.png">
        
        <!-- BEGIN GLOBAL MANDATORY STYLES -->
        
        <link href="assets/css/roboto.min.css" rel="stylesheet">
        <link href="assets/css/bootstrap.min.css" rel="stylesheet">
        <link href="assets/css/font-awesome.min.css" rel="stylesheet">
        <link href="assets/css/flat-ui.min.css" rel="stylesheet">
        <link rel="stylesheet" href="assets/css/home.css">
        <link href="assets/css/login.css" rel="stylesheet">

        <script src="assets/js/jquery.js"></script>
        

      
    </head>
    <!-- BEGIN BODY -->
    <body class="login-body">
       <div id="fullpage" class="fullpage-container">
            <div class="login-container">

            <a href="" class="">
                <div class="logo">
                  <img class="img-responsive" src="assets/img/home-logo-black.png" alt="fumontor logo">
                </div>
              </a>
            <p class="alert"><?php echo sprintf(lang('forgot_password_subheading'), $identity_label);?></p>

            <div id="infoMessage"><?php echo $message;?></div>

            <?php echo form_open("auth/forgot_password");?>

            <div class="form-group form-group-lg label-floating is-empty">
                
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-user"></i></span>
                  <input type="email" class="form-control" name="email" id="identity" placeholder="Email " >
                  
                </div>
                <span class="help-block"> </span>
                
              
              </div>

                  <div class="center form-bottom no-bottom">
                       <input type="submit" class="btn btn-danger btn-wide cool-shadow" name="submit" value="Reset">
                  </div>

            <?php echo form_close();?>
           <!-- END COPYRIGHT -->
            <div class="page-footer-inner ">
      &copy; 2016  <a href="http://fumontor.com"><strong>Fumontor</strong></a>&nbsp; All Rights Reserved.
    </div>
            </div>

       </div>
    <script src="assets/js/bootstrap.min.js"></script>
    
    </body>
    <!-- END BODY -->
</html>