jQuery(document).ready(function($){
     

     var signupInitialForm=$('.home-signup-form'),
         modal=$('.home-signup-modal'),
         message=modal.find('.form-message'),
         userName=modal.find('#user'),
         closeBtn=modal.find('.home-signup-modal-close'),
         phoneNumber=modal.find('#phone'),
         uname=modal.find('#username'),
         CookRegForm=modal.find('#signupForm'),
         modalLoader=modal.find('#home-signup-loader');


signupInitialForm.on('submit',function(event){
        event.preventDefault();
        var validated=signupInitialForm.valid();
        if(validated){
            var name=$('#name')[0].value;
            var phone=$('#phone')[0].value;
            uname[0].value=name;
            userName.html(name);
            modal.addClass('is-visible');
            $.ajax({
                url:'users/insertTempData?name='+name+'&phone='+phone,
                type:'POST',
                async:false,
                beforeSend:function(){
                    modalLoader.addClass('is-visible');
                },
                success:function(data){
                    if(data=='true'){
                        modalLoader.removeClass('is-visible');
                        modal.find('.home-signup-modal-container').addClass('is-visible');

                    }else{

                        modalLoader.html(data);
                    }
                },
                error:function(xhr, textStatus, errorThrown){},
            });
            phoneNumber[0].value=phone;
        }

    });


closeBtn.on('click',function(event){
        modal.removeClass('is-visible');
        modal.find('.home-signup-modal-container').removeClass('is-visible');
    });


modal.find('.overlay').on('click',function(event){
        modal.removeClass('is-visible');
        modal.find('.home-signup-modal-container').removeClass('is-visible');
    });


var isValidate= CookRegForm.validate({
        rules:{
            kitchenName:{
                required:true,
                minlength:4
            },
            address:{
                required:true,
                minlength:4,
                maxlength:1000
            },
            location:{
                minlength:4,
                maxlength:100
            },
            phone:{
                required:true,
                minlength:6,
                maxlength:20,
                queryphone:true

            },
            email:{
                email:true,
                checkemail:true
            },
            userpassword:{
                minlength:8,
                maxlength:20,
                required:true
            },
            confirmpassword:{
                equalTo:"#userpassword"
            }

        },
        highlight: function(element) {
            $(element).closest('.form-group').find('.form-error-message').addClass('is-visible');
    },
        success: function(element) {
            $(element).closest('.form-group').find('.form-error-message').removeClass('is-visible');
       },
        
     });


CookRegForm.on('submit',function(event){
        event.preventDefault();
        var data=CookRegForm.serializeArray();
        var action=CookRegForm.attr('action');
        var isValidate=CookRegForm.valid();
        if(isValidate){
            $.ajax({
            url: action,
            type: 'POST',
            async:false,
            dataType: 'JSON',
            data: data,
            beforeSend: function(){
                $('#spinner').html( '<p><i class="fa fa-spinner fa-spin"></i> Submitting Form ...</p>');
            },
            success:function(data){

                $('#spinner').fadeOut();
                modal.removeClass('is-visible');
                modal.find('.home-signup-modal-container').removeClass('is-visible');
                 
                 for(var key in data){

                var notification = new NotificationFx({
                            message : data[key].message,
                            layout : 'attached',
                            effect : 'flip',
                            type : data[key].ntype, // notice, warning or error
                            onClose : function() {
                                
                            }
                        });
           
            // show the notification

                        notification.show();
                        if(data[key].status=="true"){

                        setTimeout('redirectToProfile()',3000);
                        
                        }
                    }
            },
            error:function(){}
        })
        .done(function() {
            console.log("success");
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
        }
        
       });

var isV= signupInitialForm.validate({
        rules:{
            name:{
                required:true,
                minlength:4
            },
            phone:{
                required:true,
                minlength:6,
                maxlength:18,
                queryphone:true,
                nonzero:true
                    }
                

            },
            messages: {
            phone: {
              required: "Phone number is required",
              minlength: "too short!! minimum 6 digit number",
              queryphone:function(){
                return $('#phone').val()+' is already taken try different number';
              }
          },
              name: {
              required: "Your name is required",
              minlength: "too short !! name must contain atleast 4 character",
              
            }
          },

        
        highlight: function(element) {
            $(element).closest('.form-group').find('.form-error-message').addClass('is-visible');
    },
        success: function(element) {
            $(element).closest('.form-group').find('.form-error-message').removeClass('is-visible');
       },
        
        
     });

});


//VALIDATE USER NUMBER
$.validator.addMethod("queryphone", function(value, element)
{
    var inputElem = $('#signupInitialForm :input[name="phone"]'),
        data =  value,
        eReport = ''; 
        var ulue='users/matchPhoneNumber?phone='+value;
        var flag=false;
    $.ajax(
    {
        type: "POST",
        url: ulue,
        async:false,
        success: function(data)
        {
             if(data=='true'){
                flag=true;
             } 
        },
        error: function(xhr, textStatus, errorThrown)
        {
            return false;
        }
    });
return flag;

},  'the number is already taken try different number');

//VALIDATE USER EMAIL
$.validator.addMethod("checkemail", function(value, element)
{
    var inputElem = $('#signupInitialForm :input[name="email"]'),
        data =  value,
        eReport = ''; 
        var ulue='users/matchEmail?email='+value;
        var flag=false;
    $.ajax(
    {
        type: "POST",
        url: ulue,
        async:false,
        success: function(data)
        {
             if(data=='true'){
                flag=true;
             } 
        },
        error: function(xhr, textStatus, errorThrown)
        {
            return false;
        }
    });
return flag;

},  'the Email is already taken try different Email');

//ZERO INPUT CHECK METHOD
$.validator.addMethod("nonzero", function(value, element)
{
    if(parseInt(value)==0){
        return false;
    }else{
        return true;
    }
},  'Invalid Number');


function redirectToProfile(){
    window.location="cooks";
}