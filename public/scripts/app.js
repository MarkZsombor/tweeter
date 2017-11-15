/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];



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
      // console.log($(this)); // form#new-tweet
      var $form = $(this);
      // console.log($form.children('textarea').val());
      console.log($form.serialize());
      // $.ajax({
      //   type: 'POST',
      //   url:  '/',
      //   data: $form.serialize()
      // })
      //   .done(function() {
      //     var newTweet = $form.children('textarea').val();

      //   });
    });
  }

  renderTweets(data);
  getNewTweet();
});
