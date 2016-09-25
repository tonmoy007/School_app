(function($) {

    $.fn.fumodal = function() {
     this.each( function() {
        var modalref=$(this).attr('modal-id');
        var modal=$(modalref),
            modalCloseBtn=modal.find('.fu-modal-close'),
            modalContainer=modal.find('.fu-modal-container'),
            modalLoader=modal.find('#fu-loader'),
            modalOverlay=modal.find('.overlay');
        
        $(this).on('click',function(event){
                event.preventDefault();
                modalShow();
                });
        
        modalCloseBtn.on('click',function(event){
            event.preventDefault();
            modalClose();
        });

        modalOverlay.on('click',function(event){
            event.preventDefault();
            modalClose();
        });

        function modalClose(){
                modal.removeClass('is-visible');
                modalContainer.removeClass('is-visible');
            }

        function modalShow(){

                modal.addClass('is-visible');
                showLoader();
                
                setTimeout(function(){
                    hideLoader();
                    modalContainer.addClass('is-visible');
                },500);

            }

        function showLoader(){
                modalLoader.addClass('is-visible');
        }
        function hideLoader(){
                modalLoader.removeClass('is-visible');
        }


            });
        

    }

}(jQuery));