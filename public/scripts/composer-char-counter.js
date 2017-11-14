$(document).ready(function() {
  console.log("Loaded from the docready callback");

  $( ".new-tweet textarea" ).keyup(function() {
    var counterValue = $(this).val();
    var remainingChars = 140 - counterValue.length;
    $(this).parent().children('.counter').text(function() {
      return remainingChars;
    });
    if (remainingChars < 0) {
      $(this).parent().children('.counter').css('color', 'red');
    }
  });

});
