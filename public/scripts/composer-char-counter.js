$(document).ready(function() {
  console.log("Loaded from the docready callback");


// This is alter the text on displayed character counter to show 140-used characters, the text is displayed in black for character counts between 0-140, and will be red if the count is greater than 140
  $( ".new-tweet textarea" ).keyup(function() {
    var counterValue = $(this).val();
    var remainingChars = 140 - counterValue.length;
    $(this).parent().children('.counter').text(function() {
      return remainingChars;
    });
    if (remainingChars < 0) {
      $(this).parent().children('.counter').css('color', 'red');
    } else {
      $(this).parent().children('.counter').css('color', 'black');
     }
  });

});
