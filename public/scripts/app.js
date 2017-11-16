/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

/*
 * uses jQuery to create a new tweet item to be rendered in the DOM
 *
 * @param {object} tweetObject - information taken from the database for a tweet
 * @return {string} all the information needed for jQuery to render a tweet in the DOM
 */
  function createTweetElement(tweetObject) {

    var $header = $('<header>')
        .append(`<img class="avatar" src="${tweetObject.user.avatars.regular}">`)
        .append(`<h2 class="user-name">${tweetObject.user.name}</h2>`)
        .append(`<p class="handle">${tweetObject.user.handle}</p>`);

    var $content = $('<div>')
      .append('<p>').text(tweetObject.content.text).addClass('tweet-content');

    var creationDate = convertDate(tweetObject.created_at);

    var $footer = $('<footer>')
      .append(`<p class="date">${creationDate}</p>`)
      .append('<i class="fa fa-heart">')
      .append('<i class="fa fa-retweet">')
      .append('<i class="fa fa-flag">');

    var $newTweet = $('<article class="tweet">')
      .append($header, $content, $footer);


    return $newTweet;
  }

/*
 * creates a new element in the DOM
 *
 * @param {string} tweets - jQuery data for the new item
 */
  function renderTweets(tweets) {
    $('#tweets-container').empty();
    for (var entry of tweets) {
      var newTweet = createTweetElement(entry);
      $('#tweets-container').prepend(newTweet);
    }
  }

/*
 * converts timecode to calendar date + time
 *
 * @param {number} timeCode - a time code
 * @return {string} date as a UTC string
 */
  function convertDate(timeCode) {
    return new Date(timeCode).toUTCString();
  }

/*
 * creates a new tweet when Submit button is clicked and renders it on the page
 *
 */
  function getNewTweet() {
    var $button = $('#new-tweet');
    $button.on('click', function() {
      event.preventDefault();
      // console.log($(this)); = input#new-tweet
      var $form = $(this).parent();
      // an empty tweet will have $form.serialize().length of 5
      // need error msgs if tweet is empty or too long
      if ($form.serialize().length <= 5) {
        alert("Tweets can't be blank");
        return;
      } else if ($form.serialize().length > 145) {
        alert("Tweets can't be more than 140 characters");
        return;
      }
      // POST the text content to the server, when done load the tweet, clear the textarea and reset the char counter
      $.ajax({
        type: 'POST',
        url:  '/tweets/',
        data: $form.serialize()
      })
        .done(function() {
          loadTweets();
        });
        $('textarea').val('');
        $('.counter').text('140');
    });
  }

/*
 * gets all tweets from the database and renders them on the page
 *
 */
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

  // populate the page with tweets in database
  loadTweets();
  getNewTweet();

  // clicking the compose button will toggle the new tweet area and focus on the textarea
  $( ".compose" ).click(function() {
    $( ".new-tweet" ).slideToggle( "slow", function() {
    $('textarea').focus().select();
    });
  });

  // textarea will be focused on page load
  $(function() {
    $('textarea').focus().select();
  });
});
