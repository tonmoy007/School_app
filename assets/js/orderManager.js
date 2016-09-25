$(document).ready(function(){
    var total=$('.total');

    $(this).orderFunctions();

    $(document).OrderAppend();
    
});
$.fn.orderFunctions=function(){

    var total=$('.total');
        var ordercarddrop=$('.order-card').find('.down-arrow'),
        ordercards=$('.order-card');
    for(var i=0;i<ordercarddrop.length;i++){
        $(ordercarddrop[i]).on('click',function(){
            $(this).closest('.order-card').toggleClass('is-selected');
        });
    }
    for (var i = 0; i < ordercards.length; i++) {
        var obtn=$(ordercards[i]).find('a.state-btn');
        obtn.ordercard();
         var dbtn=$(ordercards[i]).find('a.dlt-btn');
         $(dbtn).on('click',function(){
            $(this).closest('.order-card').fadeOut();
         });

    }
      $('.card-column-list-item-body').chekemptyDiv();
}
$.fn.ordercard=function(){
            $(this).on('click',function(){
                var btn=$(this);
            var orderfield=$(this).closest('.order-card').find('.orderid');
            var orderid=orderfield.text();
            var orderStatus=$(this).closest('.order-card').find('.order-status').text();
            var ajaxurl='cooks/changeOrderStatus/'+orderid+'/'+orderStatus;
            var cardp=$(this).closest('.order-card');
            var card=$(this).closest('.order-card');
            $.ajax({
                url:ajaxurl,
                type:"POST",
                success:function(data){
                    if(data!='false'){
                        if(data=='delete'){

                        $(card).fadeOut().remove();
                    }else{
                        $(btn).removeClass('bg-'+orderStatus).addClass('bg-'+data);
                       $(card).find('.order-status').html(data).removeClass('text-'+orderStatus).addClass('text-'+data);
                       $(card).addClass('animated').addClass('bounce');
                       $('#'+data+'Orders').prepend(card);
                       $('.card-column-list-item-body').chekemptyDiv();
                       $('.total').incrimentTotal(orderStatus,data);
                    }
                    }
                },
            });
        });
};
$.fn.chekemptyDiv=function(){
    var lists=$(this);
           for(var i=0;i<lists.length;i++){
        
            
            var length=$(lists[i]).children('.order-card').length;
            if(length>1){
                $(lists[i]).find('.order-card.notfound').hide();
            }
            if(length<=1){

                $(lists[i]).find('.order-card.notfound').show();
            }
       
   }
};
$.fn.incrimentTotal=function(prev,current){
    var minus=$(this).find('.badge.bg-'+prev);
    var plus=$(this).find('.badge.bg-'+current);
    var prevn=parseInt($(this).find('.badge.bg-'+prev).text());
    prevn--;
    $(this).find('.badge.bg-'+prev).html(prevn+'');
    var currentn=parseInt($(this).find('.badge.bg-'+current).text());
    currentn++;
    $(this).find('.badge.bg-'+current).html(currentn+'');



};
$.fn.OrderAppend=function(){
    var userId=$('#userID').attr('data-di'),
        ajaxUrl='cooks/getUnseenOrders/'+userId;
    setInterval(function(){
        $.ajax({
        url:ajaxUrl,
        type:'POST',
        async:true,
        success:function(data){

            if(data!='false'){
            appd=document.createElement('div');
            appd.innerHTML=data;
            ordercarddrop=$(appd).find('.order-card').find('.down-arrow');
            ordercards=$(appd).find('.order-card');
            for(var i=0;i<ordercarddrop.length;i++){
        $(ordercarddrop[i]).on('click',function(){
            $(this).closest('.order-card').toggleClass('is-selected');
        });
    }
    for (var i = 0; i < ordercards.length; i++) {
        var obtn=$(ordercards[i]).find('a.state-btn');
        obtn.ordercard();
         var dbtn=$(ordercards[i]).find('a.dlt-btn');
         $(dbtn).on('click',function(){
            $(this).closest('.order-card').fadeOut();
         });

    }
    // console.log(ordercarddrop);
    // console.log(ordercards);
      $('#pendingOrders').append(appd);  
      var currentn=parseInt($('.total').find('.badge.bg-pending').text());
        currentn++;
        $('.total').find('.badge.bg-pending').html(currentn+'');

      $('.card-column-list-item-body').chekemptyDiv();
            }
        },
    });
    },2000);
};
