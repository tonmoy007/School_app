


Dropzone.options.myDropzone = {

  // Prevents Dropzone from uploading dropped files immediately
  autoProcessQueue: false,
  maxFiles:1,
  dictDefaultMessage: "Drop image here or click to upload",

  init: function() {

    var submitButton = document.querySelector("#upload");
    var cancelButton = document.querySelector("#cancel");
    var status = document.querySelector("#status");
    var statusBox = document.querySelector("#statusBox");
    var infoBox = document.querySelector("#infoMessage");
    var mode = document.querySelector("#mode").value;
    $(infoBox).fadeOut(2000);
        $(submitButton).hide();
        $(cancelButton).hide();
        $(statusBox).hide();
        myDropzone = this; // closure
        
        
   submitButton.addEventListener("click", function() {
      myDropzone.processQueue(); // Tell Dropzone to process all queued files.
      $(status).innerHTML="Uploading Files ...";
    });


    cancelButton.addEventListener('click',function(){
            myDropzone.removeAllFiles(true);
            $(submitButton).hide();
            $(cancelButton).hide();
        });

    // You might want to show the submit button only when 
    // files are dropped here:
    this.on("addedfile", function() {
      // Show submit button here and/or inform user to click it.
      $(submitButton).show();
      $(cancelButton).show();
      $(statusBox).show();
      status.innerHTML="Click Upload Button to Start Uploading";
    });
    this.on("queuecomplete", function() {
        myDropzone.removeAllFiles();
        $(submitButton).hide();
        $(cancelButton).hide();
        $(statusBox).show();
        status.innerHTML="uploading completed !! redirecting to the next step";
        $(statusBox).fadeOut(2000);
        if(mode=='new'){
          setTimeout('RedirecttoSliderImg()', 2500);
        }else{
          setTimeout('RedirecttoSingleProduct()', 2500);
        }
        
    });


  }
};

function RedirecttoSliderImg() {
              var id=document.querySelector("#productId").value;
               window.location="index.php/upload/SliderImg?productId="+id;
            };
function RedirecttoSingleProduct() {
              var id=document.querySelector("#productId").value;
               window.location="index.php/singleproduct?id="+id;
            };
          

Dropzone.options.sliderDrop = {

  // Prevents Dropzone from uploading dropped files immediately
  autoProcessQueue: false,
  
  dictDefaultMessage: "Drop images here or click to upload",

  init: function() {

    var submitButton = document.querySelector("#upload");
    var cancelButton = document.querySelector("#cancel");
    var status = document.querySelector("#status");
    var statusBox = document.querySelector("#statusBox");
        $(submitButton).hide();
        $(cancelButton).hide();
        $(statusBox).hide();
        
        myDropzone = this; // closure
        
        
   submitButton.addEventListener("click", function() {
      myDropzone.processQueue(); // Tell Dropzone to process all queued files.
      $(status).innerHTML="Uploading Files ...";
    });


    cancelButton.addEventListener('click',function(){
            myDropzone.removeAllFiles(true);
            $(submitButton).hide();
            $(cancelButton).hide();
        });

    // You might want to show the submit button only when 
    // files are dropped here:
    this.on("addedfile", function() {
      // Show submit button here and/or inform user to click it.
      $(submitButton).show();
      $(cancelButton).show();
      $(statusBox).show();
      status.innerHTML="Click Upload Button to Start Uploading";
    });
    
    this.on("queuecomplete", function() {
        myDropzone.removeAllFiles();
        $(submitButton).hide();
        $(cancelButton).hide();
        $(statusBox).show();
        status.innerHTML="uploading completed !!";
        $(statusBox).fadeOut(2000);
        setTimeout('RedirecttoSingleProduct()', 2500);
        
    });

    this.on('processing',function(){
      this.options.autoProcessQueue = true;
    });
    
   

  }
     
};

