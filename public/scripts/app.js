/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  function createTweetElement(tweetObject) {

    var $header = $('<header>')
        .append(`<img class="avatar" src="${tweetObject.user.avatars.regular}">`)
        .append(`<h2 class="user-name">${tweetObject.user.name}</h2>`)
        .append(`<p class="handle">${tweetObject.user.handle}</p>`);

    var $section = $('<section>')
        // .append(`<p class="tweet-content">${tweetObject.content.text}</p>`);
      .append('<p>').text(tweetObject.content.text).addClass('tweet-content');

    var creationDate = convertDate(tweetObject.created_at);

    var $footer = $('<footer>')
      .append(`<p class="date">${creationDate}</p>`)
      .append('<i class="fa fa-heart">')
      .append('<i class="fa fa-retweet">')
      .append('<i class="fa fa-flag">');

    var $newTweet = $('<article class="tweet">')
      .append($header, $section, $footer);


    return $newTweet;
  }

  function renderTweets(tweets) {
    for (var entry of tweets) {
      var newTweet = createTweetElement(entry);
      $('#tweets-container').append(newTweet);
    }
  }


  function convertDate(timeCode) {
    return new Date(timeCode).toUTCString();
  }

  function getNewTweet() {
    var $button = $('#new-tweet');
    $button.on('click', function() {
      event.preventDefault();
      console.log('the button is clicked');
      // console.log($(this)); // input#new-tweet
      var $form = $(this).parent();
      // an empty tweet will have $form.serialize().length of 5
      if ($form.serialize().length <= 5) {
        alert("Tweets can't be blank");
        return;
      } else if ($form.serialize().length > 145) {
        alert("Tweets can't be more than 140 characters");
        return;
      }
      $.ajax({
        type: 'POST',
        url:  '/tweets/',
        data: $form.serialize()
      })
        .done(function() {
          loadTweets();
        });
    });
  }

  function loadTweets() {
    $.ajax({
      type: "GET",
      url: "/tweets/",
      dataType: "json",
      success: function (result) {
        renderTweets(result);
      }
    });
  }

  loadTweets();
  getNewTweet();
});
