var Slides = {  
   container : $( "#slides" ),

   totalSlides : '',

   translateAmount : 0,

   currentSlide : 0,

   slideWidth : '',
 
   init : function( totalSlides ) {  
      // If nothing was passed to this function, we can't continue.  
      if ( !totalSlides ) throw new Error("Please pass the total number of slides to the init method");  
      Slides.totalSlides = totalSlides;  
  
      // Load the slides  
      Slides.loadContent();

      Slides.setSlideWidth();

      Slides.keyPress();
   },  

   loadContent : function() {
      Slides.container.hide();
      for ( var i = 0; i < Slides.totalSlides; i++ ) {  
         $('<div id="#slide-' + i + '"></div>')  
            .load('slides/' + i + '.html')  
            .appendTo( Slides.container );  
      }
      Slides.container.show();
   },

   keyPress : function() {  
      window.onkeydown = function(e) {
         // if left or right arrow key is pressed  
         if ( e.keyCode === 39 || e.keyCode === 37 ) {  
            e.preventDefault();  
            ( e.keyCode === 39 ) ? Slides.next() : Slides.prev();  
         }  
      };
   },
  
   // Determine the width of the slide...  
   setSlideWidth : function() {  
      var each = Slides.container.children( 'div' );  
      Slides.slideWidth = each.width() + ( parseInt( each.css('margin-right'), 10 ) );  
   },

   next : function() {
      // can't go any further
      if ( Slides.currentSlide == Slides.totalSlides - 1 ) return;

      Slides.translateAmount -= Slides.slideWidth;
      Slides.updateHash( ++Slides.currentSlide );
      Slides.animate();
   },

   prev : function() {
      // No more left to go back.  
      if ( Slides.translateAmount === 0 ) return;  
      
      Slides.translateAmount += Slides.slideWidth;  
      Slides.updateHash( --Slides.currentSlide );  
      Slides.animate();
   },

   animate : function() {
      Slides.container  
            .children()  
            .css( '-webkit-transform', 'translateX(' + Slides.translateAmount + 'px)');
      Slides.container
            .children()
            .css( '-moz-transform', 'translateX(' + Slides.translateAmount + 'px)');
   },

   updateHash : function() {  
      location.hash = '#slide-' + Slides.currentSlide;  
   }  
};
  
// All right; let's do this!
Slides.init( 17 );  
