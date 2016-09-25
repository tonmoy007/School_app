jQuery(document).ready(function(){
    var cartSaved=false;
    var productCustomization = $('.cd-customization'),
        cart = $('.cd-cart'),
        animating = false;
    
    initCustomization(productCustomization);

    var plus=$('.btn-plus');
    var minus=$('.btn-minus');
      plus.on('click',function(){
        var amount = parseInt($(this).siblings('.quantity-amount').text())+1;
        $(this).siblings('.quantity-amount').text(amount);
        var activeProduct=$('.cd-customization.active');
            for($i=0;$i<activeProduct.length;$i++){
                $(activeProduct[$i]).removeClass('active');
            }
              $(this).parent('.quantity').parent('.cd-customization').addClass('active');  
      });
      minus.on('click',function(){
        var activeProduct=$('.cd-customization.active');
            for($i=0;$i<activeProduct.length;$i++){
                $(activeProduct[$i]).removeClass('active');
            }
              $(this).parent('.quantity').parent('.cd-customization').addClass('active');  
        var amount= parseInt($(this).siblings('.quantity-amount').text())-1;
        if(amount>0){
            $(this).siblings('.quantity-amount').text(amount);
        }
      });


    $('body').on('click', function(event){
        //if user clicks outside the .cd-gallery list items - remove the .hover class and close the open ul.size/ul.color list elements
        if( $(event.target).is('body') || $(event.target).is('.grid-area') ) {
            deactivateCustomization();
        }
    });


        //empty cart notifica
    
    // var cartEmpty='<div class=" cart-empty alert alert-info "> No items in the cart </div>'    
                 var cItem=$('#cd-cart .cd-cart-items');
    //             if(cItem.children.length > 0){
    //                 cItem.append(cartEmpty);
    //             }



    function initCustomization(items) {
        items.each(function(){
            var actual = $(this),
                selectOptions = actual.find('[data-type="select"]'),
                addToCartBtn = actual.find('.add-to-cart'),
                touchSettings = actual.next('.cd-customization-trigger');

            //detect click on ul.size/ul.color list elements 
            // selectOptions.on('click', function(event) { 
            //     var selected = $(this);
            //     //open/close options list
            //     selected.toggleClass('is-open');
            //     resetCustomization(selected);
                
            //     if($(event.target).is('li')) {
            //         // update selected option
            //         var activeItem = $(event.target),
            //             index = activeItem.index() + 1;
                    
            //         activeItem.addClass('active').siblings().removeClass('active');
            //         selected.removeClass('selected-1 selected-2 selected-3').addClass('selected-'+index);
            //         // if color has been changed, update the visible product image 
            //         selected.hasClass('color') && updateSlider(selected, index-1);
            //     }
            // });

            //detect click on the add-to-cart button
            var loginStatus=document.querySelector('#userID').value;

            addToCartBtn.on('click', function() {

                if(loginStatus=='true'){

            cItem.find('.cart-empty').remove();
            var activeProduct=$('.cd-customization.active');
            
            for($i=0;$i<activeProduct.length;$i++){
                $(activeProduct[$i]).removeClass('active');
            }
            
            
                    
               
                   
            
              $(this).parent('.cd-customization').addClass('active');

              if($(this).hasClass('single')){
                 var dataDivSingle=$(this).parent('.cd-customization').parent('.product-info-foot').parent('.product-info');
                 updateCartListSingle(dataDivSingle); 
             }else{
                var dataDivall=$(this).parent('.cd-customization').parent('.grid-description');
                updateCartList(dataDivall);
             }
                
                if(!animating) {
                    //animate if not already animating
                    animating =  true;
                    resetCustomization(addToCartBtn);

                    addToCartBtn.addClass('is-added').find('path').eq(0).animate({
                        //draw the check icon
                        'stroke-dashoffset':0
                    }, 300, function(){
                        setTimeout(function(){

                            
                            updateCart();

                            addToCartBtn.removeClass('is-added').find('em').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                                //wait for the end of the transition to reset the check icon
                                addToCartBtn.find('path').eq(0).css('stroke-dashoffset', '19.79');
                                animating =  false;
                            });

                            if( $('.no-csstransitions').length > 0 ) {
                                // check if browser doesn't support css transitions
                                addToCartBtn.find('path').eq(0).css('stroke-dashoffset', '19.79');
                                animating =  false;
                            }
                        }, 600);
                    }); 
                }
            }else{
                window.alert('you need to login to add items in the cart');
            }            

            });

            //detect click on the settings icon - touch devices only
            touchSettings.on('click', function(event){
                event.preventDefault();
                resetCustomization(addToCartBtn);
            });
        });
    }

    function updateCartList(data){

        var title=data.find('h4').text();
        var price=data.find('.price').text();
        var cooksID=data.find('.cID').text();
        var quantity=data.find('.quantity-amount').text();
        var id=data.find('.pIDin').text();
        var appendText='<li><span class="cd-qty">'+quantity+'x</span> '+title+'<div class="cd-price">৳ '+price+'</div><a href="javascript::void(0)" class="cd-item-remove cd-img-replace" data-pID="'+id+'" >Remove</a></li>';
        var cartdrop=$('#cd-cart').find('.cd-cart-items');
        var bill=parseInt(price)*parseInt(quantity);
        var total=$('#cd-cart').find('.total');
        var amount=parseInt(total.text())+bill;
        var userID=document.getElementById("userID").getAttribute("data-di");
      total.text(amount);
      $(cartdrop).append(appendText);
       $.ajax({
                    
                    "url": "cart?id="+id+"&title="+title+"&price="+price+"&uid="+userID+"&quantity="+quantity+"&cooksID="+cooksID,
                    "async": false,
            });
      
    }
    function updateCartListSingle(data){

        var title=data.find('h2.product-title').text();
        var price=data.find('.price').text();
        var cooksID=data.find('.cID').text();
        var quantity=data.find('.quantity-amount').text();
        var id=data.find('.pIDin').text();
        var appendText='<li><span class="cd-qty">'+quantity+'x</span> '+title+'<div class="cd-price">৳ '+price+'</div><a href="javascript::void(0)" class="cd-item-remove cd-img-replace" data-pID="'+id+'" data-cID="'+cID+'" >Remove</a></li>';
        var cartdrop=$('#cd-cart').find('.cd-cart-items');
        var bill=parseInt(price)*parseInt(quantity);
        var total=$('#cd-cart').find('.total');
        var amount=parseInt(total.text())+bill;
        var userID=document.getElementById("userID").getAttribute("data-di");
      total.text(amount);
      $(cartdrop).append(appendText);
       $.ajax({
                    
                    "url": "cart?id="+id+"&title="+title+"&price="+price+"&uid="+userID+"&quantity="+quantity+"&cooksID="+cooksID,
                    "async": false,
            });
      
    }

    function updateSlider(actual, index) {
        var slider = actual.parent('.cd-customization').prev('a').children('.cd-slider-wrapper'),
            slides = slider.children('li');

        slides.eq(index).removeClass('move-left').addClass('selected').prevAll().removeClass('selected').addClass('move-left').end().nextAll().removeClass('selected move-left');
    }

    function resetCustomization(selectOptions) {
        //close ul.clor/ul.size if they were left open and user is not interacting with them anymore
        //remove the .hover class from items if user is interacting with a different one
        selectOptions.siblings('[data-type="select"]').removeClass('is-open').end().parents('.cd-single-item').addClass('hover').parent('li').siblings('li').find('.cd-single-item').removeClass('hover').end().find('[data-type="select"]').removeClass('is-open');
    }

    function deactivateCustomization() {
        productCustomization.parent('.cd-single-item').removeClass('hover').end().find('[data-type="select"]').removeClass('is-open');
    }

    function updateCart() {
        //show counter if this is the first item added to the cart
        ( !cart.hasClass('items-added') ) && cart.addClass('items-added'); 

        var cartItems = cart.find('span'),
            text = parseInt(cartItems.text()) + 1;
        cartItems.text(text);
    }

    var $L = 1200,
    $cart_trigger = $('#cart-button');
    $lateral_cart = $('#cd-cart');
    $shadow_layer = $('#cd-shadow-layer');
    $cartDismiss  = $('#dismiss-cart');
    //open cart
    $cart_trigger.on('click', function(event){
        event.preventDefault();
        //close lateral menu (if it's open)
        
        toggle_panel_visibility($lateral_cart, $shadow_layer, $('body'));
    });
    //close lateral cart or lateral menu
    $shadow_layer.on('click', function(){
        $shadow_layer.removeClass('is-visible');
        // firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
        if( $lateral_cart.hasClass('speed-in') ) {
            $lateral_cart.removeClass('speed-in').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                $('body').removeClass('overflow-hidden');
            });
            //$menu_navigation.removeClass('speed-in');
        } else {
            // $menu_navigation.removeClass('speed-in').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
            //     $('body').removeClass('overflow-hidden');
            // });
            $lateral_cart.removeClass('speed-in');
        }
    });
    $cartDismiss.on('click', function(){
        $shadow_layer.removeClass('is-visible');
        // firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
        if( $lateral_cart.hasClass('speed-in') ) {
            $lateral_cart.removeClass('speed-in').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                $('body').removeClass('overflow-hidden');
            });
            //$menu_navigation.removeClass('speed-in');
        } else {
            // $menu_navigation.removeClass('speed-in').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
            //     $('body').removeClass('overflow-hidden');
            // });
            $lateral_cart.removeClass('speed-in');
        }
    });
    function toggle_panel_visibility ($lateral_panel, $background_layer, $body) {
    if( $lateral_panel.hasClass('speed-in') ) {
        // firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
        $lateral_panel.removeClass('speed-in').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
            $body.removeClass('overflow-hidden');
        });
        $background_layer.removeClass('is-visible');

    } else {
        $lateral_panel.addClass('speed-in').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
            $body.addClass('overflow-hidden');
        });
        $background_layer.addClass('is-visible');
    }
  }


});