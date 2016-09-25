$(document).ready(function(){
    var badges=$('.bg-unseen');


    $(badges[0]).notiCounter();

});
var reset=false;
$.fn.notiCounter=function(){
    var reset=false;
    var count=parseInt($(this).text());
    var isLogged=$('#userID').val();
    var badges=$(this);

    var userId=document.getElementById("userID").getAttribute("data-di");
    if(isLogged=='true'){
        $.ajax({
        url:'cooks/countAllUnseen/'+userId,
        async:true,
        success:function(data){
            var countr=parseInt(data);
            if(countr>count){
                $(badges).html(data);
                if($(badges).hasClass('hidden')){
                    $(badges).removeClass('hidden');
                }
                $('#notiAudio')[0].play();
                var notification = new NotificationFx({
                            message : "A new order in the pending section",
                            layout : 'attached',
                            effect : 'flip',
                            type : 'notice', // notice, warning or error
                            onClose : function() {
                                
                            }
                        });
                notification.show();
                setTimeout(function () { $(badges).notiCounter(); }, 0);

            }else{
                setTimeout(function () { $(badges).notiCounter(); }, 0);
            }
        }
    });
    }
};

