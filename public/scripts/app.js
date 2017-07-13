/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
// FUNCTIONS
  
  function escape(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function textInputVerified() {
    const textInput = $('#tweetInput').val();
    const textInputLength = textInput.length;
    if (textInputLength === 0) {
      alert("The tweet doesn't contain anything! Add something to your tweet.");
      return false;
    } else if (textInputLength > 140) {
      alert('You have too many characters. Try shortening it.');
      return false;
    }
    return true;
  }

  // FUNCTIONS: CREATION OF TWEETS

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
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success(tweetData) {
        renderTweets(tweetData);
      },
    });
  }

// SUBMIT OF TWEETS via AJAX

  function submitTweet(e) {
    e.preventDefault();
    const tweetData = $(this).serialize();
    if (textInputVerified()) {
      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: tweetData,
        success() {
          $('#tweetInput').val('');
          $('#charCounter').text(140);
          loadTweets();
        },
      });
    }
  }


// CALLING FUNCTION & SCRIPTS

  loadTweets();

  $('#submit-tweet').on('submit', submitTweet);

  $('#compose').on('click', (e) => {
    e.stopPropagation();
    $('.new-tweet').slideToggle();
    $('#tweetInput').focus();
  });
});

