$(document).ready(function() {
  console.log("Loaded from the docready callback");

  $( ".new-tweet textarea" ).keyup(function() {
    // console.log( "Handler for .keyup() called." );
    var counterValue = $(this).val();
    var remainingChars = 140 - counterValue.length;
    console.log(remainingChars);
    // console.log(this);
  });

});
