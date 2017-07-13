/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// TODO: Test Cross Site Scripting

$(document).ready(() => {
  function escape(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }


  function createTweetElement(tweetData) {
    const html = `
    <article class="tweet">
      <header>
        <img class="avatar" src="${tweetData.user.avatars.small}">
        <span class="username">${tweetData.user.name}</span>
        <span class="handle">${tweetData.user.handle}</span>
      </header>
      <p>${escape(tweetData.content.text)}</p>
      <footer>
        <span>${tweetData.created_at}</span>
      </footer>
    </article>`;
    return html;
  }

  function renderTweets(tweetData) {
    let allTweets = '';
    for (const tweet in tweetData) {
      const renderedTweet = createTweetElement(tweetData[tweet]);
      allTweets = renderedTweet + allTweets;
    }
    $('.feed').empty().append(allTweets);
  }

  function loadTweets() {
    const renderedTweets = '';
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success(tweetData) {
        renderTweets(tweetData);
      },
    });
  }

// Submits a tweet via AJAX

  function submitTweet(e) {
    e.preventDefault();
    const tweetData = $(this).serialize();
    if (textInputVerified()) {
      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: tweetData,
        success(data) {
          $('#tweetInput').val('');
          $('#charCounter').text(140);
          loadTweets();
        },
      });
    }
  }

  function textInputVerified() {
    let textInput = $('#tweetInput').val();
    let textInputLength = textInput.length;
    if (textInputLength === 0) {
      alert("The tweet doesn't contain anything! Add something to your tweet.");
      return false;
    } else if (textInputLength > 140) {
      alert('You have too many characters. Try shortening it.');
      return false;
    }
    return true;
  }

  loadTweets();

  $('#submit-tweet').on('submit', submitTweet);

  $('#compose').on('click',function(e){
      e.stopPropagation();
      $('.new-tweet').slideToggle();
      $('#tweetInput').focus();
  });

});

