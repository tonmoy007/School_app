var submitForm=$('#addMenuForm');
 $(document).ready(function(){
     submitForm.validate({
        rules:{
            item_title:{
                required:true,
            },
            price:{
                required:true,
            },
            cusine:{
                required:true,
            },
            catagories:{
                required:true,
            },
            description:{
                required:true,
            }          

        },
        highlight: function(element) {
    $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
  },
        success: function(element) {
        element.addClass('valid')
        .closest('.form-group').removeClass('has-error').addClass('has-success').removeClass('error');
        },
        submitHandler: function(form) {
        
  
         

        },
        invalidHandler:function(e,validator){
                var errors=validator.numberOfInvalids();
                if(errors){
                    var message= errors==1?'You missed 1 required field. It has been highlighted below':'You missed '+ errors+' required fields.  They have been highlighted below';
                    $("div#error span").html(message);
                    $("div#error").show().css('color','#f77');
                }
                else{
                    $("div#error").hide();
                }
        }
     });

        var form_status = $('<div class="form_status pull-right "></div>');
        
        //$(status).show();
    $(submitForm).submit(function(event){
     var isValidate=submitForm.valid();
       if(isValidate){

        event.preventDefault();
        var dataForm=submitForm.serializeArray();
       
        $.ajax({
            url: $(submitForm).attr('action'),
            type:"POST",
            async:true,
            cache:false,
            data:dataForm,
            beforeSend: function(){
                //alert($(submitForm).attr('action'));
                $('#spinner').html( '<p><i class="fa fa-spinner fa-spin"></i> Submitting Form ...</p>');
            },
            success:function(data){
                
            for(var key in data){

            var notification = new NotificationFx({
                
                            message : data[key].message,
                            layout : 'attached',
                            effect : 'flip',
                            type : data[key].ntype, // notice, warning or error
                            onClose : function() {
                                
                            }
                        });

                        $('#spinner').fadeOut();

                        notification.show();

                        if(data[key].status=="true"){
                            var r=data[key].redirect;
                        setTimeout('redirectToDashbord('+r+')',3000);
                        
                        }
            }

            },
             error :function(xhr, ajaxOptions, thrownError){
                $('#spinner').html('<p class="text-danger"> '+xhr.status+'<br>'+thrownError+'</p>') ;
            }
        }).done(function(data){
            
        });
       }
     });
   });

function redirectToDashbord(data){
    window.location="singleproduct?id="+data;
}
$.fn.serializeObject = function()
{   
    var o = {};
    var a = this.serializeArray();

    $.each(a, function() {
        
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};